import React, {useEffect, useState} from 'react';
import Button from '../components/Button';

type CounterPropsType = {
    maxValue: number
    startValue: number
    activeSettingsDisplay: boolean
}
const Counter = (props: CounterPropsType) => {

const [number, setNumber]=useState<number>(props.startValue)
    const [warning, setWarning]=useState< string>("")

    useEffect(()=>{
        if (props.activeSettingsDisplay){
            setNumber(props.startValue)
        }

        if (props.startValue < props.maxValue){
            setWarning("Enter values and press 'set'")
        }
        if (props.startValue > props.maxValue || props.startValue <0 || props.maxValue <1 || props.startValue===props.maxValue){
            setWarning("Incorrect value")
        }

    },[props.startValue, props.maxValue, props.activeSettingsDisplay])
    useEffect(()=>{
        let startValueLS = localStorage.getItem('startValue')
        if (startValueLS) {
            setNumber(JSON.parse(startValueLS))
        }

    },[])
    function incHandler() {
        if (number<props.maxValue){
            setNumber(number+1)
        }
    }
    function resetHandler() {
        setNumber(props.startValue)
    }
    return (
            <div className={'counter'}>

                <div className={'display'}>
                    <div>
                        {props.activeSettingsDisplay ?
                            <span className={props.startValue > props.maxValue || props.startValue <0 || props.maxValue <1 || props.startValue===props.maxValue ? 'red warningFont' : 'warningFont'}>{warning}</span> :
                            <span className={number===props.maxValue ? 'red':'number'}>{number}</span>}
                    </div>
                </div>

                <div className={'controls'}>
                    <Button name={'inc'} callback={incHandler} disabled={number===props.maxValue || props.activeSettingsDisplay} className={(number===props.maxValue || props.activeSettingsDisplay) ? 'disabledTrue' : ''}/>
                    <Button name={'reset'} callback={resetHandler} disabled={props.activeSettingsDisplay} className={ props.activeSettingsDisplay ? 'disabledTrue' : ''}/>
                </div>
            </div>
    );
};

export default Counter;