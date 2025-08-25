import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Clock, Briefcase } from "lucide-react";
import type { Job } from "@shared/schema";

export default function Careers() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
  });

  const handleApply = (jobTitle: string) => {
    toast({
      title: "Application Process",
      description: `To apply for ${jobTitle}, please send your CV and cover letter to hr@zyberian.com`,
    });
  };

  const handleGeneralApplication = () => {
    toast({
      title: "General Application",
      description: "Please send your CV and cover letter to hr@zyberian.com with 'General Application' in the subject line.",
    });
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Join Our Team</h1>
              <p className="text-xl text-gray-600">Help us build the future of technology while growing your career</p>
            </div>
            
            <div className="grid gap-6 max-w-4xl mx-auto">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <Skeleton className="h-6 w-64 mb-2" />
                        <div className="flex flex-wrap gap-4 mb-4">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-16 w-full" />
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 animate-on-scroll">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Join Our Team</h1>
            <p className="text-xl text-gray-600">Help us build the future of technology while growing your career</p>
          </div>
          
          <div className="grid gap-6 max-w-4xl mx-auto">
            {jobs?.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-all duration-300 animate-on-scroll">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid={`job-title-${job.id}`}>
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1" data-testid={`job-location-${job.id}`}>
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1" data-testid={`job-type-${job.id}`}>
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1" data-testid={`job-experience-${job.id}`}>
                          <Briefcase className="w-4 h-4" />
                          {job.experience}
                        </span>
                      </div>
                      <p className="text-gray-700" data-testid={`job-description-${job.id}`}>
                        {job.description}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button 
                        onClick={() => handleApply(job.title)}
                        className="bg-british-green text-white hover:bg-british-green-light"
                        data-testid={`button-apply-${job.id}`}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center mt-8 animate-on-scroll">
              <p className="text-gray-600 mb-4">Don't see a role that fits? We're always looking for talented individuals.</p>
              <Button 
                variant="outline"
                onClick={handleGeneralApplication}
                className="border-2 border-british-green text-british-green hover:bg-british-green hover:text-white"
                data-testid="button-general-application"
              >
                Send General Application
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
