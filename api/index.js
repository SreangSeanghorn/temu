const express = require('express')
const app = express()
const path = require('path')
const port = 80
var prodRoute = require('./product')
var cateRoute = require('./category')
var supRoute = require('./supplier')
var multer  = require('multer')

app.use(express.json())
app.use(express.urlencoded({extended:false}));


app.listen(port, () => {
    console.log('App running on port '+{port})
  })

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


app.get('/upload',(req,res)=>{
  res.sendFile(path.join(__dirname,'../html','index.html'))
});

app.post('/upload', upload.single('profile-file'), function (req, res, next) {

  console.log("file is:"+JSON.stringify(req.file))
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += '<img src="${req.file.path}" /><br>'
  return res.send(response)
});


app.use('/product', prodRoute)
app.use('/category', cateRoute)
app.use('/supplier', supRoute)