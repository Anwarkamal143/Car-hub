import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
type IValidations = {
  type?: "alpha" | "number" | "phone";
  noMultipeSpace?: boolean;
  noSpace?: boolean;
};
const inputVariants = cva(
  ["input_wrapper", "relative", "z-0", "w-full", "flex", "items-stretch"],
  {
    variants: {
      variant: {
        primary: [],
      },
      size: {
        default: [],
      },
      classes: {
        inputClasses: [],
      },
    },
  }
);
const IconStyles = {
  rightIcon: "pr-3 border-l-0",
  leftIcon: "pl-3 border-r-0",
};
type IInputProps = Omit<ComponentPropsWithoutRef<"input">, "size" | "min"> &
  VariantProps<typeof inputVariants> & {
    loading?: boolean;
    inputClassNames?: string;
    label?: ReactNode;
    leftIcon?: ReactNode;
    leftIconClassNames?: string;
    rightIcon?: ReactNode;
    rightIconClassNames?: string;
    validations?: IValidations[];
    limit?: number;
    min?: number;
  };
const TwInput = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      name,
      value,
      onChange: pOnChange,
      type = "text",

      inputClassNames = "",

      disabled,
      placeholder = "",
      variant,
      size,
      className,
      leftIcon,
      rightIcon,
      leftIconClassNames,
      rightIconClassNames,
      validations = [],
      limit,
      min,
    },
    ref
  ) => {
    const inputLeftIconClasses = leftIcon
      ? "border-l-0 rounded-bl-none rounded-tl-none"
      : "";

    const inputRightIconClasses = rightIcon
      ? "border-r-0 rounded-br-none rounded-tr-none"
      : "";
    const labelClasses = leftIcon ? "ml-16" : "ml-3";
    const excuteValidation = (value: any) => {
      let afterValidation = value;
      if (!value) return value;
      validations.map((item) => {
        if (item.type === "alpha") {
          const reg = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
          if (reg.test(afterValidation)) {
            throw new Error("Only Alphabets");
          }
          if (/\d/.test(afterValidation)) {
            throw new Error("Only Alphabets");
          }
          if (/^\s+/.test(afterValidation)) {
            throw new Error("Only Alphabets");
          }
        }
        if (item.type === "number") {
          const reg = /^\d+(\.\d{0,2})?$/;
          if (!reg.test(afterValidation)) {
            throw new Error("Only number allowed");
          }
        }
        if (item.type === "phone") {
          // const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
          const reg = /^[+]?\d{0,}$/im;
          if (!reg.test(afterValidation)) {
            throw new Error('Only numbers or "+" and digits');
          }
        }
        if (item.noMultipeSpace) {
          afterValidation = afterValidation.replace(/ {1,}/g, " ");
        }
        if (item.noSpace) {
          afterValidation = afterValidation.replace(/ {0,}/g, "");
        }
        return null;
      });
      return afterValidation;
    };
    const onChange = (e: any) => {
      try {
        if (validations?.length > 0) {
          e.target.value = excuteValidation(e.target.value);
        }
        if (!limit || e.target.value.length <= limit) {
          if (type === "number" && min != null) {
            const v = Number(e.target.value);
            if (!isNaN(v) && v >= min) {
              pOnChange?.(e);
            }
          } else {
            pOnChange?.(e);
          }
        }
      } catch (e) {
        // console.error(e);
      }
    };
    return (
      //   <div className="flex flex-row-reverse items-stretch w-full">
      <div
        className={twMerge(clsx(inputVariants({ variant, size, className })))}
      >
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          aria-label={placeholder}
          className={`peer block w-full p-3 text-gray-600 bg-gray-100 border   focus:border-gray-100 focus:bg-white focus:outline-none focus:ring-0 appearance-none  rounded transition-colors duration-300 ${
            disabled ? "bg-gray-200" : ""
          } ${inputClassNames} ${inputLeftIconClasses} ${inputRightIconClasses}`}
          disabled={disabled}
          ref={ref}
        />
        {leftIcon ? (
          <div
            className={`flex order-[-1] items-center rounded-tr-none rounded-br-none rounded  py-3 text-gray-600 bg-gray-100 border peer-focus:border-gray-100 peer-focus:bg-white transition-colors duration-300 ${
              disabled ? "bg-gray-200" : ""
            } ${IconStyles.leftIcon} ${leftIconClassNames}`}
          >
            {leftIcon}
          </div>
        ) : null}
        {label ? (
          <label
            htmlFor={name}
            className={`z-0 peer-focus:font-medium absolute text-base pointer-events-none px-1 text-gray-500 duration-300 transform peer-focus:bg-white -translate-y-6 scale-75 top-3  origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  ${labelClasses}`}
          >
            {label}
          </label>
        ) : null}

        {rightIcon ? (
          <div
            className={`flex items-center rounded-tl-none rounded-bl-none rounded  py-3 text-gray-600 bg-gray-100 border peer-focus:border-gray-100 peer-focus:bg-white transition-colors duration-300 ${
              disabled ? "bg-gray-200" : ""
            } ${IconStyles.rightIcon} ${rightIconClassNames}`}
          >
            {rightIcon}
          </div>
        ) : null}
      </div>
    );
  }
);

TwInput.displayName = "TWInput";
export type { IInputProps };
export default TwInput;
