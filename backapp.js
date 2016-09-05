/**
 * Created by Administrator on 2016/8/21.
 */
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var todo=require('./src/models/todo');
var deprdt=require('./src/models/deprdt');
const config = require('./webpack.config');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var pagesize=5;
var router=express.Router();
var cors=require('cors');
app.use(cors());
router.use((req,res,next)=>{

  next();
});
router.get('/',(req,res)=>{
  res.json({message:'hooray!welcom to our api'});
});
router.route('/todos')
  .post((req,res)=>{
    var mytodo=new todo();
    mytodo.name=req.body.name;
    mytodo.isCompleted=req.body.isCompleted;
    console.log(req.body);
    console.log(req.body.name);
    console.log(mytodo.name);
    mytodo.save((err)=> {
      if(err)
      {
        res.send(err);
      }
      res.json({message:'todo create'});
    });
  })
  .get((req,res)=>{
    console.log("get method");
    var page=req.query.page;
    var start=(page-1)*pagesize;
    todo.find().skip(start).limit(pagesize).exec((err,todos)=>{
      if(err)
      {
        res.send(err);
      }
      res.json(todos)
      console.log(JSON.stringify(todos));
    });
  });
router.route('/todos/:todos_id')
  .get((req,res)=>{
    todo.findById(req.params.todos_id,(err,todo)=>{
      if(err)
      {
        res.send(err);

      }
      res.json(todo);
    });

  })
  .delete((req,res)=>{
    todo.remove({_id:req.params.todos_id},(err,todo)=>{
      if(err)
      {
        res.send(err)
      }
      res.json({message:"delete success!"});
    })
  })
  .put((req,res)=>{
    todo.findById(req.params.todos_id,(err,itodo)=>{
      if(err)
      {
        res.send(err);
      }
      itodo.name=req.body.name;
      itodo.save((err)=>{
        if(err)
        {
          res.send(err);
        }
        res.json({message:"update success!"});
      })
    })
  })
router.route('/prdts')
  .post((req,res)=>{
    var newdeprdt=new deprdt();
    console.log(JSON.stringify(req.body.data));
    newdeprdt.prdt_no=req.body.data.prdt_no;
    newdeprdt.debase=req.body.data.debase;
    newdeprdt.derate=req.body.data.derate;


    newdeprdt.save((err)=> {
      if(err)
      {
        res.send(err);
      }
      res.json({message:'todo create'});
    });
  })
  .get((req,res)=>{
    console.log("get method");
    var page=req.query.page;
    var start=(page-1)*pagesize;
    deprdt.find().skip(start).limit(pagesize).exec((err,deprdts)=>{
      if(err)
      {
        res.send(err);
      }
      res.json(deprdts)
      console.log(JSON.stringify(deprdts));
    });
  });
router.route('/prdt/:prdt_no')
  .get((req,res)=>{
    deprdt.find({prdt_no:req.params.prdt_no},(err,prdt)=>{
      if(err)
      {
        res.send(err);

      }
      console.log("result="+req.params.prdt_no+JSON.stringify(prdt));
      res.json(prdt);
    });

  })
  .delete((req,res)=>{
    deprdt.remove({prdt_no:req.params.prdt_no},(err,prdt)=>{
      if(err)
      {
        res.send(err)
      }
      res.json({message:"delete success!"});
    })
  })
  .put((req,res)=>{
    deprdt.findById(req.params.prdt_no,(err,itodo)=>{
      if(err)
      {
        res.send(err);
      }
      itodo.debase=req.body.debase;
      itodo.derate=req.body.derate;
      itodo.save((err)=>{
        if(err)
        {
          res.send(err);
        }
        res.json({message:"update success!"});
      })
    })
  })

app.use('/api',router);
app.listen(config.backport);
console.log(config.backport);
var mongoose=require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://root:root@localhost:27017/imongodb');

