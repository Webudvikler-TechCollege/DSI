import http from 'http';

http.createServer((request, response) => {
	response.writeHead(200, {'Content-type': 'text/html'});
	response.write('Hej verden');
	response.end();
}).listen(4000);