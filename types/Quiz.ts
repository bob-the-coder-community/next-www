export interface iQuiz {
  status: number
  message: Quiz[]
}

export interface Quiz {
  Difficulty: string
  _id: string
  Date: string
  Question: string
  Options: {
  Correct: true,
  _id: string
  Answer: string
  __v: number,
  id: string
  }[],
  createdAt: Date
  updatedAt: Date
  __v: number,
  id: string
}