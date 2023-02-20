import type { AxiosError } from "axios";
import type { FieldValues, UseFormSetError } from "react-hook-form";

import { ApiFormErrorResponse } from "@/types/errors";

import { setHookFormErrors } from "./setHookFormErrors";

export const handleApiError = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
) => {
  const resp = (error as AxiosError<Partial<ApiFormErrorResponse>>).response
    ?.data;
  if (!resp) return;

  if ("errors" in resp && resp.errors) {
    setHookFormErrors(resp.errors, setError);
  }
};
