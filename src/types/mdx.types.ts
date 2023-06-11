export interface MdxHeader {
  title: string
  description: string
  date: string
  layout: string
  image: string
  author: string
  tags: MdxTags[]
}

export enum MdxTags {
  'React',
  'JavaScript',
  'TypeScript',
  'CSS',
  'HTML',
}
