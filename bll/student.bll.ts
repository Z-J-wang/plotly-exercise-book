/**
 * @module student.bll
 * @description 学生业务逻辑层
 */
import StudentDal from 'dal/student.dal'

const { getAll, getDataById } = new StudentDal()

export { getAll, getDataById }
