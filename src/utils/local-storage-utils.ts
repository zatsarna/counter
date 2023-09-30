import {AppRootStateType, store} from '../bll/store';

export const loadState=()=>{
    try {
        let stateFromLS = localStorage.getItem('app-state')
        if (stateFromLS===null){
            return undefined
        }
        return JSON.parse(stateFromLS)
    } catch(err){
        return undefined
    }
}
export const saveState=(state: AppRootStateType)=>{
    try {
        localStorage.setItem('app-state', JSON.stringify(state))
    } catch{

    }
}