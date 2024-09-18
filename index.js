import http from 'http'
const PORT=3000
const server=http.createServer((req,res)=>{
    if(req.url==='/users'){
        if(req.method==='GET'){
            res.end("Aplicacao esta na hora ")    
        }
        else if(req.method==='POST'){
            res.end("POST funcionando ")
        }
        
    }
  
});

server.listen(PORT,()=>console.log('server is running on localhost:3000'));