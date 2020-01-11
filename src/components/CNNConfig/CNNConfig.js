import React from 'react';
import './CNNConfig.css';
import config from '../../config';


class CNNConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optimizer: {"adam": false, "rmsprop":false},
            layers: {2: false, 3: false}
        }
        this.handleOptimizer = this.handleOptimizer.bind(this);
        this.handleLayers = this.handleLayers.bind(this);
    }

    handleOptimizer(e) {
        let key = e.target.getAttribute('data');
        let newState = {};
        Object.keys(this.state.optimizer).map( curr_key => {
            if (curr_key == key) {
                newState[curr_key] = true;
            } else {
                newState[curr_key] = false;
            }
        })
        this.setState({
            optimizer: newState
        })
        this.props.setOptimizer(key)
    }

    handleLayers(e) {
        let key = e.target.getAttribute('data');
        let newState = {};
        Object.keys(this.state.layers).map( curr_key => {
            if (curr_key == key) {
                newState[curr_key] = true;
            } else {
                newState[curr_key] = false;
            }
        })
        this.setState({
            layers: newState
        })
        this.props.setLayers(key)
    }

    render() {
        return (
            <div className="col-md-4 col-xs-12 sticky-sidebar">
                    <h3 className="main-header settings-header">1. parameters</h3>
                    <div className="settings-wrapper">
                        <div className="setting-item">
                            <h5 className="setting-heading">layers</h5>
                            {Object.keys(this.state.layers).map( key => {
                                console.log(key);
                                if (this.state.layers[key]) {
                                    console.log("returning the active")
                                    return (
                                        <div 
                                        className="setting-option-active col-4"
                                        key={key}>
                                            {key}
                                        </div>
                                    )
                                }
                                console.log("returning the non active")
                                return (
                                    <div 
                                    className="setting-option col-4"
                                    onClick={this.handleLayers}
                                    data={key}
                                    key={key}>
                                        {key}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="setting-item">
                            <h5 className="setting-heading">optimizer</h5>
                            {Object.keys(this.state.optimizer).map( key => {
                                console.log(key);
                                if (this.state.optimizer[key]) {
                                    console.log("returning the active")
                                    return (
                                        <div 
                                        className="setting-option-active col-4"
                                        key={key}>
                                            {key}
                                        </div>
                                    )
                                }
                                console.log("returning the non active")
                                return (
                                    <div 
                                    className="setting-option col-4"
                                    onClick={this.handleOptimizer}
                                    data={key}
                                    key={key}>
                                        {key}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="brand-section">
                        <h1>cnn mnist toy</h1>
                        <p>by: <a className="brand-secton-link" href="https://bendevera.com">bendevera.</a></p>
                    </div>
            </div>
        )
    }
}

export default CNNConfig;