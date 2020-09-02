'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {

    static get primaryKey() {
        return 'group_id'
    }

        group () {
            return this.hasMany('App/Models/Group')
        }

}

module.exports = Group
