const { z } = require("zod");

const signupSchema = {
  body: z
    .object({
      user: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username cannot exceed 30 characters")
        .regex(
          /^[a-zA-Z0-9_]+$/,
          "Username can only contain letters, numbers, and underscores",
        ),
      email: z.string().email("Invalid email address format"),
      password: z.string().min(8, "Password must be at least 8 characters"),
    })
    .strict(),
  params: z.object({}).strict(),
  query: z.object({}).strict(),
};

const loginSchema = {
  body: z
    .object({
      email: z.string().email("Invalid email address format"),
      password: z.string().min(1, "Password is required"),
    })
    .strict(),
  params: z.object({}).strict(),
  query: z.object({}).strict(),
};

module.exports = { signupSchema, loginSchema };
