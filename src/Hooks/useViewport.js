import { useEffect, useState } from "react";

export function useViewport() {
  const [small, setSmall] = useState(false);

  useEffect(() => {
    const queryList = window.matchMedia("(max-width: 600px)");
    function updateSize(e) {
      setSmall(e.matches);
    }
    queryList.addEventListener("change", (e) => updateSize(e));
    return () => queryList.removeEventListener("change", (e) => updateSize(e));
  }, []);
  return small;
}
