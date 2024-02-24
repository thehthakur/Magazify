# Magazify
When looking for literary magazines to submit to, writers need to hop website to website, searching for openings. Even on finding publication opportunities, they still have to check if that magazine accepts the genre/medium of their choice. Furthermore, writers often make parallel submissions to multiple magazines, managing which further adds to the logistical hassle. The aim of this project is to automate much of this process and enable writers to spend more time honing their craft rather than worrying about logistics.

## The Project So Far and Needed Improvements:
* A functional frontend in `Next.js` linked up with the backend. Dynamically populates the magazine table as changes are made. Improvements needed in UI/UX.
* Implemented filters for _Genre_ and _Publishing Deadline_. The data gets filtered, however, issues in rendering it post-filtering remain.
* A simple web-scrapper written using the open-source Python framework, `Scrapy`, designed to work on only a single source so far: [Poets&Writers](https://www.pw.org/literary_magazines). This will be the focus of most future work.
* A `Python MongoDB` database to store scrapped and new data. Currently no measures in place to deal with bad/incomplete data.
* A backend implemented using `Flask`. Providing different actions and privileges to writers vs publishers is unfinished.

## On The Web Scrapper:
As each individual literary magazine's website has its own page layout, hence different HTML containers which contain the required content, making a generalized web scrapper is hard. As there are thousands of websites that potentially need to be scrapped, making a dedicated scrapper for each of them is infeasible. What's more, those dedicated scapers would become useless if/when the website updates its layout. The solution is to scrape the whole webpage and run NLP algorithms on top of it to get the required data. This method will not give the correct result all the time, like a deterministic approach would, but perhaps with proper fine-tuning and some supervision, it can be a feasible solution. This will be the future direction for this project.

![image](https://github.com/thehthakur/Magazify/assets/106232245/a19cb7ec-7b47-4190-8f6a-c89e5fb90d38)
<p align="center">The current state of <i>Magazify</i></p>
