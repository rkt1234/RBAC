import Joi from 'joi';

export const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).required()
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  content: Joi.string().min(10)
}).or('title', 'content'); // at least one must be present
