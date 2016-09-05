/**
 * Created by chaoice3240 on 2016/8/30.
 */
var React = require('react');
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

var AppPage = React.createClass(
  {
    getInitialState: function ()
    {
      return ({});
    },

    render: function ()
    {

      return (
        <div>
        <div className='ribbon'>

          <Link to="/home"><span>主页</span></Link>
          <Link to="/depage"><span>存款产品工厂</span></Link>
          <Link to="/lnpage"><span>贷款产品工厂</span></Link>
          <Link to="/fnpage"><span>理财产品工厂</span></Link>
          <Link to="/inpage"><span>内部产品工厂</span></Link>
          <Link to="/about"><span>关于</span></Link>

        </div>


          {this.props.children}
          
          </div>
      );
    }
  }
);
module.exports=AppPage;
