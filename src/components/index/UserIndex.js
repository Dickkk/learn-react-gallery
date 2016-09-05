/**
 * Created by Administrator on 2016/8/21.
 */
var React = require('react'),
  Link = require('react-router').Link;



var TopicList = React.createClass({
  render: function() {
    var _list = this.props.topicList.map(function(item) {
      var topicLink = '/detail/' + item.id;
      return (
        <div >

          <Link to={ topicLink } className="topic_title">
            <h4> { item.name } </h4>
          </Link>

        </div>
      )
    })
    return (
      <div>
        <div className="topic_list">
          { _list }
          <span onClick={ this.props.checkMore } className="check_more"> 查看更多 </span>
        </div>

      </div>
    );
  }
});

module.exports = TopicList;
