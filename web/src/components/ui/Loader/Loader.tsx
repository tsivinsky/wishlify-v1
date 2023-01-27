import React from "react";

export type LoaderProps = {
  loading: boolean;
};

export const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return <span>Загрузка...</span>;
};
