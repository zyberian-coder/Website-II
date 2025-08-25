import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "James Richardson",
      title: "CTO, TechCorp",
      quote: "Zyberian transformed our legacy systems into a modern, scalable platform. Their expertise in cloud migration saved us 6 months of development time.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    },
    {
      name: "Sarah Chen",
      title: "Head of Digital, RetailPlus",
      quote: "The team's attention to detail and proactive communication made our e-commerce platform rebuild seamless. Revenue increased by 40% post-launch.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c61e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    },
    {
      name: "Michael Foster", 
      title: "CEO, FinanceFirst",
      quote: "Outstanding results. Zyberian built our fintech platform with security and compliance at its core. We've processed over £50M transactions without issues.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Client Outcomes</h2>
          <p className="text-xl text-gray-600">See how we've helped businesses transform and scale</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 animate-on-scroll"
              data-testid={`testimonial-card-${index}`}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.name} testimonial`}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  data-testid={`testimonial-avatar-${index}`}
                />
                <div>
                  <h4 className="font-semibold text-gray-900" data-testid={`testimonial-name-${index}`}>
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600" data-testid={`testimonial-title-${index}`}>
                    {testimonial.title}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4" data-testid={`testimonial-quote-${index}`}>
                "{testimonial.quote}"
              </p>
              <div className="flex text-yellow-400" data-testid={`testimonial-stars-${index}`}>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
