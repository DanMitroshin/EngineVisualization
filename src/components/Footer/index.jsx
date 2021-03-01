import React from 'react';
import styles from "./styles.module.scss";


function Footer() {

    return <div className={styles.footer}>
        <div className={styles.footer__inner}>
            <div>
            Some information
            </div>

            <div>
                @ MindON 2019-2020
            </div>
        </div>
    </div>;
}


export default Footer;
