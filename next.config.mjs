if (typeof globalThis.localStorage !== 'undefined' && !globalThis.localStorage.getItem) {
  Object.defineProperty(globalThis, "localStorage", {
    value: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {}
    },
    configurable: true
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
