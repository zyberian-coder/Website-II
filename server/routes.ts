import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobSchema, insertContactSubmissionSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import { sendContactEmail } from "./email"; // Import the email function

// Extend session type
declare module 'express-session' {
  interface SessionData {
    userId?: string;
    isAdmin?: boolean;
  }
}

// Authentication middleware
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId || !req.session.isAdmin) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin credentials change route
  app.post("/api/admin/change-credentials", requireAuth, async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ error: "Username and password required" });
        return;
      }
      const userId = req.session.userId;
      if (typeof userId !== "string") {
        res.status(401).json({ error: "Invalid session user" });
        return;
      }
      const user = await storage.updateAdminCredentials(userId, username, password);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ error: "Failed to update credentials" });
    }
  });

  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: "Username and password required" });
        return;
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      req.session.userId = user.id;
      req.session.isAdmin = true;

      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Logout failed" });
        return;
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (req.session.userId) {
      res.json({ isAuthenticated: true, isAdmin: req.session.isAdmin });
    } else {
      res.json({ isAuthenticated: false, isAdmin: false });
    }
  });

  // Job routes (public and admin)
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getActiveJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.get("/api/admin/jobs", requireAuth, async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.post("/api/admin/jobs", requireAuth, async (req, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(jobData);
      res.status(201).json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid job data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create job" });
      }
    }
  });

  app.put("/api/admin/jobs/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertJobSchema.partial().parse(req.body);
      const job = await storage.updateJob(id, updates);
      if (!job) {
        res.status(404).json({ error: "Job not found" });
        return;
      }
      res.json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid job data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update job" });
      }
    }
  });

  app.delete("/api/admin/jobs/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteJob(id);
      if (!deleted) {
        res.status(404).json({ error: "Job not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete job" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const submissionData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(submissionData);

      // Trigger email notification
      await sendContactEmail(submission);

      res.status(201).json({ 
        success: true, 
        message: "Your message has been sent successfully. We\'ll get back to you soon!" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        // Log the error for debugging, but send a generic response to the client
        console.error("Error processing contact form:", error);
        res.status(500).json({ error: "Failed to submit contact form. Please try again later." });
      }
    }
  });

  // Get all contact submissions (admin)
  app.get("/api/admin/contact", requireAuth, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  app.delete("/api/admin/contact/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteContactSubmission(id);
      if (!deleted) {
        res.status(404).json({ error: "Submission not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete submission" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
