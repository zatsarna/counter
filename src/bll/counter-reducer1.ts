import {Dispatch} from 'redux';

export type Counter2StateType=typeof initialState2
const initialState2={
    maxValue: 5,
    startValue: 0,
    activeSettingsDisplay: false,
    number: 0,
    warning: ''
}
//initialState2.number=initialState2.startValue
type Counter2ActionTypes=increaseACType | resetACType | setActiveSettingsDisplayToTrueACType | setMaxValueACType | setStartValueACType | setNumberACType | setWarningACType

type increaseACType=ReturnType<typeof increaseAC>
type resetACType=ReturnType<typeof resetAC>
type setActiveSettingsDisplayToTrueACType=ReturnType<typeof setActiveSettingsDisplayAC>
type setMaxValueACType=ReturnType<typeof setMaxValueAC>
type setStartValueACType=ReturnType<typeof setStartValueAC>
type setNumberACType=ReturnType<typeof setNumberAC>
type setWarningACType=ReturnType<typeof setWarningAC>

export const increaseAC=()=>({type: 'INCREASE'} as const)
export const resetAC=()=>({type: 'RESET'} as const)
export const setActiveSettingsDisplayAC=(value: boolean)=>({
    type: 'setActiveSettingsDisplay', value
} as const)
export const setMaxValueAC=(maxVal: number)=>({type: 'SET-MAX-VALUE', maxVal} as const)
export const setStartValueAC=(startVal: number)=>({type: 'SET-START-VALUE', startVal} as const)
export const setNumberAC=(newNumber: number)=>({type: 'SET-NUMBER', newNumber} as const)
export const setWarningAC=(warning: string)=>({type: 'SET-WARNING', warning} as const)

export const counter1Reducer=(state: Counter2StateType=initialState2, action: Counter2ActionTypes): Counter2StateType=>{
    switch (action.type){
        case 'INCREASE':{
            return  (state.number < state.maxValue) ? {...state, number: state.number+1} : {...state}
        }
        case 'RESET':{
            return {...state, number: state.startValue}
        }
        case 'setActiveSettingsDisplay':{
            return {...state, activeSettingsDisplay: action.value}
        }
        case 'SET-MAX-VALUE':{
            return {...state, maxValue: action.maxVal}
        }
        case 'SET-START-VALUE':{
            return {...state, startValue: action.startVal}
        }
        case 'SET-NUMBER':{
            return {...state, number: action.newNumber}
        }
        case 'SET-WARNING':{
            return {...state, warning: action.warning}
        }
        default:
            return state
    }

}

//thunk
export const setValuesToLSTC=(startValue: number, maxValue: number)=>(dispatch: Dispatch)=>{
    dispatch(setActiveSettingsDisplayAC(false))
    localStorage.setItem('startValue', JSON.stringify(startValue))
    localStorage.setItem('maxValue', JSON.stringify(maxValue))
}
export const getStartValueFromLSTC=()=>(dispatch: Dispatch)=>{
    let startValueLS = localStorage.getItem('startValue')
    if (startValueLS) {
        dispatch(setStartValueAC(JSON.parse(startValueLS)))
    }
}
export const getMaxValueFromLSTC=()=>(dispatch: Dispatch)=>{
    let maxValueLS=localStorage.getItem('maxValue')

    if (maxValueLS){
        dispatch(setMaxValueAC(JSON.parse(maxValueLS)))
    }
}