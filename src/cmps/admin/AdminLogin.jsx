import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { Loading } from '../Loading'

export function AdminLogin() {
    const { login } = useUser()
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    function handleChange({ target }) {
        setCredentials(prev => ({ ...prev, [target.name]: target.value }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        if (isLoading) return
        setError('')
        setIsLoading(true)
        try {
            await login(credentials)
        } catch (err) {
            setError('שם משתמש או סיסמה שגויים')
            console.error('Login failed:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="admin-login">
            <form onSubmit={handleSubmit}>
                <h2>כניסה לניהול</h2>

                <div className="input-container">
                    <label htmlFor="username">שם משתמש</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={credentials.username}
                        onChange={handleChange}
                        autoComplete="username"
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="password">סיסמה</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />
                </div>

                {error && <p className="login-error">{error}</p>}

                <button type="submit" className="save-btn" disabled={isLoading}>
                    {isLoading ? <Loading isTxt={false} /> : 'כניסה'}
                </button>
            </form>
        </div>
    )
}
