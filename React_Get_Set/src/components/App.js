import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Storage from '../abis/Storage.json'



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
    const contract = new web3.eth.Contract(Storage.abi, Storage.address)
    this.setState({contract: contract});

    const get = await contract.methods.get().call()
    this.setState({ result: get })

  }
  handleChange(event) {
   this.setState({value: event.target.value});
 }

 handleSubmit(event) {
   this.state.contract.methods.set(this.state.value).send({ from: this.state.account })
   .once('receipt', (receipt) => {
     window.location.reload(false);
     console.log("============> ", receipt)
   })
   event.preventDefault();
 }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      result: '',
      contract: ''
    }

   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);

    }

  render() {
    return (
      <div>
        <h1>Your wallet:</h1>
        <h2>{this.state.account}</h2>
        <h1>Result get blockchain:</h1>
        <h2>{this.state.result}</h2>
        <form onSubmit={this.handleSubmit}>
        <label>
              Set :
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
      </div>
    );
  }
}

export default App;
