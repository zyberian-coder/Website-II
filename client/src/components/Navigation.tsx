import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" data-testid="link-home">
                <div className="flex items-center gap-3">
                  {/* Logo as image for flexibility */}
                  <img
                    src="data:image/svg+xml,%3Csvg width='108' height='108' viewBox='0 0 108 108' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='12' y='12' width='84' height='84' rx='28' fill='%23125639'/%3E%3Cpath d='M36 72L72 36H44L36 44H64L36 72Z' fill='%23A7F3D0'/%3E%3C/svg%3E"
                    alt="Zyberian logo"
                    className="h-16 w-16"
                    loading="eager"
                  />
                  <h1 className="text-2xl font-bold text-british-green">Zyberian</h1>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#services" className="text-gray-700 hover:text-british-green transition-colors duration-200 font-medium" data-testid="link-services">Services</a>
              <a href="#work" className="text-gray-700 hover:text-british-green transition-colors duration-200 font-medium" data-testid="link-work">Work</a>
              <a href="#process" className="text-gray-700 hover:text-british-green transition-colors duration-200 font-medium" data-testid="link-process">Process</a>
              <Link href="/careers" className="text-gray-700 hover:text-british-green transition-colors duration-200 font-medium" data-testid="link-careers">Careers</Link>
              <a href="#contact" className="bg-british-green text-white px-4 py-2 rounded-lg font-medium hover:bg-british-green-light transition-colors duration-200" data-testid="link-contact">Contact Us</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
