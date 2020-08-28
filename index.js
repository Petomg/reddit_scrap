const puppeteer = require('puppeteer');
const REDDIT_URL = (ref) => `https://www.reddit.com${ref}`;
const REDDIT_POST_REF = '/r/PublicFreakout/comments/ii3hg7/trump_doll_put_in_the_guillotine_outside_the/';

(async () => {
    /* Initiate the Puppeteer browser */
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const page2 = await browser.newPage();

    /* Go to the reddit post page and wait for it lo load */
    console.log(REDDIT_URL(REDDIT_POST_REF));
    await page.goto(REDDIT_URL(REDDIT_POST_REF), { waitUntil: 'networkidle0' });

    /* Run javascript inside of the page */
    let data = await page.evaluate(() => {
        let title = document.querySelector('h1[class="_eYtD2XCVieq6emjKBH3m"]').innerText;
        let video_src = document.querySelector('video').getAttribute("src");

        return {
            title,
            video_src,
        }
    });

    let links = ["https://www.reddit.com/r/ActualPublicFreakouts/comments/ii2cy1/blm_activists_physically_assault_gay_man_and_call/","https://www.reddit.com/r/PublicFreakout/comments/ii3hg7/trump_doll_put_in_the_guillotine_outside_the/","https://www.reddit.com/r/nextfuckinglevel/comments/ii55mv/marlon_brando_rejecting_the_oscar_for_the/"];
    let count = 0;
    console.log(data);
    async function bajar_archivo(link) { 
      
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
  
    
})();

