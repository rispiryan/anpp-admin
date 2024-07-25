import { type RefObject, useEffect } from "react";

const defaultOptions = {
  ignoreClassNames: [],
};

export default function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (event: Event) => void,
  { ignoreClassNames }: { ignoreClassNames: string[] } = defaultOptions,
): void {
  useEffect(() => {
    let mouseIsDown = false;
    let isScrolling = false;
    let historizedEvent: Event | null = null;

    const onScroll = () => {
      if (mouseIsDown) {
        isScrolling = true;
      }
    };

    const onMouseDown = (event: Event) => {
      mouseIsDown = true;
      historizedEvent = event;
    };

    const onMouseUp = () => {
      if (!isScrolling && historizedEvent) {
        const shouldBeIgnored =
          Array.isArray(ignoreClassNames) &&
          ignoreClassNames.some((cls) => !!(historizedEvent?.target as Element)?.closest(`.${cls}`));

        if (!ref.current || ref.current.contains(historizedEvent.target as Element) || shouldBeIgnored) {
          return;
        }

        handler(historizedEvent);
      }

      historizedEvent = null;
      isScrolling = false;
      mouseIsDown = false;
    };

    document.addEventListener("scroll", onScroll, true);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchstart", onMouseUp);

    return () => {
      document.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("mousedown", onMouseUp);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onMouseUp);
    };
  }, [ref, handler, ignoreClassNames]);
}
