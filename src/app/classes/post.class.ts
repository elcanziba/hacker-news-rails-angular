import User from "./user.class"
export default class Post {
  title: string
  description: string
  source: string
  origin: string
  upvote: number
  downvote: number
  id: number
  user: User
  kind: boolean
  approved: boolean
  to_approve: boolean
  constructor(object) {
    this.title = object.title
    this.description = object.description
    this.source = object.source
    this.id = object.id
    this.upvote = object.upvote
    this.downvote = object.downvote
    this.to_approve = object.to_approve
    this.origin = object.origin
    this.approved = object.approved
    if (typeof object.user != 'undefined')
      this.user = new User(object.user)
  }

  downVote(){
    this.downvote ++
  }

  upVote(){
    this.upvote ++
  }
}
