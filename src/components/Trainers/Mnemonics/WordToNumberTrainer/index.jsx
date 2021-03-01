import React from 'react';
import Button from "../../../Button";
import {MAIN_URL} from "../../../../constants";
import {NavLink} from "react-router-dom";

class WordToNumberTrainer extends React.Component {
    constructor(props) {
        super(props);
        this.words = ["арбуз", "банан", "варенье", "груша", "дыня", "ежевика"];
        this.savedAnswers = [];

        this.currentWordIndex = 0;

        this.state = {answer: ""};
        this.score = 0;
        this.isFinished = false;

        this.handleAnswerUpdate = this.handleAnswerUpdate.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    handleAnswerUpdate(event) {
        this.setState({answer: event.target.value});
    }

    convertWordToNumber(word) {
        const dict = {
            'л': '0', 'н': '1', 'д': '2', 'б': '3', 'ч': '4', 'п': '5', 'ш': '6', 'с': '7', 'в': '8', 'ц': '9'
        };
        let result = "";
        word = word.toLowerCase();
        for (let i = 0; i < word.length; i++) {
            if (word[i] in dict)
                result += dict[word[i]];
        }
        return result;
    }

    onButtonClick() {
        this.savedAnswers.push(this.state.answer);
        this.setState({answer: ""});
        this.currentWordIndex += 1;
        if (this.currentWordIndex >= this.words.length) {
            this.isFinished = true;
        }
    }

    getResultsTable() {
        this.score = 0;
        let table = [["Слово", "Мой ответ", "Правильный ответ", "Балл"]];

        for (let i = 0; i < this.words.length; i++) {
            let realAnswer = this.convertWordToNumber(this.words[i]);
            let isCorrect = (this.savedAnswers[i] === realAnswer) ? 1 : 0;

            this.score += isCorrect;
            table.push([this.words[i], this.savedAnswers[i], realAnswer, isCorrect]);
        }

        return <div>
            <table>
                {table.map((lst, key) => {
                    return <tr key={key}>{
                        lst.map((text, key2) => {
                            return <th key={key2}>{text}</th>
                        })}</tr>
                })}
                <tr>
                    <th> </th>
                    <th> </th>
                    <th>{"Ваш результат:"}</th>
                    <th>{this.score}</th>
                </tr>
            </table>
        </div>;
    }

    render() {
        if (!this.isFinished) {
            return <div>
                {this.words[this.currentWordIndex]}
                <div>
                    {"Ваш ответ:"}
                    <input type="text"
                           value={this.state.answer}
                           onChange={this.handleAnswerUpdate}/>
                </div>
                <Button onClick={this.onButtonClick}
                        style={{marginBottom: "10px"}}>
                    Дальше!
                </Button>
            </div>;
        }

        return <div>
            {this.getResultsTable()}
            <NavLink to={MAIN_URL.COURSES}>
                <Button>Завершить</Button>
            </NavLink>
        </div>
    }
}

export default WordToNumberTrainer;