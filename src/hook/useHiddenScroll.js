import { useEffect } from "react";

export const useScroll = (initialScroll = []) => {
  useEffect(() => {
    document.body.style.overflow = initialScroll.includes(true)
      ? "hidden"
      : "auto";
  }, [initialScroll]);
};
