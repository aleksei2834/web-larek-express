import { celebrate, Joi, Segments } from 'celebrate';

const productSchema = Joi.object({
  title: Joi
    .string()
    .required()
    .min(2)
    .max(30),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }).required(),
  category: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().allow(null).required(),
});

export const validateProductBody = celebrate({
  [Segments.BODY]: productSchema,
});

const orderSchema = Joi.object({
  payment: Joi.string().valid('online', 'cash').required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().items(Joi.string()).min(1).required(),
});

export const validateOrderBody = celebrate({
  [Segments.BODY]: orderSchema,
});
