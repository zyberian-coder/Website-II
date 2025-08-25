import { Button } from "@/components/ui/button";

export default function Hero() {
  const handleBookCall = () => {
    // Scroll to contact section
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCaseStudies = () => {
    // Scroll to testimonials section
    document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Ship faster. <br />
              Scale smarter. <br />
              <span className="text-green-300">Win bigger.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 mb-8 leading-relaxed">
              Zyberian designs, builds, and runs resilient software systems that fuel growth — from idea to enterprise scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleBookCall}
                className="bg-white text-british-green px-8 py-4 text-lg font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                size="lg"
                data-testid="button-book-call"
              >
                Book a Strategy Call
              </Button>
              <Button
                onClick={handleCaseStudies}
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-british-green transition-all duration-200"
                size="lg"
                data-testid="button-case-studies"
              >
                See Case Studies
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Professional IT team collaborating"
              className="rounded-xl shadow-2xl"
              data-testid="img-hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
