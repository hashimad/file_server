const http = require('http');
const fs = require('fs');
const os = require("os");

const host = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
   
    const urlPath = req.url;
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    if(urlPath ==='/'){
        fs.createReadStream(__dirname+"/pages/index.html").pipe(res);
    }
    else if(urlPath === '/about')
    {
        fs.createReadStream(__dirname+"/pages/about.html").pipe(res);
    }
    else if(urlPath === '/sys')
    {
        
        res.setHeader('Content-Type','text/plain');
        const data = JSON.stringify({
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            numberOfCPUS: os.cpus() ,
            networkInterfaces: os.networkInterfaces(),
            uptime: os.uptime()
            });

         fs.writeFile('osinfo.json', data, (err) => {
                if (err) 
                {
                    res.end('Error Occur');
                };
                res.statusCode = 201;
                res.end('Your OS info has been saved successfully!')
            });
        
    }
    else
    {
        res.statusCode = 404;
        fs.createReadStream(__dirname+"/pages/404.html").pipe(res);
    }
   
   

});

server.listen(port,host, () =>{
    console.log(`Running at ${host}:${port}`)
})