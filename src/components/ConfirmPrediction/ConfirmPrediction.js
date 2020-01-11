import React from 'react';
import './ConfirmPrediction.css';
import config from '../../config';

let initialState = {
    answered: false,
    data: {
        0: false,
        1 : false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false
    },
    liveAcc: null,
    valAcc: null
}

class ConfirmPrediction extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
    this.sendConfirmation = this.sendConfirmation.bind(this);
  }

  handleClick(e) {
    let key = e.target.getAttribute("data");
    console.log(e)
    console.log(key)
    let newState = {}
    Object.keys(this.state.data).map( curr_key => {
        if (curr_key == key) {
            newState[curr_key] = true;
        } else {
            newState[curr_key] = false;
        }
    })

    this.setState({
        data: newState
    })
  }

  sendConfirmation(){
    console.log("sending confirmation")
    let actual = Object.keys(this.state.data).filter(key => {
        return this.state.data[key]
    })
    console.log(actual)
    let data = {correct: actual == this.props.algoPrediction}
    fetch(config.apiBase+'/accuracy/'+this.props.algoId.toString(), {
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
            answered: true,
            liveAcc: responseJson.liveAcc,
            valAcc: responseJson.valAcc
        })
      })
      .catch((error) => {
        console.log(error)
        this.setState({
            answered: true
        })
      })
  }

  componentWillReceiveProps(nextProps) {
      console.log(nextProps)
      console.log(this.props)
      if (nextProps.algoId != this.props.algoId | nextProps.algoPrediction != this.props.algoPrediction) {
        this.setState({
            answered: false
        })
      }
  }

  render() {
    if (this.state.answered) {
        return (
            <div className="con-prediction-wrapper">
                <p className="answered">thank you for your feedback!</p>
                <p className="prediction-result">validation acc: <span className="prediction-num">{this.state.valAcc*100}%</span></p>
                <p className="prediction-result">live acc: <span className="prediction-num">{Math.round(this.state.liveAcc*1000)/10}%</span></p>
            </div>
        )
    } else {
        return (
            <div className="con-prediction-wrapper">
                <p className="answered">is it correct?</p>
                {Object.keys(this.state.data).map( key => {
                    if (this.state.data[key]) {
                        if (key == this.props.algoPrediction){
                            return (
                                <div className="con-pred-active correct" key={key}>
                                    {key}
                                </div>
                            )
                        } else {
                            return (
                                <div className="con-pred-active incorrect" key={key}>
                                    {key}
                                </div>
                            )
                        }
                    }
                    return (
                        <div 
                        className="con-pred"
                        onClick={this.handleClick}
                        data={key}
                        key={key}>
                            {key}
                        </div>
                    )
                })}
                {/* <button className="confirm-button" onClick={this.predButtonClick}>Confirm Your Drawing</button> */}
                {/* need to add onclick function */}
                <button className="confirm-button" onClick={this.sendConfirmation}>confirm your drawing</button>
            </div>
        )
    }
  }
}

export default ConfirmPrediction;