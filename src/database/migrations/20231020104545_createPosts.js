
exports.up = knex => knex.schema.createTable("posts", table => {
    table.increments("id")
    table.text("tittle").notNullable()
    table.text("description")
    table.text("content")
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
})
exports.down = knex => knex.schema.dropTable("posts")