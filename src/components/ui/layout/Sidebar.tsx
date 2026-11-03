"use client";

import NavbarMenuItems from "../other/NavbarMenuItems";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  const isNative = useIsNativeApp();
  const navItems = siteConfig.navItems.filter((item) => !isNative || !item.websiteOnly);
  const hrefs = navItems.map((item) => item.href);
  const shouldShowSidebar = hrefs.includes(pathName);

  return (
    <div className="flex h-full">
      {shouldShowSidebar && (
        <div className="hidden md:block">
          <div className="top-0 left-0 w-20" />
          <aside className="fixed top-0 left-0 h-screen w-fit">
            <nav className="bg-background text-foreground flex h-full flex-col justify-center pl-2">
              <NavbarMenuItems menuArray={navItems} size="sm" isVertical withIcon variant="light" />
            </nav>
          </aside>
        </div>
      )}
      {children}
    </div>
  );
};

export default Sidebar;
