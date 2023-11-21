export const isSSR = () => typeof window === "undefined";

export const scrollToTop = () => {
  if (isSSR()) {
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};
