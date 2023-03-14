import * as joi from "joi";
import { messagesPtBr } from "../errors/messages-pt-br";

export const findcategorySchema = joi.object().keys({
  idCategory: joi.number().required().messages(messagesPtBr),
});

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

export const updateCategorySchema = joi.object().keys({
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
    .optional()
    .messages(messagesPtBr),
  percentage: joi.number().strict().optional().messages(messagesPtBr),
});

export const deletecategorySchema = joi.object().keys({
  idCategory: joi.number().required().messages(messagesPtBr),
});
