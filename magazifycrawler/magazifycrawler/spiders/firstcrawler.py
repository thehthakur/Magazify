import scrapy
import re
class CrawlingSpider(scrapy.Spider):
    name = "mycrawler"
    allowed_domains = ["gulmohurquarterly.com", "thebombayreview.com", 'https://www.pw.org']
    start_urls = ["https://www.gulmohurquarterly.com/submission-guidelines"]
    custom_settings = {
        'FEEDS': {
            'output.json': {
                'format': 'json'
            }
        }

    }

    def parse(self, response):
        # Use XPath to target the paragraph with submission deadlines
        submission_deadline_paragraphs = response.xpath('/html/body/div[1]/div[3]/div/section/div[2]/div/div/div/strong[5]').getall()

        for deadline_para in submission_deadline_paragraphs:
            # Extract the end date using regex
            end_date_match = re.search(r'For Issue \d+: .* to (\w+ \d{1,2}, \d{4})', deadline_para)
            end_date = end_date_match.group(1) if end_date_match else None

            yield {
                "name": "Gulumuhur Quarterly",
                "submission_deadline": end_date,
                "imageurl": "https://static1.s123-cdn-static-a.com/uploads/4514321/400_63eb9798ee457.jpg",
                "basicguidelines": "Open for previously unpublished short fiction, poetry, essay and photo-story in English and in translation into English."
            }
            print("Submission Deadline Paragraph:", deadline_para)
            print("Extracted End Date:", end_date)

        else:
            print("Submission deadline paragraph not found on this page.")
            print("DEADLINE TEXT NOT FOUND CURRENTLY")
