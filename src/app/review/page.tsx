import type { Metadata } from "next";
import { Review } from "@/components/Review";

export const metadata: Metadata = { title: "Review session" };

export default function ReviewPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="font-display t-h1 text-forest-900">Review session</h1>
      <p className="mb-8 mt-2 text-ink-soft">Five quick questions, prioritising the ones you found hardest.</p>
      <Review />
    </div>
  );
}
