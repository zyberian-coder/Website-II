import { Monitor, Wrench, Cloud, BarChart3, Link, Shield, Zap } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Monitor,
      title: "Web & Mobile",
      description: "Modern, responsive applications that deliver exceptional user experiences across all platforms and devices.",
    },
    {
      icon: Wrench,
      title: "Product Engineering", 
      description: "Full-cycle product development from concept to launch, with scalable architecture and maintainable code.",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "Scalable cloud infrastructure and automated deployment pipelines for reliable, efficient operations.",
    },
    {
      icon: BarChart3,
      title: "Data & AI",
      description: "Transform your data into actionable insights with advanced analytics and machine learning solutions.",
    },
    {
      icon: Link,
      title: "Systems Integration",
      description: "Seamlessly connect your existing systems and new solutions for optimal workflow and efficiency.",
    },
    {
      icon: Shield,
      title: "Cyber Security",
      description: "Comprehensive security solutions to protect your digital assets and maintain regulatory compliance.",
    },
    {
      icon: Zap,
      title: "SRE & Managed Ops",
      description: "24/7 monitoring and management of your systems to ensure maximum uptime and performance.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Capabilities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide end-to-end technology solutions that drive digital transformation and business growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll group"
                data-testid={`service-card-${index}`}
              >
                <div className="w-12 h-12 bg-british-green rounded-lg flex items-center justify-center mb-6 group-hover:bg-british-green-light transition-colors duration-200">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid={`service-title-${index}`}>
                  {service.title}
                </h3>
                <p className="text-gray-600" data-testid={`service-description-${index}`}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
