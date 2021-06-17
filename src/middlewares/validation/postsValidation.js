const Joi = require('joi');

const shemaCreatePost = Joi.object({
  topic: Joi.string().min(3).max(30).required(),
  text: Joi.string().min(3).max(60).required(),
});

const validate = (shema, body, next) => {
  const { error } = shema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `${message.replace(/"/g, '')}`,
    });
  }
  next();
};

const validateCreatePost = (req, res, next) => {
  return validate(shemaCreatePost, req.body, next);
};

module.exports = { validateCreatePost };
