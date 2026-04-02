export type BuilderProjectStatus =
  | 'launching'
  | 'under_construction'
  | 'nearing_completion'
  | 'ready_to_move'

/** Card + catalogue row — replace with API when backend ships. */
export type BuilderProject = {
  id: string
  name: string
  builder: string
  locality: string
  cityLabel: string
  cityValue: string
  status: BuilderProjectStatus
  statusLabel: string
  possessionLabel: string
  reraId: string
  priceFromDisplay: string
  priceUptoDisplay: string
  configurationsLabel: string
  areaLabel: string
  images: string[]
  highlights: string[]
}

export type ProjectMilestone = {
  label: string
  date: string
  done: boolean
}

export type ProjectFaq = {
  question: string
  answer: string
}

export type BuilderProjectDetail = BuilderProject & {
  description: string
  amenities: string[]
  towers: number
  totalUnits: number
  latitude: number
  longitude: number
  /** Demo 0–100 for progress UI */
  constructionProgressPct: number
  milestones: ProjectMilestone[]
  faqs: ProjectFaq[]
  paymentPlanNote: string
}
