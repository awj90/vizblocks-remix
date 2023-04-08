export * from './vlat-post-assessment/piechart'
export * from './vlat-post-assessment/barchart'

export * from './vlat-pre-assessment/piechart'
export * from './vlat-pre-assessment/barchart'

export interface Question {
  question?: string
  questionPic?: string
  answers?: string[]
  correctAnswer?: number
  point?: number
}
