import { Analytics } from '@vercel/analytics/react'
import { Editor } from './editor/editor'

function App() {
  return (
    <>
      <Editor />
      <Analytics />
    </>
  )
}

export default App
