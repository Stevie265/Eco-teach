import type { Metadata } from "next";
import { Review } from "@/components/Review";

export const metadata: Metadata = { title: "Review session" };

export default function ReviewPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl text-forest-900">Review session</h1>
      <p className="mb-8 mt-2 text-ink-soft">Five quick questions, prioritising the ones you found hardest.</p>
      <Review />
    </div>
  );
}
