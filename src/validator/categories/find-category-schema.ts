import * as joi from "joi";
import { messagesPtBr } from "../errors/messages-pt-br";

export const findcategorySchema = joi.object().keys({
  idCategory: joi.number().required().messages(messagesPtBr),
});
