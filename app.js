const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { path } = require('express/lib/application');
const res = require('express/lib/response');

const day = require(__dirname+'/day')





let items = [/*'Buy food','Cook food','Eat food'*/]
let workList = []

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({extended:true}))


app.get('/',(req,res)=>{

    
    
   let today = day.printDay()
     
    
    res.render("list",{listTitle:today,newListItem:items,act:'/'})
    
    console.log(items)

    // res.send()
})


app.post('/',(req,res)=>{
  // res.send('<h1>sucessfully subitted</h1>')
 
  item = req.body.newItem;
  items.push(item);
  res.redirect('/')
})

app.get('/work',(req,res)=>{
  res.render("list",{listTitle:'Work List',newListItem:workList, act:'/work'})
})

app.post('/work',(req,res)=>{
  // res.send('<h1>sucessfully subitted</h1>')
 
  item = req.body.newItem;
  workList.push(item);
  res.redirect('/work')
})

app.listen(10,()=>{

})