import { Link, useNavigate } from 'react-router-dom'
import { Dialog, DialogActions } from '../ui/Dialog.jsx'
import { Button, buttonVariants } from '../ui/Button.jsx'
import { cn } from '../../lib/utils.js'

export function AuthPromptDialog({ open, onClose, action = 'do that' }) {
  const navigate = useNavigate()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="You'll need an account"
      description={`Sign in or register to ${action}. The feed stays public — participation doesn't.`}
    >
      <DialogActions>
        <Link
          to="/login"
          className={cn(buttonVariants({ variant: 'default', size: 'default' }))}
          onClick={() => {
            onClose()
            navigate('/login')
          }}
        >
          Log in
        </Link>
        <Link
          to="/register"
          className={cn(buttonVariants({ variant: 'secondary', size: 'default' }))}
          onClick={() => {
            onClose()
            navigate('/register')
          }}
        >
          Register
        </Link>
        <Button variant="ghost" onClick={onClose}>
          Keep browsing
        </Button>
      </DialogActions>
    </Dialog>
  )
}
