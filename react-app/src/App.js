import React, { Component } from "react";
import Subject from './components/Subject'
import ReadContent from './components/ReadContent'
import Toc from './components/Toc'
import Control from './components/Control'
import CreateContent from './components/CreateContent'

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id=3;
    this.state ={
      mode :'create',
      selected_content_id: '2' ,
      Subject:{title:'WEB', sub:'world wide web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!!'},
      Contents:[
        {id:'1', title:'HTML', desc:'HTML is HyperText Markup Language.'},
        {id:'2', title:'CSS', desc:'CSS is for design.'},
        {id:'3', title:'JavaScript', desc:'javaScript is for interactive.'},
      ]
    }
  }
  render() {
    let _title, _desc, _article = null;
    if(this.state.mode ==='welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}/>;
    }else if(this.state.mode==='read'){
      let i = 0;
      while(i<this.state.Contents.length){
        if(this.state.Contents[i].id === this.state.selected_content_id){
          _title = this.state.Contents[i].title;
          _desc = this.state.Contents[i].desc;
          break;
        }
        i++;
    }
    _article = <ReadContent title={_title} desc={_desc}/>;
    }else if(this.state.mode==='create'){
      _article = <CreateContent onSubmit={function(_title,_desc){
        this.max_content_id = this.max_content_id +1;
        var _contents = this.state.Contents.concat({
          id:this.max_content_id, title:_title, desc:_desc
        })
        this.setState({Contents:_contents});
      }.bind(this)}/>
    }
    return (
      <div className="App">
        <Subject title={this.state.Subject.title} sub={this.state.Subject.sub} onChangePage={function(){
          this.setState({mode : "welcome"})
        }.bind(this)}/>
        <Control onChangeMode={function(_mode){
          this.setState({mode:_mode})
        }.bind(this)}/>
        <Toc data={this.state.Contents} onChangePage={function(id){
          this.setState({mode:"read", selected_content_id:id})
      }.bind(this)}/>
        {_article}
      </div>
    );
  }
}

export default App;
