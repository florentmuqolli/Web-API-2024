import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
    const [isRegistering, setIsRegistering] = useState(true); 

    return (
        <div>
            <Header />
            <h1>{isRegistering ? 'Regjistrohu' : 'Identifikohu'}</h1>
            {isRegistering ? <Register /> : <Login />}
            <div className="d-flex justify-content-center align-items-center">
            <button onClick={() => setIsRegistering(!isRegistering)} className='btn btn-link mt-2 '>
                Kaloni në {isRegistering ? 'Identifikim' : 'Regjistrim'}
            </button></div>
            <Footer />
        </div>
    );
};

export default App;
