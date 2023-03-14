import { ObjectSchema } from 'joi';
import { EntityErrorCreator } from './entity-error';
import { ResponseCreator } from './response';
import { BAD_REQUEST } from './error-codes';
export function validate<T>(data: T, schema: ObjectSchema): T {
    const result = schema.validate(data, { abortEarly: false });
    if (result.error) {
        throw ResponseCreator.errorValidate(
          BAD_REQUEST, EntityErrorCreator.allOf(result.error.details)
        );
    }
    return data;
}