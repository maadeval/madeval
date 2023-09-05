import { MdxHeader } from 'src/types/mdx.types'

interface Props {
  input: MdxHeader
}

export const generateMetadata = ({ input }: Props) => {
  return {
    title: input?.title || 'madeval | Programación y Desarrollo Web',
    description:
      input?.description ||
      'Experiencia y conocimientos en Programación y Desarrollo Web de Mateo Álvarez, madeval.',
    keywords:
      input?.tags.join(', ') ||
      'programacion, desarrollo, javascript, typescript, react, frontend',
    twitterTitle:
      input?.title ||
      'madeval: Experiencia y conocimientos en Programación y Desarrollo Web',
    ogTitle:
      input?.title ||
      'madeval: Experiencia y conocimientos en Programación y Desarrollo Web',
    twitterImage: input?.title
      ? `https://madeval.dev/api/og?title=${input.title}&tagImage=${input.tags[0]}`
      : 'https://www.madeval.dev/og.webp',
    ogImage: input?.title
      ? `https://madeval.dev/api/og?title=${input.title}&tagImage=${input.tags[0]}`
      : 'https://www.madeval.dev/og.webp',
    twitterDescription:
      input?.description ||
      'Curriculum y recorido profesional, conoce lo que puedo aportar a tu equipo.',
    ogDescription:
      input?.description ||
      'Curriculum y recorido profesional, conoce lo que puedo aportar a tu equipo.',
  }
}
