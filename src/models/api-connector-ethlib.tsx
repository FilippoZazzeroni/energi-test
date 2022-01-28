import { providers } from "ethers"
import { ethers } from "ethers"
import { url } from "inspector"

export class ApiConnectorETH {

    private constructor() { }

    static instance = new ApiConnectorETH()

    private provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")

    public async getLatestTransactionData() {
        const blockNumber = await this.provider.getBlockNumber()
        const blockTransaction = await this.provider.getBlockWithTransactions(blockNumber)
        const transactionsCount = blockTransaction.transactions.length
        const miner = blockTransaction.miner
        const totalDifficulty = blockTransaction.difficulty
        return {
            "blockNumber": blockNumber,
            "transactionsCount": transactionsCount,
            "miner": miner,
            "totalDifficulty": totalDifficulty,
            "transactions": blockTransaction.transactions
        }
    }
}