import React, { useId } from "react";

import clsx from "clsx";

import classes from "./Checkbox.module.css";

export type CheckboxProps = Omit<
  JSX.IntrinsicElements["input"],
  "type" | "id"
> & {
  error?: boolean;
  label?: string;
  labelPosition?: "left" | "right";
  labelClassName?: string;
  inputClassName?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      error,
      label,
      labelPosition = "left",
      className,
      labelClassName,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const id = useId();

    const Label = () => (
      <label
        htmlFor={id}
        className={clsx(classes.label, labelClassName, {
          [classes.error]: !!error,
        })}
      >
        {label}
      </label>
    );

    return (
      <div className={clsx(classes.root, className)}>
        {label && labelPosition === "left" && <Label />}
        <input
          type="checkbox"
          id={id}
          ref={ref}
          className={clsx(classes.input, inputClassName)}
          {...props}
        />
        {label && labelPosition === "right" && <Label />}
      </div>
    );
  }
);
