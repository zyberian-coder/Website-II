import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-british-green via-british-green-dark to-british-green text-white section-padding-large relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container-professional relative z-10">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="/logo.png" 
                alt="ZYBERIAN Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-white/80 text-body leading-relaxed mb-8 max-w-lg" data-testid="footer-tagline">
              Full-stack IT partner. We build, scale, and run modern software systems that drive business growth and digital transformation.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 group" data-testid="footer-linkedin">
                <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 group" data-testid="footer-twitter">
                <Twitter className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 group" data-testid="footer-github">
                <Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-8 tracking-wide">Company</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-white/80 hover:text-white transition-colors duration-300 text-body group flex items-center" data-testid="footer-link-services">
                <span className="w-1 h-1 bg-white/40 rounded-full mr-3 group-hover:bg-white transition-all duration-300" />
                Services
              </a></li>
              <li><a href="#process" className="text-white/80 hover:text-white transition-colors duration-300 text-body group flex items-center" data-testid="footer-link-process">
                <span className="w-1 h-1 bg-white/40 rounded-full mr-3 group-hover:bg-white transition-all duration-300" />
                Process
              </a></li>
              <li><Link href="/careers" className="text-white/80 hover:text-white transition-colors duration-300 text-body group flex items-center" data-testid="footer-link-careers">
                <span className="w-1 h-1 bg-white/40 rounded-full mr-3 group-hover:bg-white transition-all duration-300" />
                Careers
              </Link></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors duration-300 text-body group flex items-center" data-testid="footer-link-contact">
                <span className="w-1 h-1 bg-white/40 rounded-full mr-3 group-hover:bg-white transition-all duration-300" />
                Contact
              </a></li>
              {/* <li><a href="#" className="text-white/80 hover:text-white transition-colors duration-300 text-body group flex items-center" data-testid="footer-link-blog">
                <span className="w-1 h-1 bg-white/40 rounded-full mr-3 group-hover:bg-white transition-all duration-300" />
                Blog
              </a></li> */}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-8 tracking-wide">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start text-white/80 text-body group" data-testid="footer-email">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 mt-1 group-hover:bg-white/20 transition-all duration-300">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white mb-1">Email</div>
                  <div className="text-white/70">hr@zyberian.com</div>
                </div>
              </li>
              <li className="flex items-start text-white/80 text-body group" data-testid="footer-phone">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 mt-1 group-hover:bg-white/20 transition-all duration-300">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white mb-1">Phone</div>
                  <div className="text-white/70">+44 7471622999</div>
                </div>
              </li>
              <li className="flex items-start text-white/80 text-body group" data-testid="footer-location">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 mt-1 group-hover:bg-white/20 transition-all duration-300">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white mb-1">Address</div>
                  <div className="text-white/70">
                    ZYBERIAN LTD<br />
                    124-128 City Road<br />
                    London, England, EC1V 2NX
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <p className="text-white/70 text-small" data-testid="footer-copyright">© 2025 Zyberian. All rights reserved.</p>
            
            <p className="text-white/70 text-small text-center" data-testid="footer-registration">
              Zyberian Ltd. Registered in England and Wales.
            </p>
            
            <div className="flex space-x-8">
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-300 text-small" data-testid="footer-privacy">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-300 text-small" data-testid="footer-terms">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-300 text-small" data-testid="footer-cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
