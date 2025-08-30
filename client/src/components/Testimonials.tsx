import { Star, Quote, ArrowRight, Sparkles, TrendingUp, Users, Award } from "lucide-react";
import { useState } from "react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "James Richardson",
      title: "CTO, TechCorp",
      quote: "Zyberian transformed our legacy systems into a modern, scalable platform. Their expertise in cloud migration saved us 6 months of development time and reduced our infrastructure costs by 40%.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      rating: 5,
      company: "TechCorp",
      industry: "Technology",
      results: ["40% cost reduction", "6 months saved", "99.9% uptime"]
    },
    {
      name: "Sarah Chen",
      title: "Head of Digital, RetailPlus",
      quote: "The team's attention to detail and proactive communication made our e-commerce platform rebuild seamless. Revenue increased by 40% post-launch and customer satisfaction scores improved dramatically.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c61e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      rating: 5,
      company: "RetailPlus",
      industry: "Retail",
      results: ["40% revenue increase", "Improved UX", "Higher conversion"]
    },
    {
      name: "Michael Foster", 
      title: "CEO, FinanceFirst",
      quote: "Outstanding results. Zyberian built our fintech platform with security and compliance at its core. We've processed over £50M transactions without issues and achieved regulatory approval in record time.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      rating: 5,
      company: "FinanceFirst",
      industry: "Fintech",
      results: ["£50M+ processed", "Zero security issues", "Regulatory approval"]
    },
    {
      name: "Emily Rodriguez",
      title: "VP Engineering, HealthTech",
      quote: "Zyberian's expertise in healthcare compliance and modern architecture helped us build a platform that serves millions of patients. Their attention to security and scalability is unmatched.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      rating: 5,
      company: "HealthTech",
      industry: "Healthcare",
      results: ["HIPAA compliant", "Millions served", "99.95% uptime"]
    },
    {
      name: "David Kim",
      title: "Founder, StartupXYZ",
      quote: "From MVP to Series A, Zyberian has been our technical partner every step of the way. Their ability to scale with our growth while maintaining code quality is exceptional.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      rating: 5,
      company: "StartupXYZ",
      industry: "SaaS",
      results: ["MVP to Series A", "10x user growth", "Zero downtime"]
    },
    {
      name: "Lisa Thompson",
      title: "Director of IT, ManufacturingCo",
      quote: "Zyberian modernized our entire manufacturing operations with IoT integration and real-time analytics. Production efficiency increased by 35% and we reduced waste by 60%.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      rating: 5,
      company: "ManufacturingCo",
      industry: "Manufacturing",
      results: ["35% efficiency gain", "60% waste reduction", "IoT integration"]
    }
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
    { icon: Award, value: "50+", label: "Industry Awards" }
  ];

  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-100/50 to-orange-100/50 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-yellow-50/20 to-orange-50/20 rounded-full blur-3xl animate-morphing" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full border border-yellow-200 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800">Client Success Stories</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Client
            <span className="text-gradient ml-4">Outcomes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            See how we've helped businesses transform and scale with our innovative technology solutions
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="group relative animate-fade-in-up interactive-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 premium-shadow-hover text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative animate-fade-in-up interactive-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`testimonial-card-${index}`}
            >
              {/* Main Card */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 premium-shadow-hover overflow-hidden h-full">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                </div>

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <Quote className="w-12 h-12 text-yellow-500" />
                  </div>

                  {/* Rating */}
                  <div className="flex text-yellow-400 mb-6" data-testid={`testimonial-stars-${index}`}>
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <Star 
                        key={starIndex} 
                        className="w-5 h-5 fill-current animate-bounce-in" 
                        style={{ animationDelay: `${starIndex * 0.1}s` }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 italic mb-6 leading-relaxed text-lg" data-testid={`testimonial-quote-${index}`}>
                    "{testimonial.quote}"
                  </p>

                  {/* Results */}
                  <div className="space-y-2 mb-6">
                    {testimonial.results.map((result, resultIndex) => (
                      <div 
                        key={resultIndex}
                        className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0"
                        style={{ transitionDelay: `${resultIndex * 0.1}s` }}
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                        <span className="text-sm text-gray-600 font-medium">{result}</span>
                      </div>
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={testimonial.avatar}
                        alt={`${testimonial.name} testimonial`}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                        data-testid={`testimonial-avatar-${index}`}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900" data-testid={`testimonial-name-${index}`}>
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600" data-testid={`testimonial-title-${index}`}>
                        {testimonial.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{testimonial.company}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{testimonial.industry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100 shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center space-x-6 bg-white/80 backdrop-blur-xl rounded-3xl px-8 py-6 border border-white/50 premium-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center animate-pulse-glow">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900">Join Our Success Stories</h4>
                <p className="text-sm text-gray-600">Let's create your success story together</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
