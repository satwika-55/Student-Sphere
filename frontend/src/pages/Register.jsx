import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/auth.js'
import { setAuth } from '../lib/authStorage.js'

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data } = await registerUser({ username, email, password })
      setAuth(data.accessToken, data.user)
      navigate('/', { replace: true })
    } catch (err) {
      setError(
        err.response?.data?.message ??
          'Registration failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-md flex-col justify-center sm:min-h-[calc(100svh-6rem)]">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium tracking-widest text-violet-400 uppercase">
            StudentSphere
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Join the community and start sharing with peers.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700/80 bg-slate-800/40 p-6 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-8">
          {error && (
            <p
              role="alert"
              className="mb-5 rounded-lg border border-red-500/40 bg-red-950/50 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <form className="space-y-5 text-left" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-medium text-slate-200"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                disabled={loading}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 transition-colors outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-200"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                disabled={loading}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 transition-colors outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 transition-colors outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition-colors hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-900 active:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Register'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-500">
            <Link to="/" className="text-violet-400/90 hover:text-violet-300">
              ← Back to feed
            </Link>
          </p>
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-violet-400 transition-colors hover:text-violet-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
