'use strict'

const Database = use('Database')
const Group = use ('App/Models/Group')
const Validator = use('Validator')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
    return{ error: `params: ${number} is not supported, please use number type param instead`}
    
    return{}
}

class GroupController {
    async index () {
        const group = await Database.table('create_groups')
        
        return { status: 200,error: undefined, data:  group}
    }

    async show({ request }) {
        const { id } = request.params
    
          const group = await Group.find(id)
     
        return { status:200,data: group || {}}
    }

    async store ({ request }) {
        const { name } = request.body
    
        const rules = {
          name: 'required',
        }
    
        const group = await Database
          .table('create_groups')
          .insert({ name })
    
        return { status: 200, error: undefined, data: { name } }
      }

    async update({request}){
        // const body = request.body
        // const params = request.body เหมือนตัวด้านล่าง
        const{ body,params } = request
        const { id } = params
        const { name } = body
  
        const groupId = await Database
        .table ('create_groups')
        .where ({ group_id: id })
        .update ({ name })
  
        const group = await Database
        .table ('create_groups')
        .where ({ group_id: id })
        .first()
  
      return {status: 200 , error: undefined, data: {group}}
      }
  
      async destroy ({ request }) {
          const { id } =request.params
  
          await Database
            .table('create_groups')
            .where({ group_id: id })
            .delete()
          
          return {status: 200 , error: undefined, data: { massage: 'success' }}
      }
}

module.exports = GroupController
