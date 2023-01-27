export type ApiError = {
  message: string;
};

export type ApiFormError = {
  field: string;
  message: string;
};

export type ApiFormErrorResponse = {
  errors: ApiFormError[];
};
