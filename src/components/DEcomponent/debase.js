/**
 * Created by chaoice3240 on 2016/8/31.
 */
var React = require('react');
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField'
const prdt_type=['1','2','3'];
const prdt_knd=['1','2','3','9','I'];
import {fullBlack} from 'material-ui/styles/colors';
import {deDetailStore} from 'stores/DeStore';
import DeActions from 'actions/deActions'
var Reflux = require('reflux');
const styles = {
  errorStyle: {
    color: fullBlack,
  },
  underlineStyle: {
    borderColor: fullBlack,
  },
  floatingLabelStyle: {
    color: fullBlack,
  },
  floatingLabelFocusStyle: {
    color: fullBlack,
  }
};
var debase = React.createClass(

  {
    mixins: [Reflux.connect(deDetailStore, "prdt")],
    componentWillMount:function () {

    },

    getInitialState: function ()
    {
      return ({prdt_no:'',prdt_type:'',prdt_knd:''});
    },
    handleChange:function (e) {
      var prdt=this.state.prdt;
      //prdt["debase"][e.target.name]=e.target.value;
      prdt["prdt_no"]=this.refs.prdt_no.getValue();
      prdt["debase"]["prdt_type"]=this.refs.prdt_type.getValue();
      prdt["debase"]["prdt_knd"]=this.refs.prdt_knd.getValue();
      DeActions.loadPrdtfromUI(prdt);


    },
    render: function ()
    {

      return (
        <div>
        <h1>存款基本页面</h1>
        <div >
          <TextField
            underlineStyle={styles.underlineStyle}
            hintText="产品号"
            floatingLabelText="产品号"
            onChange={this.handleChange}
            ref="prdt_no"
            value={this.state.prdt.prdt_no}
          />
          <br/>
          <AutoComplete
            hintText="产品类型：1：活期 2：定期"
            floatingLabelText="产品类型：1：活期 2：定期"
            filter={AutoComplete.caseInsensitiveFilter}
            underlineStyle={styles.underlineStyle}
            dataSource={prdt_type}
            onUpdateInput={this.handleChange}
            ref="prdt_type"

            searchText={this.state.prdt.debase.prdt_type}
          />
            <br/>
          <AutoComplete
            underlineStyle={styles.underlineStyle}
            floatingLabelText="产品种类：1:公众存款 2:同业存放 3:暂记户4:保证金 5：验资户6：增资户 I:电子现金9.智能存款 "
            hintText="产品种类：1:公众存款 2:同业存放 3:暂记户4:保证金 5：验资户6：增资户 I:电子现金9.智能存款 "
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={prdt_knd}
            onUpdateInput={this.handleChange}
            ref="prdt_knd"
            searchText={this.state.prdt.debase.prdt_knd}
          />
              <br/>
          </div>
          </div>
      );
    }
  }
);
module.exports=debase;

