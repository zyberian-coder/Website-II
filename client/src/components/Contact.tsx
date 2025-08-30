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
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+44 7471622999",
      description: "Call us during business hours",
      color: "from-green-400 to-green-600"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "London, England",
      description: "ZYBERIAN LTD, 124-128 City Road, EC1V 2NX",
      color: "from-purple-400 to-purple-600"
    }
  ];

  const projectTypes = [
    { value: "web-mobile", label: "Web & Mobile Development", icon: "📱" },
    { value: "product-engineering", label: "Product Engineering", icon: "⚙️" },
    { value: "cloud-devops", label: "Cloud & DevOps", icon: "☁️" },
    { value: "data-ai", label: "Data & AI", icon: "🤖" },
    { value: "systems-integration", label: "Systems Integration", icon: "🔗" },
    { value: "cyber-security", label: "Cyber Security", icon: "🔒" },
    { value: "sre-managed-ops", label: "SRE & Managed Ops", icon: "⚡" },
    { value: "other", label: "Other", icon: "💡" }
  ];

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-green-50/20 to-blue-50/20 rounded-full blur-3xl animate-morphing" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200 mb-6">
            <MessageSquare className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-semibold text-green-800">Get In Touch</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Let's Build Something
            <span className="text-gradient ml-4">Great Together</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Ready to transform your business with cutting-edge technology? Get in touch to discuss your project and start your digital transformation journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div className="space-y-12 animate-fade-in-left">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div 
                    key={index}
                    className="group relative animate-fade-in-up interactive-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    data-testid={`contact-${info.title.toLowerCase()}`}
                  >
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 premium-shadow-hover">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">{info.title}</h4>
                          <p className="text-gray-700 font-medium">{info.value}</p>
                          <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Why Choose Us */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Zyberian?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Rocket, text: "Fast Delivery", color: "from-blue-400 to-blue-600" },
                  { icon: Users, text: "Expert Team", color: "from-green-400 to-green-600" },
                  { icon: Calendar, text: "Flexible Timeline", color: "from-purple-400 to-purple-600" },
                  { icon: DollarSign, text: "Competitive Pricing", color: "from-orange-400 to-orange-600" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 group hover:bg-white/80 transition-all duration-300"
                    >
                      <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-700">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Right Content - Form */}
          <div className="animate-fade-in-right">
            <div className={`relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 premium-shadow-hover transition-all duration-500 ${isFormFocused ? 'ring-2 ring-green-400/20' : ''}`}>
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center animate-pulse-glow">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Project</h3>
                <p className="text-gray-600">Tell us about your vision and we'll make it reality</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" onFocus={() => setIsFormFocused(true)} onBlur={() => setIsFormFocused(false)}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="group">
                          <FormLabel className="text-sm font-semibold text-gray-700">Name *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Your full name" 
                                {...field} 
                                data-testid="input-name"
                                className="bg-white/50 border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-blue-400/0 group-focus-within:from-green-400/5 group-focus-within:to-blue-400/5 rounded-lg transition-all duration-300 pointer-events-none" />
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
                          <FormLabel className="text-sm font-semibold text-gray-700">Email *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type="email" 
                                placeholder="your@email.com" 
                                {...field} 
                                data-testid="input-email"
                                className="bg-white/50 border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-blue-400/0 group-focus-within:from-green-400/5 group-focus-within:to-blue-400/5 rounded-lg transition-all duration-300 pointer-events-none" />
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
                        <FormLabel className="text-sm font-semibold text-gray-700">Company</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="Your company name" 
                              {...field} 
                              data-testid="input-company"
                              className="bg-white/50 border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-blue-400/0 group-focus-within:from-green-400/5 group-focus-within:to-blue-400/5 rounded-lg transition-all duration-300 pointer-events-none" />
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
                          <FormLabel className="text-sm font-semibold text-gray-700">Project Type</FormLabel>
                          <FormControl>
                            <select 
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              data-testid="select-project-type"
                              className="w-full h-10 px-3 py-2 bg-white/50 border border-gray-200 rounded-md text-sm focus:border-green-400 focus:ring-green-400/20 focus:outline-none transition-all duration-300"
                            >
                              <option value="">Select project type</option>
                              {projectTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {type.icon} {type.label}
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
                          <FormLabel className="text-sm font-semibold text-gray-700">Budget Range</FormLabel>
                          <FormControl>
                            <select 
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              data-testid="select-budget"
                              className="w-full h-10 px-3 py-2 bg-white/50 border border-gray-200 rounded-md text-sm focus:border-green-400 focus:ring-green-400/20 focus:outline-none transition-all duration-300"
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
                        <FormLabel className="text-sm font-semibold text-gray-700">Timeline</FormLabel>
                        <FormControl>
                          <select 
                            value={field.value || ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            data-testid="select-timeline"
                            className="w-full h-10 px-3 py-2 bg-white/50 border border-gray-200 rounded-md text-sm focus:border-green-400 focus:ring-green-400/20 focus:outline-none transition-all duration-300"
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
                        <FormLabel className="text-sm font-semibold text-gray-700">Message *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea 
                              rows={4}
                              placeholder="Tell us about your project, goals, and vision..." 
                              {...field} 
                              data-testid="textarea-message"
                              className="bg-white/50 border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-300 resize-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-blue-400/0 group-focus-within:from-green-400/5 group-focus-within:to-blue-400/5 rounded-lg transition-all duration-300 pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 text-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    size="lg"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {contactMutation.isPending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-3" />
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </form>
              </Form>

              {/* Floating Elements */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100 shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
