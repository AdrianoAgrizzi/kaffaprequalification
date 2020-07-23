const Servicos = require('./api/servicos');
const querystring = require('querystring');


module.exports = function(server) {
        
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
    

    server.get('/', (req, res) => {
        fs.readFile('src/index.html', (err, data) => {
            let html = data.toString();
            res.send(html);
        });
    })    

}

