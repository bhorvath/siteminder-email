export type ApiResponseBody<T> = {
  data: T;
};

export type ApiErrorResponse = {
  error: {
    code: string;
    title: string;
    details: string;
    source?: {
      name: string;
      message: string;
    }[];
  };
};
