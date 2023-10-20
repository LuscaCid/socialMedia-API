
exports.up = knex => knex.schema.createTable('users', table => {
    table.increments("id")
    table.text("name").notNullable()
    table.text("email").notNullable()
    table.text("password").notNullable()
    table.text("avatar")
    table.text("biography")
    table.integer("followers").references("id").inTable("followers").onDelete("CASCADE")
    table.integer("posts").references("id").inTable("posts").onDelete("CASCADE")
    table.timestamp("created_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("users")
