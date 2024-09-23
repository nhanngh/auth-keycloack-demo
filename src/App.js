import React from 'react';
import './App.css';
import kc from './KeyCloackConfig';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';


const App = () => {

  const [infoMessage, setInfoMessage] = React.useState('');

  /* To demonstrate : http client adds the access token to the Authorization header */
  // const callBackend = () => {
  //   httpClient.get('https://mockbin.com/request')

  // };

  return (
    <div className="App">
      <div className='grid'>
        <div className='col-12'>
          <h1>My Secured React App</h1>
        </div>
      </div>
      <div className="grid">

      </div>

      <div className='grid'>
        <div className='col-2'>
          <div className="col">
            <Button onClick={() => { setInfoMessage(kc.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE') }}
              className="m-1 custom-btn-style"
              label='Is Authenticated' />

            <Button onClick={() => { kc.login() }}
              className='m-1 custom-btn-style'
              label='Login'
              severity="success" />

            <Button onClick={() => { setInfoMessage(kc.token) }}
              className="m-1 custom-btn-style"
              label='Show Access Token'
              severity="info" />

            <Button onClick={() => { setInfoMessage(JSON.stringify(kc.tokenParsed, null, 4)) }}
              className="m-1 custom-btn-style"
              label='Show Parsed Access token'
              severity="warning" />

            <Button onClick={() => { setInfoMessage(kc.isTokenExpired(5).toString()) }}
              className="m-1 custom-btn-style"
              label='Check Token expired'
              severity="info" />

            <Button onClick={() => { kc.updateToken(10).then((refreshed) => { setInfoMessage('Token Refreshed: ' + refreshed.toString()) }, (e) => { setInfoMessage('Refresh Error') }) }}
              className="m-1 custom-btn-style"
              label='Update Token (if about to expire)' />  {/** 10 seconds */}

            {/* <Button onClick={callBackend}
              className='m-1 custom-btn-style'
              label='Send HTTP Request'
              severity="success" /> */}

            <Button onClick={() => { kc.logout({ redirectUri: 'http://localhost:3000/' }) }}
              className="m-1 custom-btn-style"
              label='Logout'
              severity="danger" />

            <Button onClick={() => { setInfoMessage(kc.hasRealmRole('admin').toString()) }}
              className="m-1 custom-btn-style"
              label='has realm role "Admin"'
              severity="info" />

            <Button onClick={() => { setInfoMessage(kc.hasResourceRole('test').toString()) }}
              className="m-1 custom-btn-style"
              label='has client role "test"'
              severity="info" />

          </div>
        </div>
        <div className='col-6'>
          <Card>
            <pre style={{ wordBreak: 'break-all' }} id='infoPanel'>
              {infoMessage}
            </pre>
          </Card>
        </div>

        <div className='col-2'></div>
      </div>
    </div>
  );
};
export default App;