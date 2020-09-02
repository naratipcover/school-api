'use strict'

const Database = use('Database')
const Enrollment = use ('App/Models/Enrollment')
const Validator = use('Validator')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
    return{ error: `params: ${number} is not supported, please use number type param instead`}
    
    return{}
}


class EnrollmentController {
    async index () {
        const enrollments = await Database.table('enrollments')
        
        return { status: 200,error: undefined, data:  enrollments}
    }

    // 1
    async show({ request }) {
        const { id } = request.params
    
          const enrollment = await Enrollment.find(id)
     
        return { status:200,data: enrollment || {}}
    }

  //2
  async store ({ request }) {
    const { mark } = request.body

    const rules = {
      mark: 'required',
    }

    const enrollment = await Database
      .table('enrollments')
      .insert({ mark })

    return { status: 200, error: undefined, data: { mark } }
  }

    async update({request}){
  
        const{ body,params } = request
        const { id } = params
        const {  mark } = body
  
        const enrollmentId = await Database
        .table ('enrollments')
        .where ({ enrollment_id: id })
        .update ({ mark })
  
        const enrollment = await Database
        .table ('enrollments')
        .where ({ enrollment_id: id })
        .first()
  
      return {status: 200 , error: undefined, data: {enrollment}}
      }
  
      async destroy ({ request }) {
          const { id } =request.params
  
          await Database
            .table('enrollments')
            .where({ enrollment_id: id })
            .delete()
          
          return {status: 200 , error: undefined, data: { massage: 'success' }}
      }
}

module.exports = EnrollmentController
