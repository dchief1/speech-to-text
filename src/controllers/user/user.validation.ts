import Joi from "joi";

const createUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
});

export { createUserSchema };
