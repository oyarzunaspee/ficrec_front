import { useState, useEffect } from "react";

export const useMediaQuery = (query: string = "(min-width: 1024px)") => {
    const [matches, setMatches] = useState<boolean>(false);
  
    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
  
      const listener = () => setMatches(media.matches);
  
      media.addEventListener("change", listener); 
  
      return () => media.removeEventListener("change", listener);
  
    }, [matches, query]);
  
    return matches;
  };