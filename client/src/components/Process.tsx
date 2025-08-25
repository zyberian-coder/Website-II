export default function Process() {
  const steps = [
    {
      number: "1",
      title: "Strategy",
      description: "We start by understanding your business goals, technical requirements, and success metrics to create a comprehensive roadmap.",
    },
    {
      number: "2", 
      title: "Delivery",
      description: "Agile development with regular communication, transparent progress tracking, and iterative improvements based on feedback.",
    },
    {
      number: "3",
      title: "Reliability", 
      description: "Ongoing monitoring, maintenance, and optimization to ensure your systems perform at peak efficiency and scale.",
    },
  ];

  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How We Work</h2>
          <p className="text-2xl text-british-green font-semibold mb-6">Strategy → Delivery → Reliability</p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our transparent, predictable, and accountable execution ensures your project success from concept to long-term support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center animate-on-scroll" data-testid={`process-step-${index}`}>
              <div className="w-16 h-16 bg-british-green rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl" data-testid={`process-number-${index}`}>
                  {step.number}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4" data-testid={`process-title-${index}`}>
                {step.title}
              </h3>
              <p className="text-gray-600" data-testid={`process-description-${index}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center animate-on-scroll">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
            alt="Technology consulting team collaborating"
            className="rounded-xl shadow-lg mx-auto"
            data-testid="img-process"
          />
        </div>
      </div>
    </section>
  );
}
