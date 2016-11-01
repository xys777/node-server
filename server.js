/**
 * Created by a514804 on 10/27/2016.
 */
var http = require('http');
var fs = require('fs');
var multiParser = require('./multiParser')
var hostname = process.env.IP||'127.0.0.1'
var port = process.env.PORT||3000
http.createServer(function (req, res) {

  req.on('error', onRequestError);
  res.on('error', onResponseError);

  processRequest(req, res);
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
;

function onRequestError(err) {
  console.error(err);
  this.response.statusCode = 400;
  this.response.end();
}
function onResponseError(err) {
  console.error(err);
}
function processRequest(req, res) {
  req.parsedUrl = parseUrl(req.url)
  req.baseUrl = req.parsedUrl.baseUrl
  req.query = req.parsedUrl.params;
  var file = __dirname + req.baseUrl
  console.log('request is ' + file);
  fs.exists(file, (exists) => {
    if(exists){
      readFile(file, req, res)
    }else{
      runAction(req, res)
    }
  }
)
  ;
}
function parseUrl(url) {
  var arr = url.split('?'),params=[]
  if (arr.length>1)
  params = arr[1].split('&');
  return{
    baseUrl:arr[0],
    params:params
  }
}
function readFile(file, req, res) {
  fs.stat(file, function (err, stat) {
    if (stat.isFile()) {
      fs.readFile(file, (err, data) => {
        if (err) throw err
        res.end(data)
    })
    } else if (stat.isDirectory()) {
      runAction(req, res)
    }
  })
}
function runAction(req, res) {

  if(req.baseUrl==='/'){
    index(req, res)
  }else{
    var urls = req.baseUrl.split('/')
    try{
      require(__dirname+'/'+urls[1])(req,res);
    }catch(e){
      pageNotFound(res)
    }
  }
  // switch (req.url) {
  //   case '/upload':
  //     upload(req, res)
  //     break
  //   case /config/.test(str):
  //   default:
  //     pageNotFound(res)
  // }
}
global.pageNotFound = function pageNotFound(res) {
  res.statusCode = 404;
  res.end('Page Not Found!');
}

function index(req, res) {
  fs.readFile('index.html', (err, data) => {
    if (err) throw err
    res.end(data)
})
}
function upload(req, res) {
  //res.end('uploaded!');
  var body = [];
  req.on('data', function (chunk) {
    body.push(chunk);
  }).on('end', function () {
    body = Buffer.concat(body).toString('binary');
    if (req.headers.hasOwnProperty('content-type')) {
      var formData = new multiParser(req.headers['content-type'], body);
      //console.log(formData);
    }
    //if(formData.fields.length===1){
    formData.fields.forEach(function (field) {
      var obj = formData.parts[field];
      var filename = obj.disposition && obj.disposition.filename;
      var buffer = new Buffer(obj.body, 'binary');
      fs.writeFile(filename, buffer, (err) => {
        if (err) throw err;
    })
      ;
    })
    //}
    res.end();
  });
}
