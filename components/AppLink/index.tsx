"use client";
import { VariantProps, cva } from "class-variance-authority";
import clsx, { ClassValue } from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
const varitants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "relative",
    "cursor-pointer",
    "disabled:cursor-not-allowed",
    "tracking-wide",
    "transition",
    // "rounded-full",
    "outline-none",
    // "focus:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-primary-blue", "text-white"],
        secondary: ["bg-transparent"],
      },
      size: {
        small: ["text-sm", "py-1", "px-4"],
        default: ["text-base", "py-2", "px-8"],
        large: ["text-lg", "py-3", "px-12"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
type ILinkProps = LinkProps & {
  children: ReactNode;
  exact?: boolean;
  activeClassNames?: ClassValue;
  className?: string;
} & VariantProps<typeof varitants>;

const AppLink = forwardRef<any, ILinkProps>((props, ref) => {
  const {
    children,
    exact = true,
    href = "",
    activeClassNames = "",
    className = "",
    variant,
    size,
    ...rest
  } = props;
  const pathName = usePathname();
  const hreff = typeof href === "string";

  const isActive = exact
    ? pathName === href
    : hreff
    ? pathName.startsWith(href)
    : pathName.startsWith(href.pathname || "");
  const newClasses = isActive
    ? `${className} active_link ${activeClassNames} `
    : className;
  return (
    <Link
      href={href}
      {...rest}
      ref={ref}
      className={twMerge(
        clsx(varitants({ variant, size, className: newClasses }))
      )}
    >
      {children}
    </Link>
  );
});
AppLink.displayName = "AppLink";
export default AppLink;
export type { ILinkProps };
