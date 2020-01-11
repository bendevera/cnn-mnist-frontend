import React from 'react';
import './ResultsSection.css';
import ConfirmPrediction from '../ConfirmPrediction/ConfirmPrediction'

const ResultsSection = ({ results }) => {
    if (results) {
        return (
            <div className="col-md-4 col-xs-12 main m-0 result-section">
                <h3 className="main-header prediction-section-header">3. prediction</h3>
                <div className="prediction-section">
                    <div className="prediction" key={results.id}>
                        <p className="prediction-algo">optimizer: {results.optimizer} | # layers: {results.layers}</p>
                        <p className="prediction-result">model prediction: <span className="prediction-num">{results.prediction}</span></p>
                        <p className="prediction-description">{results.description}</p>
                    </div>
                    <ConfirmPrediction algoId={results.id} algoPrediction={results.prediction}/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="col-md-4 col-xs-12 main m-0 result-section">
                <h3 className="main-header prediction-section-header">3. prediction</h3>
                <div className="prediction-section">
                    <div className="prediction">
                        <p className="prediction-result">no predictions requested yet.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultsSection;