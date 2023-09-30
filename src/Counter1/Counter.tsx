import React, {useEffect} from 'react';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../bll/store';
import {getStartValueFromLSTC, resetAC, setNumberAC, setStartValueAC, setWarningAC} from '../bll/counter-reducer1';

type CounterPropsType = {
    maxValue: number
    startValue: number
    activeSettingsDisplay: boolean
}
const Counter = (props: CounterPropsType) => {
    const dispatch=useDispatch()
    const number=useSelector<AppRootStateType, number>(state => state.counter1.number)
    const warning=useSelector<AppRootStateType, string>(state => state.counter1.warning)

    useEffect(()=>{
        if (props.activeSettingsDisplay){
            dispatch(setNumberAC(props.startValue))
        }

        if (props.startValue < props.maxValue){
            dispatch(setWarningAC("Enter values and press 'set'"))
        }
        if (props.startValue > props.maxValue || props.startValue <0 || props.maxValue <1 || props.startValue===props.maxValue){
            dispatch(setWarningAC("Incorrect value"))
        }

    },[props.startValue, props.maxValue, props.activeSettingsDisplay])

    useEffect(()=>{
     // @ts-ignore
        dispatch(getStartValueFromLSTC())

    },[])
    function incHandler() {
        if (number<props.maxValue){
            dispatch(setNumberAC(number+1))
        }
    }
    function resetHandler() {
        dispatch(resetAC())
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