"use strict";

const Database = use("Database");
const Hash = use("Hash");
const Student = use ('App/Models/Student')
const Validator = use('Validator')

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param: '${number}' is not supported, please use param as a number.`,
    };
  }

  return {};
}

class StudentController {
  async index({request}) {
    const {references = undefined} = request.qs
   
    const students =  Student.query()
    
    if (references ) {
        const extractedReferences = references.split(",")
        students.with(extractedReferences)
    }
    return { status: 200,error: undefined, data: await students.fetch() }

    // const students = await Database.table("students");

    // return students;
  }

  async show({ request }) {
    const { id } = request.params

      const student = await Student.find(id)
 
    return { status:200,data: student || {}}
//1
  }

  async store ({ request }) {
    const { first_name, last_name, email, password } = request.body

    const rules = {
      first_name: 'required',
      last_name: 'required',
      email: 'required|email|unique:teachers,email',
      password: 'required|min:8'
    }

    const validation = await Validator.validateAll(request.body, rules)

    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined }

    const hashedPassword = await Hash.make(password)

    const student = await Database
      .table('students')
      .insert({ first_name, last_name, email, password: hashedPassword })

    return { status: 200, error: undefined, data: { first_name, last_name, email } }
  }
  
    async update({request}){
  
      const{ body,params } = request
      const { id } = params
      const { first_name,last_name,email } = body

      const studentId = await Database
      .table ('students')
      .where ({ student_id: id })
      .update ({ first_name,last_name,email })

      const student = await Database
      .table ('students')
      .where ({ student_id: id })
      .first()

    return {status: 200 , error: undefined, data: {student}}
    }

    async destroy ({ request }) {
        const { id } =request.params

        await Database
          .table('students')
          .where({ student_id: id })
          .delete()
        
        return {status: 200 , error: undefined, data: { massage: 'success' }}
    }
 
    
}

module.exports = StudentController;