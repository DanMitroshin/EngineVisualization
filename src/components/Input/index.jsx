import React from "react";
import styles from "./styles.module.scss";

function Input({label="", data = "", changeData = () => {}, ...props}) {


    return <div className={styles.field_input}>
        <label>{label}</label>
        <input className={styles.input}
               value={data}
               onChange={ e => changeData(e.target.value)} {...props}/>
    </div>;
}


export default Input;
