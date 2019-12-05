import React from 'react'
import { Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ClientRequest } from 'electron';

async function authorize() {
  const response = await fetch('https://psd2.api.swedbank.com:443/psd2/authorize?bic=SANDEE2X&client_id=l7784313ebff4047cb98927be89594b6cf&response_type=code&scope=PSD2sandbox&redirect_uri=https://tolocalhost.com/3000');
  console.log(response);
}

async function createConsent() {
  const response = await fetch('https://psd2.api.swedbank.com:443/sandbox/v2/consents/?bic=SANDEE2X&app-id=l7784313ebff4047cb98927be89594b6cf', {
    method: 'POST',
    body: JSON.stringify({
      bic: 'SANDEE2X',
      'app-id': 'l7784313ebff4047cb98927be89594b6cf',
      response_type: 'code',
      scope: 'PSD2sandbox',
      redirect_uri: 'https://tolocalhost.com/3000',
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response);
}

async function getAccounts() {
  const request = new ClientRequest({
    url: 'https://psd2.api.swedbank.com:443/sandbox/v2/accounts?bic=SANDEE2X&app-id=l7784313ebff4047cb98927be89594b6cf',
  });
  console.log(request);
}

function App() {
  return (
    <Button
      variant='primary'
      onClick={() => getAccounts()}
    >
      Show me the money
    </Button>
  );
}

export default App