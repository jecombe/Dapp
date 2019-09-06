import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Hello from '../abis/Hello.json'

class App extends Component {

  async UNSAFE_componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    console.log("Id Network Ethereum: ", networkId)
    const contract = new web3.eth.Contract(Hello.abi, Hello.address)
    const get = await contract.methods.sayHello().call()
    this.setState({ result: get })

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      result: ''

    }
  }
  render() {
    return (
      <div>
        <h1>Your wallet:</h1>
        <h2>{this.state.account}</h2>
        <h1>Result get blockchain:</h1>
        <h2>{this.state.result}</h2>

        <div className="container-fluid mt-5">
          <div className="row">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
