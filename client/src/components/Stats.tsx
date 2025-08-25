export default function Stats() {
  const stats = [
    { value: "99.95%", label: "Uptime across managed estates" },
    { value: "2x", label: "Faster average time-to-market" },
    { value: "$10M+", label: "Business value shipped" },
    { value: "72 NPS", label: "Clients love working with us" },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-${index}`}>
              <div className="text-4xl lg:text-5xl font-bold text-british-green mb-2" data-testid={`stat-value-${index}`}>
                {stat.value}
              </div>
              <p className="text-gray-600 font-medium" data-testid={`stat-label-${index}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
