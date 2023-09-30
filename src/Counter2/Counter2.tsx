import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '../components/Button';
import s from './Counter2.module.css'
import {
    getValuesFromLSTC,
    increaseAC,
    resetAC,
    setActiveSettingsDisplayAC,
    setMaxValueAC,
    setNumberAC,
    setStartValueAC, setValuesToLSTC
} from '../bll/counter-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../bll/store';

const Counter2 = () => {
    const dispatch=useDispatch()
    const number=useSelector<AppRootStateType, number>(state => state.counter.number)
    const maxValue=useSelector<AppRootStateType, number>(state => state.counter.maxValue)
    const startValue=useSelector<AppRootStateType, number>(state => state.counter.startValue)
    const activeSettingsDisplay=useSelector<AppRootStateType, boolean>(state => state.counter.activeSettingsDisplay)

    useEffect(() => {
        if (activeSettingsDisplay) {
            dispatch(setNumberAC(startValue))
        }
    }, [startValue, maxValue,activeSettingsDisplay])

    function incHandler() {
        dispatch(increaseAC())
    }
    function resetHandler() {
        dispatch(resetAC())
    }
    function changeMaxValue(event: ChangeEvent<HTMLInputElement>) {
        dispatch(setActiveSettingsDisplayAC(true))
        dispatch(setMaxValueAC(Number(event.currentTarget.value)))
    }
    function changeStartValue(event: ChangeEvent<HTMLInputElement>) {
        dispatch(setActiveSettingsDisplayAC(true))
        dispatch(setStartValueAC(Number(event.currentTarget.value)))
    }
    useEffect(() => {
        // @ts-ignore
        dispatch(getValuesFromLSTC())

    }, [])
    function setValuesHandler() {
        // @ts-ignore
        dispatch(setValuesToLSTC(activeSettingsDisplay,startValue, maxValue))
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