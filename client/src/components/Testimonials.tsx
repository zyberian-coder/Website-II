import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Zyberian transformed our legacy systems into a modern, scalable platform. The team's expertise and dedication exceeded our expectations.",
      author: "Sarah Chen",
      role: "CTO, TechFlow Inc.",
      rating: 5,
      color: "from-blue-600 to-purple-600",
      bgColor: "from-blue-50 to-purple-50"
    },
    {
      quote: "Working with Zyberian was a game-changer. They delivered our MVP in record time and helped us scale to 100K+ users seamlessly.",
      author: "Marcus Rodriguez",
      role: "Founder, StartupXYZ",
      rating: 5,
      color: "from-emerald-600 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50"
    },
    {
      quote: "The level of technical excellence and attention to detail is outstanding. Zyberian has become our trusted technology partner.",
      author: "Emily Watson",
      role: "VP Engineering, DataCorp",
      rating: 5,
      color: "from-indigo-600 to-blue-600",
      bgColor: "from-indigo-50 to-blue-50"
    },
  ];

  const stats = [
    { 
      value: "98%", 
      label: "Client Satisfaction",
      color: "from-british-green to-emerald-600",
      bgColor: "from-emerald-50 to-green-50"
    },
    { 
      value: "2.3x", 
      label: "Faster Delivery",
      color: "from-blue-600 to-purple-600",
      bgColor: "from-blue-50 to-purple-50"
    },
    { 
      value: "24/7", 
      label: "Support Coverage",
      color: "from-amber-600 to-orange-600",
      bgColor: "from-amber-50 to-orange-50"
    },
  ];

  return (
    <section id="testimonials" className="relative section-padding-large bg-gradient-to-br from-white via-blue-50/20 to-emerald-50/20 overflow-hidden">
      {/* Background Elements - Better positioned to avoid overlap */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-400/8 to-purple-500/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-400/6 to-teal-500/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/5 to-blue-500/5 rounded-full blur-3xl animate-morphing" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-amber-400/6 to-orange-500/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-professional relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm rounded-full border border-blue-200/60 shadow-sm mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-british-green to-blue-600 rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-semibold text-blue-800 tracking-wide">Client Success Stories</span>
          </div>
          <h2 className="h2 text-neutral-900 mb-6">
            What Our Clients
            <span className="bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 bg-clip-text text-transparent ml-6">Say About Us</span>
          </h2>
          <p className="text-large text-neutral-600 max-w-4xl mx-auto">
            Don't just take our word for it. Here's what industry leaders and successful startups have to say about working with Zyberian.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative animate-fade-in-up interactive-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`testimonial-stat-${index}`}
            >
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-neutral-200/60 professional-shadow-hover overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-neutral-900 mb-3" data-testid={`testimonial-stat-value-${index}`}>
                    <span className="bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-body text-blue-700 font-medium" data-testid={`testimonial-stat-label-${index}`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative animate-fade-in-up interactive-card"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              data-testid={`testimonial-${index}`}
            >
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-neutral-200/60 professional-shadow-hover overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <Quote className="w-8 h-8 text-white" />
                  </div>

                  {/* Quote Text */}
                  <blockquote className="flex-1 mb-8">
                    <p className="text-body text-neutral-700 leading-relaxed italic" data-testid={`testimonial-quote-${index}`}>
                      "{testimonial.quote}"
                    </p>
                  </blockquote>

                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 text-amber-500 fill-current animate-scale-in" 
                        style={{ animationDelay: `${0.4 + index * 0.1 + i * 0.05}s` }}
                      />
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="mt-auto">
                    <div className="font-semibold text-neutral-900" data-testid={`testimonial-author-${index}`}>
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-blue-700 font-medium" data-testid={`testimonial-role-${index}`}>
                      {testimonial.role}
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-3xl px-10 py-6 border border-blue-200/60 professional-shadow-large shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-gradient-to-r from-british-green to-blue-600 rounded-full animate-pulse" />
              <span className="text-body font-semibold text-blue-800">Join our success stories</span>
            </div>
            <div className="w-px h-6 bg-blue-300" />
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full animate-pulse" />
              <span className="text-body font-semibold text-emerald-800">Start your journey today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
