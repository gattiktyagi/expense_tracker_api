const z = require("zod");

const deleteUserSchema = {
  body: z.object({}).strict(),
  query: z.object({}).strict(),
};

module.exports= { deleteUserSchema };
