import Link from "next/link";
import { notFound } from "next/navigation";

const servicesData: Record<string, { title: string; description: string; longDescription: string; features: string[] }> = {
  "paper-printing": {
    title: "Paper Printing",
    description: "High-quality professional printing for business and personal use.",
    longDescription: "Our paper printing services utilize state-of-the-art digital and offset presses to ensure crisp text and vibrant colors. Whether you need a few business cards or thousands of brochures, we deliver quality you can touch.",
    features: ["Standard & Premium Paper Stocks", "Matte, Gloss, and Soft-Touch Finishes", "Custom Die-Cutting", "Fast Turnaround Times"]
  },
  "apparel": {
    title: "Custom Apparel",
    description: "High-quality fabric printing for teams, brands, and personal style.",
    longDescription: "We offer a variety of printing methods including screen printing, DTF (Direct to Film), and embroidery. Our apparel is sourced from premium suppliers to ensure comfort and durability.",
    features: ["100% Cotton & Blend Options", "Vibrant DTF Prints", "Durable Screen Printing", "Available in all sizes"]
  },
  "promotional-items": {
    title: "Promotional Items",
    description: "Branded merchandise to make your business stand out.",
    longDescription: "From corporate giveaways to event merchandise, our promotional items are designed to leave a lasting impression. We help you stay top-of-mind with high-utility branded goods.",
    features: ["Laser Engraving", "Sublimation Printing", "Bulk Pricing Available", "High-Quality Materials"]
  },
  "tech-accessories": {
    title: "Tech Accessories",
    description: "Personalized protection for your most-used devices.",
    longDescription: "Our tech accessories combine protection with personalization. Using high-definition printing technology, we ensure your designs look sharp and stay resistant to daily wear.",
    features: ["Impact-Resistant Cases", "Precision-Cut Vinyl Skins", "Anti-Fade Printing", "Compatible with latest models"]
  },
  "souvenirs": {
    title: "Souvenirs & Gifts",
    description: "Memorable keepsakes for every special occasion.",
    longDescription: "Make your celebrations unforgettable with custom-made souvenirs. We work closely with you to design items that perfectly capture the theme and spirit of your event.",
    features: ["Custom Packaging", "Personalized Messages", "Bulk Order Discounts", "Thematic Designs"]
  }
};

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <nav className="mb-8 flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link href="/services" className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
              Services
            </Link>
          </li>
          <li className="flex items-center">
            <span className="text-zinc-400 mx-2">/</span>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{service.title}</span>
          </li>
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">{service.title}</h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 border-l-4 border-brand-orange pl-6 bg-brand-orange-light/20 py-4 rounded-r-2xl">{service.description}</p>
          <div className="mt-8 space-y-6">
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{service.longDescription}</p>
            <div className="bg-white p-6 rounded-2xl ring-1 ring-brand-blue/10 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-blue">Key Features</h3>
              <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-yellow/20 text-brand-orange">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10">
            <Link
              href="/order"
              className="inline-flex items-center justify-center rounded-full bg-brand-orange px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-orange/90 transition-all shadow-orange-200"
            >
              Get a Quote for {service.title}
            </Link>
          </div>
        </div>
        <div className="mt-16 lg:mt-0">
          <div className="aspect-square rounded-3xl bg-white dark:bg-zinc-900 flex items-center justify-center ring-1 ring-brand-blue/20 shadow-inner">
            <span className="text-brand-blue text-sm font-medium">Service Preview Image</span>
          </div>
        </div>
      </div>
    </div>
  );
}
