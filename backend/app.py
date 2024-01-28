# import flask module
from flask import Flask, json,request,session,jsonify
from db import magazine,articles
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
    
    # user = session.get('user')
    # if user and user.get('type') == 'magazine':
    
    submission_data = request.json
    
    return Magazine().call_for_submissions(submission_data)
    # else:
        # return jsonify({"error": "Unauthorized access"}), 401
@app.route('/submit_article', methods=['POST'])
def submit_article():
    # user_id = session.get('user').get('_id')
    article_data = request.json

    # Save the submitted article to the database (adjust as needed)
    article = {
        "user":article_data.get('user'),
        "magazinename": article_data.get('magazinename'),
        "Name": article_data.get('Name'),
        'article':article_data.get('article')
        # Add other fields as needed
    }

    # Save the article to the database (e.g., using MongoDB)
    articles.insert_one(article)

    return jsonify({"message": "Article submitted successfully"}),200

if __name__ == '__main__':
    app.run(debug=True)
