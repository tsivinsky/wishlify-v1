import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";

import type { ApiFormError } from "@/types/errors";

export const setHookFormErrors = <T extends FieldValues>(
  errors: ApiFormError[],
  setError: UseFormSetError<T>
) => {
  for (const error of errors) {
    setError(error.field as FieldPath<T>, {
      type: "server",
      message: error.message,
    });
  }
};
