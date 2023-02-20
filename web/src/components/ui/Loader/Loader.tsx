import React from "react";

import { CircleNotch } from "phosphor-react";

export type LoaderProps = {
  loading: boolean;
  color?: string;
};

export const Loader: React.FC<LoaderProps> = ({ loading, color }) => {
  if (!loading) return null;

  return <CircleNotch className="animate-spin" color={color} />;
};
