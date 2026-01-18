import React from 'react'
import ReactDOM from 'react-dom/client'
import { useHotkey, formatForDisplay, Hotkey } from '@tanstack/react-keys'

function App() {
  const [lastHotkey, setLastHotkey] = React.useState<Hotkey | null>(null)
  const [count, setCount] = React.useState(0)

  // Global hotkey: Mod+S to "save"
  useHotkey(
    'Mod+S',
    () => {
      setLastHotkey('Mod+S')
      alert('Saved! (Mod+S pressed)')
    },
    { preventDefault: true },
  )

  // Global hotkey: Mod+K to increment counter
  useHotkey('Mod+K', () => {
    setLastHotkey('Mod+K')
    setCount((c) => c + 1)
  })

  // Escape to clear
  useHotkey('Escape', () => {
    setLastHotkey('Escape')
    setCount(0)
  })

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>TanStack Keys - React Basic Example</h1>

      <section style={{ marginBottom: '24px' }}>
        <h2>Try these hotkeys:</h2>
        <ul style={{ lineHeight: 1.8 }}>
          <li>
            <kbd>{formatForDisplay('Mod+S')}</kbd> - Show "Saved" alert
          </li>
          <li>
            <kbd>{formatForDisplay('Mod+K')}</kbd> - Increment counter
          </li>
          <li>
            <kbd>{formatForDisplay('Escape')}</kbd> - Reset counter
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2>Counter: {count}</h2>
      </section>

      {lastHotkey && (
        <section
          style={{
            padding: '12px',
            background: '#f0f0f0',
            borderRadius: '8px',
          }}
        >
          <strong>Last hotkey pressed:</strong> {formatForDisplay(lastHotkey)}
        </section>
      )}

      <style>{`
        kbd {
          background: #eee;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 2px 6px;
          font-family: monospace;
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
