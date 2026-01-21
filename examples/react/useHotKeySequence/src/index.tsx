import React from 'react'
import ReactDOM from 'react-dom/client'
import { useHotkeySequence, useHotkey } from '@tanstack/react-keys'

function App() {
  const [lastSequence, setLastSequence] = React.useState<string | null>(null)
  const [history, setHistory] = React.useState<string[]>([])

  const addToHistory = (action: string) => {
    setLastSequence(action)
    setHistory((h) => [...h.slice(-9), action])
  }

  // Vim-style navigation
  useHotkeySequence(['G', 'G'], () => addToHistory('gg → Go to top'))
  useHotkeySequence(['Shift+G'], () => addToHistory('G → Go to bottom'))
  useHotkeySequence(['D', 'D'], () => addToHistory('dd → Delete line'))
  useHotkeySequence(['Y', 'Y'], () => addToHistory('yy → Yank (copy) line'))
  useHotkeySequence(['D', 'W'], () => addToHistory('dw → Delete word'))
  useHotkeySequence(['C', 'I', 'W'], () =>
    addToHistory('ciw → Change inner word'),
  )

  // Custom sequences with different timeout
  useHotkeySequence(
    ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'],
    () => addToHistory('↑↑↓↓ → Konami code (partial)'),
    { timeout: 1500 },
  )

  useHotkeySequence(
    ['ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'],
    () => addToHistory('←→←→ → Side to side!'),
    { timeout: 1500 },
  )

  // Letter sequences
  useHotkeySequence(['H', 'E', 'L', 'L', 'O'], () =>
    addToHistory('hello → Hello World!'),
  )

  // Clear history with Escape
  useHotkey('Escape', () => {
    setLastSequence(null)
    setHistory([])
  })

  return (
    <div className="app">
      <header>
        <h1>useHotkeySequence</h1>
        <p>
          Register multi-key sequences (like Vim commands). Keys must be pressed
          within the timeout window (default: 1000ms).
        </p>
      </header>

      <main>
        <section className="demo-section">
          <h2>Vim-Style Commands</h2>
          <table className="sequence-table">
            <thead>
              <tr>
                <th>Sequence</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <kbd>g</kbd> <kbd>g</kbd>
                </td>
                <td>Go to top</td>
              </tr>
              <tr>
                <td>
                  <kbd>G</kbd> (Shift+G)
                </td>
                <td>Go to bottom</td>
              </tr>
              <tr>
                <td>
                  <kbd>d</kbd> <kbd>d</kbd>
                </td>
                <td>Delete line</td>
              </tr>
              <tr>
                <td>
                  <kbd>y</kbd> <kbd>y</kbd>
                </td>
                <td>Yank (copy) line</td>
              </tr>
              <tr>
                <td>
                  <kbd>d</kbd> <kbd>w</kbd>
                </td>
                <td>Delete word</td>
              </tr>
              <tr>
                <td>
                  <kbd>c</kbd> <kbd>i</kbd> <kbd>w</kbd>
                </td>
                <td>Change inner word</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="demo-section">
          <h2>Fun Sequences</h2>
          <div className="fun-sequences">
            <div className="sequence-card">
              <h3>Konami Code (Partial)</h3>
              <p>
                <kbd>↑</kbd> <kbd>↑</kbd> <kbd>↓</kbd> <kbd>↓</kbd>
              </p>
              <span className="hint">Use arrow keys within 1.5 seconds</span>
            </div>
            <div className="sequence-card">
              <h3>Side to Side</h3>
              <p>
                <kbd>←</kbd> <kbd>→</kbd> <kbd>←</kbd> <kbd>→</kbd>
              </p>
              <span className="hint">Arrow keys within 1.5 seconds</span>
            </div>
            <div className="sequence-card">
              <h3>Spell It Out</h3>
              <p>
                <kbd>h</kbd> <kbd>e</kbd> <kbd>l</kbd> <kbd>l</kbd> <kbd>o</kbd>
              </p>
              <span className="hint">Type "hello" quickly</span>
            </div>
          </div>
        </section>

        {lastSequence && (
          <div className="info-box success">
            <strong>Triggered:</strong> {lastSequence}
          </div>
        )}

        <section className="demo-section">
          <h2>Usage</h2>
          <pre className="code-block">{`import { useHotkeySequence } from '@tanstack/react-keys'

function VimEditor() {
  // Basic sequence
  useHotkeySequence(['G', 'G'], () => {
    scrollToTop()
  })

  // With custom timeout (1.5 seconds)
  useHotkeySequence(
    ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'],
    () => activateCheatMode(),
    { timeout: 1500 }
  )

  // Three-key sequence
  useHotkeySequence(['C', 'I', 'W'], () => {
    changeInnerWord()
  })
}`}</pre>
        </section>

        {history.length > 0 && (
          <section className="demo-section">
            <h2>History</h2>
            <ul className="history-list">
              {history.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <button onClick={() => setHistory([])}>Clear History</button>
          </section>
        )}

        <p className="hint">
          Press <kbd>Escape</kbd> to clear history
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
        kbd {
          background: linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%);
          border: 1px solid #ccc;
          border-bottom-width: 2px;
          border-radius: 4px;
          padding: 2px 8px;
          font-family: monospace;
          font-size: 13px;
          margin-right: 4px;
        }
        .sequence-table {
          width: 100%;
          border-collapse: collapse;
        }
        .sequence-table th,
        .sequence-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        .sequence-table th {
          font-weight: 600;
          color: #666;
          font-size: 14px;
        }
        .fun-sequences {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .sequence-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }
        .sequence-card h3 {
          margin: 0 0 12px;
          font-size: 16px;
        }
        .sequence-card p {
          margin: 0 0 8px;
        }
        .hint {
          font-size: 12px;
          color: #888;
          font-style: italic;
        }
        .info-box {
          background: #e3f2fd;
          border-radius: 8px;
          padding: 16px 20px;
          margin-bottom: 24px;
          font-size: 18px;
        }
        .info-box.success {
          background: #e8f5e9;
          color: #2e7d32;
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
          padding: 10px 14px;
          background: #f0f0f0;
          border-radius: 6px;
          margin-bottom: 6px;
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
