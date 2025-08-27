import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase, Mail, Phone, Code, ChevronDown, ChevronUp } from "lucide-react";
import type { Job } from "@shared/schema";
import { useState } from "react";

export default function Careers() {
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
  });
  
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());

  const handleApply = (jobTitle: string) => {
    // Open email client with pre-filled subject
    const mailtoLink = `mailto:hr@zyberian.com?subject=Application for ${jobTitle}&body=Dear Hiring Team,%0A%0AI am writing to express my interest in the ${jobTitle} position...`;
    window.open(mailtoLink, '_blank');
  };

  const handleGeneralApplication = () => {
    const mailtoLink = `mailto:hr@zyberian.com?subject=General Application&body=Dear Hiring Team,%0A%0AI am writing to express my general interest in joining Zyberian...`;
    window.open(mailtoLink, '_blank');
  };

  const toggleJobExpansion = (jobId: string) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(jobId)) {
      newExpanded.delete(jobId);
    } else {
      newExpanded.add(jobId);
    }
    setExpandedJobs(newExpanded);
  };

  const formatSkills = (skills: string[] | null, jobId: string) => {
    if (!skills || skills.length === 0) return null;
    
    const maxDisplay = 4;
    const displaySkills = skills.slice(0, maxDisplay);
    const remainingCount = skills.length - maxDisplay;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Code className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Skills Required</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {displaySkills.map((skill, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {skill}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge 
              variant="secondary" 
              className="text-xs bg-british-green/10 text-british-green hover:bg-british-green/20"
            >
              +{remainingCount} more
            </Badge>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-british-green to-british-green-light">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
              <p className="text-xl mb-8 opacity-90">
                Build the future of IT services with passionate professionals who value innovation and excellence
              </p>
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-british-green mb-4">Current Openings</h2>
                <p className="text-gray-600 text-lg">
                  Discover exciting career opportunities at Zyberian
                </p>
              </div>

              {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="h-64">
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : jobs && jobs.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {jobs.map((job) => {
                    const isExpanded = expandedJobs.has(job.id);
                    const shouldShowReadMore = job.description.length > 150;
                    
                    return (
                      <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200" data-testid={`card-job-${job.id}`}>
                        <CardHeader>
                          <CardTitle className="text-british-green" data-testid={`text-job-title-${job.id}`}>
                            {job.title}
                          </CardTitle>
                          <div className="flex items-center text-gray-600 space-x-4">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="text-sm" data-testid={`text-job-location-${job.id}`}>
                                {job.location}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-600">
                              <Briefcase className="w-4 h-4 mr-1" />
                              <span className="text-sm" data-testid={`text-job-type-${job.id}`}>
                                {job.type}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">Years of Experience:</span>
                              <span className="text-sm ml-1" data-testid={`text-job-experience-${job.id}`}>
                                {job.experience}
                              </span>
                            </div>
                          </div>
                          
                          {formatSkills(job.skills, job.id)}
                          
                          <div className="space-y-2">
                            <div className="text-gray-700 text-sm" data-testid={`text-job-description-${job.id}`}>
                              {isExpanded || !shouldShowReadMore 
                                ? job.description 
                                : `${job.description.substring(0, 150)}...`
                              }
                            </div>
                            {shouldShowReadMore && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleJobExpansion(job.id)}
                                className="p-0 h-auto font-medium text-british-green hover:text-british-green-light hover:bg-transparent"
                                data-testid={`button-toggle-description-${job.id}`}
                              >
                                {isExpanded ? (
                                  <>
                                    Show Less <ChevronUp className="w-4 h-4 ml-1" />
                                  </>
                                ) : (
                                  <>
                                    Read More <ChevronDown className="w-4 h-4 ml-1" />
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                          
                          <Button 
                            onClick={() => handleApply(job.title)} 
                            className="w-full mt-4 bg-british-green text-white hover:bg-british-green-light"
                            data-testid={`button-apply-${job.id}`}
                          >
                            Apply Now
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Open Positions</h3>
                  <p className="text-gray-600 mb-6">
                    We don't have any open positions at the moment, but we're always looking for talented individuals.
                  </p>
                  <Button 
                    onClick={handleGeneralApplication}
                    className="bg-british-green text-white hover:bg-british-green-light"
                    data-testid="button-general-application"
                  >
                    Submit General Application
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-british-green mb-4">Why Work With Us</h2>
                <p className="text-gray-600 text-lg">
                  Join a team that values innovation, growth, and work-life balance
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-british-green rounded-full flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-british-green mb-3">Career Growth</h3>
                  <p className="text-gray-600">
                    Continuous learning opportunities and clear career progression paths
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-british-green rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-british-green mb-3">Innovation Focus</h3>
                  <p className="text-gray-600">
                    Work with cutting-edge technologies and contribute to innovative solutions
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-british-green rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-british-green mb-3">Work-Life Balance</h3>
                  <p className="text-gray-600">
                    Flexible working arrangements and comprehensive benefits package
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact HR */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-british-green mb-4">Have Questions?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Our HR team is here to help you with any questions about careers at Zyberian
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.open('mailto:hr@zyberian.com', '_blank')}
                  className="bg-british-green text-white hover:bg-british-green-light"
                  data-testid="button-contact-hr"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact HR Team
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('tel:+44-20-7123-4567', '_blank')}
                  className="border-british-green text-british-green hover:bg-british-green hover:text-white"
                  data-testid="button-call-hr"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +44 20 7123 4567
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}