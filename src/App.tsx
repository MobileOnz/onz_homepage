import { Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage'
import { ArticlePage } from './pages/ArticlePage/ArticlePage'
import { PageSeo } from './components/PageSeo'

function App() {
  return (
    <>
      <PageSeo path={useLocation().pathname} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
      </Routes>
    </>
  )
}

export default App
