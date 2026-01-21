import ReactDOM from 'react-dom/client'
import { useKeyHold } from '@tanstack/react-keys'

function App() {
  // const isModHeld = useKeyHold('')
  const isShiftHeld = useKeyHold('Shift')
  const isControlHeld = useKeyHold('Control')
  const isAltHeld = useKeyHold('Alt')
  const isMetaHeld = useKeyHold('Meta')
  const isSpaceHeld = useKeyHold('Space')

  return (
    <div className="app">
      <header>
        <h1>useKeyHold</h1>
        <p>
          Returns a boolean indicating if a specific key is currently held.
          Optimized to only re-render when that specific key changes.
        </p>
      </header>

      <main>
        <section className="demo-section">
          <h2>Modifier Key States</h2>
          <div className="modifier-grid">
            <div
              className={`modifier-indicator ${isShiftHeld ? 'active' : ''}`}
            >
              <span className="key-name">Shift</span>
              <span className="status">
                {isShiftHeld ? 'HELD' : 'Released'}
              </span>
            </div>
            <div
              className={`modifier-indicator ${isControlHeld ? 'active' : ''}`}
            >
              <span className="key-name">Control</span>
              <span className="status">
                {isControlHeld ? 'HELD' : 'Released'}
              </span>
            </div>
            <div className={`modifier-indicator ${isAltHeld ? 'active' : ''}`}>
              <span className="key-name">Alt / Option</span>
              <span className="status">{isAltHeld ? 'HELD' : 'Released'}</span>
            </div>
            <div className={`modifier-indicator ${isMetaHeld ? 'active' : ''}`}>
              <span className="key-name">Meta (⌘ / ⊞)</span>
              <span className="status">{isMetaHeld ? 'HELD' : 'Released'}</span>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Space Bar Demo</h2>
          <div className={`space-indicator ${isSpaceHeld ? 'active' : ''}`}>
            {isSpaceHeld ? '🚀 SPACE HELD!' : 'Hold Space Bar'}
          </div>
        </section>

        <section className="demo-section">
          <h2>Usage</h2>
          <pre className="code-block">{`import { useKeyHold } from '@tanstack/react-keys'

function ShiftIndicator() {
  const isShiftHeld = useKeyHold('Shift')

  return (
    <div style={{ opacity: isShiftHeld ? 1 : 0.5 }}>
      {isShiftHeld ? 'Shift is pressed!' : 'Press Shift'}
    </div>
  )
}`}</pre>
        </section>

        <section className="demo-section">
          <h2>Conditional UI Example</h2>
          <p>
            Hold <kbd>Shift</kbd> to reveal the secret message:
          </p>
          <div className={`secret-box ${isShiftHeld ? 'revealed' : ''}`}>
            {isShiftHeld ? (
              <span>🎉 The secret password is: tanstack-keys-rocks!</span>
            ) : (
              <span>••••••••••••••••••••••••••</span>
            )}
          </div>
        </section>

        <section className="demo-section">
          <h2>Use Cases</h2>
          <ul>
            <li>Show different UI based on modifier state</li>
            <li>Enable "power user" mode while holding a key</li>
            <li>Hold-to-reveal sensitive information</li>
            <li>Drag-and-drop with modifier behaviors</li>
            <li>Show additional options on hover + modifier</li>
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
        .demo-section p {
          margin: 0 0 12px;
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
        .modifier-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .modifier-indicator {
          background: #f0f0f0;
          border: 2px solid #ddd;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          transition: all 0.15s ease;
        }
        .modifier-indicator.active {
          background: #4CAF50;
          border-color: #388E3C;
          color: white;
          transform: scale(1.02);
        }
        .modifier-indicator .key-name {
          display: block;
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 8px;
        }
        .modifier-indicator .status {
          font-size: 14px;
          opacity: 0.8;
        }
        .space-indicator {
          background: #f0f0f0;
          border: 3px solid #ddd;
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          font-size: 24px;
          transition: all 0.15s ease;
        }
        .space-indicator.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #5a67d8;
          color: white;
          transform: scale(1.02);
        }
        .secret-box {
          background: #f0f0f0;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          font-family: monospace;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        .secret-box.revealed {
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
      `}</style>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
