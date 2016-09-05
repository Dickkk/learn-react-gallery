/**
 * Created by chaoice3240 on 2016/9/1.
 */
var React = require('react');
import {Link} from 'react-router';

var CardComponent = React.createClass(
  {

    getInitialState: function () {
      return ({});
    },
    render: function () {
      return (
        <div>
          <h3 >{this.props.prdt_no}</h3>
          <Link to={this.props.route} onClick={this.props.handleClick(this.props.prdt_no)} >
            <img src={this.props.img}/>
          </Link>
        </div>
      );
    }
  });
module.exports=CardComponent;
