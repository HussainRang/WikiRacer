const priority_queue = require('../Components/Classes/priority_queue');
const chai = require('chai');
const { assert } = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();


describe('=======================PRIORITY QUEUE CLASS=======================' , function(){

    let p_queue = new priority_queue();

    context('WRONG ARGUMENTS PASSED IN ENQUEUE() FUNCTION',function(){

        it('Should throw error when no argument passed when calling enqueue',function(){
            expect(function(){
                p_queue.enqueue()
            }).to.throw(Error,'Wrong arguments provided to enqueue function');
        })
        
        it('Should accept arguments of type object only',function(){
            expect(function(){
                p_queue.enqueue('abc')
            }).to.throw(Error,'Wrong arguments provided to enqueue function');
        })
        
        it('Should return error when empty object passed',function(){
            expect(function(){
                p_queue.enqueue({})
            }).to.throw(Error,'Wrong arguments provided to enqueue function');
        })
        
        it('Should throw error links_arr not found',function(){
            expect(function(){
                p_queue.enqueue({"heuristic":34})
            }).to.throw(Error,'Wrong arguments provided to enqueue function');
        })
        
        it('Should throw error if heuristic not found',function(){
            expect(function(){
                p_queue.enqueue({"links_arr":['abc','bcd']})
            }).to.throw(Error,'Wrong arguments provided to enqueue function');
        })
        
        it('Should throw error if heuristic is not a number',function(){
            expect(function(){
                p_queue.enqueue({"links_arr":['abc'] , "heuristic":{}})
            }).to.throw(Error,'Wrong arguments provided to enqueue function');
        })
        
        it('Should throw error if links_arr is not an array',function(){
            expect(function(){
                p_queue.enqueue({"links_arr":23 , "heuristic":32})
            }).to.throw(Error,'Wrong arguments provided to enqueue function');
        })
        
        it('Should throw error if links_arr is empty',function(){
            expect(function(){
                p_queue.enqueue({"links_arr":[] , "heuristic":32})
            }).to.throw(Error,'Wrong arguments provided to enqueue function');
        })

        it('Should throw error if there is any other argument other than links_arr and heuristic',function(){
            expect(function(){
                p_queue.enqueue({"links_arr":['abc','bcd'] , "heuristic":32 , "message":"ABC"})
            }).to.throw(Error,'Wrong arguments provided to enqueue function');
        })
        

    })


    context('TESTING THE ENQUEUE FUNCTION',function(){

        it('Enqueuing a single element and checking result' , function(){

            expect(p_queue.p_q_Array()).to.be.an('array').and.empty;    

            
            p_queue.enqueue( { "links_arr":['abc'] , "heuristic":4 } );
            

            expect(
                    p_queue.peek()
            ).to.deep.include({ "links_arr":['abc'] , "heuristic":4 });
                
            expect(
                p_queue.p_q_Array()
            ).to.include.deep.ordered.members([ { "links_arr":['abc'] , "heuristic":4 } ]);
            
        })
        
        
        it('Enqueueing Multiple Element and checking Result' , function(){
            
            expect(
                p_queue.p_q_Array()
            ).to.include.deep.ordered.members([ { "links_arr":['abc'] , "heuristic":4 } ]);
            
            
            p_queue.enqueue({ "links_arr":['abc','bcd'] , "heuristic":3 });


            expect(
                    p_queue.peek()
            ).to.deep.include({ "links_arr":['abc'] , "heuristic":4 });
            expect(p_queue.p_q_Array()).to.include.deep.ordered.members([ 
                { "links_arr":['abc'] , "heuristic":4 } , 
                { "links_arr":['abc','bcd'] , "heuristic":3 } 
            ]);
            
            
            p_queue.enqueue({ "links_arr":['abd'] , "heuristic":5 });


            expect(p_queue.peek()).to.deep.include( { "links_arr":['abd'] , "heuristic":5 } );
            expect(p_queue.p_q_Array()).to.include.deep.ordered.members([
                { "links_arr":['abd'] , "heuristic":5 } ,
                { "links_arr":['abc','bcd'] , "heuristic":3 } ,
                { "links_arr":['abc'] , "heuristic":4 }  
            ]);

        })

    })
    
    
    context('TESTING THE DEQUEUE FUNCTION',function(){

        it('Dequeueing a single element and checking result' , function(){

            expect(p_queue.p_q_Array()).to.include.deep.ordered.members([
                { "links_arr":['abd'] , "heuristic":5 } ,
                { "links_arr":['abc','bcd'] , "heuristic":3 } ,
                { "links_arr":['abc'] , "heuristic":4 }  
            ]);
            

            p_queue.dequeue();
            
            
            expect(
                p_queue.peek()
            ).to.deep.include({ "links_arr":['abc'] , "heuristic":4 });
            
            expect(p_queue.p_q_Array()).to.include.deep.ordered.members([ 
                { "links_arr":['abc'] , "heuristic":4 } , 
                { "links_arr":['abc','bcd'] , "heuristic":3 } 
            ]);
            
        })
        
        
        it('Dequeueing Multiple Element and checking Result' , function(){
            
            expect(p_queue.p_q_Array()).to.include.deep.ordered.members([ 
                { "links_arr":['abc'] , "heuristic":4 } , 
                { "links_arr":['abc','bcd'] , "heuristic":3 } 
            ]);
            
            
            p_queue.dequeue();


            expect(
                p_queue.peek()
            ).to.deep.include({ "links_arr":['abc','bcd'] , "heuristic":3 });
            expect(p_queue.p_q_Array()).to.include.deep.ordered.members([ 
                { "links_arr":['abc','bcd'] , "heuristic":3 } 
            ]);
            

            p_queue.dequeue();
            
            
            expect(function(){
                p_queue.peek();
            }).to.throw(Error,'The priority queue is empty !!!!');
            expect(p_queue.p_q_Array()).to.be.empty;
            expect(function(){
                p_queue.dequeue();
            }).to.throw(Error,'The priority queue is empty !!!!');
        
        })

    })


})



