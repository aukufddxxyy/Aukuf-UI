import { isString } from "lodash-es";

class AuUIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuUIError";
  }
}

export function throwError(scope: string, message: string): never {
  throw new AuUIError(`[${scope}]: ${message}`);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, message: string): void;
export function debugWarn(
  errorOrScope: Error | string,
  message?: string,
): void {
  if (process.env.NODE_ENV !== "production") {
    const error = isString(errorOrScope)
      ? new AuUIError(`[${errorOrScope}]: ${message}`)
      : errorOrScope;
    console.warn(error);
  }
  //   if (isString(errorOrScope)) {
  //     console.warn(`[${errorOrScope}]: ${message}`);
  //   } else {
  //     console.warn(errorOrScope);
  //   }
}
