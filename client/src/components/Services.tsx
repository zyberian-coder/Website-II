import { Monitor, Wrench, Cloud, BarChart3, Link, Shield, Zap, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: Monitor,
      title: "Web & Mobile",
      description: "Modern, responsive applications that deliver exceptional user experiences across all platforms and devices.",
      features: ["React Native", "Progressive Web Apps", "Cross-platform Development"],
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Wrench,
      title: "Product Engineering", 
      description: "Full-cycle product development from concept to launch, with scalable architecture and maintainable code.",
      features: ["MVP Development", "Scalable Architecture", "Code Quality"],
      color: "from-green-400 to-green-600",
      bgColor: "from-green-50 to-green-100",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "Scalable cloud infrastructure and automated deployment pipelines for reliable, efficient operations.",
      features: ["AWS/Azure/GCP", "CI/CD Pipelines", "Infrastructure as Code"],
      color: "from-purple-400 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: BarChart3,
      title: "Data & AI",
      description: "Transform your data into actionable insights with advanced analytics and machine learning solutions.",
      features: ["Machine Learning", "Data Analytics", "Business Intelligence"],
      color: "from-orange-400 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Link,
      title: "Systems Integration",
      description: "Seamlessly connect your existing systems and new solutions for optimal workflow and efficiency.",
      features: ["API Development", "Legacy Integration", "Workflow Automation"],
      color: "from-pink-400 to-pink-600",
      bgColor: "from-pink-50 to-pink-100",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Shield,
      title: "Cyber Security",
      description: "Comprehensive security solutions to protect your digital assets and maintain regulatory compliance.",
      features: ["Penetration Testing", "Security Audits", "Compliance"],
      color: "from-red-400 to-red-600",
      bgColor: "from-red-50 to-red-100",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "SRE & Managed Ops",
      description: "24/7 monitoring and management of your systems to ensure maximum uptime and performance.",
      features: ["24/7 Monitoring", "Performance Optimization", "Incident Response"],
      color: "from-yellow-400 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
      gradient: "from-yellow-500 to-orange-500"
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-purple-50/20 to-pink-50/20 rounded-full blur-3xl animate-morphing" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-800">Comprehensive Solutions</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our
            <span className="text-gradient ml-4">Capabilities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We provide end-to-end technology solutions that drive digital transformation and business growth, 
            delivering exceptional results across every project.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 premium-shadow-hover overflow-hidden h-full">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                  </div>

                  <div className="relative z-10">
                    {/* Service Icon */}
                    <div className="relative z-10 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {typeof service.icon === 'string' ? (
                          <span className="text-2xl">{service.icon}</span>
                        ) : (
                          <service.icon className="w-8 h-8 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
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

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300" data-testid={`service-title-${index}`}>
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed" data-testid={`service-description-${index}`}>
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2 pt-4">
                        {service.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex}
                            className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0"
                            style={{ transitionDelay: `${featureIndex * 0.1}s` }}
                          >
                            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full`} />
                            <span className="text-sm text-gray-500 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <div className={`w-10 h-10 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100 shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center space-x-6 bg-white/80 backdrop-blur-xl rounded-3xl px-8 py-6 border border-white/50 premium-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center animate-pulse-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900">Ready to Transform?</h4>
                <p className="text-sm text-gray-600">Let's discuss your project requirements</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
