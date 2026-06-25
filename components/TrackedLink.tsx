"use client";

import Link from "next/link";
import { useCallback } from "react";
import {
  fireCategoryClick,
  fireProductCardClick,
} from "@/lib/tracking";

type CategoryProps = {
  type: "category";
  categoryName: string;
  categorySlug: string;
  sourcePage: string;
  ctaLocation: string;
};

type ProductProps = {
  type: "product";
  productName: string;
  modelNumber: string | null;
  categorySlug: string;
  ctaLocation: string;
  subscriptionPrice?: number | null;
};

type TrackedLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
} & (CategoryProps | ProductProps);

export default function TrackedLink(props: TrackedLinkProps) {
  const { href, className, children } = props;

  const handleClick = useCallback(() => {
    if (typeof window === "undefined") return;
    const pagePath = `${window.location.pathname}${window.location.search}`;
    if (props.type === "category") {
      fireCategoryClick({
        categoryName: props.categoryName,
        categorySlug: props.categorySlug,
        sourcePage: props.sourcePage,
        ctaLocation: props.ctaLocation,
      });
    } else {
      fireProductCardClick({
        productName: props.productName,
        modelNumber: props.modelNumber ?? "",
        categorySlug: props.categorySlug,
        pagePath,
        ctaLocation: props.ctaLocation,
        subscriptionPrice: props.subscriptionPrice,
      });
    }
  }, [props]);

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
