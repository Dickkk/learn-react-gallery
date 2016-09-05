/**
 * Created by chaoice3240 on 2016/8/31.
 */
var React = require('react');
import {browserHistory } from 'react-router';
import {Link} from 'react-router';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import {deDetailStore} from 'stores/DeStore';
import FlatButton from 'material-ui/FlatButton';
var LinkNav = React.createClass(
  {

    componentWillMount:function () {
      this.setState({stepIndex: 1});
    },

    handleNext : function() {
    const {stepIndex} = this.state;
      console.log(stepIndex);
      console.log(JSON.stringify(stepIndex));
    if (stepIndex < this.props.data.length+1) {
      this.setState({stepIndex: stepIndex + 1});
      browserHistory.push({state:this.props.data[stepIndex ].data,pathname:this.props.data[stepIndex ].path});
    }
  },

handlePrev : function() {
  const {stepIndex} = this.state;
  console.log(stepIndex);
  if (stepIndex > 0) {
    this.setState({stepIndex: stepIndex - 1});
    browserHistory.push(this.props.data[stepIndex - 2].data,'',this.props.data[stepIndex - 2].path);
  }
},
    render: function ()
    {


      const {stepIndex} = this.state;

      return (
        <div>

          <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
            <Stepper linear={false} activeStep={this.props.stepIndex}>
              {this.props.data.map((x,index)=>{
                console.info("x==="+JSON.stringify(x));

                return(
                  <Step key={x.title}>
                  <StepButton onClick={
                  () =>{
                  this.setState({stepIndex: index+1,path:x.path,data:x.data});
                  browserHistory.push({state:x.data,pathname:x.path});}
                  }>
                    {x.title}
                  </StepButton>
                </Step>);
              })}
              </Stepper>
            <div>
              {this.props.path}
            </div>
            <div>

              <RaisedButton
                label="Back"
                disabled={stepIndex == 1}
                onTouchTap={this.handlePrev}
                primary={true}
                style={{marginRight: 12}}
              />
              <RaisedButton
              label="Next"
              disabled={stepIndex == this.props.data.length}
              primary={true}
              onTouchTap={this.handleNext}
            />
              <RaisedButton
                label="Submit"

                primary={true}
                onTouchTap={this.props.handleCommit}
              />

            </div>
            </div>
        </div>
      );
    }
  }
);
module.exports=LinkNav;
