import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, inView]. Attach `ts-live` to the element when inView so the
 * pulse animations only burn frames while the section is on screen.
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      threshold,
      rootMargin: "0px 0px -8% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, live];
}

export default useInView;
