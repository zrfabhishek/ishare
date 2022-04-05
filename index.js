const express = require('express')
const app = express()
const port = process.env.PORT || 80
const multer = require('multer')
const path = require('path');

app.use(express.static(__dirname+"/public"))
app.use('/upload', express.static(__dirname+"/uploads"))

app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
})
  
const upload = multer({ storage: storage }).single('myfile')


app.post('/upload', upload, (req, res)=>{
    upload(req, res, (cb) =>{
        let download_link = "http://localhost/upload/"+req.file.originalname
        console.log(download_link)
        res.render('index', {download_link :download_link})
    })
    
})



app.get('/', (req, res) =>{

    res.render('index', {download_link:""})
    
})

app.listen(port, () =>{
    console.log("Listening on port 80")
})