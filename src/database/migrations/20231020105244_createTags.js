
exports.up = knex => knex.schema.createTable("tags", table =>{
    table.increments("id")
    table.text("name")
    table.text("links")
    table.integer("post_id").references("id").inTable("posts").onDelete("CASCADE")
    table.timestamp("created_at").default(knex.fn.now())
})
exports.down = knex => knex.schema.dropTable("tags")
