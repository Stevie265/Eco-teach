import type { Metadata } from "next";
import { Diagnostic } from "@/components/Diagnostic";

export const metadata: Metadata = { title: "Find your starting point" };

export default function StartPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-12">
      <Diagnostic />
    </div>
  );
}
