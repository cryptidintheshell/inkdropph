"use client";

import { useState } from "react";

interface ServiceItem {
  id: string;
  type: string;
  details: string;
  note: string;
  attachments: File[];
}

export default function OrderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ itemId: string; imageIndex: number } | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([
    { id: "item-1", type: "Paper Printing", details: "", note: "", attachments: [] }
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
      { id: Math.random().toString(36).substr(2, 9), type: "Paper Printing", details: "", note: "", attachments: [] }
    ]);
  };

  const removeService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const updateService = (id: string, field: keyof ServiceItem, value: string | File[]) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleItemFileChange = (id: string, files: FileList | null) => {
    if (files) {
      updateService(id, "attachments", Array.from(files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validation: Ensure at least one attachment is provided across all items
    const hasAttachments = services.some(s => s.attachments.length > 0);
    if (!hasAttachments) {
      setError("Please add at least one attachment (design, logo, or reference file) to your order before submitting.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    setSubmittedEmail(email);
    
    // Prepare the payload using FormData to support file uploads
    const payload = new FormData();
    payload.append("firstName", formData.get("first-name") as string);
    payload.append("lastName", formData.get("last-name") as string);
    payload.append("email", formData.get("email") as string);
    payload.append("phone", `+63${formData.get("phone")}`);
    payload.append("paymentMethod", formData.get("payment-method") as string);
    payload.append("budget", formData.get("budget") as string);
    payload.append("deadline", formData.get("deadline") as string);
    payload.append("orderNotes", formData.get("order-notes") as string);
    
    // Metadata for items (excluding File objects which are handled separately)
    payload.append("items", JSON.stringify(services.map(s => ({
      id: s.id,
      type: s.type,
      specifications: s.details,
      note: s.note
    }))));
    payload.append("submittedAt", new Date().toISOString());

    // Add attachments grouped by item id
    services.forEach((service) => {
      service.attachments.forEach((file) => {
        // Appending with item-specific keys or using a naming convention n8n can parse
        payload.append(`attachments_${service.id}`, file);
      });
    });

    try {
      const response = await fetch("https://n8n-service-89y0.onrender.com/webhook-test/95a258dc-c5ef-45aa-ab01-6843d00dcda0", {
        method: "POST",
        body: payload,
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
          Your multi-service order request has been received. Our team will review it and get back to you shortly.
        </p>
        <p className="mt-4 text-lg text-zinc-900 dark:text-zinc-50">
          <strong>Updates regarding your request will be sent to: <span className="text-brand-orange">{submittedEmail}</span></strong>
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setSubmittedEmail("");
            setServices([{ id: Math.random().toString(36).substr(2, 9), type: "Paper Printing", details: "", note: "", attachments: [] }]);
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
                    <div>
                      <label className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                        Item Attachments (Designs, Logos, etc.)
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="file"
                          multiple
                          onChange={(e) => handleItemFileChange(service.id, e.target.files)}
                          className="block w-full text-sm text-zinc-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-brand-blue-light file:text-brand-blue
                            hover:file:bg-brand-blue-light/80
                            dark:file:bg-zinc-800 dark:file:text-brand-blue-light
                            transition-all"
                        />
                        {service.attachments.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs text-brand-blue font-medium mb-2">
                              {service.attachments.length} file(s) selected for this item:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {service.attachments.map((file, idx) => {
                                const isImage = file.type.startsWith("image/");
                                return (
                                  <div key={idx} className="relative group">
                                    {isImage ? (
                                      <button
                                        type="button"
                                        onClick={() => setLightbox({ itemId: service.id, imageIndex: idx })}
                                        className="h-16 w-16 rounded-lg overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800 hover:ring-brand-orange transition-all cursor-zoom-in"
                                      >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                          src={URL.createObjectURL(file)}
                                          alt={file.name}
                                          className="h-full w-full object-cover"
                                          onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                                        />
                                      </button>
                                    ) : (
                                      <div className="h-16 w-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                                        <svg className="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                      </div>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-brand-orange rounded-full border-2 border-white dark:border-zinc-900" />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
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
                <label htmlFor="budget" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
                  Project Budget (for all items)
                </label>
                <div className="relative mt-2.5">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-zinc-500 sm:text-sm">₱</span>
                  </div>
                  <input
                    type="number"
                    name="budget"
                    id="budget"
                    required
                    min="0"
                    placeholder="0.00"
                    className="block w-full rounded-md border-0 py-2 pl-8 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-brand-orange sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800"
                  />
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

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm">
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white hover:text-brand-orange transition-colors"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-10 pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const service = services.find(s => s.id === lightbox.itemId);
                if (service) {
                  let prevIdx = lightbox.imageIndex - 1;
                  while (prevIdx >= 0 && !service.attachments[prevIdx].type.startsWith("image/")) {
                    prevIdx--;
                  }
                  if (prevIdx >= 0) setLightbox({ ...lightbox, imageIndex: prevIdx });
                }
              }}
              disabled={(() => {
                const service = services.find(s => s.id === lightbox.itemId);
                if (!service) return true;
                let prevIdx = lightbox.imageIndex - 1;
                while (prevIdx >= 0 && !service.attachments[prevIdx].type.startsWith("image/")) {
                  prevIdx--;
                }
                return prevIdx < 0;
              })()}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-brand-orange hover:text-white transition-all pointer-events-auto disabled:opacity-0 disabled:pointer-events-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const service = services.find(s => s.id === lightbox.itemId);
                if (service) {
                  let nextIdx = lightbox.imageIndex + 1;
                  while (nextIdx < service.attachments.length && !service.attachments[nextIdx].type.startsWith("image/")) {
                    nextIdx++;
                  }
                  if (nextIdx < service.attachments.length) setLightbox({ ...lightbox, imageIndex: nextIdx });
                }
              }}
              disabled={(() => {
                const service = services.find(s => s.id === lightbox.itemId);
                if (!service) return true;
                let nextIdx = lightbox.imageIndex + 1;
                while (nextIdx < service.attachments.length && !service.attachments[nextIdx].type.startsWith("image/")) {
                  nextIdx++;
                }
                return nextIdx >= service.attachments.length;
              })()}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-brand-orange hover:text-white transition-all pointer-events-auto disabled:opacity-0 disabled:pointer-events-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="relative max-w-5xl max-h-[80vh] w-full flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URL.createObjectURL(services.find(s => s.id === lightbox.itemId)!.attachments[lightbox.imageIndex])}
              alt="Preview"
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
              onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
            />
            <p className="mt-6 text-white font-medium text-lg">
              {services.find(s => s.id === lightbox.itemId)!.attachments[lightbox.imageIndex].name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
