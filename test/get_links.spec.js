const chai = require('chai');
const { assert } = require('chai');
var expect = chai.expect
const {get_links,scrape_links} = require('../Components/Functions/get_links');

describe('=======================GET LINKS=======================' , async function(){

    context('BEHAVIOUR OF req_page FUNCTION' , function(){

        it('If the link is a valid link',async function(){
            
            let req_page_counter = 0;
            let scrape_links_counter = 0;

            function req_page(link)
            {
                req_page_counter+=1;
                return( '<!DOCTYPE html> <body><p>HI</p></body> </html>' ); 
            }
            
            function scrape_links(html,link)
            {
                scrape_links_counter+=1;
                let s = new Set();
                return s; 
            }

            //console.log(await get_links('http://valid_link/',req_page,scrape_links));
            expect(await get_links('http://valid_link/',req_page,scrape_links)).should.be.an('object');
            assert.equal(req_page_counter,1);
            assert.equal(scrape_links_counter,1);

        })
        
        
        it('If the link does not exists',async function(){
            
            let req_page_counter = 0;
            let scrape_links_counter = 0;

            function req_page(link)
            {
                req_page_counter+=1;
                return undefined;
            }
            
            function scrape_links(html,link)
            {
                scrape_links_counter+=1;
                let s = new Set();
                return s; 
            }

            let invalid_link = 'http://aaaaaa/';
            //console.log(await get_links(invalid_link,req_page,scrape_links))
            expect(await get_links(invalid_link,req_page,scrape_links))
            .to.be.an.undefined;
            assert.equal(req_page_counter,1);
            assert.equal(scrape_links_counter,0);

        })



    })
    
    
    
    
    
    context('BEHAVIOUR OF scrape_links FUNCTION' , function(){

        it('Should select only wikipedia links with wiki',async function(){
            
            let link = 'http://link/';
            let html = `
            <html>
            
            <body>
                 <a href=/abc/>LINK</a>
                 <a href=/wiki/orange>LINK</a>
                 <a href=/wiki/bfh>LINK</a>
                 <a href=/bcd/>LINK</a>
                 <a href=/kkd/>LINK</a>
            </body>

            </html>
         `
            
            expect(scrape_links(html,link))
            .to.have.all.keys('https://en.wikipedia.org/wiki/orange','https://en.wikipedia.org/wiki/bfh');

        })
        
        
        
        it('Links should not have a colon(:)',async function(){
            
            let link = 'http://link/';
            let html = `
            <html>
            
            <body>
                 <a href=/abc/>LINK</a>
                 <a href=/wiki/orange>LINK</a>
                 <a href=/wiki/bfh>LINK</a>
                 <a href=/wiki/orange:photo.jpg>LINK</a>
                 <a href=/kkd/>LINK</a>
            </body>

            </html>
         `
            
            expect(scrape_links(html,link))
            .to.have.all.keys('https://en.wikipedia.org/wiki/orange','https://en.wikipedia.org/wiki/bfh');

        })
        
        
        
        it('Links should not have a hash(#)',async function(){
            
            let link = 'http://link/';
            let html = `
            <html>
            
            <body>
                 <a href=/abc/>LINK</a>
                 <a href=/wiki/orange>LINK</a>
                 <a href=/wiki/bfh>LINK</a>
                 <a href=/wiki/orange#cite-note-2>LINK</a>
                 <a href=/kkd/>LINK</a>
            </body>

            </html>
         `
            
            expect(scrape_links(html,link))
            .to.have.all.keys('https://en.wikipedia.org/wiki/orange','https://en.wikipedia.org/wiki/bfh');

        })
        
        
        
        it('Wikipedia main page should not be selected i.e. page with /wiki/Main_page',async function(){
            
            let link = 'http://link/';
            let html = `
            <html>
            
            <body>
                 <a href=/abc/>LINK</a>
                 <a href=/wiki/orange>LINK</a>
                 <a href=/wiki/bfh>LINK</a>
                 <a href=/wiki/Main_Page>LINK</a>
                 <a href=/kkd/>LINK</a>
            </body>

            </html>
         `
            
            expect(scrape_links(html,link))
            .to.have.all.keys('https://en.wikipedia.org/wiki/orange','https://en.wikipedia.org/wiki/bfh');

        })
        
        
        
        it('Links should not have wikimedia in them ',async function(){
            
            let link = 'http://link/';
            let html = `
            <html>
            
            <body>
                 <a href=/abc/>LINK</a>
                 <a href=/wiki/orange>LINK</a>
                 <a href=/wiki/bfh>LINK</a>
                 <a href=/upload.wikimedia.org/wikipedia/commons/8/82/En-us-Barack-Hussein-Obama.ogg>LINK</a>
                 <a href=/kkd/>LINK</a>
            </body>

            </html>
         `
            
            expect(scrape_links(html,link))
            .to.have.all.keys('https://en.wikipedia.org/wiki/orange','https://en.wikipedia.org/wiki/bfh');

        })
        
        
        
        it('Links should not be same as link provided in the argument',async function(){
            
            let link = 'https://en.wikipedia.org/wiki/orange';
            let html = `
            <html>
            
            <body>
                 <a href=/abc/>LINK</a>
                 <a href=/wiki/orange>LINK</a>
                 <a href=/wiki/bfh>LINK</a>
                 <a href=/upload.wikimedia.org/wikipedia/commons/8/82/En-us-Barack-Hussein-Obama.ogg>LINK</a>
                 <a href=/kkd/>LINK</a>
            </body>

            </html>
         `
            
            expect(scrape_links(html,link))
            .to.have.all.keys('https://en.wikipedia.org/wiki/bfh');

        })

    })

})
