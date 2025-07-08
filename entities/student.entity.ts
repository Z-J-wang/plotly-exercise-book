export default class Student {
  sid: string
  fullName: string
  firstName: string
  lastName: string
  gender: string
  age: number
  cid: string
  cName: string

  constructor(
    sid: string,
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    cid: string,
    cName: string
  ) {
    this.sid = sid
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = firstName + ' ' + lastName
    this.gender = gender
    this.age = age
    this.cid = cid
    this.cName = cName
  }
}
