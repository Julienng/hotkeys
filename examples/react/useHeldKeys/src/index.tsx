import React from 'react'
import ReactDOM from 'react-dom/client'
import { useHeldKeys } from '@tanstack/react-keys'

function App() {
  const heldKeys = useHeldKeys()

  // Track history of key combinations
  const [history, setHistory] = React.useState<string[]>([])

  React.useEffect(() => {
    if (heldKeys.length > 0) {
      const combo = heldKeys.join(' + ')
      setHistory((h) => {
        // Only add if different from last entry
        if (h[h.length - 1] !== combo) {
          return [...h.slice(-9), combo]
        }
        return h
      })
    }
  }, [heldKeys])

  return (
    <div className="app">
      <header>
        <h1>useHeldKeys</h1>
        <p>
          Returns an array of all currently pressed keys. Useful for displaying
          key combinations or building custom shortcut recording.
        </p>
      </header>

      <main>
        <section className="demo-section">
          <h2>Currently Held Keys</h2>
          <div className="key-display">
            {heldKeys.length > 0 ? (
              heldKeys.map((key, index) => (
                <React.Fragment key={key}>
                  {index > 0 && <span className="plus">+</span>}
                  <kbd className="large">{key}</kbd>
                </React.Fragment>
              ))
            ) : (
              <span className="placeholder">Press any keys...</span>
            )}
          </div>
          <div className="stats">
            Keys held: <strong>{heldKeys.length}</strong>
          </div>
        </section>

        <section className="demo-section">
          <h2>Usage</h2>
          <pre className="code-block">{`import { useHeldKeys } from '@tanstack/react-keys'

function KeyDisplay() {
  const heldKeys = useHeldKeys()

  return (
    <div>
      Currently pressed: {heldKeys.join(' + ') || 'None'}
    </div>
  )
}`}</pre>
        </section>

        <section className="demo-section">
          <h2>Try These Combinations</h2>
          <ul>
            <li>
              Hold <kbd>Shift</kbd> + <kbd>Control</kbd> + <kbd>A</kbd>
            </li>
            <li>Press multiple letter keys at once</li>
            <li>Hold modifiers and watch them appear</li>
            <li>Release keys one by one</li>
          </ul>
        </section>

        <section className="demo-section">
          <h2>Recent Combinations</h2>
          {history.length > 0 ? (
            <ul className="history-list">
              {history.map((combo, i) => (
                <li key={i}>{combo}</li>
              ))}
            </ul>
          ) : (
            <p className="placeholder">Press some key combinations...</p>
          )}
          <button onClick={() => setHistory([])}>Clear History</button>
        </section>

        <section className="demo-section">
          <h2>Use Cases</h2>
          <ul>
            <li>Building a keyboard shortcut recorder</li>
            <li>Displaying currently held keys to users</li>
            <li>Debugging keyboard input</li>
            <li>Creating key combination tutorials</li>
          </ul>
        </section>
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
          max-width: 500px;
          margin: 0 auto;
        }
        .demo-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .demo-section h2 {
          margin: 0 0 16px;
          font-size: 20px;
        }
        .demo-section ul {
          margin: 0;
          padding-left: 20px;
        }
        .demo-section li {
          margin-bottom: 8px;
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
        kbd.large {
          font-size: 24px;
          padding: 8px 16px;
        }
        .key-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 80px;
          flex-wrap: wrap;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
        }
        .key-display .plus {
          font-size: 24px;
          color: #666;
        }
        .placeholder {
          color: #999;
          font-style: italic;
        }
        .stats {
          text-align: center;
          margin-top: 16px;
          font-size: 16px;
          color: #666;
        }
        .code-block {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          font-size: 13px;
          line-height: 1.5;
        }
        .history-list {
          list-style: none;
          padding: 0;
          margin: 0 0 16px;
        }
        .history-list li {
          padding: 8px 12px;
          background: #f0f0f0;
          border-radius: 4px;
          margin-bottom: 4px;
          font-family: monospace;
          font-size: 14px;
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
      `}</style>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
