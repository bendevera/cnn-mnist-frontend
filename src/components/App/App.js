import React from 'react';
import './App.css';
import CNNConfig from '../CNNConfig/CNNConfig';
import DrawSection from '../DrawSection/DrawSection';
import ResultsSection from '../ResultsSection/ResultsSection';
import config from '../../config';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-134639598-4');


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      optimizer: null,
      layers: null,
      queryResults: null,
      img: null
    }
    this.getPredictions = this.getPredictions.bind(this);
    this.handleDrawingChange = this.handleDrawingChange.bind(this);
    this.setOptimizer = this.setOptimizer.bind(this);
    this.setLayers = this.setLayers.bind(this);
  }

  setOptimizer(value) {
    console.log("Setting optimizer");
    this.setState({
      optimizer: value
    })
    console.log(value);
  }

  setLayers(value) {
    console.log("Setting layers");
    this.setState({
      layers: value
    })
    console.log(value);
  }

  // this function sends the base64 encoded png to the server to get predictions
  getPredictions() {
    console.log("Getting predictions");
    ReactGA.event({
      category: 'User',
      action: 'Made prediction'
    });
    if (this.state.optimizer === null | this.state.layers === null) {
      alert("Must have all model parameters selected.")
    } else {
      let data = {
        img: this.state.img,
        optimizer: this.state.optimizer,
        layers: this.state.layers
      }
      console.log(data)
      fetch(config.apiBase+'/predict', {
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
          queryResults: responseJson
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

  componentDidMount() {
    ReactGA.pageview("/");
  }

  render() {
    return (
      <div className="App m-0">
        <div className="row m-0">

            <CNNConfig setOptimizer={this.setOptimizer} setLayers={this.setLayers}/>

            <DrawSection setImageData={this.handleDrawingChange} handlePredButton={this.getPredictions} />

            <ResultsSection results={this.state.queryResults} />
            
        </div>
    </div>
    )
  }
}

export default App;
