let lenisInstance = null;

export function setLenisInstance(instance) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

export function scrollToTopImmediate() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, {
      immediate: true,
      force: true,
    });
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
