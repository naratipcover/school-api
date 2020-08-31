'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateGroupSchema extends Schema {
  up () {
    this.create('create_groups', (table) => {
      table.increments('group_id') //defualt -> id
      table.string('name',100).unique()
    })
  }

  down () {
    this.drop('create_groups')
  }
}

module.exports = CreateGroupSchema
