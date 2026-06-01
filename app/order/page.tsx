"use client";

import { useState } from "react";

interface ServiceItem {
  id: string;
  type: string;
  details: string;
  note: string;
}

export default function OrderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([
    { id: "item-1", type: "Paper Printing", details: "", note: "" }
  ]);

  const serviceOptions = [
    "Paper Printing",
    "Apparel",
    "Promotional Items",
    "Tech Accessories",
    "Souvenirs"
  ];

  const addService = () => {
    setServices([
      ...services,
      { id: Math.random().toString(36).substr(2, 9), type: "Paper Printing", details: "", note: "" }
    ]);
  };

  const removeService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const updateService = (id: string, field: keyof ServiceItem, value: string) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email"),
      phone: `+63${formData.get("phone")}`,
      paymentMethod: formData.get("payment-method"),
      deadline: formData.get("deadline"),
      orderNotes: formData.get("order-notes"),
      items: services.map(s => ({
        type: s.type,
        specifications: s.details,
        note: s.note
      })),
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://n8n-service-89y0.onrender.com/webhook-test/95a258dc-c5ef-45aa-ab01-6843d00dcda0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">Thank You!</h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Your multi-service order request has been received. Our team will review it and get back to you shortly via email.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setServices([{ id: Math.random().toString(36).substr(2, 9), type: "Paper Printing", details: "", note: "" }]);
          }}
          className="mt-10 rounded-full bg-brand-orange px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-orange/90 transition-all"
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">Start Your <span className="text-brand-orange">Order</span></h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 border-l-4 border-brand-blue pl-6">
          Tell us about the items you need. You can add multiple different services to a single quote request.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-2xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Customer Info */}
          <div className="sm:col-span-2 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 border-b border-zinc-200 pb-10 dark:border-zinc-800">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                First name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-brand-orange sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-brand-orange sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-brand-orange sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                Phone Number
              </label>
              <div className="relative mt-2.5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-zinc-500 sm:text-sm">+63</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  required
                  pattern="9[0-9]{9}"
                  title="Please enter a valid 10-digit mobile number starting with 9 (e.g., 9123456789)"
                  placeholder="9XX XXX XXXX"
                  className="block w-full rounded-md border-0 py-2 pl-12 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-brand-orange sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800"
                />
              </div>
              <p className="mt-2 text-xs text-zinc-500 italic">Note: Services are currently only available in the Philippines.</p>
            </div>
          </div>

          {/* Dynamic Services List */}
          <div className="sm:col-span-2 pt-10">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
              <span className="h-6 w-1 bg-brand-yellow rounded-full" />
              Order Items
            </h2>
            <div className="space-y-8">
              {services.map((service, index) => (
                <div key={service.id} className="relative p-6 rounded-2xl bg-white ring-1 ring-brand-blue/10 focus-within:ring-brand-blue focus-within:shadow-lg focus-within:shadow-brand-blue/5 transition-all dark:bg-zinc-900/50 dark:ring-zinc-800 dark:focus-within:ring-brand-blue">
                  <div className="flex justify-between items-center mb-4 border-b border-brand-blue-light pb-4">
                    <h3 className="text-sm font-semibold text-brand-blue uppercase tracking-wider">Item #{index + 1}</h3>
                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeService(service.id)}
                        className="text-xs font-medium text-red-600 hover:text-red-500 transition-colors bg-red-50 px-3 py-1 rounded-full"
                      >
                        Remove Item
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-y-6">
                    <div>
                      <label className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                        Service Type
                      </label>
                      <select
                        value={service.type}
                        onChange={(e) => updateService(service.id, "type", e.target.value)}
                        className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-brand-blue/10 focus:ring-2 focus:ring-inset focus:ring-brand-orange sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800"
                      >
                        {serviceOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                        Specifications (Quantity, Material, Size, etc.)
                      </label>
                      <textarea
                        rows={2}
                        value={service.details}
                        onChange={(e) => updateService(service.id, "details", e.target.value)}
                        required
                        placeholder="e.g. 500 copies, Matte finish, 2x3.5 inches"
                        className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-brand-blue/10 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-brand-orange sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                        Item Note (Specific to this item)
                      </label>
                      <textarea
                        rows={2}
                        value={service.note}
                        onChange={(e) => updateService(service.id, "note", e.target.value)}
                        placeholder="e.g. Please use the blue logo for these cards."
                        className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-brand-blue/10 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-brand-orange sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addService}
              className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-blue/80 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Another Item
            </button>
          </div>

          {/* Additional Info & Payment */}
          <div className="sm:col-span-2 pt-10 border-t border-zinc-200 dark:border-zinc-800 mt-10">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
              <span className="h-6 w-1 bg-brand-orange rounded-full" />
              Additional Information
            </h2>
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="deadline" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                  Expected Deadline
                </label>
                <div className="mt-2.5">
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-brand-orange sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800"
                  />
                  <p className="mt-2 text-xs text-zinc-500">Note: Turnaround time varies by service type.</p>
                </div>
              </div>
              <div>
                <label htmlFor="payment-method" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                  Preferred Method of Payment
                </label>
                <select
                  id="payment-method"
                  name="payment-method"
                  required
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-brand-orange sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800"
                >
                  <option value="">Select a payment method</option>
                  <option value="paypal">PayPal</option>
                  <option value="gcash">GCash</option>
                  <option value="paymaya">PayMaya</option>
                  <option value="bpi">BPI (Bank Transfer)</option>
                  <option value="bdo">BDO (Bank Transfer)</option>
                </select>
              </div>
              <div>
                <label htmlFor="order-notes" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                  Global Order Notes (Optional)
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="order-notes"
                    id="order-notes"
                    rows={4}
                    placeholder="Any general instructions or deadline requirements for the whole order..."
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-brand-orange sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mt-8 p-4 rounded-md bg-red-50 text-sm text-red-700 ring-1 ring-inset ring-red-600/10">
            {error}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <button
            type="submit"
            disabled={isSubmitting}
            className="block w-full rounded-full bg-brand-orange px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-orange/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange transition-all dark:hover:bg-brand-orange/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending Request..." : "Submit Multi-Item Quote Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
