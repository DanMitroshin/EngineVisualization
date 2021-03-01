import React, {useState, useEffect} from 'react';
import styles from "./styles.module.scss";
import Content from "../../components/Content";
import cn from 'classnames';
import {MAIN_URL} from "../../constants";
import polygon from "../../assets/media/polygon.png";
import {httpPost} from "../../helpers/networks";
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
            {coilsLinesNumbers.map(e => (
                <div
                    className={styles.coil_line}
                    style={{backgroundColor: `rgba(255, 20, 20, ${
                        Math.min(1.0, Math.max(0.2, (1 + 3 * Math.abs(current) / 25.0) / 4))
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

    const [intervalID, setIntervalID] = useState(undefined);
    const [stop, setStop] = useState(false);

    const [prevAC, setPrevAC] = useState(0.0)
    const [curAC, setCurAC] = useState(0.0)

    const [prevWork, setPrevWork] = useState(0.0)

    useEffect(() => {
        if (counter === 0) {
            setPrevAC(0.0)
            setPrevWork(0.0)
            setCurAC(0.0)
        } else if (counter > 10) {
            if (logs[counter].p === 1 && logs[counter - 1].p === 6) {
                setPrevAC(logs[counter - 1].ac)
                setPrevWork(logs[counter - 1].w)
            }
            setCurAC(logs[counter].ac)
        }
    }, [counter])

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
    const LAST_INDEX = logs.length - 8;

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

    return <Content>
        <div className={styles.main_info}>
            <div>phase: {logs[counter].p}</div>
            <div>time: {logs[counter].t}</div>
            <div>counter: {counter}</div>
        </div>
        <div className={styles.buttons_div}>
            <Button onClick={onPause} className={styles.button_action}>
                {stop ? "START" : "PAUSE"}
            </Button>
            <Button onClick={onRestart} className={styles.button_action}>
                RESTART
            </Button>
            <Input data={time} changeData={setTime} label="Интервал от 1 до 1000"/>
        </div>


        <div className={styles.mainDiv}>
            <div className={styles.work_div}>
                <div id="air-consumption"
                    className={styles.progress_line}
                     style={{
                         backgroundColor: "#ff0000",
                         width: `${Math.round((logs[counter].ac - prevAC) * 6000)}px`
                     }}
                >
                    Air consumption
                </div>
                <div id="useful-work"
                    className={styles.progress_line}
                     style={{
                         backgroundColor: "#0000ff",
                         width: `${Math.round((logs[counter].w - prevWork) * 20)}px`
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
                        width: k * (center + logs[counter].x1 - halfMagnet * 2) + 'px',
                        backgroundColor: `rgba(5, 5, 255, ${Math.min(1.0, logs[counter].p1 / pAtm / 15)})`
                    }}
                />
                <div
                    id="central-camera"
                    className={styles.camera}
                    style={{
                        left: k * (center + logs[counter].x1 + halfMagnet) + 'px',
                        width: k * (-logs[counter].x1 + logs[counter].x2 - halfMagnet * 2) + 'px',
                        backgroundColor: `rgba(5, 5, 255, ${Math.min(1.0, logs[counter].p2 / pAtm / 15)})`
                    }}
                />
                <div
                    id="right-camera"
                    className={styles.camera}
                    style={{
                        right: '30px',
                        width: k * (center - logs[counter].x2 - halfMagnet * 2) + 'px',
                        backgroundColor: `rgba(5, 5, 255, ${Math.min(1.0, logs[counter].p3 / pAtm / 15)})`
                    }}
                />
                {/*INFO CAMERAS*/}
                <div id="info-left-camera"
                    className={styles.main_info} style={{top: '-130px', left: '-30px'}}>
                    <div>phase: {logs[counter].p}</div>
                    <div>p: {logs[counter].p1} | {Math.floor(logs[counter].p1 / pAtm)}атм</div>
                    <div>t: {logs[counter].t1}</div>
                </div>
                <div id="info-central-camera"
                     className={styles.main_info} style={{top: '-130px', left: '220px'}}>
                    <div>phase: {logs[counter].p}</div>
                    <div>p: {logs[counter].p2} | {Math.floor(logs[counter].p2 / pAtm)}атм</div>
                    <div>t: {logs[counter].t2}</div>
                </div>
                <div id="info-right-camera"
                     className={styles.main_info} style={{top: '-130px', left: '480px', width: '140px'}}>
                    <div>phase: {logs[counter].p}</div>
                    <div>p: {logs[counter].p3} | {Math.floor(logs[counter].p3 / pAtm)}атм</div>
                    <div>t: {logs[counter].t3}</div>
                </div>

                {
                    coilsPositions.map((pos, i) => (
                        <div
                            className={styles.coil_div}
                            style={{
                                top: '-8px',
                                left: k * (center + pos - HALF_COIL / 2) + 'px',
                                //opacity: 0.6,
                                backgroundColor: i % 2 ? 'rgba(172,172,172, 0.4)' :
                                    'rgba(144,222,209, 0.4)'
                            }}
                        >
                            {Coil(0, logs[counter][`c${i + 1}`])}
                            <div className={styles.coil_number}>
                                {Math.round(logs[counter][`c${i + 1}`])}
                            </div>
                        </div>
                    ))
                }

                <div
                    id="left-valve"
                    className={styles.valve}
                    style={{
                        left: '40px',
                        backgroundColor: (logs[counter].p === 1 || logs[counter].p === 5 ||
                            logs[counter].p === 7) ? "#0000ff" : (logs[counter].p === 6 ?
                            "#ffffff" : "#000000"),
                        height: (logs[counter].p === 1 || logs[counter].p === 5 ||
                            logs[counter].p === 7) ? '10px' : (logs[counter].p === 6 ?
                            '10px' : '6px')
                    }}
                />

                <div
                    id="center-valve"
                    className={styles.valve}
                    style={{
                        left: '290px',
                        backgroundColor: (logs[counter].p === 3 || logs[counter].p === 6) ?
                            "#0000ff" : (logs[counter].p <= 2 ?
                            "#ffffff" : "#000000"),
                        height: (logs[counter].p === 3 || logs[counter].p === 6) ?
                            '10px' : (logs[counter].p <= 2 ?
                            '10px' : '6px')
                    }}
                />

                <div
                    id="right-valve"
                    className={styles.valve}
                    style={{
                        right: '45px',
                        backgroundColor: (logs[counter].p === 1 || logs[counter].p === 5 ||
                            logs[counter].p === 7) ? "#0000ff" : (logs[counter].p === 6 ?
                            "#ffffff" : "#000000"),
                        height: (logs[counter].p === 1 || logs[counter].p === 5 ||
                            logs[counter].p === 7) ? '10px' : (logs[counter].p === 6 ?
                            '10px' : '6px')
                    }}
                />

                {/*side magnets*/}
                <div className={cn(styles.magnet, styles.magnet_side_left)}/>
                <div className={cn(styles.magnet, styles.magnet_side_right)}/>
                {/*center magnets*/}
                <div className={cn(styles.magnet, styles.magnet_center)}
                     style={{left: k * (center + logs[counter].x1 - halfMagnet) + 'px'}}
                >
                    <div className={styles.main_info} style={{top: '80px', left: '-130px'}}>
                        <div>phase: {logs[counter].p}</div>
                        <div>x: {logs[counter].x1}</div>
                        <div>v: {logs[counter].v1}</div>
                        <div>a: {logs[counter].a1}</div>
                    </div>
                    {ForceLine(logs[counter].tf1)}
                    {ForceLine(logs[counter].f1, false)}
                </div>
                <div className={cn(styles.magnet, styles.magnet_center)}
                     style={{right: k * (center - logs[counter].x2 - halfMagnet) + 'px'}}
                >
                    <div className={styles.main_info} style={{top: '80px', left: '50px'}}>
                        <div>phase: {logs[counter].p}</div>
                        <div>x: {logs[counter].x2}</div>
                        <div>v: {logs[counter].v2}</div>
                        <div>a: {logs[counter].a2}</div>
                    </div>
                    {ForceLine(logs[counter].tf2)}
                    {ForceLine(logs[counter].f2, false)}
                </div>

            </div>
        </div>
    </Content>
}

export default SuccessPage;
