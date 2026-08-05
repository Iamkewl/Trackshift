import { CaretButton } from "./Caret";

/**
 * Mobile carousel controls. On a phone the card fills the column, so nothing
 * signals that there is anything to swipe to — these arrows plus the dot
 * count are the affordance. Desktop keeps the design's own carets out at the
 * section edges, so this is `lg:hidden`.
 */
export function CarouselNav({ index, count, prev, next, setIndex, className = "" }) {
  if (count < 2) return null;
  return (
    <div className={`flex items-center justify-center gap-5 lg:hidden ${className}`}>
      <CaretButton dir="left" onClick={prev} label="Previous" />
      <div className="flex items-center gap-[7px]">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index || undefined}
            className={`h-[7px] rounded-full transition-all ${
              i === index ? "w-[20px] bg-haas-red" : "w-[7px] bg-white/35"
            }`}
          />
        ))}
      </div>
      <CaretButton dir="right" onClick={next} label="Next" />
    </div>
  );
}

export default CarouselNav;
