/**
 * Created by Administrator on 2016/8/30.
 */
import {Router,Link,IndexRedirect,Route,browserHistory } from 'react-router';
var React = require('react');
var Reflux = require('reflux');
import CardComponent from 'components/Common/cardComponent';
import debase from 'components/DEcomponent/debase';
import derate from 'components/DEcomponent/derate';
import  LinkNav from 'components/Common/LinkNav';
import {deListStore} from 'stores/DeStore';
import {deDetailStore} from 'stores/DeStore';
import DeActions from 'actions/deActions'
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {fullBlack} from 'material-ui/styles/colors';
import image from 'images/yeoman.png';
var DeMain=React.createClass(
  {
    mixins: [Reflux.connect(deListStore, "data")],
    getInitialState:function()
    {
      return({data:[]});
    },
    handleClick:function () {
      DeActions.loadPrdtfromUI("*");
      browserHistory.replace("/depage/prdt/*/base");
    },
    handleLoadClick:function (prdt_no) {
      DeActions.loadPrdtfromServer(prdt_no);

    },
    render:function () {
      return(
      <div>
        <FlatButton onClick={this.handleClick} icon={<ContentAdd color={fullBlack}/>}/>
        {
          this.state.data.map((x,index)=>{
            return (<CardComponent handleClick={this.handleLoadClick} key={x.prdt_no} data={x} prdt_no={x.prdt_no} img={image} route={"/depage/prdt/"+x.prdt_no+"/base"}></CardComponent>);
          })
        }
      </div>
      );
    }
  }
);
var DeDetail=React.createClass(
  {
    mixins: [Reflux.connect(deDetailStore, "prdt")],
    getInitialState:function()
    {
      console.log("getInitialState");
      if(this.props.params.prdt_no!=undefined)
      {
        DeActions.loadPrdtfromServer(this.props.params.prdt_no);
      }

    },
    componentWillMount:function () {
     console.log("componentWillMount");

    },
    componentWillUpdate:function () {
      console.log("componentWillUpdate");;
    },
    componentDidUpdate:function () {
      console.log("componentDidUpdate");
    },

    handleCommit:function () {
      console.info("commit"+JSON.stringify(this.state.prdt));
      if(this.state.prdt.opt_type!=undefined&&this.state.prdt.opt_type=="add")
      {
        DeActions.addItem(this.state.prdt);
      }
      else
      {

      }
    },
    render:function () {



      return(
        <div>
          daohang
          <LinkNav handleCommit={this.handleCommit}  path={this.props.children} title="导航"  data={[{path:"/depage/prdt/1/base",title:"基本信息"},{path:"/depage/prdt/1/rate",title:"利率信息"}]}></LinkNav>
        </div>
      );
    }
  }
);
var DePage = React.createClass(
  {

    getInitialState: function ()
    {
      return ({});
    },

    render: function ()
    {


      return (
        <div>
          <h1>存款产品</h1>

          {this.props.children}


        </div>
      );
    }
  }
);
module.exports={DePage,DeDetail,DeMain};
