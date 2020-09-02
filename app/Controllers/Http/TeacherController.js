'use strict'

const Database = use('Database')
const Validator = use('Validator')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
    return{ error: `params: ${number} is not supported, please use number type param instead`}
    
    return{}
}

class TeacherController {
    async index () {
        const teachers = await Database.table('teachers')
        
        return { status: 200,error: undefined, data:  teachers}
    }

    async show ({request}) {
        const { id } = request.params

        const validateValue = numberTypeParamValidator(id)
       
        if (validateValue.error) 
        return {status: 500, error: validateValue.error, data: undefined }

        const teacher = await Database
            .select('*')
            .from('teachers')
            .where("teacher_id",id)
            .first()
            // 0, "" , false , undefined , null => false
        // return teacher || 
        return { status:200,data: teacher || {}}
    }

    async store({request}) {
        const { first_name,last_name,email } = request.body
      
        const rules = {
            first_name: 'required',
            last_name: 'required',
            email: 'required|email|unique:teachers,email'
        }

        const validation = await Validator.validate(request.body, rules)

        if (validation.fails())
            return {status: 422, error: validation.messages(), data: undefined }
    
        // const missingKeys = []
        // // if(!first_name && !last_name && !email )
        // if(!first_name ) missingKeys.push('first_name')
        // if(!last_name ) missingKeys.push('last_name')
        // if(!email ) missingKeys.push('email')

        // // new RegExp(/hello/gi).test("Hello World")
        // // new RegExp("hello","gi").test("Hello World")

        // if (missingKeys.length)
        //     return { status: 422, error: `${missingKeys} is missing.`,data: undefined}

        // // const hashedPassword = await Hash.make(password)

        const teacher = await Database
            .table('teachers')
            .insert({ first_name,last_name,email })
        return { status: 200,error: undefined, data: { first_name,last_name,email }}
    }

    async update({request}){
        // const body = request.body
        // const params = request.body เหมือนตัวด้านล่าง
        const{ body,params } = request
        const { id } = params
        const { first_name,last_name,email } = body
  
        const teacherId = await Database
        .table ('teachers')
        .where ({ teacher_id: id })
        .update ({first_name,last_name,email})
  
        const teacher = await Database
        .table ('teachers')
        .where ({ teacher_id: id })
        .first()
  
      return {status: 200 , error: undefined, data: {teacher}}
      }
  
      async destroy ({ request }) {
          const { id } =request.params
  
          await Database
            .table('teachers')
            .where({ teacher_id: id })
            .delete()
          
          return {status: 200 , error: undefined, data: { massage: 'success' }}
      }
}

module.exports = TeacherController
