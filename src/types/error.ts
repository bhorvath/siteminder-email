export class ApiError extends Error {
  constructor(
    public code: string,
    public title: string,
    public details: string,
    public httpStatus: number
  ) {
    super(`${code} - ${title} - ${details}`);
  }
}

export class InternalError extends ApiError {
  constructor() {
    super("0000", "InternalError", "Internal error", 500);
  }
}

export class ValidationError extends ApiError {
  constructor(details?: string) {
    super(
      "0001",
      "ValidationError",
      details ?? "Your request contains invalid parameters",
      422
    );
  }
}
