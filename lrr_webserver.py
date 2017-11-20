#!/usr/bin/python
#############################################################################
# Long Range Reader Web/WebSocket Server
# By: Dennis Linuz <dennismald@gmail.com>
#
#############################################################################
import json

import tornado.websocket
import tornado.httpserver
import tornado.ioloop
import tornado.web
import os
import csv

CSV_FILE = "cards.csv"
PORT = 8080
Listeners = []

HTML = open('creds.html', 'rt').read()

cards_file = open(CSV_FILE)
cards_file.seek(os.path.getsize(CSV_FILE))

def check_file():
    position = cards_file.tell()
    line = cards_file.readline()
    if not line:
        cards_file.seek(position)
    else:
        print "File changed detected!"
        for l in Listeners:
            l.write_message(line)

class CredentialHandler(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        print 'new connection'
        Listeners.append(self)
        #self.write_message("Connected!")
        # Initially print out contents of file
        with open(CSV_FILE) as cards_file:
            next(cards_file)
            for line in cards_file:
                #print "Sending message!"
                self.write_message(line)

    def on_message(self, message):
        pass

    def on_close(self):
        print 'connection closed'
        Listeners.remove(self)

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.write(HTML % (self.request.host))

class JsonHandler(tornado.web.RequestHandler):
    # support CORS
    def set_default_headers(self):
        print "setting headers!!!"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def get(self):
        self.set_header('Content-Type', 'application/json')
        self.set_header('Access-Control-Allow-Origin', '*')

        response = []
        with open(CSV_FILE) as cards_file:
            for line in cards_file:
                # next(cards_file)
                cols = line.rstrip('\n').split(',')
                cred = {
                    'id':                   cols[0],
                    'bit_length':           cols[1],
                    'wiegand_binary':       cols[2],
                    'wiegand_hex':          cols[3],
                    'iclass_std_enc_hex':   cols[4],
                    'fac_code':             cols[5],
                    'card_num':             cols[6],
                    'card_num_no_fac':      cols[7]
                }
                response.append(cred)
        self.write(json.dumps(response))


class CSVDownloadHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Content-Type', 'application/octet-stream')
        self.set_header('Content-Disposition', 'attachment; filename=' + CSV_FILE)
        # Print out contents of file
        with open(CSV_FILE) as cards_file:
            for line in cards_file:
                self.write(line)
        self.finish()

class ClearCSV(tornado.web.RequestHandler):
    def get(self):
        with open(CSV_FILE, 'w') as csv_file:
            fieldnames = ['id', 'bit_length', 'wiegand_binary', 'wiegand_hex', 'iclass_std_enc_hex', 'fac_code', 'card_num',
                          'card_num_no_fac']
            csvwriter = csv.DictWriter(csv_file, lineterminator='\n', fieldnames=fieldnames)
            csvwriter.writeheader()
        cards_file.seek(os.path.getsize(CSV_FILE))
        self.redirect('/')

application = tornado.web.Application([
    (r'/ws', CredentialHandler),
    (r'/', IndexHandler),
    (r'/clearcsv', ClearCSV),
    (r'/cards.csv', CSVDownloadHandler),
    (r'/json', JsonHandler)
])

http_server = tornado.httpserver.HTTPServer(application)
http_server.listen(PORT)
tornado.ioloop.PeriodicCallback(check_file, 500).start()
tornado.ioloop.IOLoop.instance().start()
