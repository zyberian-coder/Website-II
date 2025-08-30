import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      const floatingElements = heroRef.current.querySelectorAll('.floating-element');
      floatingElements.forEach((el, index) => {
        const element = el as HTMLElement;
        const speed = (index + 1) * 0.5;
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
    document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="hero-bg text-white relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-green-300/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
        <div className="floating-element absolute bottom-32 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="floating-element absolute bottom-20 right-1/3 w-16 h-16 bg-green-200/30 rounded-full blur-md animate-float" style={{ animationDelay: '1s' }} />
        
        {/* Morphing blob */}
        <div className="floating-element absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-500/20 animate-morphing blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-slide-in-from-top">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 sm:mr-3 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium">Trusted by Fortune 500 Companies</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="hero-title font-black leading-tight text-4xl sm:text-5xl lg:text-6xl">
                <span className="block text-white drop-shadow-lg">
                  Ship faster.
                </span>
                <span className="block text-white drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
                  Scale smarter.
                </span>
                <span className="block text-gradient animate-text-gradient drop-shadow-lg">
                  Win bigger.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-green-100 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Zyberian designs, builds, and runs resilient software systems that fuel growth — from idea to enterprise scale.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button
                onClick={handleBookCall}
                className="group relative overflow-hidden bg-white text-british-green px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold hover:bg-gray-50 active:scale-95 transition-all duration-300 transform hover:scale-105 premium-shadow-hover w-full sm:w-auto"
                size="lg"
                data-testid="button-book-call"
              >
                <span className="relative z-10">Book a Strategy Call</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              
              <Button
                onClick={handleCaseStudies}
                variant="outline"
                className="group relative overflow-hidden border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold hover:bg-white hover:text-british-green active:scale-95 transition-all duration-300 transform hover:scale-105 glass-effect w-full sm:w-auto"
                size="lg"
                data-testid="button-case-studies"
              >
                <span className="relative z-10">See Case Studies</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 pt-6 sm:pt-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border-2 border-white animate-bounce-in" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-green-100">500+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-bounce-in" style={{ animationDelay: `${i * 0.1}s` }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-green-100">5.0 Rating</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - 3D Card (Hidden on mobile, shown on tablet+) */}
          <div className="hidden md:block relative animate-fade-in-right" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 premium-shadow-hover transform perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-500/10 rounded-3xl animate-pulse-glow" />
                
                {/* Floating Elements Inside Card */}
                <div className="relative z-10 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center animate-pulse-glow">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Zyberian Platform</h3>
                        <p className="text-sm text-green-200">Enterprise Ready</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Uptime', value: '99.95%', color: 'from-green-400 to-green-600' },
                      { label: 'Performance', value: '2.5x', color: 'from-blue-400 to-blue-600' },
                      { label: 'Clients', value: '500+', color: 'from-purple-400 to-purple-600' },
                      { label: 'Projects', value: '1000+', color: 'from-orange-400 to-orange-600' }
                    ].map((stat, index) => (
                      <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg mb-2 flex items-center justify-center`}>
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-green-200">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-200">System Load</span>
                      <span className="text-white">78%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse" style={{ width: '78%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Icons Around Card */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center animate-float shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: '2s' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
