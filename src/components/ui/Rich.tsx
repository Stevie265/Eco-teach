import { Fragment } from "react";

/** Minimal inline formatting for content strings: **bold** and *italic*. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

export function Paragraphs({ body, className = "" }: { body: string[]; className?: string }) {
  return (
    <div className={`prose-eco text-[17px] text-ink ${className}`}>
      {body.map((p, i) => (
        <p key={i}>
          <Rich text={p} />
        </p>
      ))}
    </div>
  );
}
