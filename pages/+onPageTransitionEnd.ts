import type { OnPageTransitionEndAsync } from "vike/types";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
  console.log("Page transition end");
  document.getElementById("transition")?.classList.add("hidden");
};
