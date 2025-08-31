import { Monitor, Wrench, Cloud, BarChart3, Link, Shield, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: Monitor,
      title: "Web & Mobile",
      description: "Modern, responsive applications that deliver exceptional user experiences across all platforms and devices.",
      features: ["React Native", "Progressive Web Apps", "Cross-platform Development"],
      color: "from-blue-600 to-purple-600",
      bgColor: "from-blue-50 to-purple-50"
    },
    {
      icon: Wrench,
      title: "Product Engineering", 
      description: "Full-cycle product development from concept to launch, with scalable architecture and maintainable code.",
      features: ["MVP Development", "Scalable Architecture", "Code Quality"],
      color: "from-emerald-600 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50"
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "Scalable cloud infrastructure and automated deployment pipelines for reliable, efficient operations.",
      features: ["AWS/Azure/GCP", "CI/CD Pipelines", "Infrastructure as Code"],
      color: "from-indigo-600 to-blue-600",
      bgColor: "from-indigo-50 to-blue-50"
    },
    {
      icon: BarChart3,
      title: "Data & AI",
      description: "Transform your data into actionable insights with advanced analytics and machine learning solutions.",
      features: ["Machine Learning", "Data Analytics", "Business Intelligence"],
      color: "from-purple-600 to-pink-600",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      icon: Link,
      title: "Systems Integration",
      description: "Seamlessly connect your existing systems and new solutions for optimal workflow and efficiency.",
      features: ["API Development", "Legacy Integration", "Workflow Automation"],
      color: "from-amber-600 to-orange-600",
      bgColor: "from-amber-50 to-orange-50"
    },
    {
      icon: Shield,
      title: "Cyber Security",
      description: "Comprehensive security solutions to protect your digital assets and maintain regulatory compliance.",
      features: ["Penetration Testing", "Security Audits", "Compliance"],
      color: "from-red-600 to-rose-600",
      bgColor: "from-red-50 to-rose-50"
    },
    {
      icon: Zap,
      title: "SRE & Managed Ops",
      description: "24/7 monitoring and management of your systems to ensure maximum uptime and performance.",
      features: ["24/7 Monitoring", "Performance Optimization", "Incident Response"],
      color: "from-british-green to-emerald-600",
      bgColor: "from-emerald-50 to-green-50"
    },
  ];

  return (
    <section id="services" className="relative section-padding-large bg-gradient-to-br from-white via-blue-50/20 to-emerald-50/20 overflow-hidden">
      {/* Subtle Background Elements - Better positioned to avoid overlap */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-400/8 to-purple-500/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/6 to-teal-500/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-indigo-400/5 to-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }} />
      </div>

      <div className="container-professional relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm rounded-full border border-blue-200/60 shadow-sm mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-british-green to-blue-600 rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-semibold text-blue-800 tracking-wide">Our Services</span>
          </div>
          <h2 className="h2 text-neutral-900 mb-8">
            Comprehensive
            <span className="bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 bg-clip-text text-transparent ml-6">Solutions</span>
          </h2>
          <p className="text-large text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            We provide end-to-end technology solutions that drive digital transformation and business growth, 
            delivering exceptional results across every project.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className="group relative animate-fade-in-up interactive-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-testid={`service-card-${index}`}
              >
                {/* Main Card */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-neutral-200/60 professional-shadow-hover overflow-hidden h-full shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative z-10">
                    {/* Service Icon */}
                    <div className="relative z-10 mb-8">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <h3 className="h4 text-neutral-900 group-hover:text-neutral-800 transition-colors duration-500" data-testid={`service-title-${index}`}>
                        {service.title}
                      </h3>
                      
                      <p className="text-body text-neutral-600 leading-relaxed" data-testid={`service-description-${index}`}>
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 pt-6">
                        {service.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex}
                            className="flex items-center space-x-4 opacity-70 group-hover:opacity-100 transition-all duration-500"
                          >
                            <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`} />
                            <span className="text-small text-neutral-600 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                      <div className={`w-10 h-10 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-12 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm rounded-3xl px-6 lg:px-10 py-8 border border-blue-200/60 professional-shadow-large shadow-xl">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h4 className="h4 text-neutral-900 mb-2">Ready to Transform?</h4>
                <p className="text-body text-blue-700">Let's discuss your project requirements</p>
              </div>
            </div>
            <div className="hidden lg:block w-px h-16 bg-blue-300" />
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-500 professional-button shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
