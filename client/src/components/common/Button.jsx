import React from "react";
import clsx from "clsx";

export default function Button({
  as: Comp = "button",
  className,
  variant = "primary",
  disabled,
  ...props
}) {
  return React.createElement(Comp, {
    disabled,
    className: clsx(
      "premium-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all",
      variant === "primary" && "bg-primary text-white hover:brightness-110",
      variant === "neutral" &&
        "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
      disabled && "opacity-60 pointer-events-none",
      className
    ),
    ...props,
  });
}
