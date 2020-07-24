const Servicos = require('./api/servicos');
const querystring = require('querystring');
const fs = require('fs');

module.exports = function(server) {
        
// *********************************************************
// 3) Test if two rectangles intersect
// 4) Compute area of intersection between two rectangles
// *********************************************************
    server.get('/api/addrectangle', (req, res) => {
        Servicos.addrectangle(decodeURIComponent(querystring.stringify(req.query)), req.query.area, (ret) => {
            res.send(String(ret));
        });
    })    
    server.get('/api/intersects', (req, res) => {
        Servicos.intersects(req.query.i, req.query.area, (ret) => {
            res.send(String(ret));
        });
    })    
    
// *********************************************************
// 5) Simple Todo List
// *********************************************************
    server.put('/api/todolistadd', (req, res) => {
        Servicos.todolistadd(req.query.todo, (ret) => {
            res.send(String(ret));
        });
    })    
    server.get('/api/todolist', (req, res) => {
        Servicos.todolist((ret) => {
            res.send(String(ret));
        });
    })    
    server.delete('/api/todolistremove', (req, res) => {
        Servicos.todolistremove(req.query.id, (ret) => {
            res.send(String(ret));
        });
    })    


// *********************************************************
// 7) Rest Server - World Clock
// *********************************************************
    server.get('/api/restServer', (req, res) => {
        Servicos.restServer((ret) => {
            res.send(ret);
        });
    })    

    server.get('/', (req, res) => {
        fs.readFile('src/index.html', (err, data) => {
            let html = data.toString();
            res.send(html);
        });
    })    

}

