const {z} = require("zod");

const fetchExpensesSchema = {
  body: z.object({}).strict(),
  query: z.object({}).strict(),
};

const addExpenseSchema = {
  body: z
    .object({
      expenseValue: z
        .number({ required_error: "expenseValue Required" })
        .positive(),
      description: z.string().max(255).optional(),
      transactionType: z.enum(["debit", "credit"]).default("debit"),
    })
    .strict(),
  query: z.object({}).strict(),
};

const idParamsSchema = {
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, "Expense ID must be a valid number")
      .transform(Number),
  }),
  body: z.object({}).strict(),
  query: z.object({}).strict(),
};


const updateExpenseSchema = {
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, "Expense ID must be a valid number")
      .transform(Number),
  }),
  body: z
    .object({
      expenseValue: z
        .number({ required_error: "Expense value required" })
        .positive(),
      description: z.string().max(255).optional(),
      transactionType: z.enum(["debit", "credit"]).default("debit"),
    })
    .strict(),
  query: z.object({}).strict(),
};

module.exports = {
  fetchExpensesSchema,
  addExpenseSchema,
  idParamsSchema,
  updateExpenseSchema,
};
