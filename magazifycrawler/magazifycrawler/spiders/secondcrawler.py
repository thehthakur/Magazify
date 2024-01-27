import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class CrawlingSpider(CrawlSpider):
    name = "secondcrawler"
    allowed_domains = ["gulmohurquarterly.com", "thebombayreview.com",'https://www.pw.org']
    start_urls = ["https://www.pw.org/literary_magazines?field_genres_value=All&taxonomy_vocabulary_20_tid=All&reading_period_status=All&items_per_page=All&fee=All&unsolicited=All&payment=All"]

    rules = (
         Rule(LinkExtractor(allow=('/submission-guidelines','/publication-policy-copyright/','www.pw.org/')), callback='parse_item', follow=True),
    )
    

    def parse_item(self, response):
        # Use XPath to target the paragraph with submission deadlines
       
        submission_deadline_word=response.xpath('/html/body/div[1]/div[2]/div/div[1]/div/div[4]/div[3]/div/ul/li/div[4]/span[2]/span').get()
       
        if submission_deadline_word:
            yield{
                "submission_deadline": submission_deadline_word.strip(),
                "url": response.xpath('/html/body/div[1]/div[2]/div/div[1]/div/div[4]/div[3]/div/ul/li/div[2]/h2/a').get()
            }
        if not submission_deadline_word:
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
       