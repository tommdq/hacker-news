import { useEffect, useRef } from 'react'
import useSWRInfinite from 'swr/infinite'
import { Story } from '../components/Story'
import { getTopStories } from '../services/hacker-news'

export default function TopStoriesPage() {
  // const { data } = useSWR('stories', () => getTopStories(1, 10))
  const { data, isLoading, setSize } = useSWRInfinite(
    index => `stories/${index + 1}`, // key importante para cachear resultados
    key => {
      const [, page] = key.split('/')
      return getTopStories(+page, 10)
    }
  )

  const mark = useRef<HTMLSpanElement>(null)

  const stories = data?.flat()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setSize((prevSize) => prevSize + 1)
      }
    })
    if (mark.current == null) {
      return
    }
    observer.observe(mark.current)

    return () => observer.disconnect()
  }, [isLoading, setSize])

  return (
    <>
      <ul style={{ listStyle: 'none' }}>
        {stories?.map((id: number, index: number) => (
          <li key={id}>
            <Story id={id} index={index} />
          </li>
        ))}
      </ul>
      {!isLoading && <span ref={mark}>.</span>}

    </>
  )
}
