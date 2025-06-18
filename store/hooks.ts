import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./types";
import { useState, useEffect } from "react";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()


export const useMediaQuery = (query: string = "(min-width: 1024px)") => {
  const [matches, setMatches] = useState(false);

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
