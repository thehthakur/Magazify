import concurrent.futures
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from pymongo import MongoClient
from spiders.firstcrawler import CrawlingSpider as FirstCrawler
from spiders.secondcrawler import CrawlingSpider as SecondCrawler
from scrapy.utils.project import get_project_settings
import json

def main():
    output_file = 'output.json'
    settings = get_project_settings()
    process = CrawlerProcess(settings)
    process.crawl(SecondCrawler, output_file=output_file)
    # process.crawl(FirstCrawler, output_file=output_file)
    
    process.start()

    
    send_data_to_mongodb(output_file)

def send_data_to_mongodb(output_file):
    # Connect to MongoDB (make sure MongoDB is running)
    client = MongoClient('mongodb+srv://ddtuser:ddt_password@ddtdb.qz0h58k.mongodb.net/?retryWrites=true&w=majority')
    db = client['ddtdb']  # Replace 'your_database_name' with the actual database name
    collection = db['magazine']  # Replace 'your_collection_name' with the actual collection name

    # Read the entire data from the output file
    with open(output_file, 'r') as file:
        try:
            data = json.load(file)
        except json.JSONDecodeError:
            print(f"Error loading JSON data from file: {output_file}")
            return

    # Insert all the data into MongoDB
    if data:
        collection.insert_many(data)

    client.close()



if __name__ == '__main__':
   main()
