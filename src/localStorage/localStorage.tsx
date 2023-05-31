import React, {useState, useEffect} from 'react';

const LocalStorage = () => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(value))
    }, [value])

    const incHandler = () => {
        setValue(value + 1)
    }

    useEffect(() => {
        let valueAsString = localStorage.getItem('counterValue')
        if (valueAsString) {
            setValue(JSON.parse(valueAsString))
        }
    }, [])
    const clearLS = () => {
        localStorage.removeItem('counterValue')
        setValue(0)
    }

    return (
        <div>
            <div>{value}</div>
            <button onClick={incHandler}>increment</button>
            <button onClick={clearLS}>clearLS</button>
        </div>
    );
};

export default LocalStorage;