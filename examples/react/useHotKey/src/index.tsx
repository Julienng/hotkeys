import React from 'react'
import ReactDOM from 'react-dom/client'
import { useHotkey, formatForDisplay, type Hotkey } from '@tanstack/react-keys'

function App() {
  const [lastHotkey, setLastHotkey] = React.useState<Hotkey | null>(null)
  const [saveCount, setSaveCount] = React.useState(0)
  const [incrementCount, setIncrementCount] = React.useState(0)
  const [enabled, setEnabled] = React.useState(true)

  // Basic hotkey with callback context
  useHotkey(
    'Mod+S',
    (event, { hotkey, parsedHotkey }) => {
      event.preventDefault()
      setLastHotkey(hotkey)
      setSaveCount((c) => c + 1)
      console.log('Hotkey triggered:', hotkey)
      console.log('Parsed hotkey:', parsedHotkey)
    },
    { preventDefault: true },
  )

  // requireReset prevents repeated triggering while holding keys
  useHotkey(
    'Mod+K',
    (_event, { hotkey }) => {
      setLastHotkey(hotkey)
      setIncrementCount((c) => c + 1)
    },
    { requireReset: true },
  )

  // Conditional hotkey (enabled/disabled)
  useHotkey(
    'Mod+E',
    (_event, { hotkey }) => {
      setLastHotkey(hotkey)
      alert('This hotkey can be toggled!')
    },
    { enabled },
  )

  // Clear with Escape
  useHotkey('Escape', () => {
    setLastHotkey(null)
    setSaveCount(0)
    setIncrementCount(0)
  })

  return (
    <div className="app">
      <header>
        <h1>useHotkey</h1>
        <p>
          Register keyboard shortcuts with callback context containing the
          hotkey and parsed hotkey information.
        </p>
      </header>

      <main>
        <section className="demo-section">
          <h2>Basic Hotkey</h2>
          <p>
            Press <kbd>{formatForDisplay('Mod+S')}</kbd> to trigger
          </p>
          <div className="counter">Save triggered: {saveCount}x</div>
          <pre className="code-block">{`useHotkey(
  'Mod+S',
  (event, { hotkey, parsedHotkey }) => {
    event.preventDefault()
    console.log('Hotkey:', hotkey)
    console.log('Parsed:', parsedHotkey)
  },
  { preventDefault: true }
)`}</pre>
        </section>

        <section className="demo-section">
          <h2>With requireReset</h2>
          <p>
            Hold <kbd>{formatForDisplay('Mod+K')}</kbd> — only increments once
            until you release all keys
          </p>
          <div className="counter">Increment: {incrementCount}</div>
          <p className="hint">
            This prevents repeated triggering while holding the keys down.
            Release all keys to allow re-triggering.
          </p>
          <pre className="code-block">{`useHotkey(
  'Mod+K',
  (event, { hotkey }) => {
    setCount(c => c + 1)
  },
  { requireReset: true }
)`}</pre>
        </section>

        <section className="demo-section">
          <h2>Conditional Hotkey</h2>
          <p>
            <kbd>{formatForDisplay('Mod+E')}</kbd> is currently{' '}
            <strong>{enabled ? 'enabled' : 'disabled'}</strong>
          </p>
          <button onClick={() => setEnabled(!enabled)}>
            {enabled ? 'Disable' : 'Enable'} Hotkey
          </button>
          <pre className="code-block">{`const [enabled, setEnabled] = useState(true)

useHotkey(
  'Mod+E',
  (event, { hotkey }) => {
    alert('Triggered!')
  },
  { enabled }
)`}</pre>
        </section>

        {lastHotkey && (
          <div className="info-box">
            <strong>Last triggered:</strong> {formatForDisplay(lastHotkey)}
          </div>
        )}

        <p className="hint">
          Press <kbd>Escape</kbd> to reset all counters
        </p>
      </main>

      <style>{`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: system-ui, -apple-system, sans-serif;
          background: #f5f5f5;
          color: #333;
        }
        .app {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        header {
          text-align: center;
          margin-bottom: 40px;
        }
        header h1 {
          margin: 0 0 10px;
          color: #0066cc;
        }
        header p {
          color: #666;
          margin: 0;
        }
        .demo-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .demo-section h2 {
          margin: 0 0 12px;
          font-size: 20px;
        }
        .demo-section p {
          margin: 0 0 12px;
        }
        kbd {
          background: linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%);
          border: 1px solid #ccc;
          border-bottom-width: 2px;
          border-radius: 4px;
          padding: 2px 8px;
          font-family: monospace;
          font-size: 13px;
        }
        .counter {
          font-size: 28px;
          font-weight: bold;
          color: #0066cc;
          margin: 16px 0;
        }
        .hint {
          font-size: 13px;
          color: #888;
          font-style: italic;
        }
        .info-box {
          background: #e3f2fd;
          border-radius: 8px;
          padding: 12px 16px;
          margin: 20px 0;
        }
        button {
          background: #0066cc;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }
        button:hover {
          background: #0052a3;
        }
        .code-block {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          font-size: 13px;
          line-height: 1.5;
          margin-top: 16px;
        }
      `}</style>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
