import React from 'react';
import styles from "./styles.module.scss";
import Content from "../../components/Content";

function NotFoundPage() {

    return <Content>
        <div className={styles.main_content}>
            <div className={styles.content}>
                <div className={styles._white}>
                    <h1>
                        Упс...
                        <br/>
                        Похоже, мы не нашли то, что вы искали.
                    </h1>
                    <p>
                        Перепроверьте правильность введенного адреса или пишите нам в поддержку:
                        ... address ...
                    </p>
                </div>
            </div>
        </div>
        {/*<div className={styles.test_strips}>
            Информация...
        </div>*/}
    </Content>;
}


export default NotFoundPage;
