/**
 * Created by chaoice3240 on 2016/8/31.
 */
var React = require('react');
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField'
const rate_type=['1','2','3'];
const rate_chrg_type=['1','2','3','9','I'];
import {fullBlack} from 'material-ui/styles/colors';
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

var derate = React.createClass(
  {
    getInitialState: function ()
    {
      return ({});
    },

    render: function ()
    {

      return (
        <div>
        <h1>存款利率页面</h1>
        <TextField
      underlineStyle={styles.underlineStyle}
      hintText="利率代码"
      floatingLabelText="利率代码"
        value={this.props.rate_code}
        />
        <br/>
        <AutoComplete
      hintText="产品类型：1：活期 2：定期"
      floatingLabelText="产品类型：1：活期 2：定期"
      filter={AutoComplete.caseInsensitiveFilter}
      underlineStyle={styles.underlineStyle}
      dataSource={prdt_type}
        />
        <br/>
        <AutoComplete
      underlineStyle={styles.underlineStyle}
      floatingLabelText="产品种类：1:公众存款 2:同业存放 3:暂记户4:保证金 5：验资户6：增资户 I:电子现金9.智能存款 "
      hintText="产品种类：1:公众存款 2:同业存放 3:暂记户4:保证金 5：验资户6：增资户 I:电子现金9.智能存款 "
      filter={AutoComplete.caseInsensitiveFilter}
      dataSource={prdt_knd}
        />
        <br/>
          </div>
      );
    }
  }
);
module.exports=derate;
