import { Link } from "wouter";
import { Menu, X } from "lucide-react";
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
    { href: "/", label: "Home", isLink: true },
    { href: "/#services", label: "Services", isLink: true },
    { href: "/#testimonials", label: "Work", isLink: true },
    { href: "/#process", label: "Process", isLink: true },
    { href: "/blog", label: "Blog", isLink: true },
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
        ? 'bg-white/95 backdrop-blur-2xl border-b border-neutral-200/60 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container-professional">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" data-testid="link-home">
                <div className="flex items-center gap-4 group">
                  {/* Professional Logo */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-british-green to-british-green-light rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        className="w-7 h-7 text-white"
                      >
                        <path 
                          d="M5 5 L19 5 L5 19 L19 19" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Brand Name */}
                  <div className="relative">
                    <h1 className={`text-2xl font-bold tracking-tight group-hover:scale-105 transition-transform duration-500 ${
                      isScrolled 
                        ? 'text-neutral-900' 
                        : 'text-neutral-900'
                    }`}>
                      Zyberian
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-10">
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
                    className={`relative group font-medium transition-all duration-500 py-3 text-base tracking-wide ${
                      isScrolled 
                        ? 'text-neutral-700 hover:text-british-green' 
                        : 'text-neutral-700 hover:text-british-green'
                    }`}
                    data-testid={`link-${item.label.toLowerCase()}`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-british-green to-british-green-light group-hover:w-full transition-all duration-500 ease-out" />
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
                className="group relative overflow-hidden bg-gradient-to-r from-british-green to-british-green-light text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-500 professional-button shadow-lg"
                data-testid="link-contact"
              >
                <span className="relative z-10">Contact Us</span>
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative group p-3 w-12 h-12 rounded-xl"
              data-testid="button-mobile-menu"
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
                }`}>
                  <div className={`w-6 h-0.5 transition-colors duration-300 rounded-full ${
                    isScrolled ? 'bg-neutral-700 group-hover:bg-neutral-900' : 'bg-neutral-700 group-hover:bg-neutral-900'
                  }`} />
                </div>
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className={`w-6 h-0.5 transition-colors duration-300 rounded-full ${
                    isScrolled ? 'bg-neutral-700 group-hover:bg-neutral-900' : 'bg-neutral-700 group-hover:bg-neutral-900'
                  }`} />
                </div>
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'
                }`}>
                  <div className={`w-6 h-0.5 transition-colors duration-300 rounded-full ${
                    isScrolled ? 'bg-neutral-700 group-hover:bg-neutral-900' : 'bg-neutral-700 group-hover:bg-neutral-900'
                  }`} />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/98 backdrop-blur-2xl border-t border-neutral-200/60 shadow-lg">
          <div className="px-6 py-8 space-y-3">
            {navItems.map((item, index) => {
              const Component = item.isLink ? Link : 'a';
              const props = item.isLink ? { href: item.href } : { href: item.href };
              
              return (
                <Component
                  key={index}
                  {...props}
                  className="block text-neutral-800 hover:text-british-green font-medium py-4 px-5 rounded-xl hover:bg-neutral-50 active:bg-neutral-100 transition-all duration-300 text-base tracking-wide"
                  data-testid={`mobile-link-${item.label.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Component>
              );
            })}
            
            <Link 
              href="/#contact" 
              className="block bg-gradient-to-r from-british-green to-british-green-light text-white px-8 py-4 rounded-xl font-semibold text-center hover:shadow-xl active:scale-95 transition-all duration-300 text-base mt-6"
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
