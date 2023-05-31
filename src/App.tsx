import React, {useState, useEffect} from 'react';
import './App.css';
import LocalStorage from './localStorage/localStorage';
import CounterSettings from './CounterSettings';

function App() {


    return (
        <div className="App">
           {/* <LocalStorage/>*/}
            <CounterSettings/>

        </div>
    );
}

export default App;
