/**
 * 调用接口，获取指定学生的数据
 * @param id 学生ID
 * @returns
 */
function getStudentByID(id: string): Promise<any> {
  // !模拟接口响应的数据
  const student = {
    sid: id,
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    age: '20',
    cid: 'c_12345',
    cName: 'Computer Science'
  }

  return Promise.resolve(student)
}

/**
 * 调用接口，获取全部学生的数据
 * @returns
 */
function getAll(): Promise<any> {
  // !模拟接口响应的数据
  const student = {
    sid: 's_12345',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    age: '20',
    cid: 'c_12345',
    cName: 'Computer Science'
  }
  return Promise.resolve([student])
}

export { getStudentByID, getAll }
