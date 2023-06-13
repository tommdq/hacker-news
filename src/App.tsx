import { Suspense, lazy } from 'react'
import { Route } from 'wouter'
import { Header } from './components/Header'

const TopStoriesPage = lazy(() => import('./pages/TopStories'))
const DetailPage = lazy(() => import('./pages/Detail'))

function App() {

  return (
    <>
      <Header />
      <Suspense fallback=''>
        <Route path='/' component={TopStoriesPage} />
        <Route path='/article/:id' component={DetailPage} />
      </Suspense>
    </>
  )
}

export default App
