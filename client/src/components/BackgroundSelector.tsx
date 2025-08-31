import { useState } from "react";

export default function BackgroundSelector() {
  const [selectedBackground, setSelectedBackground] = useState("hero-bg");

  const backgrounds = [
    {
      id: "hero-bg",
      name: "Clean Pattern",
      description: "Subtle geometric patterns with clean white background",
      preview: "Current - Clean geometric patterns"
    },
    {
      id: "hero-bg-image",
      name: "Space/Technology",
      description: "Space and technology imagery with white overlay",
      preview: "Space and technology background"
    },
    {
      id: "hero-bg-tech",
      name: "Tech/Data",
      description: "Technology and data visualization background",
      preview: "Tech and data background"
    },
    {
      id: "hero-bg-office",
      name: "Modern Office",
      description: "Contemporary office environment background",
      preview: "Modern office background"
    },
    {
      id: "hero-bg-abstract",
      name: "Abstract Geometric",
      description: "Abstract geometric shapes and patterns",
      preview: "Abstract geometric background"
    }
  ];

  const applyBackground = (bgClass: string) => {
    setSelectedBackground(bgClass);
    
    // Find the hero section and update its class
    const heroSection = document.querySelector('section');
    if (heroSection) {
      // Remove all background classes
      heroSection.classList.remove('hero-bg', 'hero-bg-image', 'hero-bg-tech', 'hero-bg-office', 'hero-bg-abstract');
      // Add the selected background class
      heroSection.classList.add(bgClass);
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 bg-white/90 backdrop-blur-md rounded-lg border border-neutral-200 shadow-lg p-4 max-w-xs">
      <h3 className="font-semibold text-neutral-900 mb-3">Background Options</h3>
      <div className="space-y-2">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => applyBackground(bg.id)}
            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
              selectedBackground === bg.id
                ? 'border-british-green bg-british-green/5'
                : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            <div className="font-medium text-neutral-900 text-sm">{bg.name}</div>
            <div className="text-xs text-neutral-600 mt-1">{bg.description}</div>
            {selectedBackground === bg.id && (
              <div className="text-xs text-british-green mt-1 font-medium">✓ Active</div>
            )}
          </button>
        ))}
      </div>
      <div className="mt-3 text-xs text-neutral-500">
        Click any option to preview the background
      </div>
    </div>
  );
}
