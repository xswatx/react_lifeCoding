import React, { Component } from "react";
import Subject from './components/Subject'
import Content from './components/Content'
import Toc from './components/Toc'


class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      Subject:{title:'WEB', sub:'world wide web!'},
      Content:[
        {id:'1', title:'HTML', desc:'HTML is HyperText Markup Language.'},
        {id:'2', title:'CSS', desc:'CSS is for design.'},
        {id:'3', title:'JavaScript', desc:'javaScript is for interactive.'},
      ]
    }
  }
  render() {
    return (
      <div className="App">
        <Subject title={this.state.Subject.title} sub={this.state.Subject.sub}/>
        <Toc data={this.state.Content}/>
        <Content/>
      </div>
    );
  }
}

export default App;
