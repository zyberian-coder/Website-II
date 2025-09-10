import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", isLink: true },
    { href: "/#services", label: "Services", isLink: true },
    { href: "/#testimonials", label: "Work", isLink: true },
    { href: "/#process", label: "Process", isLink: true },
    // { href: "/blog", label: "Blog", isLink: true },
    { href: "/careers", label: "Careers", isLink: true },
  ];

  const handleNavigationClick = (href: string) => {
    // Special handling for home page
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    }
    
    const id = href.replace('/#', '').replace('#', '');
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      return true;
    } else if (href.startsWith('/#') || href.startsWith('#')) {
      // If not found, navigate to home with hash
      window.location.href = '/' + href.replace('/', '');
      return false;
    }
    return false;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-british-green/95 backdrop-blur-2xl border-b border-neutral-200/60 shadow-lg`}>
      <div className="container-professional">
        <div className="flex justify-between items-center h-28 px-4">
                     {/* Logo */}
           <div className="flex items-center">
             <Link 
               href="/" 
               data-testid="link-home" 
               className="flex items-center group cursor-pointer"
               onClick={() => {
                 // Scroll to top of the page when logo is clicked
                 window.scrollTo({ top: 0, behavior: 'smooth' });
               }}
             >
               <img 
                 src="/logo.png" 
                 alt="ZYBERIAN Logo"     
                 className="h-20 w-auto object-contain group-hover:scale-110 transition-all duration-500"
               />
             </Link>
           </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-10">
                             {navItems.map((item, index) => {
                 const Component = item.isLink ? Link : 'a';
                 // Attach handleNavigationClick for in-page anchors and home page
                 const isAnchor = item.href.startsWith('/#') || item.href.startsWith('#') || item.href === "/";
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
                    className={`relative group font-medium transition-all duration-500 py-3 text-base tracking-wide text-white hover:text-white`}
                    data-testid={`link-${item.label.toLowerCase()}`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-white group-hover:w-full transition-all duration-500 ease-out" />
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
                className="group relative overflow-hidden bg-white text-british-green px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-500 professional-button shadow-lg"
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
                  <div className={`w-6 h-0.5 transition-colors duration-300 rounded-full bg-white group-hover:bg-gray-200`} />
                </div>
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className={`w-6 h-0.5 transition-colors duration-300 rounded-full bg-white group-hover:bg-gray-200`} />
                </div>
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'
                }`}>
                  <div className={`w-6 h-0.5 transition-colors duration-300 rounded-full bg-white group-hover:bg-gray-200`} />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 ${
        isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="bg-british-green/98 backdrop-blur-2xl border-t border-neutral-200/60 shadow-lg">
          <div className="px-6 py-8 space-y-3">
            {navItems.map((item, index) => {
              const Component = item.isLink ? Link : 'a';
              const props = item.isLink ? { href: item.href } : { href: item.href };
              
              return (
                <Component
                  key={index}
                  {...props}
                  className="block text-white hover:text-gray-200 font-medium py-4 px-5 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all duration-300 text-base tracking-wide"
                  data-testid={`mobile-link-${item.label.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Component>
              );
            })}
            
            {/* Mobile Contact Us Button - Enhanced visibility */}
            <div className="pt-4 border-t border-neutral-200/60">
              <Link 
                href="/#contact" 
                className="block bg-white text-british-green px-8 py-4 rounded-xl font-semibold text-center hover:shadow-xl active:scale-95 transition-all duration-300 text-base shadow-lg"
                data-testid="mobile-link-contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
