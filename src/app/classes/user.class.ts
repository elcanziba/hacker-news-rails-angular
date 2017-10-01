import Post from "./post.class"
export default class User {
  id: number
  email: string
  nickname: string
  blocked: boolean
  admin: boolean
  constructor(object: any) {
    if(typeof object != 'undefined'){
      this.id = object.id
      this.email = object.email
      this.blocked = object.blocked
      this.nickname = object.nickname
      this.admin = object.admin
    }
  }
}
