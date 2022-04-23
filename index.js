const http = require('http');

const host = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
   
    const urlPath = req.url;
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    if(urlPath ==='/'){
        res.end('Home Page')
    }else if(urlPath === '/user'){
        res.end('User')
    }else{
        res.end("Page not found");
    }
   
    
    // res.writeHead(200, {'Content-Type':'application/json'});
    // const data = JSON.stringify({
    //     name:'Mujib',
    //     title:'Engineer'
    // })
    // res.write(data);
    // res.end();


});

server.listen(port,host, () =>{
    console.log(`Running at ${host}:${port}`)
})