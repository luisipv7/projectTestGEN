import * as joi from "joi";
import { messagesPtBr } from "../errors/messages-pt-br";

export const createCategorySchema = joi.object().keys({
  name: joi
    .string()
    .valid(
      "informática",
      "Informática",
      "Automotivo",
      "automotivo",
      "móveis",
      "Móveis"
    )
    .required()
    .messages(messagesPtBr),
  percentage: joi.number().strict().optional().messages(messagesPtBr),
});
