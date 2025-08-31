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
      color: "from-british-green to-british-green-light",
      bgColor: "from-neutral-50 to-neutral-100",
      features: ["Business Analysis", "Technical Architecture", "Success Metrics", "Project Roadmap"],
      duration: "1-2 weeks",
      deliverables: ["Requirements Document", "Technical Specification", "Project Timeline"]
    },
    {
      number: "02", 
      title: "Development & Delivery",
      description: "Agile development with regular communication, transparent progress tracking, and iterative improvements based on feedback.",
      icon: Rocket,
      color: "from-neutral-600 to-neutral-700",
      bgColor: "from-neutral-50 to-neutral-100",
      features: ["Agile Development", "Regular Demos", "Continuous Integration", "Quality Assurance"],
      duration: "4-12 weeks",
      deliverables: ["Working Software", "Documentation", "Deployment Pipeline"]
    },
    {
      number: "03",
      title: "Launch & Reliability", 
      description: "Ongoing monitoring, maintenance, and optimization to ensure your systems perform at peak efficiency and scale.",
      icon: Shield,
      color: "from-neutral-600 to-neutral-700",
      bgColor: "from-neutral-50 to-neutral-100",
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
    <section id="process" className="relative section-padding-large bg-gradient-to-br from-neutral-50 via-white to-neutral-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-british-green/3 to-british-green/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-british-green/2 to-british-green/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-neutral-50/20 to-neutral-100/20 rounded-full blur-3xl animate-morphing" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-neutral-100/40 to-neutral-200/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }} />
      </div>

      <div className="container-professional relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-neutral-200/60 shadow-sm mb-8">
            <Zap className="w-4 h-4 text-british-green mr-3" />
            <span className="text-sm font-semibold text-neutral-700 tracking-wide">Proven Methodology</span>
          </div>
          <h2 className="h1 text-neutral-900 mb-8">
            How We
            <span className="text-british-green ml-6">Work</span>
          </h2>
          <p className="text-large text-british-green font-semibold mb-8 animate-text-gradient">
            Strategy → Delivery → Reliability
          </p>
          <p className="text-large text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Our transparent, predictable, and accountable execution ensures your project success from concept to long-term support.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20 max-w-7xl mx-auto">
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
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-neutral-200/60 professional-shadow-hover overflow-hidden h-full shadow-lg hover:shadow-2xl transition-all duration-500">
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
                      <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                        <span className="text-white font-black text-2xl" data-testid={`process-number-${index}`}>
                          {step.number}
                        </span>
                      </div>
                      
                      {/* Icon Overlay */}
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <Icon className={`w-6 h-6 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
                      </div>

                      {/* Floating Particles */}
                      <div className="absolute -top-6 -left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                        <div className="flex space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div 
                              key={i}
                              className="w-2.5 h-2.5 bg-white rounded-full animate-bounce-in shadow-sm"
                              style={{ animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <h3 className="h4 text-neutral-900 group-hover:text-neutral-800 transition-colors duration-500" data-testid={`process-title-${index}`}>
                        {step.title}
                      </h3>
                      
                      <p className="text-body text-neutral-600 leading-relaxed" data-testid={`process-description-${index}`}>
                        {step.description}
                      </p>

                      {/* Duration Badge */}
                      <div className="inline-flex items-center px-4 py-2 bg-neutral-100 rounded-full">
                        <Clock className="w-4 h-4 text-neutral-600 mr-2" />
                        <span className="text-small font-medium text-neutral-700">{step.duration}</span>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3">
                        {/* Show first 2 features by default */}
                        {step.features.slice(0, 2).map((feature, featureIndex) => (
                          <div 
                            key={featureIndex}
                            className="flex items-center space-x-3 opacity-60 group-hover:opacity-100 transition-all duration-500"
                          >
                            <CheckCircle className={`w-4 h-4 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
                            <span className="text-small text-neutral-600 font-medium">{feature}</span>
                          </div>
                        ))}
                        
                        {/* Show remaining features on hover */}
                        {step.features.slice(2).map((feature, featureIndex) => (
                          <div 
                            key={featureIndex + 2}
                            className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0"
                            style={{ transitionDelay: `${featureIndex * 0.1}s` }}
                          >
                            <CheckCircle className={`w-4 h-4 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
                            <span className="text-small text-neutral-600 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Deliverables */}
                      <div className="pt-4 border-t border-neutral-200/60">
                        <h4 className="text-small font-semibold text-neutral-700 mb-3">Deliverables:</h4>
                        <div className="space-y-2">
                          {/* Show first deliverable by default */}
                          <div className="flex items-center space-x-3 opacity-60 group-hover:opacity-100 transition-all duration-500">
                            <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full`} />
                            <span className="text-small text-neutral-500">{step.deliverables[0]}</span>
                          </div>
                          
                          {/* Show remaining deliverables on hover */}
                          {step.deliverables.slice(1).map((deliverable, deliverableIndex) => (
                            <div 
                              key={deliverableIndex + 1}
                              className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0"
                              style={{ transitionDelay: `${deliverableIndex * 0.1 + 0.3}s` }}
                            >
                              <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full`} />
                              <span className="text-small text-neutral-500">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                      <div className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-neutral-300 to-neutral-200 group-hover:from-british-green group-hover:to-neutral-600 transition-all duration-500" />
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
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 border border-neutral-200/60 professional-shadow-hover text-center shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-british-green to-british-green-light rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-neutral-900 mb-3">{metric.value}</div>
                  <div className="text-body text-neutral-600 font-semibold">{metric.label}</div>
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
              className="rounded-3xl shadow-2xl mx-auto professional-shadow-hover"
              data-testid="img-process"
            />
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-british-green to-british-green-light rounded-3xl flex items-center justify-center animate-float shadow-xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-neutral-700 rounded-2xl flex items-center justify-center animate-float shadow-xl" style={{ animationDelay: '2s' }}>
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-xl rounded-3xl px-10 py-8 border border-neutral-200/60 professional-shadow-large shadow-xl">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-british-green to-british-green-light rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h4 className="h4 text-neutral-900 mb-2">Ready to Get Started?</h4>
                <p className="text-body text-neutral-600">Let's begin your project journey today</p>
              </div>
            </div>
            <div className="w-px h-16 bg-neutral-300" />
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-british-green to-british-green-light text-white font-semibold rounded-xl hover:from-british-green-light hover:to-british-green transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Start Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
