# import flask module
from flask import Flask, json
from db import magazine
from bson import json_util
from datetime import datetime as dt 
from flask_cors import CORS 
app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return 'home'

@app.route('/magazine', methods=['GET'])
def magazines():
    result = magazine.find({})
    return json.loads(json_util.dumps(result))

@app.route('/login', methods=['POST', 'GET'])
def login():
    return 'login'

if __name__ == '__main__':
    app.run(debug=True)
