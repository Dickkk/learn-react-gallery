/**
 * Created by Administrator on 2016/8/24.
 */
var Reflux =require( 'reflux');
  'use strict';
  var DeActions=Reflux.createActions([
    "loadPrdtfromServer",
    "loadPrdtfromUI",
    "addItem",
    "removeItem",
    "editItem"
  ]);
module.exports=DeActions;

