import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Card from '../../components/fragments/card'
import { FcAreaChart, FcBarChart, FcDoughnutChart, FcFlowChart, FcLineChart, FcComboChart } from 'react-icons/fc'
import CardListed from '../../components/fragments/elfins/cardListed'
import axios from "axios";
import { useEffect, useState } from 'react'
import Loader from '../../components/fragments/laoder'

const Home: NextPage = () => {

    // set variables
    const [isLoading, setLoading] = useState(false)
    const [dataLogs, setDataLogs] = useState([])
    const [tusPrice, setTusPrice] = useState(0)
    const [dataListed, setDataListed] = useState<any[]>([])
    const [dataSale, setDataSale] = useState<any[]>([])

    // get last 24h timestmap to get block id
    const currentTime = new Date()
    currentTime.setDate(currentTime.getDate() - 1)
    const dateTime = new Date(currentTime).toISOString()

    // pass to api block 
    const apiBlock = `https://api.covalenthq.com/v1/56/block_v2/${dateTime}/latest/?quote-currency=USD&format=JSON&key=${process.env.NEXT_PUBLIC_API_KEY}`

    // calculate data laogs
    const calculateKPI = (data: any) => {
        let totalSale = 0
        let totalVolumes = 0
        let averagePrice = 0
        let totalUniqueWallet = 0
        let uniqueBuyyers: any[] = []
        let maxSales = 0
        let totalFee = 0

        data.map((item: any) => {
            if (parseInt(item.raw_log_topics[1], 16) == 1) {
                const logData = item.raw_log_data.substring(2)
                totalSale += 1
                totalVolumes += parseInt(logData.substring(65, 65 + 63), 16)
                if (!uniqueBuyyers.includes(item.raw_log_topics[2])) {
                    uniqueBuyyers.push(item.raw_log_topics[2])
                    totalUniqueWallet += 1
                }
                if (parseInt(logData.substring(65, 65 + 63), 16) > maxSales) {
                    maxSales = parseInt(logData.substring(65, 65 + 63), 16)
                }
            }

        })

        totalVolumes = totalVolumes / Math.pow(10, 18)
        averagePrice = totalVolumes / totalSale
        maxSales = maxSales / Math.pow(10, 18)
        totalFee = totalVolumes * 0.035
        return {
            totalSale, totalVolumes, totalUniqueWallet, averagePrice, maxSales, totalFee
        }
    }

    useEffect(() => {

        const getBlockId = async () => {
            setLoading(true)
            const dataBlockapi = await axios.get(apiBlock).then((res) => {
                return res.data
            }).catch((err) => {
                return err
            })

            // pass return from block api to log api
            const apiURLLog = `https://api.covalenthq.com/v1/56/events/topics/0xf8aae7edb540c4e7df330261c8876eda3044097438cd02d3bd183352d1f67ea7/?quote-currency=USD&format=JSON&starting-block=${dataBlockapi.data.items[0].height}&ending-block=latest&page-size=99999&sender-address=0xbb37a612407c0fc086f57f8a15a42400308c300e&key=${process.env.NEXT_PUBLIC_API_KEY}`

            const dataLogsApi = await axios.get(apiURLLog).then((res) => {
                return res.data
            }).catch((err) => {
                return err
            })

            // get $BNB price right now
            const apiPrice = `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/56/USD/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/?quote-currency=USD&format=JSON&key=${process.env.NEXT_PUBLIC_API_KEY}`

            const dataPrice = await axios.get(apiPrice).then((res) => {
                return res.data
            }).catch((err) => {
                return err
            })

            let listItemListed: any[] = []
            let listItemSold: any[] = []
            dataLogsApi.data.items.map((item: any) => {
                // get listed data
                const logData = item.raw_log_data.substring(2)
                if (parseInt(item.raw_log_topics[1], 16) == 1) {

                    listItemSold.push({
                        id: parseInt(item.raw_log_topics[3]),
                        price: parseInt(logData.substring(65, 65 + 63), 16) / Math.pow(10, 18),
                        status: 'Sold'
                    })
                }

                // get item sold
                if (parseInt(item.raw_log_topics[1], 16) == 0) {
                    listItemListed.push({
                        id: parseInt(item.raw_log_topics[3]),
                        price: parseInt(logData.substring(65, 65 + 63), 16) / Math.pow(10, 18),
                        status: 'Listed'
                    })
                }
            })
            // set data Sold
            setDataSale(listItemSold)
            // set data Listed
            setDataListed(listItemListed)
            // set data logs from API
            setDataLogs(dataLogsApi.data.items)
            // set data price from API
            setTusPrice(dataPrice.data[0].prices[0].price)
            // set loading false
            setLoading(false)

        }
        getBlockId()
    }, [])

    let dataKPI: any[] = []

    if (isLoading) {
        console.log('loading')
    } else {
        console.log('data loaded')

        const data = calculateKPI(dataLogs)
        dataKPI = [
            {
                title: 'Total Volumes',
                value: data.totalVolumes.toFixed(2),
                symbol: '$BNB',
                icon: FcBarChart,
                total: (data.totalVolumes * tusPrice).toFixed(2)
            },
            {
                title: 'Average Sale Price',
                value: data.averagePrice.toFixed(2),
                symbol: '$BNB',
                icon: FcDoughnutChart,
                total: (data.averagePrice * tusPrice).toFixed(2)
            },
            {
                title: 'Total Sale',
                value: data.totalSale,
                symbol: 'ELFINS',
                icon: FcAreaChart,
                total: ''
            },
            {
                title: 'Total Unique Buyers',
                value: data.totalUniqueWallet,
                symbol: 'ADDRESSES',
                icon: FcFlowChart,
                total: ''
            },
            {
                title: 'Highest Price Sale',
                value: data.maxSales.toFixed(2),
                symbol: '$BNB',
                icon: FcLineChart,
                total: (data.maxSales * tusPrice).toFixed(2)
            },
            {
                title: 'Fee Sale Collected',
                value: data.totalFee.toFixed(2),
                symbol: '$BNB',
                icon: FcComboChart,
                total: (data.totalFee * tusPrice).toFixed(2)
            },
        ]
    }


    return (
        <>
            <Head>
                <title>Crabada Marketplace</title>
            </Head>
            <div className={styles.mainLayout}>
                {!isLoading ?
                    (
                        <div className={styles.gridLayout}>
                            <div className={styles.gridKPI}>
                                {
                                    dataKPI && dataKPI.map((item, index) => {
                                        return (
                                            <div key={index} className={styles.itemCard}>
                                                <Card kpidata={item} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={styles.gridListed}>
                                <div className={styles.itemCardList}>
                                    <div style={{ color: 'white', fontSize: 20 }}>Recently Listed</div>
                                    <div className={styles.cardListed}>
                                        {
                                            dataListed && dataListed.slice(0, 8).map((item: any) => {
                                                return (
                                                    <CardListed key={item.id} dataListed={item} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className={styles.itemCardList}>
                                    <div style={{ color: 'white', fontSize: 20 }}>Recently Sold</div>
                                    <div className={styles.cardListed}>
                                        {
                                            dataSale && dataSale.slice(0, 8).map((item: any) => {
                                                return (
                                                    <CardListed key={item.id} dataListed={item} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <Loader />}

            </div>
        </>
    )
}

export default Home
