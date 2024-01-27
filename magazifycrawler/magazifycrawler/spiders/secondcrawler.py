import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy_splash import SplashRequest

class CrawlingSpider(CrawlSpider):
    name = "secondcrawler"
    allowed_domains = ["gulmohurquarterly.com", "thebombayreview.com", 'pw.org']
    start_urls = ["https://www.pw.org/literary_magazines?field_genres_value=All&taxonomy_vocabulary_20_tid=All&reading_period_status=All&items_per_page=All&fee=All&unsolicited=All&payment=All"]

    rules = (
        Rule(LinkExtractor(allow=('/submission-guidelines', '/publication-policy-copyright/', '/www.pw.org/')), callback='parse_item', follow=True),
    )

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
        for deadline_word, url,name,guideline in zip(submission_deadline_words, submission_deadline_imageurls,names,guidelines):
            yield {
                "name": name.strip(),
                "submission_deadline": deadline_word.strip(),
                "imageurl": response.urljoin(url.strip()),
                "basicguidelines":guideline.strip()
                
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
#         # Optionally, follow links to other relevant pages
       