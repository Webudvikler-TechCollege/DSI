import http from 'http';

http.createServer((request, response) => {
	console.log('Server is running at port 4000');
	response.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
	response.write('<h1>Hej verden</h1>');
	response.write('<h2>Godt nytår</h2>');
	response.end();
}).listen(4000);