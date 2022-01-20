const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!',
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error('string.escapeHTML', { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

const contentSchema = Joi.object().keys({
  frameHeight: Joi.string().escapeHTML(),
  frameLength: Joi.string().escapeHTML(),
  qty: Joi.number(),
  price: Joi.number(),
});

module.exports.orderSchema = Joi.object({
  order: Joi.object({
    orderDate: Joi.date().required(),
    address: Joi.string().required().escapeHTML(),
    color: Joi.string().required().escapeHTML(),
    windowOfFrame: Joi.string().required().escapeHTML(),
    notes: Joi.string().escapeHTML(),
    content: contentSchema,
  }),
});

module.exports.frameSchema = Joi.object({
  frame: Joi.object({
    typeOfFrame: Joi.string().required(),
  }),
});

module.exports.customerSchema = Joi.object({
  customer: Joi.object({
    firstName: Joi.string().required().escapeHTML(),
    lastName: Joi.string().required().escapeHTML(),
    phone: Joi.string().required().escapeHTML(),
    email: Joi.string().required().escapeHTML(),
  }),
});
