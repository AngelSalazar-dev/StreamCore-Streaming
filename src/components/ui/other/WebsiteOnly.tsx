"use client";

import { useIsNativeApp } from "@/hooks/useIsNativeApp";

const WebsiteOnly: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isNative = useIsNativeApp();

  return isNative ? null : children;
};

export default WebsiteOnly;
