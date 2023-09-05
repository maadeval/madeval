import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { atomDark } from '@codesandbox/sandpack-themes'

import style from './LiveCode.module.css'

const files = {
  'Component.jsx': {
    code: 'export default function Component() { return <h1>Hello world</h1> }',
  },
  'App.js': {
    code: `
    import Component from './Component'
    export default function App() {
      return <h1>Hello worlaaad<Component /></h1>
    }`,
  },
}

export const LiveCode = () => {
  return (
    <SandpackProvider theme={atomDark} files={files} template="react">
      <SandpackLayout className={style.layout}>
        <SandpackCodeEditor
          res
          showTabs
          showLineNumbers={true}
          showInlineErrors
        />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  )
}
