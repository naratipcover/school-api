'use strict'

const Database = use('Database')

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

    async show ({request}) {
        const { id } = request.params

        const validateValue = numberTypeParamValidator(id)
       
        if (validateValue.error) 
        return {status: 500, error: validateValue.error, data: undefined }

        const groups = await Database
            .select('*')
            .from('create_groups')
            .where("group_id",id)
            .first()

        return { status:200,data: groups || {}}
    }

    async store({request}) {
        const { name } = request.body
      
      
        const missingKeys = []

        if(!name ) missingKeys.push('name')
        if (missingKeys.length)
            return { status: 422, error: `${missingKeys} is missing.`,data: undefined}

        const teacher = await Database
            .table('create_groups')
            .insert({ name })
        return { status: 200,error: undefined, data: { name }}
    }
}

module.exports = GroupController
