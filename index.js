const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
// app.use(bodyParser.urlencoded({ extended: false }))
const cors = require('cors');
var ObjectID = require('mongodb').ObjectID;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(cors());
const port = 5000;

app.get('/',(req,res)=>{
    res.send('mongo server is ready to use')
})
const uri = "mongodb+srv://volunteer:volunteer1234@cluster0.okztc.mongodb.net/volunteers?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const volunteerCollection = client.db("volunteers").collection("items");
  const volunteerRegister = client.db("volunteers").collection("Registation");
   
   

    app.post('/post',(req,res)=>{
        const people = req.body;
        volunteerRegister.insertOne(people)
        .then(result=>{
            console.log('posted')
        })
    })

    app.get('/items/',(req,res)=>{
        volunteerCollection.find({})
        .toArray((err,documents)=>{
            res.send(documents)
        })
    });
    // app.get('/item/:data',(req,res)=>{

    //     volunteerCollection.find({user:(req.params.data)})
    //     .toArray((err,document)=>{
    //         res.send(res.send(document))
           
    //     })
    // });
    app.get('/users',(req,res)=>{
        volunteerRegister.find({email: (req.query.email)})
        .toArray((err,user)=>{
            res.send(user)
        })
    })
    app.get('/admin',(req,res)=>{
        volunteerRegister.find({})
        .toArray((err,user)=>{
            res.send(user)
        })
    });

    app.delete('/delete/:id',(req,res)=>{
       volunteerRegister.deleteOne({date:(req.params.id)})
       .then(res=>{
           console.log(res)
       })

    })
});













app.listen(port)