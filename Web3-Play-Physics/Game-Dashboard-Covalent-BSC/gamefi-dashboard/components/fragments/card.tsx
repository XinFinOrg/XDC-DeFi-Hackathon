import styles from '../styles/card.module.css'
// import { FcAreaChart, FcBarChart, FcDoughnutChart } from 'react-icons/fc'
import { getKPIData } from '../../types'
import NumberFormat from 'react-number-format';

const Card = ({ kpidata }: { kpidata: getKPIData }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardBody}>
                <div className={styles.kpi}>
                    <div className={styles.titleKpi}>
                        {<kpidata.icon size={24} />}
                        <div style={{ color: '#a1a6b6' }}>{kpidata.title}</div>
                    </div>
                    <div style={{ fontSize: 12 }}>
                        24H
                    </div>
                </div>
                <div className={styles.number}>
                    <NumberFormat value={kpidata.value} displayType={'text'} thousandSeparator={true} />
                    <span className={styles.symbol}>{kpidata.symbol}</span>
                </div>
                <div className={styles.numberUSD}>
                    <NumberFormat value={kpidata.total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
            </div>
        </div>
    )
}

export default Card