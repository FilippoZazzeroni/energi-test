import Web3 from "web3"
import { Eth } from "web3-eth"

require

export class ApiConnector {

    private constructor() {
        this.intialize()
    }

    static instance = new ApiConnector()

    private intialize() {
        console.log("initializing the api")
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const eth = new Eth(Eth.givenProvider || "ws://some.local-or-remote.node:8546")
        web3.eth.getAccounts()
    }


}