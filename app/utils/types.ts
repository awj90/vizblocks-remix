export enum GRAPH_TYPES {
  linechart = 'linechart',
  barchart = 'barchart',
  piechart = 'piechart',
  scatterplot = 'scatterplot',
  dotplot = 'dotplot',
  pictograph = 'pictograph',
  histogram = 'histogram',
  heatmap = 'heatmap',
}

export interface Profile {
  firstName?: string
  lastName?: string
  email?: string
  role?: 'educator' | 'student'
}

export interface SavedGraphData {
  graph_type: GRAPH_TYPES
  graph_data: {
    data: Record<string, any>
    image: string
    profile: Profile
    desc: string
  }
  uid: string
  id: string
  likes: string[] // stores uid of who liked
}

export interface Classroom {
  id: string
  uid: string
  likes: string[]
  image: string
  members: string[] // uid of members
  graphs: string[] // id of graphs
  title: string
  created_by: string
}
