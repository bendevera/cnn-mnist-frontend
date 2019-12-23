import React from 'react';
import './Sidebar.css';


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supervisedClassifiers: [{name : 'SGD Classifier', id: 1}],
            supervisedRegressors: [],
            unsupervisedClassifiers: [],
            unsupervisedRegressors: []
        }
        this.getNewPage = this.getNewPage.bind(this);
    }

    getNewPage(e) {
        console.log(e.target.getAttribute('name'));
        this.props.getNewPage(e.target.getAttribute('name'));
    }

    render() {
        return (
            <div className="col-3 sticky-sidebar">
                <div className="sticky-top">
                    <h1>ML Algos Roadmap</h1>

                    <ul className="main-link-list">
                        <li className="sub-link-list">
                            <h2>supervised</h2>
                            <ul className="sub-link-list-ul">
                                <li className="sub-sub-link-list">
                                    <h3>classification</h3>
                                    <ul className="algo-link-list">
                                        {this.state.supervisedClassifiers.map(item => {
                                            return (
                                                <li className="algo-link" 
                                                onClick={this.getNewPage}
                                                name={item.name}
                                                key={item.id}>
                                                    {item.name}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                                <li className="sub-sub-link-list">
                                    <h3>regression</h3>
                                    <ul className="algo-link-list">
                                        <li className="algo-link">supervised-regressor</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="sub-link-list">
                            <h2>unsupervised</h2>
                            <ul className="sub-link-list-ul">
                                <li className="sub-sub-link-list">
                                    <h3>classification</h3>
                                    <ul className="algo-link-list">
                                        <li className="algo-link">unsupervised-classifier</li>
                                    </ul>
                                </li>
                                <li className="sub-sub-link-list">
                                    <h3>regression</h3>
                                    <ul className="algo-link-list">
                                        <li className="algo-link">unsupervised-regressor</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;