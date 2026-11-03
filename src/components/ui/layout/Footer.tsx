"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/utils/helpers";
import { BreadcrumbItem, Breadcrumbs, Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import WebsiteOnly from "../other/WebsiteOnly";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const pathName = usePathname();

  return (
    <footer
      className={cn(
        "bottom-0 flex w-full flex-col items-center justify-center gap-2 p-2 text-center",
        className,
      )}
    >
      <h6>{siteConfig.description}</h6>
      <WebsiteOnly>
        <Link isExternal href={siteConfig.socials.github} color="foreground">
          <FaGithub size={24} />
        </Link>
      </WebsiteOnly>
      <Breadcrumbs
        separator="•"
        itemClasses={{
          separator: "px-2",
        }}
      >
        {siteConfig.navItems.map(({ label, href }) => (
          <BreadcrumbItem key={href} isCurrent={pathName === href} href={href}>
            {label}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <p>© 2026 Stream Core</p>
    </footer>
  );
};

export default Footer;
