import React,{Component} from "react";
import {getFundingDetails,handleInvest} from '../../eth/interaction'
import CardList from '../../common/CardList'
import {Dimmer,Segment,Loader,Form,Label} from "semantic-ui-react";
class AllFundingTab extends Component {
    state = {
        allFundingDetails: [],
        selectedFunding:''
    }

    async componentWillMount() {
        let allFundingDetails = await getFundingDetails(1)
        this.setState({
            allFundingDetails:allFundingDetails
        })
    }
    onCardClick=(selectedFunding)=>{
        console.log("",selectedFunding)
        this.setState({
            selectedFunding:selectedFunding
        })
    }

    handleInvest =async ()=>{
        let {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, balance, investorCount} = this.state.selectedFunding
        this.setState({active:true})
        try{
           let res = await handleInvest(fundingAddress,supportMoney)
            this.setState({active:false})
        }catch (e) {
            this.setState({active:false})
        }

    }
    render() {
        let {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, balance, investorCount} = this.state.selectedFunding
        return (
            <div>
                <CardList details={this.state.allFundingDetails} onCardClick={this.onCardClick}/>
                <h3>参与众筹</h3>
                <div>
                  
                    <Dimmer.Dimmable as={Segment} dimmed={this.state.active}>
                        <Dimmer active={this.state.active} inverted>
                            <Loader>支持中</Loader>
                        </Dimmer>
                        <Form onSubmit={this.handleInvest}>
                            <Form.Input type='text' value={projectName || ''} label='项目名称:'/>
                            <Form.Input type='text' value={fundingAddress || ''} label='项目地址:'/>
                            <Form.Input type='text' value={supportMoney || ''} label='支持金额:'
                                        labelPosition='left'>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>

                            <Form.Button primary content='参与众筹'/>
                        </Form>
                    </Dimmer.Dimmable>
                </div>
            </div>
        )
    }

}

export default AllFundingTab