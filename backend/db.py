from flask import Flask
from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://ddtuser:ddt_password@ddtdb.qz0h58k.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('ddtdb')
magazine = pymongo.collection.Collection(db, 'magazine')
users = pymongo.collection.Collection(db,'user')