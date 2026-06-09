const companies = ['Retool', 'Loom', 'Coda', 'Browserbase', 'Cal.com', 'Raycast']

export default function LogoBar() {
  return (
    <section className="relative border-y border-white/10 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-white/30 text-xs uppercase tracking-widest text-center mb-8">
          Trusted by product teams at
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
          {companies.map((name) => (
            <div
              key={name}
              className="bg-[#0A0A0A] flex items-center justify-center py-5 px-4"
            >
              <span className="text-white/35 text-sm font-medium tracking-tight select-none hover:text-white/55 transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
