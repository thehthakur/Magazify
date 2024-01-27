# import flask module
from flask import Flask, json,request,session,jsonify
from db import magazine
from pymongo import MongoClient
from bson import json_util
from datetime import datetime as dt 
from flask_cors import CORS 
from models import User,Magazine

app = Flask(__name__) 
app.secret_key = 'ddt_ddt_ddt'
CORS(app)

@app.route("/")
def home():
    return 'home'

@app.route('/signup', methods=['POST'])
def signup():
  return User().signup(request.json)

@app.route('/signout')
def signout():
  return User().signout()

@app.route('/login', methods=['POST'])
def login():
  return User().login(request.json)

@app.route('/magazine', methods=['GET'])
def magazines():
    result = magazine.find({})
    return json.loads(json_util.dumps(result))
@app.route('/create_magazine_account', methods=['POST'])
def create_magazine_account():
  return Magazine().create_magazine_account(request.json)
@app.route('/publogin',methods=['POST'])
def publogin():
   print(request.json)
   return Magazine().login(request.json)
@app.route('/call_for_submissions', methods=['POST'])
def call_for_submissions():
    user = session.get('user')

    # Check if the user is a magazine
    if user and user.get('role') == 'magazine':
        publisher_id = user.get('_id')
        submission_data = request.json
        return Magazine().call_for_submissions(publisher_id, submission_data)
    else:
        return jsonify({"error": "Unauthorized access"}), 401
if __name__ == '__main__':
    app.run(debug=True)
