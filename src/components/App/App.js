import React from 'react';
import './App.css';
import Sidebar from '../Sidebar/Sidebar';

class App extends React.Component {
  constructor(props) {
    super(props)

    // setting initial page elems 
    this.state = {
      pageName: 'Home',
      pageElems: [
        {'type': 'h1', 'data': 'Welcome! Select an algorithm to investigate'}
      ]
    }
    this.getNewPageElems = this.getNewPageElems.bind(this);
  }

  // this function will grab new page elems when a new page is requested
  getNewPageElems(page_name) {
    // grab page info 
    this.setState({
      pageName: page_name
    })
    console.log('Getting new page: '+ page_name);
  }

  render() {
    return (
      <div className="container App m-0">
        <div className="row">

            <Sidebar getNewPage={this.getNewPageElems}/>

            <div className="col-9 main mx-0">
                {this.state.pageElems.map(item => {
                  if (item.type == 'h1') {
                    return (
                      <h1>{item.data}</h1>
                    )
                  }
                })}
            </div>

        </div>
    </div>
    )
  }
}

export default App;
