import User from "./user.class"

export default class Comment{
  content: string
  id: number
  user: User
  upvote: number
  downvote: number
  constructor(object) {
    this.content = object.content
    this.id = object.id
    if (typeof object.user != "undefined") {
        this.user = new User(object.user)
    }
  }
}
