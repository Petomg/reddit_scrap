const puppeteer = require('puppeteer');
const REDDIT_URL = (ref) => `https://www.reddit.com${ref}`;
const REDDIT_POST_REF = '/r/PublicFreakout/comments/ii3hg7/trump_doll_put_in_the_guillotine_outside_the/';

(async () => {
    /* Initiate the Puppeteer browser */
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const page2 = await browser.newPage();

    /* Go to the reddit post page and wait for it lo load */
    await page.goto('https://www.reddit.com', { waitUntil: 'networkidle0' });

    let links = [];
    let elements = await page.$$('div._1poyrkZ7g36PawDueRza-J');
    console.log(elements);
    for (let element of elements) {
            
        let isPromo = await element.$('span._2oEYZXchPfHwcf9mTMGMg8');
        let isVideo = await element.$('video');
        console.log(isPromo === null && isVideo !== null);
        if(isPromo === null && isVideo !== null){
            let ref = await element.$eval('a.SQnoC3ObvgnGjWt90zD9Z', el => el.getAttribute('href'));
            links.push(REDDIT_URL(ref));
        }
    }    

    let count = 0;
    console.log(links);

   /* async function bajar_archivo(link) { 
      
        console.log(link);
      
        await page2.goto("https://viddit.red/", { waitUntil: 'networkidle0' });
    
        await page2.$eval('input[id="dlURL"]', (e, no) => e.setAttribute("value", no), link);
          

        await page2._client.send('Page.setDownloadBehavior', {
             behavior: 'allow',
             downloadPath: '/home/yisus/Documentos/infra-devops/reddit_scrap/downloads'
        });


        await page2.click('button.btn-warning');

        await page2.waitFor(() => document.querySelector('a[id="dlbutton"]'));
    
        await page2.click('a#dlbutton');
        
        count++;

        if(count < links.length){
            bajar_archivo(links[count]);
        }else{
            await page2.waitFor(15000);
            await browser.close();
        }
    }
    bajar_archivo(links[count]);
  
  */
})();

