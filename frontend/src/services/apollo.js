import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const TESTNETURL = 'https://api-mumbai.lens.dev/';
const MAINNETURL = 'https://api.lens.dev';

const APIURL = MAINNETURL;

const httpLink = createHttpLink({
  uri: APIURL
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("accessToken");
  console.log("Authentication token", token);
  return {
    headers: {
      ...headers,
      'x-access-token': token ? `Bearer ${token}` : "",
    }
  }
})

export const apolloClient= new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})