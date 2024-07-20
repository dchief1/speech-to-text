const { model, types } = require("drizzle-orm");

const User = model("users", {
  id: types.int().primary().notNull(),
  name: types.string().notNull(),
  email: types.string().notNull().unique(),
  password: types.string().notNull(),
});

module.exports = User;
