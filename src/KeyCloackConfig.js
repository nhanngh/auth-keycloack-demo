import Keycloak from 'keycloak-js';
import { httpClient } from './HttpClient';

const kc = new Keycloak({
    realm: 'docbao-realm',
    url: 'http://localhost:8080',
    clientId: 'docbao-fe'
});

kc.init({
    onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
    checkLoginIframe: true,
    pkceMethod: 'S256'
  }).then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      /* Remove below logs if you are using this on production */
      console.info("Authenticated");
      console.log('auth', auth)
      console.log('Keycloak', kc)
      console.log('Access Token', kc.token)
  
      /* http client will use this header in every request it sends */
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;
  
      kc.onTokenExpired = () => {
        console.log('token expired')
      }
    }
  }, () => {
    /* Notify the user if necessary */
    console.error("Authentication Failed");
  });

export default kc
