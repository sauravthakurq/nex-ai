'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@/lib/firebase';
import { toast } from 'sonner';
import { useFirebaseAuth } from '@/lib/firebase/auth-hook';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { user } = useFirebaseAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      await signInWithPopup(auth, googleProvider);
      toast.success('Successfully logged in with Google');
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Registration successful. You are logged in.');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Logged in successfully');
      }
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-background border rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header Image */}
            <div className="w-full relative overflow-hidden bg-background">
              <img 
                src="/kl.png" 
                alt="Login Header" 
                className="w-full h-auto md:h-56 object-cover object-center border-b border-border/50" 
                onError={(e) => {
                  e.currentTarget.src = "/logo-hh.png"; 
                }} 
              />
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Login Form content */}
            <div className="p-6 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Login or Register</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Proper Premium Age
                </p>
              </div>

              {!user ? (
                <>
                  <form onSubmit={handleEmailAuth} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 bg-transparent border rounded-md focus:ring-2 focus:ring-primary outline-none transition-all"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 bg-transparent border rounded-md focus:ring-2 focus:ring-primary outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Processing...' : (isRegister ? 'Register' : 'Sign In')}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full flex gap-2 items-center" onClick={handleGoogleSignIn} disabled={isSubmitting}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                      <path fill="none" d="M1 1h22v22H1z" />
                    </svg>
                    Google
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    {isRegister ? 'Already have an account?' : 'Need an account?'}
                    <button
                      type="button"
                      className="ml-1 text-primary hover:underline"
                      onClick={() => setIsRegister(!isRegister)}
                    >
                      {isRegister ? 'Sign In' : 'Register'}
                    </button>
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold uppercase">
                    {user.email?.[0]}
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{user.displayName || 'Settings Synced'}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => { signOut(auth); onClose(); }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}