import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '../components/Button';
import Counter from './Counter';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../bll/store';
import {
    getMaxValueFromLSTC,
    getStartValueFromLSTC,
    setActiveSettingsDisplayAC,
    setMaxValueAC,
    setStartValueAC, setValuesToLSTC
} from '../bll/counter-reducer1';

const Counter1Settings = () => {
    const dispatch=useDispatch()
    const maxValue=useSelector<AppRootStateType, number>(state => state.counter1.maxValue)
    const startValue=useSelector<AppRootStateType, number>(state => state.counter1.startValue)
    const activeSettingsDisplay=useSelector<AppRootStateType, boolean>(state => state.counter1.activeSettingsDisplay)

    function changeMaxValue(event: ChangeEvent<HTMLInputElement>) {
        dispatch(setActiveSettingsDisplayAC(true))
        dispatch(setMaxValueAC(Number(event.currentTarget.value)))
    }
    function changeStartValue(event: ChangeEvent<HTMLInputElement>) {
        dispatch(setActiveSettingsDisplayAC(true))
        dispatch(setStartValueAC(Number(event.currentTarget.value)))
    }
    useEffect(()=>{

        // @ts-ignore
        dispatch(getStartValueFromLSTC())
        // @ts-ignore
        dispatch(getMaxValueFromLSTC())

    },[])

    function setValuesHandler() {
        // @ts-ignore
        dispatch(setValuesToLSTC(startValue,maxValue))
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