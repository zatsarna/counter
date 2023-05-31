import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '../components/Button';
import Counter from './Counter';

const Counter1Settings = () => {
    const [maxValue, setMaxValue]=useState(5)
    const [startValue, setStartValue]=useState(0)
   /* const [warning, setWarning]=useState< string>("")*/
    const [activeSettingsDisplay, setActiveSettingsDisplay]=useState<boolean>(false)

    function changeMaxValue(event: ChangeEvent<HTMLInputElement>) {
        setActiveSettingsDisplay(true)
        setMaxValue(Number(event.currentTarget.value))
    }
    function changeStartValue(event: ChangeEvent<HTMLInputElement>) {
        setActiveSettingsDisplay(true)
        setStartValue(Number(event.currentTarget.value))
    }
    useEffect(()=>{
        let startValueLS=localStorage.getItem('startValue')
        let maxValueLS=localStorage.getItem('maxValue')
        if (startValueLS){
            setStartValue(JSON.parse(startValueLS))
        }
        if (maxValueLS){
            setMaxValue(JSON.parse(maxValueLS))
        }

    },[])

    function setValuesHandler() {
        setActiveSettingsDisplay(false)
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }

    return (
        <>
            <div className={'counter'}>
                <div className={'display'}>
                    <div className={'values'}>
                        <span>max value:</span>
                        <input  type={'number'} onChange={changeMaxValue} value={maxValue} className={maxValue < 1 || startValue===maxValue || startValue>maxValue  ? 'redInput' : ''}/>
                    </div>
                    <div className={'values'}>
                        <span>start value:</span>
                        <input type={'number'} onChange={changeStartValue} value={startValue} className={startValue < 0 || startValue===maxValue || startValue>maxValue ? 'redInput' : ''}/>
                    </div>
                </div>
                <div className={'controls'}>
                    <Button name={'set'} callback={setValuesHandler} disabled={!activeSettingsDisplay ||startValue <0 || maxValue <1 ||startValue > maxValue ||   startValue===maxValue} className={(!activeSettingsDisplay ||startValue <0 || maxValue <1 ||startValue > maxValue ||   startValue===maxValue) ? 'disabledTrue' : ''} />

                </div>
            </div>
            <Counter maxValue={maxValue} startValue={startValue}  activeSettingsDisplay={activeSettingsDisplay}/>
        </>
    );
};

export default Counter1Settings;