import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Scroll progress bar
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
      }
    };

    // Enhanced scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Add stagger animation for child elements
          const staggerElements = entry.target.querySelectorAll('.stagger-animation > *');
          if (staggerElements.length > 0) {
            entry.target.classList.add('stagger-animation');
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, 100);
          }
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll, .section-transition').forEach(el => {
      observer.observe(el);
    });

    // Smooth scrolling for anchor links and navigation links
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        const href = (e.target as HTMLAnchorElement).getAttribute('href');
        if (href && href.includes('#')) {
          // Extract the hash part
          const hashIndex = href.indexOf('#');
          const hash = href.substring(hashIndex);
          
          // Only handle if we're on the same page (no / before #)
          if (hashIndex === 0 || href.startsWith('/#')) {
            e.preventDefault();
            const target = document.querySelector(hash);
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        }
      });
    });

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <>
      {/* Premium Scroll Progress Bar */}
      <div id="scroll-progress" className="scroll-progress"></div>
      
      <Navigation />
      <Hero />
      <Stats />
      <Services />
      <Testimonials />
      <Process />
      <Contact />
      <Footer />
    </>
  );
}
