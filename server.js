/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 *  
 */
const http = require('http');
 
const requestListener = (request, response) => {
    // Response Handler
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;
 
    // Request Handler
    const { method } = request;
 
    if(method === 'GET') {
        response.end('<h1>Hello!</h1>');
    }
 
        if(method === 'POST') {
        let body = [];
        
        request.on('data', (chunk) => {
            body.push(chunk);
        });
        
        request.on('end', () => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body);
            response.end(`<h1>Hai, ${name}!</h1>`);
        });
    }
};
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});