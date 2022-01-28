import { Card, Grid } from "@mui/material";
import { Component, ReactNode } from "react";
import { ApiConnectorETH } from "../models/api-connector-ethlib";
import "../views/main-view.css"
import energi from "../assets/images/energi.png"

export class MainView extends Component {

    //!MARK: properties 

    private lastTransactionData: TransactionData[] = []

    private transactionsHistoryData: TransactionData[] = []

    //! MARK: methods 

    async componentDidMount() {
        await this.getDataToDisplay()
    }

    render(): ReactNode {
        return (
            <>
                <Card>
                    <div className="background-card">
                        <div id="currency-container">
                            <img id="currency" src={energi}></img>
                            <h1 id="title">Energi Test</h1>
                        </div>
                        <div id="page-body">
                            <Grid container spacing={12}>
                                <Grid item xs={7}>
                                    <h1 className="title">Last transaction important data</h1>
                                    {this.lastTransactionData.map((value, index, array) => {
                                        return (
                                            <>
                                                <h2 className="subtitle">{value.value}</h2>
                                                <h2>{value.title}</h2>
                                            </>
                                        )
                                    })}
                                </Grid>
                                <Grid item xs={4}>
                                    <h1 className="title">Sorted recent transactions values</h1>
                                    {this.transactionsHistoryData.map((value, index, array) => {
                                        return (
                                            <>
                                                <h2 className="subtitle">{value.value}</h2>
                                                <h5>{value.title}</h5>
                                            </>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Card>
            </>
        )
    }

    private async getDataToDisplay() {
        const data = await ApiConnectorETH.instance.getLatestTransactionData()
        const transactionsHistory = data.transactions
        this.lastTransactionData.push(new TransactionData("Block number", data.blockNumber.toString()))
        this.lastTransactionData.push(new TransactionData("Miner address", data.miner))
        this.lastTransactionData.push(new TransactionData("Total difficulty", data.totalDifficulty.toString()))
        this.lastTransactionData.push(new TransactionData("Number of transactions", data.transactionsCount.toString()))
        transactionsHistory.forEach((transaction) => {
            this.transactionsHistoryData.push(new TransactionData(transaction.from, transaction.value.toString()))
        })
        this.transactionsHistoryData = this.transactionsHistoryData.sort((value1, value2) => Number(value2.value) - Number(value1.value))
        this.setState({})
    }

}

class TransactionData {

    //!MARK: constructor

    constructor(title: String, value: String) {
        this.title = title
        this.value = value
    }

    //!MARK: properties 

    public title: String

    public value: String

}


