import { useRouter } from "next/router"
import styles from '..//../styles/Home.module.css'
import CardImage from "../../components/fragments/CardImage"
import CardStat from "../../components/fragments/CardStat"
import CardHistory from "../../components/fragments/CardHistory"
import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "../../components/fragments/laoder"
import Account from "../../components/fragments/account"

const Cadabra = () => {
    const [dataAttributes, setDataAttributes] = useState<any[]>([])
    const [isLoading, setLoading] = useState(false)
    const [classData, setClassData] = useState('')
    const [owner, setOwner] = useState('')

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const fetchingData = async () => {
            if (!router.isReady) return;
            setLoading(true)
            console.log(id)
            await axios.get(`https://api.covalenthq.com/v1/43114/tokens/0x1b7966315ef0259de890f38f1bdb95acc03cacdd/nft_metadata/${id}/?quote-currency=USD&format=JSON&key=${process.env.NEXT_PUBLIC_API_KEY}`)
                .then((res) => {
                    setOwner(res.data.data.items[0].nft_data[0].owner)
                    setClassData(res.data.data.items[0].nft_data[0].external_data.attributes[1].value)
                    setDataAttributes(res.data.data.items[0].nft_data[0].external_data.attributes.slice(6))
                    setLoading(false)
                }).catch((err) => {
                    console.log(err)
                })
        }

        fetchingData()
    }, [router.isReady])

    function start_and_end(str: string) {
        if (str.length > 35) {
            return str.substr(0, 20) + '...' + str.substr(str.length - 10, str.length);
        }
        return str;
    }

    return (
        <div className={styles.mainLayout}>
            {!isLoading ?
                <div className={styles.flexDetail}>
                    <div className={styles.detailItem}>
                        <CardImage id={id} />

                        <div className={styles.titleStat}>Info Stats</div>
                        <CardStat data={dataAttributes} />
                        <div className={styles.titleStat}>Info Class</div>
                        <CardHistory dClass={classData} />
                    </div>
                </div> : <Loader />

            }

        </div>
    )
}
export default Cadabra