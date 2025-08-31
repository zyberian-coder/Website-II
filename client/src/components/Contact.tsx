import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin, Send, Sparkles, MessageSquare, Calendar, DollarSign, Users, Rocket } from "lucide-react";
import { insertContactSubmissionSchema } from "@shared/schema";

const contactFormSchema = insertContactSubmissionSchema.extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isFormFocused, setIsFormFocused] = useState(false);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hr@zyberian.com",
      description: "Send us an email anytime",
      color: "from-british-green to-british-green-light"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+44 7471622999",
      description: "Call us during business hours",
      color: "from-neutral-600 to-neutral-700"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "London, England",
      description: "ZYBERIAN LTD, 124-128 City Road, EC1V 2NX",
      color: "from-neutral-600 to-neutral-700"
    }
  ];

  const projectTypes = [
    { value: "web-mobile", label: "Web & Mobile Development" },
    { value: "product-engineering", label: "Product Engineering" },
    { value: "cloud-devops", label: "Cloud & DevOps" },
    { value: "data-ai", label: "Data & AI" },
    { value: "systems-integration", label: "Systems Integration" },
    { value: "cyber-security", label: "Cyber Security" },
    { value: "sre-managed-ops", label: "SRE & Managed Ops" },
    { value: "other", label: "Other" }
  ];

  return (
    <section id="contact" className="relative section-padding-large bg-gradient-to-br from-neutral-50 via-white to-neutral-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-british-green/3 to-british-green/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-british-green/2 to-british-green/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-neutral-50/20 to-neutral-100/20 rounded-full blur-3xl animate-morphing" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-neutral-100/40 to-neutral-200/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-professional relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-neutral-200/60 shadow-sm mb-8">
            <MessageSquare className="w-4 h-4 text-british-green mr-3" />
            <span className="text-sm font-semibold text-neutral-700 tracking-wide">Get In Touch</span>
          </div>
          <h2 className="h1 text-neutral-900 mb-8">
            Let's Build Something
            <span className="text-british-green ml-6">Great Together</span>
          </h2>
          <p className="text-large text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Ready to transform your business with cutting-edge technology? Get in touch to discuss your project and start your digital transformation journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Content */}
          <div className="space-y-16 animate-fade-in-left">
            {/* Contact Info Cards */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div 
                    key={index}
                    className="group relative animate-fade-in-up interactive-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    data-testid={`contact-${info.title.toLowerCase()}`}
                  >
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-neutral-200/60 professional-shadow-hover shadow-lg hover:shadow-2xl transition-all duration-500">
                      <div className="flex items-center space-x-6">
                        <div className={`w-20 h-20 bg-gradient-to-br ${info.color} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="h4 text-neutral-900 mb-2">{info.title}</h4>
                          <p className="text-body text-neutral-700 font-semibold mb-2">{info.value}</p>
                          <p className="text-small text-neutral-500">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Why Choose Us */}
            <div className="space-y-8">
              <h3 className="h3 text-neutral-900 mb-8">Why Choose Zyberian?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Rocket, text: "Fast Delivery", color: "from-british-green to-british-green-light" },
                  { icon: Users, text: "Expert Team", color: "from-neutral-600 to-neutral-700" },
                  { icon: Calendar, text: "Flexible Timeline", color: "from-neutral-600 to-neutral-700" },
                  { icon: DollarSign, text: "Competitive Pricing", color: "from-neutral-600 to-neutral-700" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center space-x-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-neutral-200/60 group hover:bg-white/90 transition-all duration-500 shadow-sm hover:shadow-lg"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-semibold text-neutral-700 text-body">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Right Content - Form */}
          <div className="animate-fade-in-right">
            <div className={`relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 border border-neutral-200/60 professional-shadow-hover transition-all duration-500 shadow-xl hover:shadow-2xl ${isFormFocused ? 'ring-2 ring-british-green/20' : ''}`}>
              {/* Form Header */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-british-green to-british-green-light rounded-3xl flex items-center justify-center animate-pulse-glow shadow-lg">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h3 className="h3 text-neutral-900 mb-3">Start Your Project</h3>
                <p className="text-body text-neutral-600">Tell us about your vision and we'll make it reality</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" onFocus={() => setIsFormFocused(true)} onBlur={() => setIsFormFocused(false)}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="group">
                          <FormLabel className="text-body font-semibold text-neutral-700 mb-3">Name *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Your full name" 
                                {...field} 
                                data-testid="input-name"
                                className="h-12 bg-white/60 border-neutral-200 focus:border-british-green focus:ring-british-green/20 transition-all duration-300 text-body rounded-xl"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-british-green/0 to-neutral-600/0 group-focus-within:from-british-green/5 group-focus-within:to-neutral-600/5 rounded-xl transition-all duration-300 pointer-events-none" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="group">
                          <FormLabel className="text-body font-semibold text-neutral-700 mb-3">Email *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type="email" 
                                placeholder="your@email.com" 
                                {...field} 
                                data-testid="input-email"
                                className="h-12 bg-white/60 border-neutral-200 focus:border-british-green focus:ring-british-green/20 transition-all duration-300 text-body rounded-xl"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-british-green/0 to-neutral-600/0 group-focus-within:from-british-green/5 group-focus-within:to-neutral-600/5 rounded-xl transition-all duration-300 pointer-events-none" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem className="group">
                        <FormLabel className="text-body font-semibold text-neutral-700 mb-3">Company</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="Your company name" 
                              {...field} 
                              value={field.value || ""}
                              data-testid="input-company"
                              className="h-12 bg-white/60 border-neutral-200 focus:border-british-green focus:ring-british-green/20 transition-all duration-300 text-body rounded-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-british-green/0 to-neutral-600/0 group-focus-within:from-british-green/5 group-focus-within:to-neutral-600/5 rounded-xl transition-all duration-300 pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem className="group">
                          <FormLabel className="text-body font-semibold text-neutral-700 mb-3">Project Type</FormLabel>
                          <FormControl>
                            <select 
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              data-testid="select-project-type"
                              className="w-full h-12 px-4 py-3 bg-white/60 border border-neutral-200 rounded-xl text-body focus:border-british-green focus:ring-british-green/20 focus:outline-none transition-all duration-300"
                            >
                              <option value="">Select project type</option>
                              {projectTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem className="group">
                          <FormLabel className="text-body font-semibold text-neutral-700 mb-3">Budget Range</FormLabel>
                          <FormControl>
                            <select 
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              data-testid="select-budget"
                              className="w-full h-12 px-4 py-3 bg-white/60 border border-neutral-200 rounded-xl text-body focus:border-british-green focus:ring-british-green/20 focus:outline-none transition-all duration-300"
                            >
                              <option value="">Select budget range</option>
                              <option value="10k-50k">£10k - £50k</option>
                              <option value="50k-100k">£50k - £100k</option>
                              <option value="100k-250k">£100k - £250k</option>
                              <option value="250k-500k">£250k - £500k</option>
                              <option value="500k+">£500k+</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem className="group">
                        <FormLabel className="text-body font-semibold text-neutral-700 mb-3">Timeline</FormLabel>
                        <FormControl>
                          <select 
                            value={field.value || ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            data-testid="select-timeline"
                            className="w-full h-12 px-4 py-3 bg-white/60 border border-neutral-200 rounded-xl text-body focus:border-british-green focus:ring-british-green/20 focus:outline-none transition-all duration-300"
                          >
                            <option value="">Select timeline</option>
                            <option value="asap">ASAP</option>
                            <option value="1-3-months">1-3 months</option>
                            <option value="3-6-months">3-6 months</option>
                            <option value="6-12-months">6-12 months</option>
                            <option value="12-months+">12+ months</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="group">
                        <FormLabel className="text-body font-semibold text-neutral-700 mb-3">Message *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea 
                              rows={5}
                              placeholder="Tell us about your project, goals, and vision..." 
                              {...field} 
                              data-testid="textarea-message"
                              className="bg-white/60 border-neutral-200 focus:border-british-green focus:ring-british-green/20 transition-all duration-300 resize-none text-body rounded-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-british-green/0 to-neutral-600/0 group-focus-within:from-british-green/5 group-focus-within:to-neutral-600/5 rounded-xl transition-all duration-300 pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-british-green to-british-green-light text-white px-10 py-5 text-lg font-bold hover:from-british-green-light hover:to-british-green transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl rounded-xl"
                    size="lg"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {contactMutation.isPending ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6 mr-3" />
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-british-green/20 to-neutral-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </form>
              </Form>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-british-green to-british-green-light rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100 shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
