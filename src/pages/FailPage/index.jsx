import React from 'react';
import styles from "./styles.module.scss";
import Content from "../../components/Content";
import {MAIN_URL} from "../../constants";
import polygon from "../../assets/media/polygon.png";
import {httpPost} from "../../helpers/networks";


function FailPage() {

    return <Content>
        <div className={styles.mainDiv}>
            <p>Произошла ошибка при оплате.</p>
            <p>Попробуйте ещё раз!</p>
        </div>
    </Content>
}

export default FailPage;
