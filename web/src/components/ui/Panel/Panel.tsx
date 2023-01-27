import React from "react";

import clsx from "clsx";
import type { PolymorphicPropsWithoutRef } from "react-polymorphic-types";

import classes from "./Panel.module.css";

const PanelDefaultElement = "div";

const variantClasses = {
  primary: classes.variantPrimary,
};

const colorClasses = {
  white: classes.colorWhite,
};

const sizeClasses = {
  small: classes.sizeSmall,
  medium: classes.sizeMedium,
  large: classes.sizeLarge,
};

export type PanelVariant = keyof typeof variantClasses;
export type PanelColor = keyof typeof colorClasses;
export type PanelSize = keyof typeof sizeClasses;

export type PanelOwnProps = {
  variant?: PanelVariant;
  color?: PanelColor;
  size?: PanelSize;
};

export type PanelProps<
  E extends React.ElementType = typeof PanelDefaultElement
> = PolymorphicPropsWithoutRef<PanelOwnProps, E>;

export const Panel = <
  E extends React.ElementType = typeof PanelDefaultElement
>({
  as,
  variant = "primary",
  color = "white",
  size = "medium",
  className,
  children,
  ...props
}: PanelProps<E>) => {
  const Element: React.ElementType = as || PanelDefaultElement;

  return (
    <Element
      className={clsx(
        classes.panel,
        variantClasses[variant],
        colorClasses[color],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Element>
  );
};
