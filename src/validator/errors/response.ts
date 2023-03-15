import { getReasonPhrase } from "http-status-codes";
import { Entity } from "./entity";
import { EntityError } from "./entity-error";

export class Response<T> {
  constructor(
    public status?: number,
    public entity?: Entity<T>,
  ) { }
}

export class ResponseCreator {
  public static errorValidate<T>(
    status: number,
    errors: EntityError[]
  ): Response<T> {
    return new Response(status, {
      errors: errors && errors.length ? errors : undefined,
      result: {
        code: `${status}`,
        info: getReasonPhrase(status),
      },
    });
  }

  public static success<T>(
    status: number,
    message: string,
    data: T
  ): Response<T> {
    return new Response(status, {
      data: data ? data : undefined,
      result: {
        code: `${status}`,
        info: getReasonPhrase(status),
        message: message ? message : undefined,
      },
    });
  }

  public static error<T>(
    status: number,
    message: string,
    errors: EntityError[]
  ): Response<T> {
    return new Response(status, {
      errors: errors && errors.length ? errors : undefined,
      result: {
        code: `${status}`,
        info: getReasonPhrase(status),
        message: message ? message : undefined,
      },
    });
  }
}
