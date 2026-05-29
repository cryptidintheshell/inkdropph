export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">About <span className="text-brand-orange">InkDropPH</span></h1>
        <div className="mt-10 space-y-8 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <p className="border-l-4 border-brand-blue pl-6 italic bg-brand-blue-light/50 py-6 rounded-r-3xl shadow-sm shadow-brand-blue/5">
            InkDropPH is a fictional premier printing and personalized merchandise service provider based in the Philippines. This project serves as a digital storefront and automation hub designed to streamline the custom printing business—from order placement to delivery and customer relationship management.
          </p>
          
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
            <span className="h-2 w-8 bg-brand-yellow rounded-full shadow-sm shadow-brand-yellow/50" />
            Our Mission
          </h2>
          <p>
            Our mission is to provide a seamless digital experience for custom print ordering, empowering businesses and individuals to bring their creative visions to life with professional-grade quality.
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
            <span className="h-2 w-8 bg-brand-orange rounded-full shadow-sm shadow-brand-orange/50" />
            Modern Craftsmanship
          </h2>
          <p>
            By combining traditional printing expertise with modern digital automation, we ensure that every order is handled with precision. Our technical architecture leverages Next.js, Airtable, Notion, and n8n to provide a reliable and efficient service.
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
            <span className="h-2 w-8 bg-brand-blue rounded-full shadow-sm shadow-brand-blue/50" />
            Why Choose Us?
          </h2>
          <ul className="space-y-6">
            <li className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm ring-1 ring-brand-blue/5">
              <strong className="text-brand-orange shrink-0 bg-brand-orange-light px-2 py-0.5 rounded text-sm self-start mt-1">Quality First:</strong>
              <span>We use high-quality materials and state-of-the-art printing technology.</span>
            </li>
            <li className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm ring-1 ring-brand-blue/5">
              <strong className="text-brand-orange shrink-0 bg-brand-orange-light px-2 py-0.5 rounded text-sm self-start mt-1">Seamless Automation:</strong>
              <span>Our workflows are designed to reduce errors and ensure fast delivery.</span>
            </li>
            <li className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm ring-1 ring-brand-blue/5">
              <strong className="text-brand-orange shrink-0 bg-brand-orange-light px-2 py-0.5 rounded text-sm self-start mt-1">Customer Centric:</strong>
              <span>We track every interaction to provide personalized support throughout the production process.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
