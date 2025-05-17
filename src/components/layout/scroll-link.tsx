// components/layout/scroll-link.tsx
"use client";

import Link, { type LinkProps } from "next/link";
import type React from "react";

type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
>;
type ScrollLinkProps = AnchorProps & LinkProps & { children?: React.ReactNode };

export const ScrollLink = ({ children, ...props }: ScrollLinkProps) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    
    // Calculate offset for fixed header
    const headerOffset = 80; // Adjust this value based on your header's height
    if (elem) {
      const elementPosition = elem.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Link {...props} onClick={props.href && props.href.toString().startsWith("#") ? handleScroll : undefined}>
      {children}
    </Link>
  );
};
