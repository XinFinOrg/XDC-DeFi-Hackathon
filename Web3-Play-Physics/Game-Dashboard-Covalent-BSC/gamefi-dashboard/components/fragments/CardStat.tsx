import styles from '../styles/CardStat.module.css'
import { GiHearts, GiSwordClash, GiShoulderArmor, GiSpeedometer, GiSabersChoc } from "react-icons/gi";
import Loader from './laoder';


const CardStat = ({ data }: { data: any }) => {
    return (
        <div className={styles.cardStatContainer}>
            {data.length > 0 ?
                <div className={styles.statWrapper}>
                    <div className={styles.statList}>
                        <div className={styles.detailList}>
                            <span style={{ color: '#777e90' }}>Health</span>
                        </div>
                        <div className={styles.detailList}>
                            <span style={{ color: '#777e90' }}>Attack</span>
                        </div>
                        <div className={styles.detailList}>
                            <span style={{ color: '#777e90' }}>Armor</span>
                        </div>
                        <div className={styles.detailList}>
                            <span style={{ color: '#777e90' }}>Speed</span>
                        </div>
                        <div className={styles.detailList}>
                            <span style={{ color: '#777e90' }}>Critical</span>
                        </div>
                    </div>
                    <div className={styles.statList}>
                        <div className={styles.detailList}>
                            <GiHearts color='green' /> {data[0].value}
                        </div>
                        <div className={styles.detailList}>
                            <GiSwordClash color='blue' /> {data[1].value}
                        </div>
                        <div className={styles.detailList}>
                            <GiShoulderArmor color='orange' /> {data[2].value}
                        </div>
                        <div className={styles.detailList}>
                            <GiSpeedometer color='red' /> {data[3].value}
                        </div>
                        <div className={styles.detailList}>
                            <GiSabersChoc color='green' /> {data[4].value}
                        </div>
                    </div>
                </div> : <Loader />

            }

        </div>
    )
}
export default CardStat