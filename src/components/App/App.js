import React from 'react';
import './App.css';
import Sidebar from '../Sidebar/Sidebar';
import {SketchField, Tools} from 'react-sketch';


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
    let data = {
      img: this.state.img,
      algos: this.state.activeAlgos
    }
    console.log(data)
    fetch('http://localhost:5000/predictions', {
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

  handleDrawingChange(e) {
    console.log("Change to drawing")
    let canvas = e.target
    var dataUrl = canvas.toDataURL();
    console.log(dataUrl);
    this.setState({
      img: dataUrl
    })
  }

  render() {
    return (
      <div className="container App m-0">
        <div className="row">

            <Sidebar setAlgos={this.setActiveAlgos}/>

            <div className="col-9 main m-0">
                {/* <h1 className="main-header">Select what algos you want to predict the number you draw!</h1> */}
                <div className="row">
                  <div className="col">
                    <h3 className="main-header">Custom Data</h3>
                    <SketchField 
                      width='280px' 
                      height='280px' 
                      tool={Tools.Pencil} 
                      lineColor='black'
                      backgroundColor='white'
                      lineWidth={9}
                      onChange={this.handleDrawingChange} />
                    <button className="query-button" onClick={this.getPredictions}>Get Predictions</button>
                  </div>
                  <div className="col">
                    <h3 className="main-header">Model Predictions</h3>
                    {this.state.queryResults.map(result => {
                      return (
                        <div className="prediction" key={result.name}>
                          <p className="prediction-algo">{result.name}</p>
                          <p className="prediction-result">{result.prediction}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
            </div>

        </div>
    </div>
    )
  }
}

export default App;
