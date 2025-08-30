import { Target, Rocket, Shield, ArrowRight, CheckCircle, Clock, Users, Zap } from "lucide-react";
import { useState } from "react";

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Strategy & Discovery",
      description: "We start by understanding your business goals, technical requirements, and success metrics to create a comprehensive roadmap.",
      icon: Target,
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      features: ["Business Analysis", "Technical Architecture", "Success Metrics", "Project Roadmap"],
      duration: "1-2 weeks",
      deliverables: ["Requirements Document", "Technical Specification", "Project Timeline"]
    },
    {
      number: "02", 
      title: "Development & Delivery",
      description: "Agile development with regular communication, transparent progress tracking, and iterative improvements based on feedback.",
      icon: Rocket,
      color: "from-green-400 to-green-600",
      bgColor: "from-green-50 to-green-100",
      features: ["Agile Development", "Regular Demos", "Continuous Integration", "Quality Assurance"],
      duration: "4-12 weeks",
      deliverables: ["Working Software", "Documentation", "Deployment Pipeline"]
    },
    {
      number: "03",
      title: "Launch & Reliability", 
      description: "Ongoing monitoring, maintenance, and optimization to ensure your systems perform at peak efficiency and scale.",
      icon: Shield,
      color: "from-purple-400 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      features: ["Performance Monitoring", "Security Audits", "Scalability Optimization", "24/7 Support"],
      duration: "Ongoing",
      deliverables: ["Production System", "Monitoring Dashboard", "Support Documentation"]
    },
  ];

  const metrics = [
    { icon: Clock, value: "2x", label: "Faster Delivery" },
    { icon: Users, value: "100%", label: "Client Satisfaction" },
    { icon: Zap, value: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <section id="process" className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-green-100/50 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-blue-50/20 to-green-50/20 rounded-full blur-3xl animate-morphing" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full border border-blue-200 mb-6">
            <Zap className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-800">Proven Methodology</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            How We
            <span className="text-gradient ml-4">Work</span>
          </h2>
          <p className="text-2xl text-british-green font-semibold mb-6 animate-text-gradient">
            Strategy → Delivery → Reliability
          </p>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our transparent, predictable, and accountable execution ensures your project success from concept to long-term support.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            
            return (
              <div 
                key={index}
                className="group relative animate-fade-in-up interactive-card"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setActiveStep(index)}
                data-testid={`process-step-${index}`}
              >
                {/* Main Card */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 premium-shadow-hover overflow-hidden h-full">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                  </div>

                  <div className="relative z-10">
                    {/* Step Number */}
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                        <span className="text-white font-black text-2xl" data-testid={`process-number-${index}`}>
                          {step.number}
                        </span>
                      </div>
                      
                      {/* Icon Overlay */}
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`w-6 h-6 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
                      </div>

                      {/* Floating Particles */}
                      <div className="absolute -top-4 -left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                        <div className="flex space-x-1">
                          {[1, 2, 3].map((i) => (
                            <div 
                              key={i}
                              className="w-2 h-2 bg-white rounded-full animate-bounce-in shadow-sm"
                              style={{ animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300" data-testid={`process-title-${index}`}>
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed" data-testid={`process-description-${index}`}>
                        {step.description}
                      </p>

                      {/* Duration Badge */}
                      <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
                        <Clock className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="text-sm font-medium text-gray-700">{step.duration}</span>
                      </div>

                      {/* Features List */}
                      <div className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex}
                            className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0"
                            style={{ transitionDelay: `${featureIndex * 0.1}s` }}
                          >
                            <CheckCircle className={`w-4 h-4 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
                            <span className="text-sm text-gray-600 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Deliverables */}
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Deliverables:</h4>
                        <div className="space-y-1">
                          {step.deliverables.map((deliverable, deliverableIndex) => (
                            <div 
                              key={deliverableIndex}
                              className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0"
                              style={{ transitionDelay: `${deliverableIndex * 0.1 + 0.3}s` }}
                            >
                              <div className={`w-1.5 h-1.5 bg-gradient-to-r ${step.color} rounded-full`} />
                              <span className="text-xs text-gray-500">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <div className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 group-hover:from-green-400 group-hover:to-blue-400 transition-all duration-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={index}
                className="group relative animate-fade-in-up interactive-card"
                style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
              >
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 premium-shadow-hover text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  <div className="text-gray-600 font-medium">{metric.label}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom Image */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="relative inline-block">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
              alt="Technology consulting team collaborating"
              className="rounded-3xl shadow-2xl mx-auto premium-shadow-hover"
              data-testid="img-process"
            />
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center animate-float shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: '2s' }}>
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="inline-flex items-center space-x-6 bg-white/80 backdrop-blur-xl rounded-3xl px-8 py-6 border border-white/50 premium-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center animate-pulse-glow">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900">Ready to Get Started?</h4>
                <p className="text-sm text-gray-600">Let's begin your project journey today</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
