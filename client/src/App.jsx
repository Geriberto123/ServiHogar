import { useState } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'client' })
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'No se pudo crear la cuenta')
      }

      setMessage(`Cuenta creada para ${data.user.email}`)
      setToken('Registro exitoso')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">ServiHogar · Módulo 1</p>
        <h1>Autenticación para prestadores y clientes</h1>
        <p className="subtitle">
          Crea una cuenta para empezar a explorar el prototipo de contratación del hogar.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Nombre completo
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
            />
          </label>

          <label>
            Rol
            <select
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
            >
              <option value="client">Cliente</option>
              <option value="provider">Prestador</option>
            </select>
          </label>

          <button type="submit">Registrar cuenta</button>
        </form>

        {message ? <p className="feedback">{message}</p> : null}
        {token ? <p className="token">{token}</p> : null}
      </section>
    </main>
  )
}

export default App
