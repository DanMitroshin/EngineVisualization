import React from 'react';
import styles from "./styles.module.scss";
import Content from "../../components/Content";
import {MAIN_URL} from "../../constants";
import polygon from "../../assets/media/polygon.png";


function ThanksPage() {

    return <Content>
        <div>
            <img src={polygon} alt="poly"/>
            <p>THANKS</p>
        </div>
    </Content>
}

export default ThanksPage;
