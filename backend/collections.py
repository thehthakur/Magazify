from flask_pymongo import pymongo
import db
publisher = pymongo.collection.Collection(db, 'publisher')
user = pymongo.collection.Collections(db,'user')
magazines = pymongo.collection.Collections(db,'magazine')