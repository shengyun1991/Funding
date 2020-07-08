import React,{Component} from "react";
import {getFundingDetails,createRequest,showRequests,finalizeRequest} from '../../eth/interaction'
import CardList from '../../common/CardList'
import CreateFundingForm from "./CreateFundingForm";
import {Segment,Form,Label,Button} from "semantic-ui-react";
import RequestTable from "../../common/RequestTable";

class CreatorFundingTab extends Component {
    state = {
        creatorFundingDetails: [],
        selectedFunding:'',
        requestDesc:'',
        requestBalance:'',
        requestAddress:'',
        requests:[]

    }

    //表单数据数据变化时触发
    handleChange = (e, {name, value}) => this.setState({[name]: value})

    async componentWillMount() {
        let creatorFundingDetails = await getFundingDetails(2)
      this.setState({
          creatorFundingDetails:creatorFundingDetails
      })
    }

    onCardClick=(selectedFunding)=>{
        console.log("creatorFunding",selectedFunding)
        this.setState({
            selectedFunding:selectedFunding
        })
    }
    handleCreateRequest= async ()=>{
        let {
            creatorFundingDetails, selectedFunding,
            requestDesc, requestBalance, requestAddress,
            requests,

        } = this.state

        try{
            let res = await createRequest(selectedFunding.fundingAddress,requestDesc,requestBalance,requestAddress)
        }catch (e) {
            console.log(e)
        }

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

    handleFinalize= async (index)=>{
        try{
            console.log("index:"+index)
           let res = await finalizeRequest(this.state.selectedFunding.fundingAddress,index)

        }catch (e) {
            console.log(e)
        }
   }


    render() {
        let {
            creatorFundingDetails, selectedFunding,
            requestDesc, requestBalance, requestAddress,
            requests,

        } = this.state
        return (
            <div>
                <CardList details={this.state.creatorFundingDetails} onCardClick={this.onCardClick}/>
                <h3>创建众筹</h3>
                <CreateFundingForm/>
                {
                    
                    <div>
                        <h3>发起付款请求</h3>

                        <Segment>
                            <h4>当前项目:{selectedFunding.projectName}, 地址: {selectedFunding.fundingAddress}</h4>
                            <Form onSubmit={this.handleCreateRequest}>
                                <Form.Input type='text' name='requestDesc' required value={requestDesc}
                                            label='请求描述' placeholder='请求描述' onChange={this.handleChange}/>

                                <Form.Input type='text' name='requestBalance' required value={requestBalance}
                                            label='付款金额' labelPosition='left' placeholder='付款金额'
                                            onChange={this.handleChange}>
                                    <Label basic>￥</Label>
                                    <input/>
                                </Form.Input>

                                <Form.Input type='text' name='requestAddress' required value={requestAddress}
                                            label='商家收款地址' labelPosition='left' placeholder='商家地址'
                                            onChange={this.handleChange}>
                                    <Label basic><span role='img' aria-label='location'>📍</span></Label>
                                    <input/>
                                </Form.Input>

                                <Form.Button primary content='开始请求'/>
                            </Form>
                        </Segment>
                    </div>

                }
                {
                   selectedFunding&& ( <div>
                        <Button onClick={this.handleShowRequest}>申请详情</Button>
                        <RequestTable requests={requests} handleFinalize={this.handleFinalize} pageKey={2} investorCount={selectedFunding.investorCount}/>
                    </div>)
                }


            </div>
        )
    }

}

export default CreatorFundingTab