const chai = require('chai');
const { assert } = require('chai');
const {heuristic} = require('../Components/Functions/heuristic');
var expect = chai.expect

describe('=======================HEURISTIC FUNCTION=======================' , function(){

    context('HEURISTIC FUNCTION FINDS end_link' ,function(){
        it('Finds the end_link',async function(){
            
            let req_page_fn_cnt = 0;
            let scrape_links_fn_cnt = 0;
            let get_links_fn_cnt = 0;

            let current_link = "http://start_link/";
            let end_link = "http://end_link/" 
            
            function req_page_fn()
            {
                req_page_fn_cnt += 1;
                return;
            }
            
            function scrape_links_fn()
            {
                scrape_links_fn_cnt += 1;
                return;
            }

            function get_links_fn()
            {
                get_links_fn_cnt += 1; 
                req_page_fn();
                scrape_links_fn();
                let current_link_set = new Set();
                current_link_set.add('http://abc/');
                current_link_set.add('http://bcd/');
                current_link_set.add('http://cde/');
                current_link_set.add('http://end_link/');
                current_link_set.add('http://efg/');
                return current_link_set;
            }
            
            let end_links_set = new Set();
            end_links_set.add('http://bcd/');
            end_links_set.add('http://xyz/');
            end_links_set.add('http://cde/');
            end_links_set.add('http://aaa/');
            end_links_set.add('http://bbb/');

            expect(await heuristic(current_link , end_links_set , end_link , get_links_fn , req_page_fn , scrape_links_fn ))
            .to.deep.include({ "heuristic":2 , "found_end":true });
            assert.equal(req_page_fn_cnt,1);
            assert.equal(scrape_links_fn_cnt,1);
            assert.equal(get_links_fn_cnt,1);

        })
    })



    context('HEURISTIC FUNCTION DID NOT FIND end_link' ,function(){
        it('Cannot find the end_link',async function(){
            
            let req_page_fn_cnt = 0;
            let scrape_links_fn_cnt = 0;
            let get_links_fn_cnt = 0;

            let current_link = "http://start_link/";
            let end_link = "http://end_link/" 
            
            function req_page_fn()
            {
                req_page_fn_cnt += 1;
                return;
            }
            
            function scrape_links_fn()
            {
                scrape_links_fn_cnt += 1;
                return;
            }

            function get_links_fn()
            {
                get_links_fn_cnt += 1; 
                req_page_fn();
                scrape_links_fn();
                let current_link_set = new Set();
                current_link_set.add('http://abc/');
                current_link_set.add('http://bcd/');
                current_link_set.add('http://cde/');
                current_link_set.add('http://aaa/');
                current_link_set.add('http://efg/');
                return current_link_set;
            }
            
            let end_links_set = new Set();
            end_links_set.add('http://bcd/');
            end_links_set.add('http://xyz/');
            end_links_set.add('http://cde/');
            end_links_set.add('http://aaa/');
            end_links_set.add('http://bbb/');

            expect(await heuristic(current_link , end_links_set , end_link , get_links_fn , req_page_fn , scrape_links_fn ))
            .to.deep.include({ "heuristic":3 , "found_end":false });
            assert.equal(req_page_fn_cnt,1);
            assert.equal(scrape_links_fn_cnt,1);
            assert.equal(get_links_fn_cnt,1);

        })
    })


})