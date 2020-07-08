import React, {Component} from 'react';
import web3 from "./utils/initWeb3";
import {fundingFactoryInstance} from "./eth/instance";
import TabCenter from "./display/TabCenter";

class App extends Component{
  constructor(){
    super()
    this.state={
      currentAccount:''
    }
  }
  async componentWillMount() {
    let accounts = await web3.eth.getAccounts()
    console.log("app:"+accounts[0])
    let platformManager = await fundingFactoryInstance.methods.platformManager().call()
    this.setState({
      currentAccount:accounts[0]
    })
  }
  render() {
    return(

        <div className="App">
          <h1>众筹平台</h1>
          <TabCenter/>
        </div>
    )
  }
}

export default App;
