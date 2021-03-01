import React from 'react';
import styles from './styles.module.scss';
import close_img from '../../assets/media/close.svg';

class PopUp extends React.Component {
    //constructor(props){super(props);}

    componentDidMount() {
        console.log("mount");
    }

    componentWillUnmount() {
        console.log("unmount");
    }

    render() {
        return <div className={styles.pop_up_background}>
            <div className={styles.pop_up_content}>
                <button className={styles.button_close} onClick={() => this.props.onClick()}>
                    <img alt={"close"} src={close_img} className={styles.close_img}/>
                </button>
                {this.props.children}
            </div>
        </div>;
    }
}

export default PopUp;