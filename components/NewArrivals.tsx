"use client";

import Link from "next/link";
import { fireNewArrivalClick } from "@/lib/tracking";
import T from "@/components/T";
import type { Product } from "@/lib/products";

type NewArrivalsProps = {
  items: Pick<Product, "slug" | "category" | "name" | "model" | "image" | "tagline" | "price">[];
};

export default function NewArrivals({ items }: NewArrivalsProps) {
  if (items.length === 0) return null;

  return (
    <section className="section bg-white">
      <div className="container-xl">
        <div className="flex items-end justify-between">
          <div>
            <div className="eyebrow text-lg-red">
              <T en="Just added" ms="Baru ditambah" />
            </div>
            <h2 className="headline mt-5 text-balance">
              <T en="New on LG Subscribe" ms="Baharu di LG Subscribe" />
            </h2>
          </div>
          <Link href="/products" className="btn-ghost hidden sm:inline-flex">
            <T en="View all →" ms="Lihat semua →" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.category}/${p.slug}`}
              onClick={() => fireNewArrivalClick(p.slug, p.category)}
              className="product-card group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-lg-cloud">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 z-10 rounded-full bg-lg-red px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  <T en="New" ms="Baharu" />
                </span>
              </div>
              <div className="flex flex-1 flex-col bg-white px-5 py-6">
                {p.model && (
                  <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-lg-silver">
                    {p.model}
                  </div>
                )}
                <h3 className="mt-2 text-[15px] font-semibold leading-snug text-lg-ink">
                  {p.name}
                </h3>
                <div className="mt-auto pt-4">
                  {p.price ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-[12px] text-lg-stone">
                        <T en="From" ms="Dari" />
                      </span>
                      <span className="text-base font-semibold text-lg-ink">
                        RM{p.price}
                      </span>
                      <span className="text-[12px] text-lg-stone">
                        <T en="/mo" ms="/bln" />
                      </span>
                    </div>
                  ) : (
                    <span className="text-[13px] font-medium text-lg-red">
                      <T en="Get quote →" ms="Sebut harga →" />
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
