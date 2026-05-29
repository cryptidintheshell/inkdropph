import Link from "next/link";

export default function ServicesPage() {
  const categories = [
    {
      title: "Paper Printing",
      description: "Professional printing for all your business and personal needs.",
      items: ["Business Cards", "Flyers & Brochures", "Posters", "Personalized Stationery"],
      slug: "paper-printing"
    },
    {
      title: "Apparel",
      description: "Wear your brand or your favorite design with high-quality fabrics.",
      items: ["Custom T-Shirts", "Hoodies & Sweatshirts", "Tote Bags", "Caps"],
      slug: "apparel"
    },
    {
      title: "Promotional Items",
      description: "Perfect for corporate gifts and brand awareness.",
      items: ["Branded Mugs", "Custom Notebooks", "Pens & Desk Accessories", "Keychains"],
      slug: "promotional-items"
    },
    {
      title: "Tech Accessories",
      description: "Protect and personalize your daily tech.",
      items: ["Custom Phone Cases", "Laptop Skins", "Mousepads", "Tablet Covers"],
      slug: "tech-accessories"
    },
    {
      title: "Souvenirs",
      description: "Memorable gifts for life's special moments.",
      items: ["Wedding Souvenirs", "Birthday Giveaways", "Corporate Awards", "Custom Gift Boxes"],
      slug: "souvenirs"
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">Our <span className="text-brand-orange">Services</span></h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 border-l-4 border-brand-yellow pl-6">
          Discover our wide range of custom printing solutions designed to meet your business and personal needs.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        {categories.map((category) => (
          <article key={category.slug} className="flex flex-col items-start justify-between bg-white p-8 rounded-3xl shadow-sm ring-1 ring-brand-blue/10 hover:ring-brand-blue hover:shadow-xl hover:shadow-brand-blue/5 transition-all dark:bg-zinc-900 dark:ring-zinc-800">
            <div className="w-full">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{category.title}</h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 border-b border-brand-yellow-light pb-4">{category.description}</p>
              <ul className="mt-6 space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500 hover:text-brand-blue transition-colors cursor-default">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <Link
                href={`/services/${category.slug}`}
                className="text-sm font-semibold text-brand-orange hover:text-brand-orange/80 transition-colors bg-brand-orange-light/50 px-4 py-2 rounded-full"
              >
                Learn more about {category.title} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
