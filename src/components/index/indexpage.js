/**
 * Created by Administrator on 2016/8/24.
 */
var React = require('react');

var Reflux = require('reflux');
import TodoActions from 'actions/todoActions';
import  TodoStore from 'stores/todoStore';
import {Link} from 'react-router';
var TodoItem = React.createClass(
  {
    getInitialState: function ()
    {
      return ({});
    },
    handledelte: function ()
    {
      TodoActions.removeItem(this.props.id);
    },
    render: function ()
    {
      console.info("item"+JSON.stringify(this.props));
      return (
        <li>
          <div>
            <input type="checkbox" checked={this.props.isCompleted}/>
            <label >{this.props.name}</label>
            <button onClick={this.handledelte}>delete</button>
          </div>
        </li>
      );
    }
  }
);
var TodoMain = React.createClass(
  {
    propTypes: {
      list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },

    render: function ()
    {

      if (this.props.list == undefined) {

        return (
          <section>
            <ul>
            </ul>
          </section>
        );
      }
      console.info('todomain render' + JSON.stringify(this.props.list));
      return (

        <section>
          <ul>
            {

              this.props.list.map((x)=>
              {
                return (
                  <TodoItem name={x.name} isCompleted={x.isCompleted} key={x._id} id={x._id}/>
                );
              })
            }
          </ul>
        </section>
      );
    }
  }
);
var TodoHeader = React.createClass(
  {
    handleadd(evt){
      TodoActions.addItem(evt.target.value);
    },
    render: function ()
    {
      return (
        <header>
          <h1>todos</h1>
          <input type="text" onKeyUp={this.handleadd}/>
        </header>
      );
    }
  }
);
var TodoApp = React.createClass(
  {
    mixins: [Reflux.connect(TodoStore, "list")],
    render: function ()
    {
      console.info('state=' + this.state);
      return (
        <div>
         
          <TodoHeader/>
          <TodoMain list={this.state.list}></TodoMain>
        </div>
      );
    }


  }
);


module.exports = TodoApp;
