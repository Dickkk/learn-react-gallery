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
    onAddItem:function (deprdt) {
      superagent.post('http://localhost'  + ':8888/api/todos')
        .send({data:deprdt})
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
      console.info("delete item");
      var tmplist=this.list;
      superagent.delete('http://localhost'  + ':8888/api/deprdts/'+prdt_no)
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
        .get('http://localhost'  + ':8888/api/deprdts?page='+(this.nextPage-1))
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
module.exports=deListStore;

