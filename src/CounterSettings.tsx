import React, {ChangeEvent, useState} from 'react';
import Button from './components/Button';
import Counter from './Counter';

const CounterSettings = () => {
    const [maxValue, setMaxValue]=useState(5)
    const [startValue, setStartValue]=useState(0)
   /* const [warning, setWarning]=useState< string>("")*/
    const [activeSettingsDisplay, setActiveSettingsDisplay]=useState<boolean>(false)

    function changeMaxValue(event: ChangeEvent<HTMLInputElement>) {
        setActiveSettingsDisplay(true)
        setMaxValue(Number(event.currentTarget.value))
        /*if (startValue < maxValue){
            setWarning("Enter values and press 'set'")
        }
        if (startValue > maxValue || startValue <0 || maxValue <1 || startValue===maxValue){
            setWarning("Incorrect value")
        }*/
    }
    function changeStartValue(event: ChangeEvent<HTMLInputElement>) {
        setStartValue(Number(event.currentTarget.value))
    }

    function setValuesHandler() {
        setActiveSettingsDisplay(false)
        /*setWarning("")*/
    }

    return (
        <>
            <div className={'counter'}>
                <div className={'display'}>
                    <div className={'values'}>
                        <span>max value:</span>
                        <input  type={'number'} onChange={changeMaxValue} value={maxValue}/>
                    </div>
                    <div className={'values'}>
                        <span>start value:</span>
                        <input type={'number'} onChange={changeStartValue} value={startValue}/>
                    </div>
                </div>
                <div className={'controls'}>
                    <Button name={'set'} callback={setValuesHandler} disabled={!activeSettingsDisplay || startValue > maxValue || startValue <0 || maxValue <1 || startValue===maxValue} className={(activeSettingsDisplay || startValue > maxValue || startValue <0 || maxValue <1 || startValue===maxValue) ? '' : 'disabledTrue'} />

                </div>
            </div>
            <Counter maxValue={maxValue} startValue={startValue}  activeSettingsDisplay={activeSettingsDisplay}/>
        </>
    );
};

export default CounterSettings;