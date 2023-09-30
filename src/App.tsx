import React, {useState, useEffect} from 'react';
import './App.css';
import LocalStorage from './localStorage/localStorage';
import Counter1Settings from './Counter1/CounterSettings';
import Counter2 from './Counter2/Counter2';

function App() {


    return (
        <div className="App">
          {/*  <LocalStorage/>*/}
            <Counter1Settings/>
            {/*<Counter2/>*/}

        </div>
    );
}

export default App;
