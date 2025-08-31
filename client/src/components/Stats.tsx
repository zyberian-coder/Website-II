import { useEffect, useRef, useState } from "react";
import { TrendingUp, Clock, DollarSign, Heart } from "lucide-react";

export default function Stats() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  const stats = [
    { 
      value: 99.95, 
      label: "Uptime across managed estates",
      suffix: "%",
      icon: TrendingUp,
      color: "from-british-green to-emerald-600",
      bgColor: "from-emerald-50 to-green-50"
    },
    { 
      value: 2, 
      label: "Faster average time-to-market",
      suffix: "x",
      icon: Clock,
      color: "from-blue-600 to-purple-600",
      bgColor: "from-blue-50 to-purple-50"
    },
    { 
      value: 10, 
      label: "Business value shipped",
      suffix: "M+",
      prefix: "$",
      icon: DollarSign,
      color: "from-amber-600 to-orange-600",
      bgColor: "from-amber-50 to-orange-50"
    },
    { 
      value: 72, 
      label: "Clients love working with us",
      suffix: " NPS",
      icon: Heart,
      color: "from-rose-600 to-pink-600",
      bgColor: "from-rose-50 to-pink-50"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500; // 2.5 seconds
    const steps = 80;
    const stepDuration = duration / steps;

    const intervals = stats.map((stat, index) => {
      const targetValue = stat.value;
      const increment = targetValue / steps;
      let currentValue = 0;

      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(intervals[index]);
        }

        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = parseFloat(currentValue.toFixed(stat.value % 1 === 0 ? 0 : 2));
          return newCounts;
        });
      }, stepDuration);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, [isVisible, stats]);

  return (
    <section ref={statsRef} className="relative section-padding-large bg-gradient-to-br from-white via-blue-50/20 to-emerald-50/20 overflow-hidden">
      {/* Background Elements - Better positioned to avoid overlap */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-400/8 to-purple-500/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-400/6 to-teal-500/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/5 to-blue-500/5 rounded-full blur-3xl animate-morphing" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-amber-400/6 to-orange-500/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-professional relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm rounded-full border border-blue-200/60 shadow-sm mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-british-green to-blue-600 rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-semibold text-blue-800 tracking-wide">Trusted by Industry Leaders</span>
          </div>
          <h2 className="h2 text-neutral-900 mb-6">
            Proven Results That
            <span className="bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 bg-clip-text text-transparent ml-6">Speak for Themselves</span>
          </h2>
          <p className="text-large text-neutral-600 max-w-4xl mx-auto">
            Our track record of delivering exceptional value and performance across hundreds of successful projects
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="group relative animate-fade-in-up interactive-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`stat-${index}`}
              >
                {/* Card Background */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-neutral-200/60 professional-shadow-hover overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                  </div>

                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <Icon className="w-10 h-10 text-neutral-700" />
                    </div>

                    {/* Value */}
                    <div className="mb-6">
                      <div className="text-5xl lg:text-6xl font-black text-neutral-900 mb-3" data-testid={`stat-value-${index}`}>
                        <span className="bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                          {stat.prefix || ''}{counts[index]}{stat.suffix}
                        </span>
                      </div>
                      
                      {/* Animated Underline */}
                      <div className="w-0 group-hover:w-full h-1.5 bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 rounded-full transition-all duration-700 mx-auto ease-out" />
                    </div>

                    {/* Label */}
                    <p className="text-body text-neutral-600 font-medium leading-relaxed" data-testid={`stat-label-${index}`}>
                      {stat.label}
                    </p>

                    {/* Floating Particles */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div 
                            key={i}
                            className="w-1.5 h-1.5 bg-gradient-to-r from-british-green to-blue-600 rounded-full animate-bounce-in"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-british-green via-blue-600 to-emerald-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-3xl px-10 py-6 border border-blue-200/60 professional-shadow-large shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-gradient-to-r from-british-green to-blue-600 rounded-full animate-pulse" />
              <span className="text-body font-semibold text-blue-800">Real-time data</span>
            </div>
            <div className="w-px h-6 bg-blue-300" />
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full animate-pulse" />
              <span className="text-body font-semibold text-emerald-800">Updated daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
