import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth.js'
import { setAuth } from '../lib/authStorage.js'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data } = await loginUser({ email, password })
      setAuth(data.accessToken, data.user)
      navigate('/posts', { replace: true })
    } catch (err) {
      setError(
        err.response?.data?.message ?? 'Login failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh w-full bg-[#050506] relative overflow-hidden flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Glow Effects */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(circle 600px at 50% -100px, rgba(255, 107, 74, 0.15), transparent),
            radial-gradient(circle 600px at 50% 110%, rgba(255, 107, 74, 0.05), transparent)
          `,
        }}
      />

      <div className="mx-auto flex w-full max-w-md flex-col justify-center relative z-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium tracking-widest text-[#ff9470] uppercase">
            StudentSphere
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-50 sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-stone-400">
            Sign in to continue to your account.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#14161c]/45 p-6 shadow-xl shadow-black/40 backdrop-blur-sm sm:p-8">
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
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-stone-300"
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
                className="w-full rounded-lg border border-white/10 bg-[#0c0d10]/60 px-4 py-2.5 text-stone-100 placeholder:text-stone-600 transition-colors outline-none focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ff6b4a]/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-stone-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full rounded-lg border border-white/10 bg-[#0c0d10]/60 px-4 py-2.5 text-stone-100 placeholder:text-stone-600 transition-colors outline-none focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ff6b4a]/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-[#ff6b4a] px-4 py-2.5 text-sm font-semibold text-[#0c0d10] shadow-lg shadow-[#ff6b4a]/20 transition-all hover:brightness-110 active:translate-y-px active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#ff6b4a]/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500">
            <Link to="/" className="text-[#ff9470]/90 hover:text-[#ff6b4a] transition-colors">
              ← Back to Home
            </Link>
          </p>
          <p className="mt-4 text-center text-sm text-stone-400">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-[#ff9470] transition-colors hover:text-[#ff6b4a]"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
