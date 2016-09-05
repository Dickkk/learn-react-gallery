/**
 * Created by Administrator on 2016/8/24.
 */
import superagent from 'superagent';
  var  Reflux =require( 'reflux');
  import DeActions from 'actions/deActions'
  'use strict';
  var deListStore=Reflux.createStore({
    listenables:[DeActions],
    onEditItem:function (itemkey,newLabel) {

    },
    onAddItem:function (data) {
      superagent.post('http://localhost'  + ':8888/api/prdts')
        .send({data:data})
        .end(function (err,data){
          if(err)
          {
            console.error(err);
            return;
          }
          this.updateList();
        }.bind(this))
    }
    ,
    onToggleItem:function () {

    },
    onTogglAllItem:function () {

    },
    onClearCompleteItem:function () {

    },
    onRemoveItem:function (prdt_no) {
      console.info("delete item"+JSON.stringify(this.list));
      var tmplist=this.list;
      superagent.delete('http://localhost'  + ':8888/api/prdts/'+prdt_no)
        .end(function (err,data) {
          console.info("delete item"+JSON.stringify(tmplist));
          this.list=tmplist.filter(function (x){
            return x.prdt_no!=prdt_no;
          });
          console.info("delete item"+JSON.stringify(this.list));
          this.trigger(this.list);
        }.bind(this));
    },
    updateList:function () {
      superagent
        .get('http://localhost'  + ':8888/api/prdts?page='+(this.nextPage-1))
        .end(function (err,data){
          if(err)
          {
            console.error(err);
            return;
          }

          this.list=data.body;
            console.info("update"+JSON.stringify(this.list));
          this.trigger(this.list);

        }.bind(this)
        );

    },
    getInitialState:function () {
      this.nextPage=1;
      if(this.list==undefined) {
        this.list = [];
      }
      superagent
        .get('http://localhost'  + ':8888/api/prdts?page=' + this.nextPage )
        .end(function(err, data) {

          if (err) {
            console.error(err);
            return;
          }


          this.list=data.body;

          this.nextPage=this.nextPage+1;
          this.trigger(this.list);

          return this.list;
        }.bind(this));


    }
  });
var deDetailStore=Reflux.createStore({
  listenables:[DeActions],

  onLoadPrdtfromUI:function (prdt) {
    if(prdt=="*")
    {
      var obj = {
        opt_type: "add",
        prdt_no: '*',
        debase: { prdt_knd: '', prdt_type: ''},
        derate: {rate_type: '', rate_chrg_type: '', rate_code: '', rate_rule: []}
      };
      this.prdt = obj;
      this.trigger(this.prdt);
    }
    else
    {

          this.prdt=prdt;
          this.trigger(this.prdt);

    }

  },
  onLoadPrdtfromServer:function (prdt_no) {
    if(prdt_no=="*")
    {
      this.trigger(this.prdt);
    }
    else
    {
      superagent.get('http://localhost'  + ':8888/api/prdt/'+prdt_no)
        .send({prdt_no:prdt_no})
        .end(function (err,data){
          if(err)
          {
            console.error(err);
            return;
          }
          this.prdt=data.body["0"];
          this.trigger(this.prdt);
        }.bind(this))
    }

  }
  ,

  getInitialState:function () {
    if(this.prdt==undefined) {
      var obj = {
        opt_type: "add",
        prdt_no: '*',
        debase: { prdt_knd: '', prdt_type: ''},
        derate: {rate_type: '', rate_chrg_type: '', rate_code: '', rate_rule: []}
      };
      this.prdt = obj;
    }
    this.trigger(this.prdt);
    return(this.prdt);


  }
});

exports.deListStore=deListStore;
exports.deDetailStore=deDetailStore;

