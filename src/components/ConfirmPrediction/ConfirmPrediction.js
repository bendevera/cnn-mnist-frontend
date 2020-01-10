import React from 'react';
import './ConfirmPrediction.css';

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
    }
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
    this.setState({
        answered: true
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
                <p className="answered">Thank you for your feedback!</p>
            </div>
        )
    } else {
        return (
            <div className="con-prediction-wrapper">
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
                <button className="confirm-button" onClick={this.sendConfirmation}>Confirm Your Drawing</button>
            </div>
        )
    }
  }
}

export default ConfirmPrediction;