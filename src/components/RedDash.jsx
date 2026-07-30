/** `Rectangle 20` (1:265 …) — the 33×5 red dash, with light streaking across it. */
export function RedDash() {
  return (
    <span className="relative mt-[13px] block h-[5px] w-[33px] shrink-0 overflow-hidden bg-haas-red">
      <span
        className="ts-bar-shine absolute inset-y-0 left-0 w-1/2 bg-white/70"
        style={{ filter: "blur(2px)" }}
      />
    </span>
  );
}

export default RedDash;
