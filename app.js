const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// const { path } = require('express/lib/application');
// const res = require('express/lib/response');

const day = require(__dirname+'/day')

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/toDoListDB')

const itemsSchema = mongoose.Schema({text:String,tag:String}) //creating list item schema

const Item = mongoose.model('Item',itemsSchema)

let items = [];
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    
  Item.find({tag:"daily"},(err,array)=>{
    
    if(array.length === 0)
    {
      //inserting into the database
         
          Item.insertMany([{text:"Welcome to your toDoList app",tag:"daily"},{text:"press the + button to add a new item",tag:"daily"},{text:"<--- press that button to delete an item",tag:"daily"}])
          res.redirect('/')
    }
    else{
      
        Item.find({tag:"daily"},(err,arr)=>{
        let today = day.printDay()
        res.render("list",{listTitle:today,newListItem:arr,act:'/'})
        
      })
    }
   
  })
})


app.post('/',(req,res)=>{
 
  itemText = req.body.newItem;
  Item.create(new Item({text:itemText,tag:"daily"}))
 
  res.redirect('/')
})

app.post('/delete',(req,res)=>{
  Item.findByIdAndDelete(req.body.id,(err,deletedItem)=>{
    if(deletedItem.tag === "daily"){
      res.redirect('/');
    }
    else{
      res.redirect('/' + deletedItem.tag)
    }
  })
})

app.get('/:new',(req,res)=>{
    const listName = req.params.new
    Item.find({tag:listName},(err,arr)=>{
      res.render('list',{listTitle:listName,newListItem:arr,act:"/" + listName})
    })
})

app.post('/:new',(req,res)=>{
  item = req.body.newItem
  listName = req.params.new
  Item.create(new Item({text:item,tag:listName})).then(res.redirect('/'+listName))
})


app.listen(10,()=>{
})