import puppeteer from "puppeteer";

async function getQuotes() {
    // headless: false means that puppeteer will launch a browser that you can see
    // defaultviewpart: null, just sets website page to full width and height
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});

    const page = await browser.newPage();

    await page.goto("http://quotes.toscrape.com/", {
        waitUntil: "domcontentloaded",
      });

    const quotes = await page.evaluate(() => {

      // fetch every div element with class "quote"
      const quoteList = document.querySelectorAll(".quote");

      // fetch sub-elements of quote for each div
      // innertext = displayed text
      return Array.from(quoteList).map((quote) => {
        const text = quote.querySelector(".text").innerText;
        const author = quote.querySelector(".author").innerText;
  
        return { text, author };
      });
    });

    console.log(quotes);

    await page.click(".pager > .next > a");

    console.log("New page");

     const pageTwoQuotes = await page.evaluate(() => {

      // fetch every div element with class "quote"
      const quoteList = document.querySelectorAll(".quote");

      // fetch sub-elements of quote for each div
      // innertext = displayed text
      return Array.from(quoteList).map((quote) => {
        const text = quote.querySelector(".text").innerText;
        const author = quote.querySelector(".author").innerText;
  
        return { text, author };
      });
    });

    console.log(pageTwoQuotes);
    
    await browser.close();

}

getQuotes();