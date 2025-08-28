import axios from 'axios';
// interface Token {
//   accessToken: string;
//   refreshToken: string;
//   error?: string;
// }

/**
 * Takes a token and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async (token: any): Promise<any> => {
  try {
    const url = `${process.env.API_URL}/auth/token/refresh/`;
    const response = await axios.post(url, { refresh: token.refreshToken });
    const refreshedTokens = await response.data;

    if (response.status !== 200) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access,
      // accessTokenExpires: Date.now() + 1 * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error: any) {
    console.error(error.message);
    // console.log(111);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export default refreshAccessToken;
