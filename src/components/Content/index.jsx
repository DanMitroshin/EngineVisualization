import React from 'react';
import styles from "./styles.module.scss";
import cn from 'classnames';
import {NavLink} from "react-router-dom";
import {MAIN_URL} from "../../constants";
import {withRouter} from 'react-router-dom';
/*import Header from "../Header";
import Footer from "../Footer";*/


function Content({history,
                     className="empty",
                     children}) {

    // function ChangePage() {
    //     window.scroll(0, 0);
    //     history.push(next);
    // }

    return <div className={styles.content_main}>
        {/*<Header/>*/}

        <div className={cn(styles.content, className)}>
            {children}
        </div>
        {/*<Footer/>*/}
    </div>;
}


export default withRouter(Content);
