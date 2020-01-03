import React from 'react';
import './Sidebar.css';


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algos: [{name : 'SGD Classifier', id: 1, active: false}],
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

    render() {
        return (
            <div className="col-3 sticky-sidebar">
                    <h1>MNIST Algo Toy</h1>

                    <ul className="main-link-list">
                        <li className="sub-link-list">
                            <h2>category</h2>
                            <ul className="sub-link-list-ul">
                                <li className="sub-sub-link-list">
                                    <ul className="algo-link-list">
                                        {this.state.algos.map(item => {
                                            if (item.active) {
                                                return (
                                                    <li className="algo-link-active" 
                                                    onClick={this.handleClick}
                                                    name={item.name}
                                                    key={item.id}
                                                    algoid={item.id}>
                                                        {item.name}
                                                    </li> 
                                                )
                                            }
                                            return (
                                                <li className="algo-link-not-active" 
                                                onClick={this.handleClick}
                                                name={item.name}
                                                key={item.id}
                                                algoid={item.id}>
                                                    {item.name}
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

export default Sidebar;