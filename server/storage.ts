import { type User, type InsertUser, type Job, type InsertJob, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getJobs(): Promise<Job[]>;
  getActiveJobs(): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: string, job: Partial<InsertJob>): Promise<Job | undefined>;
  deleteJob(id: string): Promise<boolean>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private jobs: Map<string, Job>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.jobs = new Map();
    this.contactSubmissions = new Map();
    this.seedJobs();
  }

  private seedJobs() {
    const defaultJobs: InsertJob[] = [
      {
        title: "Senior Full-Stack Developer",
        location: "London, UK",
        type: "Full-time",
        experience: "5+ years experience",
        description: "Join our engineering team to build scalable web applications using React, Node.js, and cloud technologies. Lead technical decisions and mentor junior developers.",
        isActive: true,
      },
      {
        title: "DevOps Engineer",
        location: "London, UK", 
        type: "Full-time",
        experience: "3+ years experience",
        description: "Design and maintain CI/CD pipelines, manage cloud infrastructure, and ensure high availability of production systems. AWS and Kubernetes experience required.",
        isActive: true,
      },
      {
        title: "UX/UI Designer",
        location: "London, UK",
        type: "Full-time", 
        experience: "4+ years experience",
        description: "Create beautiful, user-centered designs for web and mobile applications. Work closely with product and engineering teams to deliver exceptional user experiences.",
        isActive: true,
      },
    ];

    defaultJobs.forEach(job => {
      const id = randomUUID();
      this.jobs.set(id, { ...job, id, createdAt: new Date() });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async getActiveJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values())
      .filter(job => job.isActive)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = randomUUID();
    const job: Job = { ...insertJob, id, createdAt: new Date() };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: string, updates: Partial<InsertJob>): Promise<Job | undefined> {
    const existing = this.jobs.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.jobs.set(id, updated);
    return updated;
  }

  async deleteJob(id: string): Promise<boolean> {
    return this.jobs.delete(id);
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = { ...insertSubmission, id, createdAt: new Date() };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }
}

export const storage = new MemStorage();
