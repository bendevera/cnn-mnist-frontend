import React from 'react';
import './CNNConfig.css';
import config from '../../config';


class CNNConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algos: [],
            activeAlgos: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.state.algos.map((elem, index) => {
            if (elem.id == e.target.getAttribute('algoid')) {
                let currAlgos = [...this.state.activeAlgos]
                if (elem.active) {
                    let indexActive = currAlgos.indexOf(elem.id)
                    currAlgos.splice(indexActive, 1)
                } else {
                    currAlgos.push(elem.id)
                }
                this.setState({
                    activeAlgos: currAlgos
                })
                this.state.algos[index].active = !this.state.algos[index].active
                this.forceUpdate()
                this.props.setAlgos(currAlgos)
                return true;
            }
        })
    }

    componentWillMount() {
        console.log("component mounting")
        fetch(config.apiBase+"/algos")
            .then(response => { 
                return response.json()
            })
            .then(responseJson => {
                var algos = responseJson.algos.map(function(algo) {
                    let o = Object.assign({}, algo);
                    o.active = false;
                    return o;
                })
                this.setState({
                    algos: algos
                })
            })
    }

    render() {
        return (
            <div className="col-md-4 col-xs-12 sticky-sidebar">
                    <h1>MNIST Algo Toy</h1>

                    <ul className="main-link-list">
                        <li className="sub-link-list">
                            <h2>algo list</h2>
                            <ul className="sub-link-list-ul">
                                <li className="sub-sub-link-list">
                                    <ul className="algo-link-list">
                                        {this.state.algos.map(item => {
                                            if (item.active) {
                                                return (
                                                    <li className="algo-link-active" 
                                                    onClick={this.handleClick}
                                                    name={item.title}
                                                    key={item.id}
                                                    algoid={item.id}>
                                                        {item.title}
                                                    </li> 
                                                )
                                            }
                                            return (
                                                <li className="algo-link-not-active" 
                                                onClick={this.handleClick}
                                                name={item.title}
                                                key={item.id}
                                                algoid={item.id}>
                                                    {item.title}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
            </div>
        )
    }
}

export default CNNConfig;