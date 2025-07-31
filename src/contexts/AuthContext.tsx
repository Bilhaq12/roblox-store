import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: { full_name?: string; avatar_url?: string }) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'user',
          },
        },
      })
      
      if (error) {
        console.error('SignUp error:', error)
        return { error }
      }
      
      // Jika signup berhasil, coba buat user profile manual
      if (data.user) {
        try {
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
              id: data.user.id,
              full_name: fullName,
              role: 'user'
            })
          
          if (profileError) {
            console.error('Profile creation error:', profileError)
            // Jangan return error karena user sudah terbuat
          }
        } catch (profileErr) {
          console.error('Profile creation exception:', profileErr)
        }
      }
      
      return { error: null }
    } catch (err) {
      console.error('SignUp exception:', err)
      return { error: { message: 'Database error saving new user' } }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const updateProfile = async (updates: { full_name?: string; avatar_url?: string }) => {
    const { error } = await supabase.auth.updateUser({
      data: updates,
    })
    return { error }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 