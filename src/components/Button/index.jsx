import React from "react";
import styles from './styles.module.scss';

import cn from 'classnames';

function Button({onClick = () => {}, className="styles.empty_class", type = "orange", children, ...props}) {

    return <button className={cn(styles.button,
        type === "orange" && styles.button_orange, type === "green" && styles.button_green, className)}
                   onClick={() => onClick()} {...props}>
        {children}
    </button>;
}


export default Button;
