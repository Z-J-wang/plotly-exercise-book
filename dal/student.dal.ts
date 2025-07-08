/**
 * @module student.dal
 * @description 学生数据访问层
 */
import Student from 'entities/student.entity'
import { getAll, getStudentByID } from 'api/student.api'

export default class StudentDal {
  constructor() {}

  // 根据ID获取学生信息
  async getDataById(id: string): Promise<Student> {
    const student = await getStudentByID(id)
    const { sid, firstName, lastName, gender, age, cid, cName } = student
    return new Student(sid, firstName, lastName, gender, age, cid, cName)
  }

  // 根据获取全部学生信息
  async getAll(): Promise<Student[]> {
    const students = await getAll()
    return students.map((student: any) => {
      const { sid, firstName, lastName, gender, age, cid, cName } = student
      return new Student(sid, firstName, lastName, gender, age, cid, cName)
    })
  }
}
