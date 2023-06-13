import { getItemInfo } from '../services/hacker-news'
import useSWR from 'swr'
import { CommentLoader } from './CommentLoader'
import { getRelativeTime } from '../utils/getRelativeTime'

const Comment = ({ id }: { id: number }) => {
  const { data, isLoading } = useSWR(`/comment/${id}`, () => getItemInfo(id))

  if (isLoading) {
    return <CommentLoader />
  }
  const { by, text, time, kids } = data
  return (
    <>
      <details open>
        <summary>
          <small>
            <span>{by}</span>
            <span>.</span>
            <span>{getRelativeTime(time)}</span>
          </small>
        </summary>
        <p>{text}</p>
      </details>
      {kids?.length && <ListOfComments ids={kids?.slice(0, 10)} />}
    </>
  )
}

export const ListOfComments = ({ ids }: { ids: number[] }) => {
  return (
    <ul>
      {ids?.map((id: number) => (
        <li key={id} style={{ listStyle: 'none' }}>
          <Comment id={id} />
        </li>
      ))}
    </ul>
  )
}
