import React, { useState } from 'react';
import GoogleSignIn from '../components/GoogleSignIn.jsx';
import GoogleSignOut from '../components/GoogleSignOut.jsx';

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    
    if (!loggedIn) {
        var googleBtn= <GoogleSignIn setLoggedIn={setLoggedIn.bind(null)} setName={setName.bind(null)} setEmail={setEmail.bind(null)} setUrl={setUrl.bind(null)}/> 
    } else{
        var googleBtn= <GoogleSignOut setLoggedIn={setLoggedIn.bind(null)} setName={setName.bind(null)} setEmail={setEmail.bind(null)} setUrl={setUrl.bind(null)}/>
    }
    
    return (
    <div className="app">
      {googleBtn}
      <h4>REACT HOOKS WORLD</h4>
    </div>
    )

}
export default App;