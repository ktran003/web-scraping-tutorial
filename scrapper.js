const puppeteer =  require('puppeteer')

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page= await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imgURL = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    console.log({imgURL, title});

    browser.close();
}

scrapeProduct('https://www.amazon.ca/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X');
