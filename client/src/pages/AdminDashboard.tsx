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
      ...job,
      skills: job.skills || [], // Ensure skills is an array
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
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Zyberian Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsChangeCredsOpen(true)}
            >
              <KeyRound className="w-4 h-4 mr-2" /> Change Credentials
            </Button>
            <Button variant="outline" onClick={() => logoutMutation.mutate()}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-on-scroll shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalJobs}</div>
            </CardContent>
          </Card>
          <Card className="animate-on-scroll shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Jobs
              </CardTitle>
              <Briefcase className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {activeJobs}
              </div>
            </CardContent>
          </Card>
          <Card className="animate-on-scroll shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inactive Jobs
              </CardTitle>
              <Briefcase className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
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
                <Button type="submit">Save Changes</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className="space-y-8">
          <Card className="animate-on-scroll shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex justify-between items-center flex-row">
              <CardTitle>Job Postings</CardTitle>
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
                <DialogContent className="sm:max-w-md">
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
                      {/* Form fields */}
                      <Button type="submit">
                        {editingJob ? "Save Changes" : "Create Job"}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="animate-slide-up">
              {isLoadingJobs ? (
                <p>Loading jobs...</p>
              ) : jobs && jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 border rounded-lg flex justify-between items-start transition-colors hover:bg-gray-50"
                    >
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
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
                        <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                          {job.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                          <span>📍 {job.location}</span>
                          <span>🕒 {job.type}</span>
                          <span>👤 {job.experience}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(job)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteJobMutation.mutate(job.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No job postings yet.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="animate-on-scroll shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex justify-between items-center flex-row">
              <CardTitle>Contact Form Submissions</CardTitle>
              <Link
                href="/admin/submissions"
                className={`${Button.toString({
                  variant: "outline",
                })} flex items-center`}
              >
                <Eye className="w-4 h-4 mr-2" /> View All
              </Link>
            </CardHeader>
            <CardContent className="animate-slide-up">
              {isLoadingSubmissions ? (
                <p>Loading submissions...</p>
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
                        Date.now() - new Date(submission.createdAt).getTime() <
                        24 * 60 * 60 * 1000;
                      return (
                      <TableRow key={submission.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{submission.name}</span>
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
                          <Badge variant="secondary">
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
                              className="shrink-0"
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
                          {new Date(
                            submission.createdAt
                          ).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No contact form submissions yet.
                </p>
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
                className="whitespace-normal break-words text-sm text-gray-800"
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