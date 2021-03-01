import React from 'react';
import styles from "./styles.module.scss";
import Content from "../../components/Content";
import {MAIN_URL} from "../../constants";
import polygon from "../../assets/media/polygon.png";
import {httpPost} from "../../helpers/networks";


function StartPage() {

    const redirect_uri = "https://danmitroshin.github.io/donations/#/donations/thanks";

    const toPayment = () => {
        const request = "https://money.yandex.ru/oauth2/access/";
        const dop = "client_id=E5FB419C5F9F9E7081D8C58C48C67206AD918021FFE7DE97E1505CA66D8902F5&response_type=code\n" +
            "&redirect_uri=" + redirect_uri +
            "&scope=account-info";
        const body = {
            client_id: "E5FB419C5F9F9E7081D8C58C48C67206AD918021FFE7DE97E1505CA66D8902F5",
            response_type: "code",
            redirect_uri: redirect_uri,
            scope: "account-info"
        };
        const res = httpPost({request, body}).then(result => {
            console.log("RES:", result);
        })
    };

    return <Content>
        <div>
            {/*<img src={polygon} alt="poly"/>*/}
            <p>Mind ON</p>
        </div>
        <button onClick={toPayment}>ОПЛАТИТЬ</button>
    </Content>
}

export default StartPage;
