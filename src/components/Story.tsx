import useSWR from 'swr'
import { Link } from 'wouter'
import { getItemInfo } from '../services/hacker-news'
import {
  story,
  storyFooter,
  storyHeader,
  storyLink,
  storyTitle
} from './Story.css'
import { StoryLoader } from './StoryLoader'
import { getRelativeTime } from '../utils/getRelativeTime'

export const Story = (props: { id: number; index: number }) => {
  const { id, index } = props
  const { data, isLoading } = useSWR(`/story/${id}`, () => getItemInfo(id))

  if (isLoading) {
    return <StoryLoader />
  }

  const { by, kids, score, title, url, time } = data
  let domain = ''
  try {
    domain = new URL(url).hostname.replace('www', '')
  } catch {}

  // TODO -> Create relative time
  return (
    <article className={story}>
      <header className={storyHeader}>
        <small>{index + 1} .</small>
        <a
          href={url}
          className={storyTitle}
          target='_blank'
          rel='noopener noreferrer'
        >
          {title}
        </a>
        <a
          href={url}
          className={storyLink}
          target='_blank'
          rel='noopener noreferrer'
        >
          ({domain})
        </a>
      </header>
      <footer className={storyFooter}>
        <span>{score} points</span>
        <Link className={storyLink} href={`/article/${id}`}>
          by {by}
        </Link>
        <Link className={storyLink} href={`/article/${id}`}>
          {getRelativeTime(time)}
        </Link>
        <Link className={storyLink} href={`/article/${id}`}>
          {kids?.length || 0} comments
        </Link>
      </footer>
    </article>
  )
}
