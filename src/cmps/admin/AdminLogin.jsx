import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useUser } from '../../context/UserContext'
import { Loading } from '../Loading'

export function AdminLogin({ from }) {
    const { login } = useUser()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    function handleChange({ target }) {
        const value = target.name === 'username' ? target.value.toLowerCase() : target.value
        setCredentials(prev => ({ ...prev, [target.name]: value }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        if (isLoading) return
        setError('')
        setIsLoading(true)
        try {
            await login(credentials)
            navigate(from || '/admin', { replace: true })
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
                    <div className="password-wrapper">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={credentials.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(prev => !prev)}
                            aria-label={showPassword ? 'הסתר סיסמה' : 'הצג סיסמה'}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                    <line x1="1" y1="1" x2="23" y2="23"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {error && <p className="login-error">{error}</p>}

                <button type="submit" className="save-btn" disabled={isLoading}>
                    {isLoading ? <Loading isTxt={false} /> : 'כניסה'}
                </button>
            </form>
        </div>
    )
}
