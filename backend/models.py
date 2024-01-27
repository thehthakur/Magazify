from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from db import magazine_account
from db import users
import uuid

class User:

  def start_session(self, user):
    
    session['logged_in'] = True
    session['user'] = user
    print(jsonify(user))
    return jsonify(user),200

  def signup(self,user_data):
    print(request.form)
    user = {
      "_id": uuid.uuid4().hex,
      "name": user_data.get('name'),
      "email": user_data.get('email'),
      "password": user_data.get('password')
    }

    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(user['password'])
    # print(user)
    # Check for existing email address
    user_exists = users.find_one({"email": user['email']})
    if user_exists:
      return jsonify({ "error": "Email address already in use" }), 400
    else : users.insert_one(user);return self.start_session(user)
    

  
  def signout(self):
    
    session.clear()
    return redirect('/')
  
  def login(self,user_data):

    user = users.find_one({
      "email": user_data.get('email')
    })
    print(user)
    

    if user and pbkdf2_sha256.verify(user_data.get('password'), user['password']):
      return self.start_session(user)
    
    return jsonify({ "error": "Invalid login credentials" }), 401
class Magazine:
    # ... (existing code)

    def create_magazine_account(self, magazine_data):
        print(magazine_account)
        smagazine = {
            "_id": uuid.uuid4().hex,
            "name": magazine_data.get('name'),
            "genre": magazine_data.get('genre'),
            "guideline": magazine_data.get('guideline'),
            "deadline": magazine_data.get('deadline'),
            # Remove "email" field
            "password": magazine_data.get('password'),
            # Add other fields as needed
        }
        # Encrypt the password
        smagazine['password'] = pbkdf2_sha256.encrypt(smagazine['password'])

        # Check for existing magazine with the same name
        magazine_exists = magazine_account.find_one({"name": smagazine['name']})

        if magazine_exists:
            return jsonify({"error": "Magazine name already in use"}), 400
        else:
            magazine_account.insert_one(smagazine)
            return jsonify({"message": "Magazine account created successfully"}), 200
