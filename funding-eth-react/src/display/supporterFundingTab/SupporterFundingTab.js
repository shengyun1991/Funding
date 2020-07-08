import React,{Component} from "react";
import {createRequest, getFundingDetails, showRequests,approveRequest} from '../../eth/interaction'
import CardList from '../../common/CardList'
import RequestTable from "../../common/RequestTable";
import {Button} from "semantic-ui-react";

class SupporterFundingTab extends Component {
    state = {
        supporterFundingDetails: [],
        selectedFunding:'',
        requests:[]
    }

    async componentWillMount() {
        let supporterFundingDetails = await getFundingDetails(3)
        this.setState({
            supporterFundingDetails:supporterFundingDetails
        })
    }

    onCardClick=(selectedFunding)=>{
        console.log("creatorFunding",selectedFunding)
        this.setState({
            selectedFunding:selectedFunding
        })
    }

    handleShowRequest= async ()=>{
        let {
            creatorFundingDetails, selectedFunding,
            requestDesc, requestBalance, requestAddress,
            requests,

        } = this.state

        try{
            let requests = await showRequests(selectedFunding.fundingAddress)
            console.log(requests)
            this.setState({
                requests:requests
            })
        }catch (e) {
            console.log(e)
        }

    }

    handleApprove= async (index)=>{
        try{
            console.log("index:"+index)
            let res = await approveRequest(this.state.selectedFunding.fundingAddress,index)

        }catch (e) {
            console.log(e)
        }
    }


    render() {
        let{supporterFundingDetails,selectedFunding,requests}=this.state
        return (
            <div>
                <CardList details={supporterFundingDetails} onCardClick={this.onCardClick}/>
                {
                    selectedFunding && (<div>
                        <Button onClick={this.handleShowRequest}>申请详情</Button>
                        <RequestTable requests={requests} handleApprove={this.handleApprove} pageKey={3} investorCount={selectedFunding.investorCount}/>
                    </div>)
                }</div>

        )
    }s

}

export default SupporterFundingTab