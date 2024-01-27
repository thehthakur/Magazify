import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class CrawlingSpider(CrawlSpider):
    name = "mycrawler"
    allowed_domains = ["gulmohurquarterly.com", "thebombayreview.com",'https://www.pw.org']
    start_urls = ["https://www.gulmohurquarterly.com/submission-guidelines"]

    rules = (
         Rule(LinkExtractor(allow=('/submission-guidelines','/publication-policy-copyright/','www.pw.org/')), callback='parse_item', follow=True),
    )
    

    def parse_item(self, response):
        # Use XPath to target the paragraph with submission deadlines
        submission_deadline_paragraphs = response.xpath('//*[@id="section-5fbb824b53875"]/div[2]/div/div/div/text()').getall()

        for deadline_para in submission_deadline_paragraphs:
            yield{
                "name": "Gulumuhur Quarterly",
                "deadline":deadline_para
            }

        else:
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
       