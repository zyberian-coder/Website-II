import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobSchema, insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all active jobs
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getActiveJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  // Create new job (admin endpoint)
  app.post("/api/jobs", async (req, res) => {
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

  // Update job (admin endpoint)
  app.put("/api/jobs/:id", async (req, res) => {
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

  // Delete job (admin endpoint)
  app.delete("/api/jobs/:id", async (req, res) => {
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

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const submissionData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(submissionData);
      
      // In a real application, you would send an email here
      console.log("Contact form submission:", {
        to: "hr@zyberian.com",
        subject: `New contact form submission from ${submission.name}`,
        data: submission
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Your message has been sent successfully. We'll get back to you soon!" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Get all contact submissions (admin endpoint)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
