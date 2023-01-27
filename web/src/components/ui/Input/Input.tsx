import React, { useId } from "react";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import classes from "./Input.module.css";

export type InputProps = Omit<JSX.IntrinsicElements["input"], "id"> & {
  error?: boolean;
  message?: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      message,
      label,
      className,
      labelClassName,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const id = useId();

    return (
      <div className={clsx(classes.root, className)}>
        {label && (
          <label className={clsx(labelClassName)} htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={clsx(classes.input, inputClassName)}
          {...props}
        />
        <AnimatePresence mode="wait">
          {message && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={clsx(classes.message, {
                [classes.error]: !!error,
              })}
            >
              {message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";
