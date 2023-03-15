import * as joi from "joi";
import { messagesPtBr } from "../errors/messages-pt-br";

export const findProductSchema = joi.object().keys({
  idProduct: joi.number().required().messages(messagesPtBr),
});

export const calculatePercentSchema = joi.object().keys({
  idProduct: joi.number().required().messages(messagesPtBr),
  nrInstallments: joi.number().required().messages(messagesPtBr),
});

export const createProductSchema = joi.object().keys({
  name: joi.string().required().messages(messagesPtBr),
  description: joi.string().required().messages(messagesPtBr),
  price: joi.number().strict().required().messages(messagesPtBr),
  idCategory: joi.number().strict().required().messages(messagesPtBr),
});

export const updateProductSchema = joi.object().keys({
  name: joi.string().optional().messages(messagesPtBr),
  description: joi.string().optional().messages(messagesPtBr),
  price: joi.number().strict().optional().messages(messagesPtBr),
  idCategory: joi.number().strict().optional().messages(messagesPtBr),
});

export const deleteProductSchema = joi.object().keys({
  idProduct: joi.number().required().messages(messagesPtBr),
});
