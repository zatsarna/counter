import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '../components/Button';
import s from './Counter2.module.css'

const Counter2 = () => {
    const [maxValue, setMaxValue] = useState(5)
    const [startValue, setStartValue] = useState(0)
    const [activeSettingsDisplay, setActiveSettingsDisplay] = useState<boolean>(false)
    const [number, setNumber] = useState<number>(startValue)

    useEffect(() => {
        if (activeSettingsDisplay) {
            setNumber(startValue)
        }
    }, [startValue, maxValue,activeSettingsDisplay])

    function incHandler() {
        if (number < maxValue) {
            setNumber(number + 1)
        }
    }
    function resetHandler() {
        setNumber(startValue)
    }
    function changeMaxValue(event: ChangeEvent<HTMLInputElement>) {
        setActiveSettingsDisplay(true)
        setMaxValue(Number(event.currentTarget.value))
    }
    function changeStartValue(event: ChangeEvent<HTMLInputElement>) {
        setActiveSettingsDisplay(true)
        setStartValue(Number(event.currentTarget.value))
    }
    useEffect(() => {
        let startValueLS2 = localStorage.getItem('startValue2')
        let maxValueLS2 = localStorage.getItem('maxValue2')
        if (startValueLS2) {
            setStartValue(JSON.parse(startValueLS2))
            setNumber(JSON.parse(startValueLS2))
        }
        if (maxValueLS2) {
            setMaxValue(JSON.parse(maxValueLS2))
        }

    }, [])
    function setValuesHandler() {
        setActiveSettingsDisplay(!activeSettingsDisplay)
        localStorage.setItem('startValue2', JSON.stringify(startValue))
        localStorage.setItem('maxValue2', JSON.stringify(maxValue))
    }

    return (
            <div className={'counter'}>
                <div className={'display'}>
                        {activeSettingsDisplay ? <>
                                <div className={'values'}>
                                    <span>max value:</span>
                                    <input type={'number'} onChange={changeMaxValue} value={maxValue}
                                           className={maxValue < 1 || startValue === maxValue || startValue > maxValue ? 'redInput' : ''}/>
                                </div>
                                <div className={'values'}>
                                    <span>start value:</span>
                                    <input type={'number'} onChange={changeStartValue} value={startValue}
                                           className={startValue < 0 || startValue === maxValue || startValue > maxValue ? 'redInput' : ''}/>
                                </div>
                            </>
                            :
                            <span className={number === maxValue ? 'red' : 'number'}>{number}</span>}
                </div>

                <div className={'controls'}>
                    <Button name={'inc'} callback={incHandler} disabled={number === maxValue || activeSettingsDisplay}
                            className={activeSettingsDisplay ? s.buttonDisplayNone : number === maxValue ? 'disabledTrue' : ''}/>
                    <Button name={'reset'} callback={resetHandler} disabled={activeSettingsDisplay}
                            className={activeSettingsDisplay ? s.buttonDisplayNone : ''}/>
                    <Button name={'set'} callback={setValuesHandler}
                            disabled={startValue < 0 || maxValue < 1 || startValue > maxValue || startValue === maxValue}
                            className={(startValue < 0 || maxValue < 1 || startValue > maxValue || startValue === maxValue) ? 'disabledTrue' : ''}/>
                </div>
            </div>
    );
};

export default Counter2;