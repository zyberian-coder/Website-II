import { Link } from "wouter";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/#services", label: "Services", isLink: true },
    { href: "/#testimonials", label: "Work", isLink: true },
    { href: "/#process", label: "Process", isLink: true },
    { href: "/careers", label: "Careers", isLink: true },
  ];

  const handleNavigationClick = (href: string) => {
    const id = href.replace('/#', '').replace('#', '');
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      return true;
    } else if (href.startsWith('/#') || href.startsWith('#')) {
      // If not found, navigate to home with hash
      window.location.href = '/' + href.replace('/','');
      return false;
    }
    return false;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" data-testid="link-home">
                <div className="flex items-center gap-3 group">
                  {/* Animated Logo */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <div className="w-6 h-6 bg-white rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 animate-pulse-glow" />
                        <div className="absolute inset-1 bg-white rounded-sm" />
                      </div>
                    </div>
                    {/* Floating Sparkles */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                      <Sparkles className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  
                  {/* Brand Name */}
                  <div className="relative">
                    <h1 className="text-2xl font-black text-gradient group-hover:scale-105 transition-transform duration-300">
                      Zyberian
                    </h1>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => {
                const Component = item.isLink ? Link : 'a';
                // Only attach handleNavigationClick for in-page anchors
                const isAnchor = item.href.startsWith('/#') || item.href.startsWith('#');
                const props = item.isLink
                  ? isAnchor
                    ? {
                        href: item.href,
                        onClick: (e: any) => {
                          if (!handleNavigationClick(item.href)) {
                            e.preventDefault();
                          }
                        }
                      }
                    : { href: item.href }
                  : { href: item.href };

                return (
                  <Component
                    key={index}
                    {...props}
                    className="relative group text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 py-2"
                    data-testid={`link-${item.label.toLowerCase()}`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-blue-400/0 group-hover:from-green-400/10 group-hover:to-blue-400/10 rounded-lg transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                  </Component>
                );
              })}
              
              {/* Contact Button */}
              <Link 
                href="/#contact"
                onClick={(e: any) => {
                  if (!handleNavigationClick('/#contact')) {
                    e.preventDefault();
                  }
                }}
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                data-testid="link-contact"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Contact Us</span>
                  <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative group p-2 w-10 h-10"
              data-testid="button-mobile-menu"
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
                }`}>
                  <div className="w-6 h-0.5 bg-gray-700 group-hover:bg-gray-900 transition-colors duration-200" />
                </div>
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="w-6 h-0.5 bg-gray-700 group-hover:bg-gray-900 transition-colors duration-200" />
                </div>
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'
                }`}>
                  <div className="w-6 h-0.5 bg-gray-700 group-hover:bg-gray-900 transition-colors duration-200" />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-lg">
          <div className="px-4 py-6 space-y-3">
            {navItems.map((item, index) => {
              const Component = item.isLink ? Link : 'a';
              const props = item.isLink ? { href: item.href } : { href: item.href };
              
              return (
                <Component
                  key={index}
                  {...props}
                  className="block text-gray-700 hover:text-gray-900 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 text-base"
                  data-testid={`mobile-link-${item.label.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Component>
              );
            })}
            
            <Link 
              href="/#contact" 
              className="block bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-4 rounded-xl font-semibold text-center hover:from-green-600 hover:to-blue-600 active:scale-95 transition-all duration-300 transform hover:scale-105 shadow-lg text-base"
              data-testid="mobile-link-contact"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
