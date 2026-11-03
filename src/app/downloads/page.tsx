import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { siteConfig } from "@/config/site";
import DownloadPageContent from "./DownloadPageContent";

export const metadata: Metadata = {
  title: `Download | ${siteConfig.name}`,
};

const DownloadsPage = () => <DownloadPageContent />;

export default DownloadsPage;
