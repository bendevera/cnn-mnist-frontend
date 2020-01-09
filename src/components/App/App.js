import React from 'react';
import './App.css';
import Sidebar from '../Sidebar/Sidebar';
import {SketchField, Tools} from 'react-sketch';
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
    this.clearCanvas = this.clearCanvas.bind(this)
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

  handleDrawingChange() {
    console.log("Change to drawing")
    let canvas = this._sketch
    var dataUrl = canvas.toDataURL();
    console.log(dataUrl);
    this.setState({
      img: dataUrl
    })
  }

  clearCanvas() {
    console.log("Clearing canvas")
    let canvas = this._sketch 
    while (canvas.canUndo()) {
      canvas.undo()
    }
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
                      ref={c => (this._sketch = c)}
                      width='280px' 
                      height='280px' 
                      tool={Tools.Pencil} 
                      lineColor='black'
                      backgroundColor='white'
                      fillColor='white'
                      lineWidth={30}
                      onChange={this.handleDrawingChange} />
                    <div className="row">
                      <div className="col">
                        <button className="query-button" onClick={this.clearCanvas}>Clear Drawing</button>
                      </div>
                      <div className="col">
                        <button className="query-button" onClick={this.getPredictions}>Get Predictions</button>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <h3 className="main-header">Model Predictions</h3>
                    <div className="prediction-section">
                      {this.state.queryResults.map(result => {
                        return (
                          <div className="prediction" key={result.id}>
                            <h5 className="prediction-algo">{result.title}</h5>
                            <p className="prediction-result">model prediction: <span className="prediction-num">{result.prediction}</span></p>
                            <p className="prediction-description">{result.description}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
            </div>

        </div>
    </div>
    )
  }
}

export default App;
