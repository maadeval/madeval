import { useMemo, useState } from 'react'
import style from './styles.module.css'
import { MdxHeader } from '~types/mdx.types'

interface Props {
  posts: {
    frontmatter: MdxHeader
    url: string
  }[]
}

export const PostsList = ({ posts }: Props) => {
  return (
    <>
      <section className={style.articlesBox}>
        {posts.map(({ frontmatter, url }) => (
          <a
            key={url}
            className={style.article}
            style={{ '--tag-color': TAG_COLORS[frontmatter.tags[0]] } as any}
            href={url}
          >
            {frontmatter.tags.map((tag) => (
              <>
                <span key={tag} className={style.articleTag}>
                  <img src={`${tag}.svg`} className={style.articleTagImage} />{' '}
                  {tag}
                </span>
                <img className={style.tagBackground} src={`${tag}.svg`} />
              </>
            ))}
            <p className={style.articleTitle}>{frontmatter.title}</p>
            <p className={style.description}>{frontmatter.description}</p>
          </a>
        ))}
      </section>
    </>
  )
}

const TAG_COLORS = {
  react: '#61dafb',
  typescript: '#007acc',
  javascript: '#f7df1e',
  nextjs: '#000000',
  nodejs: '#339933',
  eslint: '#4b32c3',
}
