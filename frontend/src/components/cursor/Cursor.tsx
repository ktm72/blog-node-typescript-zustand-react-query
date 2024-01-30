import { useEffect, useRef, MutableRefObject } from "react";
import "./cursor.css";

const Cursor = () => {
  const delay = 4;
  const _x: MutableRefObject<number> = useRef(0);
  const _y: MutableRefObject<number> = useRef(0);
  const dot: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const dotOutline: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const requestRef: MutableRefObject<number | null> = useRef<number | null>(
    null
  );
  const cursorVisible = useRef(true);

  const endX = useRef(window.innerWidth / 2);
  const endY = useRef(window.innerHeight / 2);

  const toggleCursorVisibility = () => {
    if (dot.current && dotOutline.current) {
      if (cursorVisible.current) {
        dot.current.style.opacity = "0.7";
        dotOutline.current.style.opacity = "0.7";
      } else {
        dot.current.style.opacity = "0";
        dotOutline.current.style.opacity = "0";
      }
    }
  };

  const mouseMoveEvent = (e: MouseEvent) => {
    cursorVisible.current = true;
    toggleCursorVisibility();

    endX.current = e.clientX;
    endY.current = e.clientY;

    if (dot.current) {
      dot.current.style.top = endY.current + "px";
      dot.current.style.left = endX.current + "px";
    }
  };

  const animateDotOutline = () => {
    if (dotOutline.current) {
      _x.current += (endX.current - _x.current) / delay;
      _y.current += (endY.current - _y.current) / delay;
      dotOutline.current.style.top = _y.current + "px";
      dotOutline.current.style.left = _x.current + "px";

      requestRef.current = requestAnimationFrame(animateDotOutline);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveEvent);

    animateDotOutline();

    return () => {
      document.removeEventListener("mousemove", mouseMoveEvent);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={dotOutline} className="cursor-dot-outline"></div>
      <div ref={dot} className="cursor-dot"></div>
    </>
  );
};

export default Cursor;
