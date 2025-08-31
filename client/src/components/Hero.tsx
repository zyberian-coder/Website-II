import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      const floatingElements = heroRef.current.querySelectorAll('.floating-element');
      floatingElements.forEach((el, index) => {
        const element = el as HTMLElement;
        const speed = (index + 1) * 0.05;
        element.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBookCall = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCaseStudies = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="hero-bg-image relative overflow-hidden min-h-screen flex items-center pt-20"
    >
      {/* Enhanced Background with Image */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/98 via-white/95 to-white/92" />
        
        {/* Subtle Background Pattern - Reduced opacity and better spacing */}
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute inset-0 pattern-grid opacity-8" />
        
        {/* Floating Elements - Better positioned and sized to avoid overlap */}
        <div className="floating-element absolute top-16 left-8 w-16 h-16 bg-gradient-to-br from-blue-400/15 to-purple-500/15 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="floating-element absolute top-32 right-16 w-12 h-12 bg-gradient-to-br from-emerald-400/12 to-teal-500/12 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
        <div className="floating-element absolute bottom-24 left-1/3 w-20 h-20 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="floating-element absolute top-1/2 right-1/4 w-10 h-10 bg-gradient-to-br from-rose-400/8 to-pink-500/8 rounded-full blur-md animate-float" style={{ animationDelay: '6s' }} />
        
        {/* Additional Colorful Elements - Positioned to avoid overlap */}
        <div className="floating-element absolute top-1/3 left-1/4 w-14 h-14 bg-gradient-to-br from-indigo-400/8 to-blue-500/8 rounded-full blur-xl animate-float" style={{ animationDelay: '8s' }} />
        <div className="floating-element absolute bottom-1/3 right-1/3 w-18 h-18 bg-gradient-to-br from-green-400/6 to-emerald-500/6 rounded-full blur-2xl animate-float" style={{ animationDelay: '10s' }} />
      </div>

      {/* Main Content */}
      <div className="container-professional relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-10 animate-fade-in-up">
            {/* Trust Badge with More Color */}
            <div className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm rounded-full border border-blue-200/60 shadow-lg animate-slide-in-left mt-8">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-british-green to-blue-600 rounded-full mr-3 animate-pulse" />
              <span className="text-sm font-semibold text-blue-800 tracking-wide">Trusted by Fortune 500 Companies</span>
            </div>

            {/* Main Heading with Color Variety */}
            <div className="space-y-8">
              <h1 className="hero-title text-neutral-900">
                <span className="block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  Ship faster.
                </span>
                <span className="block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Scale smarter.
                </span>
                <span className="block bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  Win bigger.
                </span>
              </h1>
              
              <p className="hero-subtitle text-large max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Zyberian designs, builds, and runs resilient software systems that fuel growth — from idea to enterprise scale.
              </p>
            </div>

            {/* CTA Buttons with Enhanced Colors */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Button
                onClick={handleBookCall}
                className="group relative overflow-hidden bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 text-white px-8 py-4 text-lg font-semibold hover:from-emerald-600 hover:via-blue-600 hover:to-british-green active:scale-95 transition-all duration-300 professional-button w-full sm:w-auto shadow-lg hover:shadow-xl"
                size="lg"
                data-testid="button-book-call"
              >
                <span className="relative z-10">Book a Strategy Call</span>
              </Button>
              
              <Button
                onClick={handleCaseStudies}
                variant="outline"
                className="group relative overflow-hidden border-2 border-blue-300 text-blue-700 px-8 py-4 text-lg font-semibold hover:border-blue-500 hover:text-blue-800 hover:bg-blue-50 active:scale-95 transition-all duration-300 professional-button w-full sm:w-auto bg-white/90 backdrop-blur-sm"
                size="lg"
                data-testid="button-case-studies"
              >
                <span className="relative z-10">See Case Studies</span>
              </Button>
            </div>

            {/* Trust Indicators with More Color */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:space-x-12 pt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 border-2 border-white shadow-sm animate-scale-in" style={{ animationDelay: `${0.7 + i * 0.1}s` }} />
                  ))}
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-blue-800">500+</div>
                  <div className="text-sm text-blue-600">Happy Clients</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5 text-amber-500 animate-scale-in" style={{ animationDelay: `${0.8 + i * 0.1}s` }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-amber-700">5.0</div>
                  <div className="text-sm text-amber-600">Rating</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Professional Dashboard Card with More Color */}
          <div className="hidden lg:block relative animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Main Card */}
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/60 professional-shadow-hover shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50 rounded-3xl" />
                
                {/* Content Inside Card */}
                <div className="relative z-10 space-y-8">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-british-green via-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900">Zyberian Platform</h3>
                        <p className="text-sm text-blue-600 font-medium">Enterprise Ready</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>

                  {/* Stats Grid with Color Variety */}
                  <div className="grid grid-cols-2 gap-5">
                    {[
                      { label: 'Uptime', value: '99.95%', color: 'from-british-green to-emerald-600', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                      { label: 'Performance', value: '2.5x', color: 'from-blue-600 to-purple-600', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                      { label: 'Clients', value: '500+', color: 'from-purple-600 to-pink-600', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                      { label: 'Projects', value: '1000+', color: 'from-amber-500 to-orange-500', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' }
                    ].map((stat, index) => (
                      <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-5 border border-blue-100 animate-scale-in shadow-sm hover:shadow-md transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl mb-3 flex items-center justify-center shadow-sm`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                          </svg>
                        </div>
                        <div className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                        <div className="text-sm text-blue-700 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>


                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with Color */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-7 h-12 border-2 border-blue-300 rounded-full flex justify-center">
          <div className="w-1.5 h-4 bg-gradient-to-r from-british-green to-blue-600 rounded-full mt-3 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
