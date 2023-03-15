import { ValidationErrorItem } from "joi";
import { ERR_REQUIRED } from "./http-codes";

export class EntityError {
  constructor(
    public code?: string,
    public message?: string,
    public field?: string,
  ) { }
}

export class EntityErrorCreator {
  public static create(detail: ValidationErrorItem): EntityError {
    return new EntityError(ERR_REQUIRED, detail.message, this.getField(detail));
  }

  public static allOf(details: ValidationErrorItem[]): EntityError[] {
    return details.map((detail) => EntityErrorCreator.create(detail));
  }

  public static allOfQuery(details: string[], error: string, errorMsg: string): EntityError[] {
    return details.map((detail) => new EntityError(error, errorMsg.replace("%field%", detail), detail));
  }

  public static getField(detail: ValidationErrorItem): string {
    if (detail.path.length === 0) {
      return '';
    }
    return detail.path.join(".");
  }
}
