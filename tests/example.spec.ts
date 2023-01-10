describe('Simple Example', async () => {
   it('Can do a thing', async() => {
       await browser.url('');

       await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');
   });
});