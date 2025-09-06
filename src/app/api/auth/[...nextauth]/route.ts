import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { SupabaseAdapter } from '@auth/supabase-adapter'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async session({ session, user }) {
      // Get additional user data from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (session.user && profile) {
        session.user = {
          ...session.user,
          id: user.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          phone: profile.phone,
        }
      }

      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile) {
        try {
          // Create or update profile in our database
          const googleProfile = profile as any
          const { error } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              email: user.email!,
              first_name: googleProfile.given_name || googleProfile.name?.split(' ')[0] || '',
              last_name: googleProfile.family_name || googleProfile.name?.split(' ').slice(1).join(' ') || '',
            })

          if (error) {
            console.error('Error creating/updating profile:', error)
          }
        } catch (error) {
          console.error('Profile creation error:', error)
        }
      }
      return true
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'database',
  },
})

export { handler as GET, handler as POST }
