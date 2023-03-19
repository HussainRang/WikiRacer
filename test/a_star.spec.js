const chai = require('chai');
const { assert } = require('chai');
var expect = chai.expect
const {bfs} = require('../Components/Functions/a_star');
const { req_page, scrape_links } = require('../Components/Functions/get_links');


describe('======================= A-star search function =======================',function(){

    context('END LINK OR START LINK DOES NOT EXIST',function(){

        it('When the end_link does not exist , function gets an undefined from get_links and then it returns an undefined',async function(){
            let get_links_counter=0;
            let req_page_counter=0;
            let scrape_links_counter=0;
            let heuristic_counter=0;
            let return_links_list_counter=0;

            let start_link = 'http://start_link/';
            let end_link = 'http://end_link/';

            function scrape_links()
            {
                scrape_links_counter+=1;
                return;
            }
            function req_page()
            {
                req_page_counter+=1;
                return undefined;
            }
            function get_links(link,req_page,scrape_links)
            {
                get_links_counter += 1;
                let html = req_page()
                if(!html) return undefined;

                let links = scrape_links();
                return links;
            }
            function heuristic(){
                heuristic_counter+=1;
                return;
            }
            function return_links_list()
            {
                return_links_list_counter+=1;
                return;
            }
            expect(await bfs( start_link , end_link , get_links , req_page , scrape_links , heuristic , return_links_list ))
            .to.be.undefined;
            assert.equal(get_links_counter,1);
            assert.equal(req_page_counter,1);
            assert.equal(scrape_links_counter,0);
            assert.equal(heuristic_counter,0);
            assert.equal(return_links_list_counter,0);

        })
        
        
        
        it('When the start_link does not exist , function gets an undefined from heuristic and then it returns an undefined',async function(){
            let get_links_counter=0;
            let req_page_counter=0;
            let scrape_links_counter=0;
            let heuristic_counter=0;
            let return_links_list_counter=0;

            let start_link = 'http://start_link/';
            let end_link = 'http://end_link/';

            function scrape_links()
            {
                scrape_links_counter+=1;
                return {};
            }
            function req_page()
            {
                req_page_counter+=1;
                return;
            }
            function get_links(link,req_page,scrape_links)
            {
                get_links_counter += 1;
                let html = req_page()

                let links = scrape_links();
                return links;
            }
            function heuristic(link){
                heuristic_counter+=1;
                get_links(link,req_page,scrape_links);
                return undefined;
            }
            function return_links_list()
            {
                return_links_list_counter+=1;
                return;
            }
            expect(await bfs( start_link , end_link , get_links , req_page , scrape_links , heuristic , return_links_list ))
            .to.be.undefined;
            assert.equal(get_links_counter,2);
            assert.equal(req_page_counter,2);
            assert.equal(scrape_links_counter,2);
            assert.equal(heuristic_counter,1);
            assert.equal(return_links_list_counter,0);

        })

    })





    context('FUNCTION RUNS WITHOUT ERROR',function(){

        it('if end_link is found on start_link page',async function(){
            let get_links_counter=0;
            let req_page_counter=0;
            let scrape_links_counter=0;
            let heuristic_counter=0;
            let return_links_list_counter=0; 
            
            let start_link = 'http://start_link/';
            let end_link = 'http://end_link/';

            function req_page()
            {
                req_page_counter+=1;
                return;
            }

            function scrape_links()
            {
                scrape_links_counter+=1;
                return;
            }

            function get_links()
            {
                get_links_counter += 1;
                req_page()
                scrape_links();
                return {}
            }

            function heuristic(){
                heuristic_counter+=1;
                let returned = get_links();
                return {"heuristic":1,"found_end":true};
            }
            function return_links_list()
            {
                return_links_list_counter+=1;
                return ['http://start_link/' , 'http://end_link/'];
            }

            expect(await bfs( start_link , end_link , get_links , req_page , scrape_links , heuristic , return_links_list ))
            .to.have.deep.members(['http://start_link/','http://end_link/']);
            assert.equal(get_links_counter,2);
            assert.equal(req_page_counter,2);
            assert.equal(scrape_links_counter,2);
            assert.equal(heuristic_counter,1);
            assert.equal(return_links_list_counter,1);

        })




        it('returns Nothing Found if end_link not found',async function(){

            let get_links_counter=0;
            let req_page_counter=0;
            let scrape_links_counter=0;
            let heuristic_counter=0;
            let return_links_list_counter=0; 
            
            let start_link = 'http://start_link/';
            let end_link = 'http://end_link/';

            function req_page()
            {
                req_page_counter+=1;
                return;
            }

            function scrape_links()
            {
                scrape_links_counter+=1;
                return;
            }

            function get_links()
            {
                get_links_counter += 1;
                req_page()
                scrape_links();
                if(get_links_counter===1)
                {
                    return new Set(); 
                }
                if(get_links_counter===2 && get_links_counter===3)
                {
                    links_set = new Set();
                    links_set.add('http://bcd/');
                    return links_set;  
                }
                else return new Set();
            }

            function heuristic(){
                heuristic_counter+=1;
                let returned = get_links();
                return {"heuristic":0,"found_end":false};
            }
            function return_links_list()
            {
                return_links_list_counter+=1;
                return;
            }

            expect(await bfs( start_link , end_link , get_links , req_page , scrape_links , heuristic , return_links_list ))
            .to.equals("Nothing Found ");
            assert.equal(get_links_counter,3);
            assert.equal(req_page_counter,3);
            assert.equal(scrape_links_counter,3);
            assert.equal(heuristic_counter,1);
            assert.equal(return_links_list_counter,0);
        })

    })

})