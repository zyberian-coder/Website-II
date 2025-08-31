import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Job, InsertJob, ContactSubmission } from "@shared/schema";
import { insertJobSchema, insertUserSchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  LogOut,
  KeyRound,
  Eye,
  Loader2,
} from "lucide-react";
import { Link, useLocation } from "wouter";

const credsSchema = insertUserSchema.pick({
  username: true,
  password: true,
});

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isChangeCredsOpen, setIsChangeCredsOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<
    ContactSubmission | null
  >(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  // Fetch data (authentication is handled by ProtectedRoute)
  const { data: jobs, isLoading: isLoadingJobs } = useQuery<Job[]>({
    queryKey: ["/api/admin/jobs"],
  });

  const { data: submissions, isLoading: isLoadingSubmissions } = useQuery<
    ContactSubmission[]
  >({
    queryKey: ["/api/admin/contact"],
  });

  // Mutations
  const createJobMutation = useMutation({
    mutationFn: (newJob: InsertJob) =>
      apiRequest("POST", "/api/admin/jobs", newJob),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/jobs"] });
      toast({ title: "Success", description: "Job posting created." });
      setIsAddJobOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create job: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: ({ id, ...updates }: { id: string } & Partial<InsertJob>) =>
      apiRequest("PUT", `/api/admin/jobs/${id}`, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/jobs"] });
      toast({ title: "Success", description: "Job posting updated." });
      setEditingJob(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update job: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/jobs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/jobs"] });
      toast({ title: "Success", description: "Job posting deleted." });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/auth/logout"),
    onSuccess: () => {
      // Clear auth cache
      queryClient.setQueryData(["/api/auth/me"], null);
      setLocation("/admin/login");
    },
  });

  const changeCredsMutation = useMutation({
    mutationFn: (data: z.infer<typeof credsSchema>) =>
      apiRequest("POST", "/api/admin/change-credentials", data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Credentials changed successfully.",
      });
      setIsChangeCredsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to change credentials: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Forms
  const form = useForm<z.infer<typeof insertJobSchema>>({
    resolver: zodResolver(insertJobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      type: "full-time",
      experience: "entry",
      skills: [],
      isActive: true,
    },
  });

  const credsForm = useForm<z.infer<typeof credsSchema>>({
    resolver: zodResolver(credsSchema),
    defaultValues: { username: "", password: "" },
  });

  // Subtle scroll-in animations for sections
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".animate-on-scroll")
    );
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Handlers
  const handleEdit = (job: Job) => {
    setEditingJob(job);
    form.reset({
      title: job.title,
      description: job.description,
      location: job.location,
      type: job.type,
      experience: job.experience,
      skills: job.skills || [], // Ensure skills is an array
      isActive: job.isActive,
    });
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    form.reset();
  };

  const onSubmit = (data: z.infer<typeof insertJobSchema>) => {
    if (editingJob) {
      updateJobMutation.mutate({ id: editingJob.id, ...data });
    } else {
      createJobMutation.mutate(data);
    }
  };

  // Stats
  const totalJobs = jobs?.length || 0;
  const activeJobs = jobs?.filter((job) => job.isActive).length || 0;
  const inactiveJobs = totalJobs - activeJobs;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            Zyberian Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsChangeCredsOpen(true)}
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              <KeyRound className="w-4 h-4 mr-2" /> Change Credentials
            </Button>
            <Button 
              variant="outline" 
              onClick={() => logoutMutation.mutate()}
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-on-scroll professional-shadow-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalJobs}</div>
            </CardContent>
          </Card>
          <Card className="animate-on-scroll professional-shadow-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Jobs
              </CardTitle>
              <Briefcase className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeJobs}
              </div>
            </CardContent>
          </Card>
          <Card className="animate-on-scroll professional-shadow-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Inactive Jobs
              </CardTitle>
              <Briefcase className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {inactiveJobs}
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog
          open={isChangeCredsOpen}
          onOpenChange={setIsChangeCredsOpen}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Change Admin Credentials</DialogTitle>
              <DialogDescription>
                Update your username and password securely.
              </DialogDescription>
            </DialogHeader>
            <Form {...credsForm}>
              <form
                onSubmit={credsForm.handleSubmit((data) =>
                  changeCredsMutation.mutate(data)
                )}
                className="space-y-4"
              >
                <FormField
                  name="username"
                  control={credsForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={credsForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-british-green hover:bg-british-green-light">Save Changes</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className="space-y-8">
          <Card className="animate-on-scroll professional-shadow-hover">
            <CardHeader className="flex justify-between items-center flex-row">
              <CardTitle className="text-xl font-semibold text-gray-900">Job Postings</CardTitle>
              <Dialog
                open={isAddJobOpen || !!editingJob}
                onOpenChange={(open) =>
                  !open && (setIsAddJobOpen(false), handleCancelEdit())
                }
              >
                <DialogTrigger asChild>
                  <Button
                    className="bg-british-green text-white hover:bg-british-green-light"
                    onClick={() => setIsAddJobOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingJob ? "Edit Job" : "Create Job"}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Senior Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter detailed job description..."
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="location"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., London/Remote" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          name="type"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select job type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="full-time">Full-time</SelectItem>
                                  <SelectItem value="part-time">Part-time</SelectItem>
                                  <SelectItem value="contract">Contract</SelectItem>
                                  <SelectItem value="internship">Internship</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          name="experience"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Experience Level</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select experience level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="entry">Entry Level</SelectItem>
                                  <SelectItem value="mid">Mid Level</SelectItem>
                                  <SelectItem value="senior">Senior Level</SelectItem>
                                  <SelectItem value="lead">Lead</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        name="skills"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Required Skills</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., JavaScript, React, Node.js, Python"
                                value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
                                  field.onChange(skills);
                                }}
                              />
                            </FormControl>
                            <div className="text-sm text-gray-500">
                              Enter skills separated by commas
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="isActive"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Active Status</FormLabel>
                              <div className="text-sm text-gray-500">
                                Make this job posting visible to candidates
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-2 pt-4">
                        <Button type="submit" className="flex-1 bg-british-green hover:bg-british-green-light">
                          {editingJob ? "Save Changes" : "Create Job"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setIsAddJobOpen(false);
                            handleCancelEdit();
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="animate-slide-up">
              {isLoadingJobs ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-500">Loading jobs...</span>
                </div>
              ) : jobs && jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-6 border border-gray-200 rounded-lg flex justify-between items-start transition-colors hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                          {job.title}
                          <Badge
                            variant={job.isActive ? "default" : "secondary"}
                            className={
                              job.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {job.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </h3>
                        <p className="text-gray-600 mb-3 max-w-2xl">
                          {job.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>📍 {job.location}</span>
                          <span>🕒 {job.type}</span>
                          <span>👤 {job.experience}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(job)}
                          className="text-gray-700 border-gray-300 hover:bg-gray-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteJobMutation.mutate(job.id)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No job postings yet.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="animate-on-scroll professional-shadow-hover">
            <CardHeader className="flex justify-between items-center flex-row">
              <CardTitle className="text-xl font-semibold text-gray-900">Contact Form Submissions</CardTitle>
              <Link
                href="/admin/submissions"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-10 px-4 py-2"
              >
                <Eye className="w-4 h-4 mr-2" /> View All
              </Link>
            </CardHeader>
            <CardContent className="animate-slide-up">
              {isLoadingSubmissions ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-500">Loading submissions...</span>
                </div>
              ) : submissions && submissions.length > 0 ? (
                <Table className="table-fixed">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-[22%]">Email</TableHead>
                      <TableHead className="w-[12%]">Company</TableHead>
                      <TableHead>Project Type</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead className="w-[32%]">Message</TableHead>
                      <TableHead>Submitted At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {([...submissions]
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      )
                      .slice(0, 5)
                    ).map((submission) => {
                      const isNew =
                        submission.createdAt && Date.now() - new Date(submission.createdAt).getTime() <
                        24 * 60 * 60 * 1000;
                      return (
                      <TableRow key={submission.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{submission.name}</span>
                            {isNew && (
                              <Badge className="bg-green-100 text-green-800">NEW</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="w-[22%]">
                          <div className="truncate" title={submission.email}>
                            {submission.email}
                          </div>
                        </TableCell>
                        <TableCell className="w-[12%]">
                          <div className="truncate" title={submission.company || "N/A"}>
                            {submission.company || "N/A"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                            {submission.projectType || "N/A"}
                          </Badge>
                        </TableCell>
                        <TableCell>{submission.budget || "N/A"}</TableCell>
                        <TableCell>{submission.timeline || "N/A"}</TableCell>
                        <TableCell className="align-top w-[32%]">
                          <div className="flex items-start gap-2">
                            <div className="truncate" style={{ maxWidth: "100%" }}>
                              {submission.message}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="shrink-0 text-gray-600 hover:text-gray-900"
                              aria-label="View full message"
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setIsMessageOpen(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          {submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : 'N/A'}
                        </TableCell>
                      </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No contact form submissions yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Full Message Dialog */}
          <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Submission Message</DialogTitle>
                <DialogDescription>
                  From {selectedSubmission?.name} ({selectedSubmission?.email})
                </DialogDescription>
              </DialogHeader>
              <div
                className="whitespace-normal break-words text-sm text-gray-800 bg-gray-50 p-4 rounded-lg"
                style={{ whiteSpace: "normal", wordBreak: "break-word" }}
              >
                {selectedSubmission?.message}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
