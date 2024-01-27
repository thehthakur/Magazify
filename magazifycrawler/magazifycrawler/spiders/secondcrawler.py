from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
import html
from scrapy_splash import SplashRequest
import re

class CrawlingSpider(CrawlSpider):
    name = "secondcrawler"
    allowed_domains = ["gulmohurquarterly.com", "thebombayreview.com", 'https://www.pw.org/literary_magazines']
    start_urls = ["https://www.pw.org/literary_magazines?field_genres_value=All&taxonomy_vocabulary_20_tid=All&reading_period_status=All&items_per_page=All&fee=All&unsolicited=All&payment=All"]

    rules = (
        Rule(LinkExtractor(allow=('/submission-guidelines', '/publication-policy-copyright/', '/www.pw.org/')), callback='parse_item', follow=True),
    )
    custom_settings={
        'FEEDS' :{
            'output.json':{
                'format':'json'
            }
        }

    }
    def start_requests(self):
        for url in self.start_urls:
            yield SplashRequest(url, self.parse_item, args={'wait': 2}, endpoint='render.html')

    def parse_item(self, response):
        # Use XPath to target the list of submission deadlines
        submission_deadline_words = response.xpath('/html/body/div/div/div/div/div/div/div/div/ul/li/div/span/span/span[2]/text()').getall()

        # Use XPath to target the list of URLs
        submission_deadline_imageurls = response.xpath('/html/body/div/div/div/div/div/div/div/div/ul/li/div/div/a/div/img/@data-src').getall()
        names=response.xpath('/html/body/div/div/div/div/div/div/div/div/ul/li/div/h2/a/text()').getall()

        guidelines=response.xpath('/html/body/div/div/div/div/div/div/div/div/ul/li/div/div/p/text()').getall()
        genres = response.xpath('/html/body/div[1]/div[2]/div/div[1]/div/div[4]/div[3]/div/ul/li/div[5]/span[2]').getall()
        
        for deadline_word, url, name, guideline, genres_list in zip(submission_deadline_words, submission_deadline_imageurls, names, guidelines, genres):
          pattern = re.compile(r'<a href="/literary_magazines\?field_genres_value=(.*?)">.*?</a>', re.IGNORECASE)
          genres = pattern.findall(genres_list)
          decoded_genres = [html.unescape(genre.replace('%20', ' ')) for genre in genres]
          
          yield {
        "name": name.strip(),
        "submission_deadline": deadline_word.strip(),
        "imageurl": response.urljoin(url.strip()),
        "basicguidelines": guideline.strip(),
        "genres": decoded_genres  # Store genres as a list

        }


        if not submission_deadline_words:
            print("Submission deadline paragraph not found on this page.")
            print("DEADLINE TEXT NOT FOUND CURRENTLY")

# Run the spider and save the output to a JSON file using the following command:
# scrapy runspider your_spider_filename.py -o output.json

            
# import scrapy

# class GulmohurSpider(scrapy.Spider):
#     name = "mycrawler"
#     start_urls = ["https://www.gulmohurquarterly.com/submission-guidelines"]
#     allowed_domains = ["gulmohurquarterly.com", "thebombayreview.com"]
#     def parse(self, response):
#         # Use the appropriate CSS selector for the deadline element
#         submission_deadline = response.css('p.reading-guideline::text').get()  # Assuming this is the correct selector

#         if submission_deadline:
#             yield {
#                 "deadline": submission_deadline
#             }
#             print(submission_deadline)
#         else:
#             print("CSS sikhao mujhe, kya tag dalu")