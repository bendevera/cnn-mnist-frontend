import React from 'react';
import './DrawSection.css';
import {SketchField, Tools} from 'react-sketch';


class DrawSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrawingChange = this.handleDrawingChange.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.predButtonClick = this.predButtonClick.bind(this);
  }

  handleDrawingChange() {
    console.log("Change to drawing")
    let canvas = this._sketch
    var dataUrl = canvas.toDataURL();
    this.props.setImageData(dataUrl);
  }

  clearCanvas() {
    console.log("Clearing canvas")
    let canvas = this._sketch 
    while (canvas.canUndo()) {
      canvas.undo()
    }
  }

  predButtonClick() {
      this.props.handlePredButton();
  }

  render() {
    return (
        <div className="col-md-4 col-xs-12 main m-0 draw-section">
            <div className="row">
                <div className="col">
                <h3 className="main-header draw-section-header">2. data</h3>
                <div className="sketch-wrapper">
                    <SketchField 
                        ref={c => (this._sketch = c)}
                        width='280px' 
                        height='280px' 
                        tool={Tools.Pencil} 
                        lineColor='black'
                        backgroundColor='white'
                        fillColor='white'
                        lineWidth={30}
                        className="sketch-canvas"
                        onChange={this.handleDrawingChange} 
                    />
                </div>
                <div className="row">
                    <div className="col-6">
                      <button className="query-button" onClick={this.clearCanvas}>Clear Drawing</button>
                    </div>
                    <div className="col-6">
                      <button className="query-button" onClick={this.predButtonClick}>Get Predictions</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
  }
}

export default DrawSection;
