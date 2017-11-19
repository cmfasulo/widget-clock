#! python3

from http.server import BaseHTTPRequestHandler, HTTPServer
from os import curdir, sep
import json

class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):
	def get_memetype(self):
		if self.path.endswith('.html'):
			self.mimetype = 'text/html'
		if self.path.endswith('.png'):
			self.mimetype = 'image/png'
		if self.path.endswith('.gif'):
			self.mimetype = 'image/gif'
		if self.path.endswith('.js'):
			self.mimetype = 'application/javascript'
		if self.path.endswith('.css'):
			self.mimetype = 'text/css'

	def do_GET(self):
		if self.path == '/':
			self.path = '/index.html'

		self.get_memetype()

		try:
			f = open(curdir + sep + self.path, 'rb')
			self.send_response(200)

			if self.path == '/index.html':
				weatherKey = json.load(open('./config.json'))['weatherKey']
				self.send_header('Set-Cookie', 'weatherKey=%s' % weatherKey)

			self.send_header('Content-type', self.mimetype)
			self.end_headers()

			self.wfile.write(f.read())
			f.close()
			return

		except IOError:
			self.send_error(404,'File Not Found: %s' % self.path)

def run():
	address = '127.0.0.1'
	port = 8080
	print(f'Starting widget-clock web server at {address}:{port}')

	server_address = (address, port)
	httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
	httpd.serve_forever()

run()
