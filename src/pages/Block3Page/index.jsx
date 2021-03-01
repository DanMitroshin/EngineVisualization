import React from 'react';
import Content from "../../components/Content";
import styles from "./styles.module.scss";
import {MAIN_URL} from "../../constants";


function Block3Page() {

    const train = [
        {q: "Кактус", a: "0016"},
        {q: "Колонка", a: "020"},
        {q: "Тетрадь", a: "119"},
        {q: "Носки", a: "260"},
        {q: "Бешенство", a: "32618"},
        {q: "Велосипедист", a: "865961"},
        {q: "Большинство", a: "32618"},
        {q: "Русские вперёд", a: "660859"},
        {q: "Ваканда навеки", a: "8029280"},
        {q: "Торопись медленно", a: "156922"},
        {q: "Промедление опасно", a: "592562"},
        {q: "Прекрасное недолговечно", a: "5062297842"},
        {q: "Нас зовут послушать Гоголя", a: "2681563177"},
        {q: "Это же элементарно, Ватсон", a: "12128162"},
        {q: "Лучшие уроки дают экзамены", a: "4309102"}
    ];

    const len = train.length;

    const Answer = () => ({

    });

    function Right (index) {
        document.getElementById(index.toString()).classList.add(styles.right);
        document.getElementById(index.toString()).classList.remove(styles.wrong)
    };

    function Wrong (index) {
        document.getElementById(index.toString()).classList.remove(styles.right);
        document.getElementById(index.toString()).classList.add(styles.wrong)
    };

    return <Content next={MAIN_URL.BLOCK_4}>
        <h1>Мега история</h1>
        <h2> Блок №3 - Тренировка</h2>
        <br/>
        <p>
            Перед тем, как мы начнём шифровать даты, я предлагаю тебе закрепить навык перевода букв в числа.
            Только тренироваться будем уже на целых словах и фразах.
        </p>
        <p>
            Если тебе кажется, что отработка и тренировка тебе не нужна,
            то смело листай вниз и переходи к изучению конкретных дат.
        </p>
        <p>
            Лучше записывай свои ответы во время выполнения и сверяй с правильными при необходимости.
            <b> Когда ответ станет верным, поле будет подсвечено зелёным. </b>
            Погнали.
        </p>
        <ol className={styles.bullet}>
            {train.map(
                (elem, index) =>
                    <li id={index.toString()} key={index.toString()}>
                        <b>{elem.q}</b><br/>
                        <i>Ответ: </i>
                        <input
                            className={styles.input_local}
                            placeholder={"Твой ответ"}
                            onChange={(e) =>
                                e.target.value === elem.a ?
                                    Right(index) : Wrong(index)
                        }/>
                    </li>
            )}
        </ol>

        <div className={styles.author}/>

        <p>
            Отлично!
            Ещё немного, и ты будешь на автомате видеть шифр за каждой фразой.
            Пришло время перейти к самим датам. <br/>
            <b>Переходи дальше.</b>
        </p>

    </Content>
}

export default Block3Page;
