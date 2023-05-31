import React from 'react';
type ButtonPropsType={
    name: string
    callback: ()=>void
    disabled:true |false
    className?: string
}
const Button: React.FC<ButtonPropsType> = (props) => {
    return (
        <button onClick={props.callback} disabled={props.disabled} className={props.className}>{props.name}</button>
    );
};

export default Button;