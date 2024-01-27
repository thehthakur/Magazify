import concurrent.futures
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from spiders.firstcrawler import CrawlingSpider as FirstCrawler
from spiders.secondcrawler import CrawlingSpider as SecondCrawler
from scrapy.utils.project import get_project_settings
def main():
    output_file = 'output.json'
    settings=get_project_settings()
    process=CrawlerProcess(settings)
    process.crawl(FirstCrawler,output_file=output_file)
    process.crawl(SecondCrawler,output_file=output_file)
    process.start()
if __name__ == '__main__':
   main()
