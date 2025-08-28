import CredentialsProvider from 'next-auth/providers/credentials';
import authCredentialsLogin from './authCredentialsLogin';
import refreshAccessToken from './refreshAccessToken';
// // import { NextAuthOptions,  } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import authCredentialsLogin from './authCredentialsLogin';
// import refreshAccessToken from './refreshAccessToken';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Omnic Cliper',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        // _req
        try {
          const body = {
            username: credentials.username,
            password: credentials.password,
          };
          const authUser = await authCredentialsLogin(body);
          // console.log(authUser)
          return authUser;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  site: process.env.NEXTAUTH_URL,
  secret: process.env.JWT_SICRECT_KEY,
  // pages: {
  //     signIn: '/login',
  //     signOut: '/api/auth/signout',
  //     error: '/login', // Error code passed in query string as ?error=
  //     verifyRequest: '/api/auth/verify-request', // (used for check email message)
  //     newUser: '/api/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  callbacks: {
    async signIn(data: any) {
      // const { user, account, _credentials, _profile } = data;
      const { user, account } = data;

      if (account.provider === 'credentials') {
        return user;
      }
      return false;
    },
    async jwt({ token, user, account }: any) {
      if (user && account.provider === 'credentials') {
        // token = user;
        return {
          // accessToken: user.access_token,
          // refreshToken: user.refresh_token,
          accessToken: user.access,
          refreshToken: user.refresh,
          user: user.user,
        };
      }
      return await refreshAccessToken(token);
    },

    async session({ session, token }: any) {
      // session = token;
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};
