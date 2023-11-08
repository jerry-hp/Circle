import * as joi from "joi";

export const userSchema = joi.object({
  id: joi.number(),
  full_name: joi.string(),
  username: joi.string(),
  email: joi.string(),
  password: joi.string(),
  profile_picture: joi.string(),
  profile_description: joi.string(),
});

export const threadSchema = joi.object({
  user: joi.required(),
  content: joi.string(),
  image: joi.string(),
});
