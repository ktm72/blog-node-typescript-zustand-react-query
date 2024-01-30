import { useEffect, useState } from "react";

const useScroll = (): boolean => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  const onScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return scrolled;
};

export default useScroll;
