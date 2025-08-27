import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, LogOut, Users, Briefcase, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { insertJobSchema } from "@shared/schema";
import type { Job, InsertJob } from "@shared/schema";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

interface AuthStatus {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [skillInput, setSkillInput] = useState("");
  
  // Check authentication
  const { data: authStatus, isLoading: authLoading } = useQuery<AuthStatus>({
    queryKey: ['/api/auth/me'],
  });

  useEffect(() => {
    if (!authLoading && (!authStatus?.isAuthenticated || !authStatus?.isAdmin)) {
      setLocation("/admin/login");
    }
  }, [authStatus, authLoading, setLocation]);

  const { data: jobs, isLoading: jobsLoading } = useQuery<Job[]>({
    queryKey: ['/api/admin/jobs'],
    enabled: authStatus?.isAuthenticated,
  });

  const form = useForm<InsertJob>({
    resolver: zodResolver(insertJobSchema),
    defaultValues: {
      title: '',
      location: '',
      type: '',
      experience: '',
      description: '',
      skills: [],
      isActive: true,
    },
  });

  const createJobMutation = useMutation({
    mutationFn: (job: InsertJob) => apiRequest('POST', '/api/admin/jobs', job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/jobs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/jobs'] }); // Update public jobs too
      toast({ title: "Success", description: "Job posted successfully!" });
      form.reset();
      setIsAddJobOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create job posting", variant: "destructive" });
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertJob> }) => 
      apiRequest('PUT', `/api/admin/jobs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/jobs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
      toast({ title: "Success", description: "Job updated successfully!" });
      setEditingJob(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update job", variant: "destructive" });
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: (jobId: string) => apiRequest('DELETE', `/api/admin/jobs/${jobId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/jobs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
      toast({ title: "Success", description: "Job deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete job", variant: "destructive" });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/auth/logout'),
    onSuccess: () => {
      queryClient.clear(); // Clear all cached data
      toast({ title: "Success", description: "Logged out successfully" });
      setLocation("/admin/login");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to logout", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertJob) => {
    if (editingJob) {
      updateJobMutation.mutate({ id: editingJob.id, data });
    } else {
      createJobMutation.mutate(data);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    form.reset({
      title: job.title,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description,
      skills: job.skills || [],
      isActive: job.isActive,
    });
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    setSkillInput("");
    form.reset();
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    
    const currentSkills = form.getValues('skills') || [];
    if (!currentSkills.includes(skillInput.trim())) {
      form.setValue('skills', [...currentSkills, skillInput.trim()]);
    }
    setSkillInput("");
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues('skills') || [];
    form.setValue('skills', currentSkills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (!authStatus?.isAuthenticated || !authStatus?.isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Zyberian Admin Dashboard</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-british-green rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{jobs?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {jobs?.filter(job => job.isActive).length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-gray-500 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inactive Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {jobs?.filter(job => !job.isActive).length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Job Postings</CardTitle>
              <Dialog open={isAddJobOpen || !!editingJob} onOpenChange={(open) => {
                if (!open) {
                  setIsAddJobOpen(false);
                  handleCancelEdit();
                }
              }}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-british-green text-white hover:bg-british-green-light"
                    onClick={() => setIsAddJobOpen(true)}
                    data-testid="button-add-job"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingJob 
                        ? 'Update the job posting details below.'
                        : 'Fill out the form below to create a new job posting.'
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Senior Software Engineer" {...field} data-testid="input-job-title" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger data-testid="select-job-location">
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="London, UK">London, UK</SelectItem>
                                  <SelectItem value="Remote">Remote</SelectItem>
                                  <SelectItem value="London/Remote">London/Remote</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Type</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger data-testid="select-job-type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Full-time">Full-time</SelectItem>
                                  <SelectItem value="Part-time">Part-time</SelectItem>
                                  <SelectItem value="Contract">Contract</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience Level</FormLabel>
                            <FormControl>
                              <Input placeholder="3+ years experience" {...field} data-testid="input-job-experience" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief description of the role and key responsibilities..." 
                                rows={3}
                                {...field} 
                                data-testid="textarea-job-description"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skills Required</FormLabel>
                            <div className="space-y-3">
                              <div className="flex gap-2">
                                <Input
                                  value={skillInput}
                                  onChange={(e) => setSkillInput(e.target.value)}
                                  onKeyDown={handleSkillInputKeyDown}
                                  placeholder="Type a skill and press Enter"
                                  data-testid="input-skill"
                                />
                                <Button
                                  type="button"
                                  onClick={addSkill}
                                  variant="outline"
                                  size="sm"
                                  data-testid="button-add-skill"
                                >
                                  Add
                                </Button>
                              </div>
                              {(field.value && field.value.length > 0) && (
                                <div className="flex flex-wrap gap-2">
                                  {field.value.map((skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="flex items-center gap-1 px-2 py-1"
                                    >
                                      {skill}
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 hover:bg-red-100"
                                        onClick={() => removeSkill(skill)}
                                        data-testid={`button-remove-skill-${index}`}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <Select onValueChange={(value) => field.onChange(value === 'true')} defaultValue={field.value?.toString()}>
                                <SelectTrigger data-testid="select-job-status">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="true">Active</SelectItem>
                                  <SelectItem value="false">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <Button 
                          type="submit" 
                          className="flex-1 bg-british-green text-white hover:bg-british-green-light" 
                          disabled={createJobMutation.isPending || updateJobMutation.isPending}
                          data-testid="button-save-job"
                        >
                          {(createJobMutation.isPending || updateJobMutation.isPending) 
                            ? 'Saving...' 
                            : editingJob ? 'Update Job' : 'Create Job'
                          }
                        </Button>
                        {editingJob && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancelEdit}
                            data-testid="button-cancel-edit"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {jobsLoading ? (
              <div className="text-center py-8">Loading jobs...</div>
            ) : jobs && jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900" data-testid={`job-title-${job.id}`}>
                            {job.title}
                          </h3>
                          <Badge variant={job.isActive ? "default" : "secondary"}>
                            {job.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2" data-testid={`job-description-${job.id}`}>
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span data-testid={`job-location-${job.id}`}>📍 {job.location}</span>
                          <span data-testid={`job-type-${job.id}`}>⏰ {job.type}</span>
                          <span data-testid={`job-experience-${job.id}`}>👤 {job.experience}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(job)}
                          data-testid={`button-edit-${job.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteJobMutation.mutate(job.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          data-testid={`button-delete-${job.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No job postings found. Create your first job posting!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}