"use client";

import { useEffect, useState } from "react";

const isNativeUserAgent = () =>
  typeof navigator !== "undefined" && /capacitor|android.*wv|; wv\)/i.test(navigator.userAgent);

export const useIsNativeApp = () => {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const capacitor = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } })
      .Capacitor;

    setIsNative(Boolean(capacitor?.isNativePlatform?.() || isNativeUserAgent()));
  }, []);

  return isNative;
};
