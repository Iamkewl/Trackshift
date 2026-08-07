/**
 * Mobile carousel controls. Figma's mobile carousels (237:537 `student
 * words`) carry no arrow affordance at all — five red dashes (`Rectangle
 * 29–33`, the same 33×5 shape as the Timeline spine caps), swipe is the only
 * interaction. Desktop keeps its own carets out at the section edges, so
 * this is `lg:hidden`.
 */
export function CarouselNav({ index, count, setIndex, className = "" }) {
  if (count < 2) return null;
  return (
    <div className={`flex items-center justify-center gap-[10px] lg:hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setIndex(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === index || undefined}
          className={`h-[5px] w-[33px] transition-colors ${i === index ? "bg-haas-red" : "bg-white/30"}`}
        />
      ))}
    </div>
  );
}

export default CarouselNav;
