export interface Task {
  _id?: any
  title: string
  description: string
  hoursEstimated: number
  completed: boolean
  comments?: Comment[]
}

export interface Comment {
  _id?: any
  name: string
  comment: string
}