import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Briefcase, Plus, Trash2, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { insertJobSchema } from "@shared/schema";
import type { Job, InsertJob } from "@shared/schema";
import { useState } from "react";

export default function Careers() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
  });

  const form = useForm<InsertJob>({
    resolver: zodResolver(insertJobSchema),
    defaultValues: {
      title: '',
      location: '',
      type: '',
      experience: '',
      description: '',
    },
  });

  const createJobMutation = useMutation({
    mutationFn: (job: InsertJob) => apiRequest('POST', '/api/jobs', job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
      toast({ title: "Success", description: "Job posted successfully!" });
      form.reset();
      setIsAddJobOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create job posting", variant: "destructive" });
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: (jobId: string) => apiRequest('DELETE', `/api/jobs/${jobId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
      toast({ title: "Success", description: "Job posting removed" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to remove job posting", variant: "destructive" });
    },
  });

  const handleApply = (jobTitle: string) => {
    // Open email client with pre-filled subject
    const mailtoLink = `mailto:hr@zyberian.com?subject=Application for ${jobTitle}&body=Dear Hiring Team,%0A%0AI am writing to express my interest in the ${jobTitle} position...`;
    window.open(mailtoLink, '_blank');
  };

  const handleGeneralApplication = () => {
    const mailtoLink = `mailto:hr@zyberian.com?subject=General Application&body=Dear Hiring Team,%0A%0AI am writing to express my general interest in joining Zyberian...`;
    window.open(mailtoLink, '_blank');
  };

  const onSubmit = (data: InsertJob) => {
    createJobMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">Careers at Zyberian</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join our growing team and help shape the future of IT solutions.</p>
            </div>
            
            <div className="grid gap-6 max-w-5xl mx-auto">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="shadow-sm border-gray-100">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <Skeleton className="h-7 w-64 mb-4" />
                        <Skeleton className="h-16 w-full mb-6" />
                        <div className="flex flex-wrap gap-4 mb-4">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="mt-6 lg:mt-0 lg:ml-8">
                        <Skeleton className="h-12 w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 animate-on-scroll">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">Careers at Zyberian</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join our growing team and help shape the future of IT solutions.</p>
          </div>

          {/* Admin Controls */}
          <div className="flex justify-between items-center mb-12 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsAdmin(!isAdmin)}
                className="text-sm"
                data-testid="button-toggle-admin"
              >
                {isAdmin ? 'Exit Admin' : 'Admin Mode'}
              </Button>
              {isAdmin && (
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Admin Mode Active
                </span>
              )}
            </div>
            
            {isAdmin && (
              <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-british-green text-white hover:bg-british-green-light" data-testid="button-add-job">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Job Posting</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to create a new job posting that will appear on the careers page.
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
                                  <SelectItem value="London">London</SelectItem>
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
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger data-testid="select-job-experience">
                                  <SelectValue placeholder="Select experience" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Junior">Junior</SelectItem>
                                  <SelectItem value="Mid-level">Mid-level</SelectItem>
                                  <SelectItem value="Senior">Senior</SelectItem>
                                  <SelectItem value="Lead">Lead</SelectItem>
                                </SelectContent>
                              </Select>
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
                            <FormLabel>Job Description (2-3 lines)</FormLabel>
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
                      <Button type="submit" className="w-full bg-british-green text-white hover:bg-british-green-light" disabled={createJobMutation.isPending} data-testid="button-create-job">
                        {createJobMutation.isPending ? 'Creating...' : 'Create Job'}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          {/* Job Listings */}
          <div className="grid gap-6 max-w-5xl mx-auto">
            {jobs?.filter(job => job.isActive).map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-all duration-300 shadow-sm border-gray-100">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-semibold text-gray-900" data-testid={`job-title-${job.id}`}>
                          {job.title}
                        </h3>
                        {isAdmin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteJobMutation.mutate(job.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-4"
                            data-testid={`button-delete-${job.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6" data-testid={`job-description-${job.id}`}>
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full" data-testid={`job-location-${job.id}`}>
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full" data-testid={`job-type-${job.id}`}>
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 lg:mt-0 lg:ml-8 flex-shrink-0">
                      <Button 
                        onClick={() => handleApply(job.title)}
                        size="lg"
                        className="bg-british-green text-white hover:bg-british-green-light px-8 py-3 text-base font-medium"
                        data-testid={`button-apply-${job.id}`}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {jobs && jobs.filter(job => job.isActive).length === 0 && !isLoading && (
              <Card className="shadow-sm border-gray-100">
                <CardContent className="p-12 text-center">
                  <h3 className="text-xl font-medium text-gray-600 mb-4">No Open Positions</h3>
                  <p className="text-gray-500 mb-6">We don't have any open positions right now, but we're always interested in hearing from talented individuals.</p>
                  <Button 
                    onClick={handleGeneralApplication}
                    className="bg-british-green text-white hover:bg-british-green-light"
                    data-testid="button-general-application"
                  >
                    Send General Application
                  </Button>
                </CardContent>
              </Card>
            )}

            {jobs && jobs.filter(job => job.isActive).length > 0 && (
              <div className="text-center mt-12 animate-on-scroll">
                <Card className="shadow-sm border-gray-100 bg-gray-50">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Don't see a role that fits?</h3>
                    <p className="text-gray-600 mb-6">We're always looking for talented individuals to join our growing team.</p>
                    <Button 
                      onClick={handleGeneralApplication}
                      variant="outline"
                      size="lg"
                      className="border-2 border-british-green text-british-green hover:bg-british-green hover:text-white px-8 py-3"
                      data-testid="button-general-application"
                    >
                      Send General Application
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="mt-20 max-w-5xl mx-auto">
            <Card className="shadow-sm border-gray-100 bg-british-green text-white">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                  <p className="text-green-100 mb-8">Have questions about our opportunities or want to learn more about working at Zyberian?</p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <a 
                      href="mailto:hr@zyberian.com" 
                      className="flex items-center gap-3 text-white hover:text-green-100 transition-colors"
                      data-testid="link-contact-email"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="font-medium">hr@zyberian.com</span>
                    </a>
                    <a 
                      href="tel:+447471622999" 
                      className="flex items-center gap-3 text-white hover:text-green-100 transition-colors"
                      data-testid="link-contact-phone"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="font-medium">+44 7471622999</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
