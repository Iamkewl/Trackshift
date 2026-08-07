/**
 * Brand rule: every full stop and apostrophe in body copy is Haas red, the
 * rest of the sentence stays whatever colour it already was.
 *
 * `redPunct` takes a plain string (not JSX with nested tags) and returns an
 * array of strings/spans React can render as children. Curly closing (’),
 * curly opening (‘, used in "trackshift '25") and straight (') apostrophes
 * are all matched, since content mixes them.
 */
const PUNCT = /([.’‘'])/g;

export function redPunct(text, keyPrefix = "rp") {
  if (typeof text !== "string" || !text) return text;
  return text.split(PUNCT).map((part, i) =>
    part === "." || part === "’" || part === "‘" || part === "'" ? (
      <span key={`${keyPrefix}-${i}`} className="text-haas-red">
        {part}
      </span>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{part}</span>
    ),
  );
}

/** Convenience wrapper: `<RedPunct text={...} />` inside any element. */
export function RedPunct({ text }) {
  return <>{redPunct(text)}</>;
}

export default RedPunct;
