import React from 'react';
import './App.css';
import CNNConfig from '../CNNConfig/CNNConfig';
import DrawSection from '../DrawSection/DrawSection';
import ResultsSection from '../ResultsSection/ResultsSection';
import config from '../../config';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeAlgos: [],
      queryResults: [],
      img: null
    }
    this.setActiveAlgos = this.setActiveAlgos.bind(this);
    this.getPredictions = this.getPredictions.bind(this);
    this.handleDrawingChange = this.handleDrawingChange.bind(this);
  }

  // this function sets active algos so that when query is made results
  // are collected from all algos that are active
  setActiveAlgos(algos) {
    console.log("Setting active algos");
    this.setState({
      activeAlgos: algos
    })
    console.log(algos);
  }

  // this function sends the base64 encoded png to the server to get predictions
  getPredictions() {
    console.log("Getting predictions");
    if (this.state.activeAlgos.length == 0) {
      alert("Must have active algos to get predictions.")
    } else {
      let data = {
        img: this.state.img,
        algos: this.state.activeAlgos
      }
      console.log(data)
      fetch(config.apiBase+'/predictions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          queryResults: responseJson.predictions 
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  handleDrawingChange(dataUrl) {
    console.log(dataUrl);
    this.setState({
      img: dataUrl
    })
  }

  render() {
    return (
      <div className="container App m-0">
        <div className="row">

            <CNNConfig setAlgos={this.setActiveAlgos}/>

            <DrawSection setImageData={this.handleDrawingChange} handlePredButton={this.getPredictions} />

            <ResultsSection results={this.state.queryResults} />
            
        </div>
    </div>
    )
  }
}

export default App;
