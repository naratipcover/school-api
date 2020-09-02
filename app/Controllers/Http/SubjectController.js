'use strict'

const Database = use('Database')
const Subject = use ('App/Models/Subject')
const Validator = use('Validator')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
    return{ error: `params: ${number} is not supported, please use number type param instead`}
    
    return{}
}

class SubjectController {
    async index ({ request }) {
        //? /subject?references=teachers
        const {references = undefined} = request.qs
        // let subjects = await Database.table('subjects') // SELECT *FROM 'subject'

        const subjects =  Subject.query()
        
        if (references ) {
            const extractedReferences = references.split(",")
            subjects.with(extractedReferences)
        }
        return { status: 200,error: undefined, data: await subjects.fetch() }
    }

    async show ({request}) {
        const { id } = request.params
        
        // const validateValue = numberTypeParamValidator(id)
        
        // if (validateValue.error) 
        // return {status: 500, error: validateValue.error, data: undefined }
            const subject = await Subject.find(id)
        // const subject = await Database
        //     .select('*')
        //     .from('subjects')
        //     .where("subjects_id",id)
        //     .first()

        return { status:200,data: subject || {}}
    }

    // async showTeacher({request}){
    //     const { id } =  request.params
    //     const subject = await Database
    //         .table('subjects')
    //         .where({'subject_id': id })
    //         innerJoin('teachers','subjects.teacher_id','teachers.teacher_id')
    //         .first()

    //     return {status: 200, error: undefined, data:subject || {} }
    // }

    // async store({request}) {
    //     const { title } = request.body
      
    //     // const missingKeys = []
    //     // if(!title ) missingKeys.push('title')
    //     // if (missingKeys.length)
    //     //     return { status: 422, error: `${missingKeys} is missing.`,data: undefined}


    //     // const subject = await Database
    //     //     .table('subjects')
    //     //     .insert({ title })
    //     return { status: 200,error: undefined, data: { title }}
    // }

    async store ({request}) {

        const {title} = request.body
        // const subject = new Subject()
        // subject.title = title
        // subject.teacher_id = teacher_id
        // await subject.save()

        const subject = await Subject.create({title})
        
        return ({status: 200 , error: undefined, data: {title}})
        
    }

    async update({request}){
  
        const{ body,params } = request
        const { id } = params
        const { title } = body
  
        const subjectId = await Database
        .table ('subjects')
        .where ({ subject_id: id })
        .update ({ title })
  
        const subject = await Database
        .table ('subjects')
        .where ({ subject_id: id })
        .first()
  
      return {status: 200 , error: undefined, data: {subject}}
      }
  
      async destroy ({ request }) {
          const { id } =request.params
  
          await Database
            .table('subjects')
            .where({ subject_id: id })
            .delete()
          
          return {status: 200 , error: undefined, data: { massage: 'success' }}
      }

}

module.exports = SubjectController
