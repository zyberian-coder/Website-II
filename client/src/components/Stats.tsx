import { useEffect, useRef, useState } from "react";

export default function Stats() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  const stats = [
    { 
      value: 99.95, 
      label: "Uptime across managed estates",
      suffix: "%",
      icon: "⚡",
      color: "from-green-400 to-green-600"
    },
    { 
      value: 2, 
      label: "Faster average time-to-market",
      suffix: "x",
      icon: "🚀",
      color: "from-blue-400 to-blue-600"
    },
    { 
      value: 10, 
      label: "Business value shipped",
      suffix: "M+",
      prefix: "$",
      icon: "💰",
      color: "from-purple-400 to-purple-600"
    },
    { 
      value: 72, 
      label: "Clients love working with us",
      suffix: " NPS",
      icon: "❤️",
      color: "from-pink-400 to-pink-600"
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

    const duration = 2000; // 2 seconds
    const steps = 60;
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
    <section ref={statsRef} className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-green-50/30 to-blue-50/30 rounded-full blur-3xl animate-morphing" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-semibold text-green-800">Trusted by Industry Leaders</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Proven Results That
            <span className="text-gradient ml-2">Speak for Themselves</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our track record of delivering exceptional value and performance across hundreds of successful projects
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative animate-fade-in-up interactive-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`stat-${index}`}
            >
              {/* Card Background */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 premium-shadow-hover overflow-hidden">
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                </div>

                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{stat.icon}</span>
                  </div>

                  {/* Value */}
                  <div className="mb-4">
                    <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2" data-testid={`stat-value-${index}`}>
                      <span className="text-gradient">
                        {stat.prefix || ''}{counts[index]}{stat.suffix}
                      </span>
                    </div>
                    
                    {/* Animated Underline */}
                    <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500 mx-auto" />
                  </div>

                  {/* Label */}
                  <p className="text-gray-600 font-medium leading-relaxed" data-testid={`stat-label-${index}`}>
                    {stat.label}
                  </p>

                  {/* Floating Particles */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i}
                          className="w-1 h-1 bg-green-400 rounded-full animate-bounce-in"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/50 premium-shadow">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">Real-time data</span>
            </div>
            <div className="w-px h-4 bg-gray-300" />
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">Updated daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
