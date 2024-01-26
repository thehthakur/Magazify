from scrapy.spiders import CrawlSpider,Rule
from scrapy.linkextractors import LinkExtractor

class CrawlingSpider(CrawlSpider):
    name="mycrawler" #this is now the identifier of the spider
    allowed_domains=["https://www.gulmohurquarterly.com","https://thebombayreview.com"]
    start_urls=["https://www.gulmohurquarterly.com/submission-guidelines"]
    rules=(
         Rule(LinkExtractor(), callback='parse_item', follow=True),
#for extracting all data
    )
    def parse_item(self, response):
        # Your parsing logic goes here
        # Use XPath or CSS selectors to extract data from the response
        # Example:
        title = response.css('span#productTitle::text').get()
        price = response.css('span#priceblock_ourprice::text').get()