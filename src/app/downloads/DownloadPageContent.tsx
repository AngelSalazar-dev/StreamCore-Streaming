"use client";

import Link from "next/link";
import { FaAndroid } from "react-icons/fa6";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";

const DownloadPageContent = () => {
  const isNative = useIsNativeApp();

  if (isNative) return null;

  return (
    <section className="flex w-full justify-center px-4 py-10">
      <div className="flex w-full max-w-xl flex-col items-center gap-5 text-center">
        <FaAndroid className="text-primary size-16" aria-hidden="true" />
        <h1 className="text-3xl font-semibold">Download Stream Core</h1>
        <p className="text-foreground/70">
          Install the latest Android version of Stream Core on your device.
        </p>
        <Link
          href="/downloads/streamcore-release.apk"
          download
          className="bg-primary text-primary-foreground rounded-md px-5 py-3 font-semibold"
        >
          Download APK
        </Link>
      </div>
    </section>
  );
};

export default DownloadPageContent;
