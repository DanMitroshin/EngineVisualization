import React, {useState, useEffect} from 'react';
import styles from "./styles.module.scss";
import Content from "../../components/Content";
import cn from 'classnames';
//import {MAIN_URL} from "../../constants";
//import polygon from "../../assets/media/polygon.png";
import {logs} from "../../constants/logs";
import Button from "../../components/Button";
import Input from "../../components/Input";


const coilsPositions = [
    -0.082, -0.071, -0.06, -0.049,
    0.049, 0.06, 0.071, 0.082
];

const coilsLinesNumbers = [1, 2, 3, 4];

const HALF_COIL = 0.01;
const k = 2000;
const center = 0.15;
const halfMagnet = 0.015;

const Coil = (index, current) => {
    return <div className={styles.coil}>
            {coilsLinesNumbers.map((e, i) => (
                <div key={i.toString()}
                    className={styles.coil_line}
                    style={{backgroundColor: `rgba(255, 20, 20, ${
                        Math.min(0.9, Math.max(0.1, (1 + 9 * Math.abs(current) / 25.0) / 10 * 0.9))
                    })`}}
                />
            ))}
        </div>
}

const ForceLine = (force, isTotalForce = true) => {
    if (Math.abs(force) < 0.01) {
        return <div/>
    }
    return force > 0.0 ?
        <div className={styles.force_line}
             style={{
                 left: `-${Math.min(Math.abs(force) / 10, 50)}px`,
                 top: isTotalForce ? '34px' : '20px',
                 width: `${Math.min(Math.abs(force) / 10, 50)}px`,
                 backgroundColor: isTotalForce ? "#0000ff" : "#ff0000",
             }}
        >
            <div
                className={styles.force_number}
                style={{top: isTotalForce ? '-20px' : '20px'}}
            >
                {Math.round(force)}
            </div>
        </div> : <div className={styles.force_line}
                      style={{
                          left: `60px`,
                          top: isTotalForce ? '34px' : '20px',
                          width: `${Math.min(Math.abs(force) / 10, 50)}px`,
                          backgroundColor: isTotalForce ? "#0000ff" : "#ff0000",
                      }}
        >
            <div
                className={styles.force_number}
                style={{top: isTotalForce ? '-20px' : '20px'}}
            >
                {Math.round(force)}
            </div>
        </div>
};


function SuccessPage() {
    
    const [data, setData] = useState(logs);
    const [log, setLog] = useState(logs[0]);

    const [counter, _setCounter] = useState(0);
    const setNextCounter = (value = -1) => {
        if (value === -1) {
            if (counter < LAST_INDEX) {
                _setCounter(c => c + 1)
            } else {
                _setCounter(0)
            }
        } else {
            _setCounter(value)
        }
    }

    useEffect(() => {
        try {
            setLog(data[counter])
        } catch (e) {
            _setCounter(0)
            setLog(logs[0]);
            setData(logs)
        }
    }, [counter, data])
    

    //const [intervalID, setIntervalID] = useState(undefined);
    const [stop, setStop] = useState(false);

    const [prevAC, setPrevAC] = useState(0.0)
    //const [curAC, setCurAC] = useState(0.0)

    const [prevWork, setPrevWork] = useState(0.0)

    useEffect(() => {
        if (counter === 0) {
            setPrevAC(0.0)
            setPrevWork(0.0)
            //setCurAC(0.0)
        } else if (counter > 10) {
            if (log.p === 1 && data[counter - 1].p === 6) {
                setPrevAC(data[counter - 1].ac)
                setPrevWork(data[counter - 1].w)
            }
            //setCurAC(log.ac)
        }
    }, [counter, log, data])

    const [time, _setTime] = useState("5")
    const setTime = (data) => {
        try {
            setStop(true)
            const num = parseInt(data)
            if (num < 1) {
                _setTime("1")
            } else if (num > 1000) {
                _setTime("1000")
            } else {
                _setTime(data)
            }
            setTimeout(() => setStop(false), Math.max(num * 2, 100))
        } catch (e) {
            _setTime("5")
            setTimeout(() => setStop(false), 100)
        }
    }

    const pAtm = 101325;
    const LAST_INDEX = data.length - 8;

    useEffect(() => {
        if (!stop) {
            setTimeout(() => setNextCounter(), parseInt(time));
        } else {
            //clearInterval(intervalID);
        }
    }, [stop, counter, time])

    const onPause = () => {
        setStop(s => !s)
    }

    const onRestart = () => {
        setStop(true)
        setNextCounter(0);
        setTimeout(() => {
            setStop(false);
        }, Math.max(200, parseInt(time) * 2.1))
    }

    const onFile = (e) => {
        // console.log("INPUT", input)
        // return;

        setStop(true)
        _setCounter(0);
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        // const file = input.files[0];
        //
        // const reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function() {
            setData(eval(reader.result));
            //console.log(reader.result);
        };

        reader.onerror = function() {
            console.log(reader.error);
        };

    }

    return <Content>
        <div className={styles.main_info}>
            <div>phase: {log.p}</div>
            <div>time: {log.t}</div>
            <div>counter: {counter}</div>
            <div>KPD: {Math.round(log.w / 65.0 / (log.ac + 0.0000001) * 100) / 100}%</div>
        </div>
        <div className={styles.buttons_div}>
            <Button onClick={onPause} className={styles.button_action}>
                {stop ? "START" : "PAUSE"}
            </Button>
            <Button onClick={onRestart} className={styles.button_action} type="black">
                RESTART
            </Button>
            <Input data={time} changeData={setTime} label="Интервал от 1 до 1000"/>
            <input
                type="file"
                onChange={(e) => onFile(e)}
            />
            {/*<div className={styles.input__wrapper}>*/}
            {/*    <input type="file" name="file" id="input__file"*/}
            {/*           className={styles.input__file} multiple/>*/}
            {/*        <label htmlFor="input__file" className={styles.input__file_button}>*/}
            {/*            /!*<span className="input__file-icon-wrapper">*!/*/}
            {/*            /!*    <img className="input__file-icon" src="./img/add.svg"*!/*/}
            {/*            /!*                                                alt="Выбрать файл" width="25"/>*!/*/}
            {/*            /!*    </span>*!/*/}
            {/*            <span className={styles.input__file_button_text}>Выберите файл</span>*/}
            {/*        </label>*/}
            {/*</div>*/}
        </div>


        <div className={styles.mainDiv}>
            <div className={styles.work_div}>
                <div id="air-consumption"
                    className={styles.progress_line}
                     style={{
                         backgroundColor: "#ff0000",
                         width: `${Math.round((log.ac - prevAC) * 6000)}px`
                     }}
                >
                    Air consumption
                </div>
                <div id="useful-work"
                    className={styles.progress_line}
                     style={{
                         backgroundColor: "#0000ff",
                         width: `${Math.round((log.w - prevWork) * 20)}px`
                     }}
                >
                    Useful work
                </div>
            </div>
            <div className={styles.engine_tube}>
                <div
                    id="left-camera"
                    className={styles.camera}
                    style={{
                        left: '30px',
                        width: k * (center + log.x1 - halfMagnet * 2) + 'px',
                        backgroundColor: `rgba(5, 5, 255, ${Math.min(1.0, log.p1 / pAtm / 15)})`
                    }}
                />
                <div
                    id="central-camera"
                    className={styles.camera}
                    style={{
                        left: k * (center + log.x1 + halfMagnet) + 'px',
                        width: k * (-log.x1 + log.x2 - halfMagnet * 2) + 'px',
                        backgroundColor: `rgba(5, 5, 255, ${Math.min(1.0, log.p2 / pAtm / 15)})`
                    }}
                />
                <div
                    id="right-camera"
                    className={styles.camera}
                    style={{
                        right: '30px',
                        width: k * (center - log.x2 - halfMagnet * 2) + 'px',
                        backgroundColor: `rgba(5, 5, 255, ${Math.min(1.0, log.p3 / pAtm / 15)})`
                    }}
                />
                {/*INFO CAMERAS*/}
                <div id="info-left-camera"
                    className={styles.main_info} style={{top: '-130px', left: '-30px'}}>
                    <div>phase: {log.p}</div>
                    <div>p: {log.p1} | {Math.floor(log.p1 / pAtm)}атм</div>
                    <div>t: {log.t1}</div>
                </div>
                <div id="info-central-camera"
                     className={styles.main_info} style={{top: '-130px', left: '220px'}}>
                    <div>phase: {log.p}</div>
                    <div>p: {log.p2} | {Math.floor(log.p2 / pAtm)}атм</div>
                    <div>t: {log.t2}</div>
                </div>
                <div id="info-right-camera"
                     className={styles.main_info} style={{top: '-130px', left: '480px', width: '140px'}}>
                    <div>phase: {log.p}</div>
                    <div>p: {log.p3} | {Math.floor(log.p3 / pAtm)}атм</div>
                    <div>t: {log.t3}</div>
                </div>

                <div
                    id="left-valve"
                    className={styles.valve}
                    style={{
                        left: '40px',
                        backgroundColor: (log.p === 1 || log.p === 5 ||
                            log.p === 7) ? "#0000ff" : (log.p === 6 ?
                            "#ffffff" : "#000000"),
                        height: (log.p === 1 || log.p === 5 ||
                            log.p === 7) ? '10px' : (log.p === 6 ?
                            '10px' : '6px')
                    }}
                />

                <div
                    id="center-valve"
                    className={styles.valve}
                    style={{
                        left: '290px',
                        backgroundColor: (log.p === 3 || log.p === 6) ?
                            "#0000ff" : (log.p <= 2 ?
                            "#ffffff" : "#000000"),
                        height: (log.p === 3 || log.p === 6) ?
                            '10px' : (log.p <= 2 ?
                            '10px' : '6px')
                    }}
                />

                <div
                    id="right-valve"
                    className={styles.valve}
                    style={{
                        right: '45px',
                        backgroundColor: (log.p === 1 || log.p === 5 ||
                            log.p === 7) ? "#0000ff" : (log.p === 6 ?
                            "#ffffff" : "#000000"),
                        height: (log.p === 1 || log.p === 5 ||
                            log.p === 7) ? '10px' : (log.p === 6 ?
                            '10px' : '6px')
                    }}
                />

                {/*side magnets*/}
                <div className={cn(styles.magnet, styles.magnet_side_left)}/>
                <div className={cn(styles.magnet, styles.magnet_side_right)}/>
                {/*center magnets*/}
                <div className={cn(styles.magnet, styles.magnet_center)}
                     style={{left: k * (center + log.x1 - halfMagnet) + 'px'}}
                >
                    <div className={styles.main_info} style={{top: '80px', left: '-130px'}}>
                        <div>phase: {log.p}</div>
                        <div>x: {log.x1}</div>
                        <div>v: {log.v1}</div>
                        <div>a: {log.a1}</div>
                    </div>
                    {ForceLine(log.tf1)}
                    {ForceLine(log.f1, false)}
                </div>
                <div className={cn(styles.magnet, styles.magnet_center)}
                     style={{right: k * (center - log.x2 - halfMagnet) + 'px'}}
                >
                    <div className={styles.main_info} style={{top: '80px', left: '50px'}}>
                        <div>phase: {log.p}</div>
                        <div>x: {log.x2}</div>
                        <div>v: {log.v2}</div>
                        <div>a: {log.a2}</div>
                    </div>
                    {ForceLine(log.tf2)}
                    {ForceLine(log.f2, false)}
                </div>

                {
                    coilsPositions.map((pos, i) => (
                        <div key={i.toString()}
                             className={styles.coil_div}
                             style={{
                                 top: '-8px',
                                 left: k * (center + pos - HALF_COIL / 2) + 'px',
                                 //opacity: 0.6,
                                 backgroundColor: i % 2 ? 'rgba(172,172,172, 0.4)' :
                                     'rgba(144,222,209, 0.4)'
                             }}
                        >
                            {Coil(0, log[`c${i + 1}`])}
                            <div className={styles.coil_number}>
                                {Math.round(log[`c${i + 1}`])}
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    </Content>
}

export default SuccessPage;
