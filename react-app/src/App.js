import React, { Component } from "react";
import Subject from './components/Subject'
import ReadContent from './components/ReadContent'
import Toc from './components/Toc'
import Control from './components/Control'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id=3;
    this.state ={
      mode :'welcome',
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
  getReadContent(){
    var i = 0;
    while(i<this.state.Contents.length){
      var data=this.state.Contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
      }
      i++;
  }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode ==='welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}/>;
    }else if(this.state.mode==='read'){
     var _Contents = this.getReadContent();
    _article = <ReadContent title={_Contents.title} desc={_Contents.desc}/>;
    }else if(this.state.mode==='create'){
      _article = <CreateContent onSubmit={function(_title,_desc){
        this.max_content_id = this.max_content_id +1;
        //concat은 원본을 쓰는것이 아니고 사본에다가 추가하는 함수
        var _contents = this.state.Contents.concat({
          id:this.max_content_id, title:_title, desc:_desc
        })
        this.setState({Contents:_contents, mode:'read'});
      }.bind(this)}/>
    }else if(this.state.mode==='update'){
      _Contents = this.getReadContent();
      _article = <UpdateContent data={_Contents} onSubmit={function(_id, _title, _desc){
        var _contents=Array.from(this.state.Contents);
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id===_id){
            _contents[i]={id:_id,title:_title,desc:_desc};
            break;
          }
          i++;
        }
        this.setState({mode:'read', Contents:_contents})
      }.bind(this)}/>
    }
    return _article;
  }
  render() {

    return (
      <div className="App">
        <Subject title={this.state.Subject.title} sub={this.state.Subject.sub} onChangePage={function(){
          this.setState({mode : "welcome"})
        }.bind(this)}/>
        <Control onChangeMode={function(_mode){
          if(_mode==='delete'){
            if(window.confirm('Are you sure?')){
              var _contents = Array.from(this.state.Contents);
              var i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }
                i++;
              }
              this.setState({mode:'welcome', Contents:_contents})
            }
            alert('deleted!!!')
          }else{
            this.setState({mode:_mode})
          }
        }.bind(this)}/>
        <Toc data={this.state.Contents} onChangePage={function(id){
          this.setState({mode:"read", selected_content_id:id})
      }.bind(this)}/>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
