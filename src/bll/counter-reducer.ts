import {Dispatch} from 'redux';

export type Counter2StateType=typeof initialState2
const initialState2={
    maxValue: 5,
    startValue: 0,
    activeSettingsDisplay: false,
    number: 0
}
//initialState2.number=initialState2.startValue
type Counter2ActionTypes=increaseACType | resetACType | setActiveSettingsDisplayToTrueACType | setMaxValueACType | setStartValueACType | setNumberACType

type increaseACType=ReturnType<typeof increaseAC>
type resetACType=ReturnType<typeof resetAC>
type setActiveSettingsDisplayToTrueACType=ReturnType<typeof setActiveSettingsDisplayAC>
type setMaxValueACType=ReturnType<typeof setMaxValueAC>
type setStartValueACType=ReturnType<typeof setStartValueAC>
type setNumberACType=ReturnType<typeof setNumberAC>

export const increaseAC=()=>({type: 'INCREASE'} as const)
export const resetAC=()=>({type: 'RESET'} as const)
export const setActiveSettingsDisplayAC=(value: boolean)=>({
   type: 'setActiveSettingsDisplay', value
} as const)
export const setMaxValueAC=(maxVal: number)=>({type: 'SET-MAX-VALUE', maxVal} as const)
export const setStartValueAC=(startVal: number)=>({type: 'SET-START-VALUE', startVal} as const)
export const setNumberAC=(newNumber: number)=>({type: 'SET-NUMBER', newNumber} as const)


export const counter2Reducer=(state: Counter2StateType=initialState2, action: Counter2ActionTypes): Counter2StateType=>{
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
        default:
            return state
    }

}

//thunk
export const setValuesToLSTC=(activeSettingsDisplay: boolean,startValue: number, maxValue: number)=>(dispatch: Dispatch)=>{
    dispatch(setActiveSettingsDisplayAC(!activeSettingsDisplay))
    localStorage.setItem('startValue2', JSON.stringify(startValue))
    localStorage.setItem('maxValue2', JSON.stringify(maxValue))
}
export const getValuesFromLSTC=()=>(dispatch: Dispatch)=>{
    let startValueLS2 = localStorage.getItem('startValue2')
    let maxValueLS2 = localStorage.getItem('maxValue2')
    if (startValueLS2) {
        dispatch(setStartValueAC(JSON.parse(startValueLS2)))
        dispatch(setNumberAC(JSON.parse(startValueLS2)))
    }
    if (maxValueLS2) {
        dispatch(setMaxValueAC(JSON.parse(maxValueLS2)))
    }
}