import {fundingFactoryInstance, fundingInstance, newFundingInstance} from "./instance";
import web3 from "../utils/initWeb3";
let getFundingDetails = async(index)=> {
    let accounts = await web3.eth.getAccounts()
    let currentFundings =[]
    if (index==1){
        currentFundings = await fundingFactoryInstance.methods.getAllFundings().call({
            from:accounts[0]
        })

    }else if(index==2){
        currentFundings = await fundingFactoryInstance.methods.getCreatorFundings().call({
            from:accounts[0]
        })
    }else {
        currentFundings = await fundingFactoryInstance.methods.getSupportorFunding().call({
            from:accounts[0]
        })
    }


    let detailsPromises = currentFundings.map(async function (fundingAddress) {

            return new Promise(async (resolve, reject) => {
                try {
                    console.log("detail:"+fundingAddress)
                    let newInstance = newFundingInstance();
                    newInstance.options.address = fundingAddress
                    let manager = await newInstance.methods.manager().call();
                    let projectName = await newInstance.methods.projectName().call();
                    let targetMoney = await newInstance.methods.targetMoney().call();
                    let supportMoney = await newInstance.methods.supportMoney().call();
                    let leftTime = await newInstance.methods.getLeftTime().call();
                    let balance = await newInstance.methods.getBalance().call();
                    let investorCount = await newInstance.methods.getInvestorsCount().call();
                    let detail = {fundingAddress,manager, projectName, targetMoney, supportMoney, leftTime,balance,investorCount}
                    resolve(detail)
                }catch (e) {
                    reject(e)
                }

            })


    })
    let detailInfo = Promise.all(detailsPromises)
    return detailInfo
}

let createFunding =  (projectName,targetMoney,supportMoney,duration)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let accounts = await web3.eth.getAccounts()
            console.log("web3:"+web3.eth)
            console.log("interation:"+accounts[0])
            let res = await fundingFactoryInstance.methods.createFunding(projectName, targetMoney, supportMoney, duration).send({
                from:accounts[0]
            })
            resolve(res)
        } catch (e) {
            reject(e)
        }

    })
}

let handleInvest=  (fundingAddress,supportMoney)=>{
    new Promise(async (resolve, reject) => {
        try{
            let fundingInstance = newFundingInstance()
            fundingInstance.options.address=fundingAddress
            let accounts =await web3.eth.getAccounts()
            let res =fundingInstance.methods.invest().send({
                from:accounts[0],
                value:supportMoney
            })
            resolve(res)

        }catch (e) {
            reject(e)
        }
    })

}

//function createRequest(string _purpose, uint256 _cost, address _seller)

const createRequest =(fundingAddress,purpose,cost,seller) => {
    new Promise(async (resolve, reject) => {
        try {
            let accounts = await web3.eth.getAccounts()
            let fundingContract = newFundingInstance();
            fundingContract.options.address = fundingAddress
            let result = fundingContract.methods.createRequest(purpose, cost, seller).send({
                from: accounts[0]
            })
            resolve(result)

        } catch (e) {
            reject(e)
        }
    })

}

const showRequests =(fundingAddress)=> {

    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await web3.eth.getAccounts()
            let fundingContract = newFundingInstance();
            fundingContract.options.address = fundingAddress
            //请求数量
            let requestCount = await fundingContract.methods.getRequestsCount().call()
            let requestDetails = []
            for (let i = 0; i < requestCount; i++) {
                let requestDetail = await fundingContract.methods.getRequestByIndex(i).call()
                console.log(requestDetail)
                requestDetails.push(requestDetail)
            }
            resolve(requestDetails)
        } catch (e) {
            reject(e)
        }
    })
}

const approveRequest =(fundingAddress,index)=> {

    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await web3.eth.getAccounts()
            let fundingContract = newFundingInstance();
            fundingContract.options.address = fundingAddress
            console.log("approveRequests:"+fundingAddress)
            //请求数量
            let result = await fundingContract.methods.approveRequest(index).send({
                from:accounts[0]
            })

            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}

const finalizeRequest =(fundingAddress,index)=> {

    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await web3.eth.getAccounts()
            let fundingContract = newFundingInstance();
            fundingContract.options.address = fundingAddress
            console.log("approveRequests:"+fundingAddress)
            //请求数量
            let result = await fundingContract.methods.finalizeRequest(index).send({
                from:accounts[0]
            })

            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}

export {
    getFundingDetails,
    createFunding,
    handleInvest,
    createRequest,
    showRequests,
    approveRequest,
    finalizeRequest
}
