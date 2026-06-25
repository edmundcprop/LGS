"use client";

import { useEffect } from "react";
import { fireProductDetailView } from "@/lib/tracking";

type Props = {
  productName: string;
  modelNumber: string | null;
  categorySlug: string;
  subscriptionPrice?: number | null;
};

export default function ProductDetailViewTracker(props: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    fireProductDetailView({
      productName: props.productName,
      modelNumber: props.modelNumber ?? "",
      categorySlug: props.categorySlug,
      pagePath: `${window.location.pathname}${window.location.search}`,
      subscriptionPrice: props.subscriptionPrice,
    });
  }, [props.productName, props.modelNumber, props.categorySlug, props.subscriptionPrice]);

  return null;
}
