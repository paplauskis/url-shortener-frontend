import { useState } from 'react'
import { useParams } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { mode } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${mode}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: email,
            Password: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        window.location.replace('/')
      } else {
        setError(mode == 'login' ? 'incorrect login credentials' : 'email already exists')
      }
      
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>{mode == 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{mode == 'login' ? 'Login' : 'Register'}</button>
      </form>
      <a href='register'>{mode == 'login' ? 'Don\'t have an account?' : ''}</a>
    </div>
  )
}

export default Login
