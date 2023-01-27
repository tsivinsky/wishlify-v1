import React from "react";

import clsx from "clsx";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
  PolymorphicPropsWithoutRef,
} from "react-polymorphic-types";

import classes from "./Button.module.css";

export const ButtonDefaultElement = "button";

const variantClasses = {
  primary: classes.variantPrimary,
};
const sizeClasses = {
  small: classes.sizeSmall,
  medium: classes.sizeMedium,
  large: classes.sizeLarge,
};

export type ButtonVariant = keyof typeof variantClasses;
export type ButtonSize = keyof typeof sizeClasses;

export type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export type ButtonProps<
  E extends React.ElementType = typeof ButtonDefaultElement
> = PolymorphicPropsWithRef<ButtonOwnProps, E>;

export type ButtonType = PolymorphicForwardRefExoticComponent<
  ButtonOwnProps,
  typeof ButtonDefaultElement
>;

export const Button: ButtonType = React.forwardRef(
  <E extends React.ElementType = typeof ButtonDefaultElement>(
    {
      as,
      variant = "primary",
      size = "medium",
      className,
      children,
      ...props
    }: PolymorphicPropsWithoutRef<ButtonOwnProps, E>,
    ref: React.ForwardedRef<Element>
  ) => {
    const Element: React.ElementType = as || ButtonDefaultElement;

    return (
      <Element
        ref={ref}
        className={clsx(
          classes.button,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Button.displayName = "Button";
