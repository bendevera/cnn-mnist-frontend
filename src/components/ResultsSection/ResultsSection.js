import React from 'react';
import './ResultsSection.css';

const ResultsSection = ({ results }) => {
    return (
        <div className="col-md-4 col-xs-12 main m-0 result-section">
            <h3 className="main-header result-header">Model Predictions</h3>
            <div className="prediction-section">
                {results.map(result => {
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
    )
}

export default ResultsSection;