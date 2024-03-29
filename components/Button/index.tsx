"use client";

import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Image from "next/image";
import {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  ReactNode,
  cloneElement,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

const variants = cva(
  [
    "custom-btn",
    "inline-flex",
    "items-center",
    "justify-center",
    "relative",
    "cursor-pointer",
    "disabled:cursor-not-allowed",
    "tracking-wide",
    "transition",
    "rounded-full",
    "outline-none",
    "focus:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "font-semibold",
          "bg-primary-blue",
          "hover:bg-blue-500",
          "text-white",
          "shadow",
          "hover:shadow-md",
          "disabled:bg-blue-500/50",
          "disabled:shadow",
          "ring-offset-2",
          "focus-visible:ring-2",
          "ring-indigo-500/70",
        ],
        secondary: [
          "font-normal",
          "bg-gray-50",
          "hover:bg-gray-100",
          "disabled:bg-gray-50",
          "text-gray-950",
          "shadow",
          "border",
          "border-neutral-200/50",
          "ring-offset-2",
          "focus-visible:ring-2",
          "ring-gray-200",
        ],
        destructive: [
          "font-semibold",
          "bg-red-500",
          "hover:bg-red-600",
          "text-white",
          "rounded-full",
          "shadow",
          "hover:shadow-md",
          "disabled:bg-red-500/50",
          "disabled:shadow",
          "ring-offset-2",
          "focus-visible:ring-2",
          "ring-red-500",
        ],
        ghost: [
          "font-light",
          "text-gray-950",
          "hover:text-gray-600",
          "disabled:text-gray-950",
          "ring-gray-300",
          "focus-visible:ring-1",
        ],
        link: [
          "font-light",
          "text-indigo-500",
          "hover:text-indigo-600",
          "disabled:text-indigo-500/50",
          "disabled:no-underline",
          "hover:underline",
          "ring-indigo-300",
          "focus-visible:ring-1",
        ],
      },
      size: {
        small: ["text-sm", "py-1", "px-4"],
        default: ["text-base", "py-2", "px-8"],
        large: ["text-lg", "py-3", "px-12"],
        full: ["text-base", "w-full", "py-2", "px-8"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const loading = cva(["absolute", "inline-flex", "items-center"], {
  variants: {
    variant: {
      primary: ["border-white"],
      secondary: ["border-gray-950"],
      destructive: ["border-white"],
      ghost: ["border-gray-950"],
      link: ["border-indigo-500"],
    },
  },
});

const Loading = ({ variant }: VariantProps<typeof loading>) => (
  <div className={loading({ variant })}>
    <div className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit]" />
  </div>
);

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof variants> & {
    loading?: boolean;
    rightIcon?: {
      Icon?: ReactNode;
      props?: HTMLAttributes<HTMLElement>;
    };
    lefttIcon?: {
      Icon?: ReactNode;
      props?: HTMLAttributes<HTMLElement>;
    };
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      loading,
      rightIcon,
      lefttIcon,
      ...rest
    },
    ref
  ) => {
    let LeftIcon: any = lefttIcon?.Icon;
    if (LeftIcon) {
      const { className, ...rest } = rightIcon?.props || {};
      LeftIcon =
        typeof LeftIcon === "string" ? (
          <span
            className={clsx(
              "absolute left-0 top-1/2 transform -translate-y-1/2  ml-auto w-1/4 h-2/4",
              className
            )}
            {...(rest || {})}
          >
            <Image
              src={LeftIcon}
              alt="LeftIcon"
              fill
              className="object-contain"
            />
          </span>
        ) : (
          cloneElement(LeftIcon, { ...(lefttIcon?.props || {}) })
        );
    }
    let RightIcon: any = rightIcon?.Icon;
    if (RightIcon) {
      const { className, ...rest } = rightIcon?.props || {};
      RightIcon =
        typeof RightIcon === "string" ? (
          <span
            className={clsx(
              "absolute right-0 top-1/2 transform -translate-y-1/2  left-0 ml-auto w-1/4 h-2/4",
              className
            )}
            {...(rest || {})}
          >
            <Image
              src={RightIcon}
              alt="RightIcon"
              fill
              className="object-contain"
            />
          </span>
        ) : (
          cloneElement(RightIcon, { ...(rightIcon?.props || {}) })
        );
    }
    return (
      <button
        ref={ref}
        className={twMerge(clsx(variants({ variant, size, className })))}
        {...rest}
      >
        {LeftIcon}
        {loading && <Loading variant={variant} />}
        <span
          className={clsx("transition w-full flex-1", {
            "opacity-0": loading,
            "opacity-100": !loading,
          })}
        >
          {children}
        </span>
        {RightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
