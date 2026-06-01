import Link from "next/link";

export default function Home() {
  const services = [
    { name: "Paper Printing", description: "Business cards, flyers, and stationery.", slug: "paper-printing" },
    { name: "Apparel", description: "Custom shirts, hoodies, and tote bags.", slug: "apparel" },
    { name: "Promotional Items", description: "Branded mugs, notebooks, and pens.", slug: "promotional-items" },
    { name: "Tech Accessories", description: "Personalized phone cases and skins.", slug: "tech-accessories" },
    { name: "Souvenirs", description: "Custom gifts for all occasions.", slug: "souvenirs" },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-32 lg:px-8 bg-brand-orange-light/30 dark:bg-zinc-950 overflow-hidden">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-7xl">
            Your Ideas, <span className="text-brand-orange">Perfectly Printed.</span>
          </h1>
          <p className="mt-8 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Premium custom printing and personalized merchandise delivered across the Philippines. Fast, reliable, and high-quality.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/order"
              className="rounded-full bg-brand-orange px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-brand-orange/90 transition-all shadow-orange-200"
            >
              Start Your Order
            </Link>
            <Link href="/services" className="text-lg font-semibold leading-6 text-zinc-900 dark:text-zinc-50 hover:text-brand-orange transition-colors">
              Browse Services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">What We Print</h2>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400 border-b-2 border-brand-yellow pb-4 inline-block">
            From professional branding to personal gifts, we cover all your printing needs.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-brand-blue/10 transition-all hover:ring-brand-blue hover:shadow-lg hover:shadow-brand-blue/5 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:ring-brand-blue"
            >
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-brand-blue transition-colors">{service.name}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{service.description}</p>
              </div>
              <div className="mt-6 flex items-center text-sm font-semibold text-brand-orange">
                View Details <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-brand-blue via-brand-blue/90 to-brand-orange px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to bring your project to life?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/90">
            Get a custom quote today and experience the InkDropPH difference.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/order"
              className="rounded-full bg-brand-yellow px-8 py-3 text-sm font-semibold text-brand-orange shadow-sm hover:bg-brand-yellow/90 hover:scale-105 transition-all"
            >
              Get a Quote Now
            </Link>
          </div>
          {/* Decorative blur elements */}
          <div className="absolute -top-24 -left-24 h-64 w-64 bg-brand-yellow/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 bg-brand-orange/20 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
}
