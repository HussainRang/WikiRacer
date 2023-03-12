let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../main_app');
let should = chai.should();

chai.use(chaiHttp);

describe('=======================POST /api/ladder=======================', () => {

    context('WRONG ARGUMENTS',function(){

            it('Throw error on empty object' , (done)=>{
                
                let request_body = {};  

                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Invalid Request!!!');
                    done();
                })

            })
            
            
            it('start_link not found' , (done)=>{
                
                let request_body = {"end_link":"ABCD","Timeout":3};  

                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Invalid Request!!!');
                    done();
                })

            })
            
            
            it('end_link not found' , (done)=>{
                
                let request_body = {"start_link":"ABCD","Timeout":3};  

                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Invalid Request!!!');
                    done();
                })

            })
            
            
            it('Timeout not found' , (done)=>{
                
                let request_body = {"start_link":"ABCD","end_link":'abc'};  

                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Invalid Request!!!');
                    done();
                })

            })


            it('start_link and end_link should be string' , (done)=>{

                let request_body = {"start_link":3 , "end_link":4}

                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Invalid Request!!!');
                    done();
                })

            })
            
            it('Timeout should be Number' , (done)=>{

                let request_body = {"start_link":'abc' , "end_link":'ABC' , 'Timeout':'BCD'}

                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Invalid Request!!!');
                    done();
                })

            })
            
            it('start_link and end_link should be different' , (done)=>{

                let request_body = {"start_link":'abc' , "end_link":'abc'}

                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Invalid Request!!!');
                    done();
                })

            })
            
            
            it('Timeout should be greater than or equal to -1' , (done)=>{

                let request_body = {"start_link":'abc' , "end_link":'abc' , "Timeout":-3}

                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Invalid Request!!!');
                    done();
                })

            })


        })

        
    context('VALID LINKS',function(){
            //https://en.wikipedia.org/wiki/MIT_World_Peace_University

            it('Wikipedia links should start with https://en.wikipedia.org/wiki/' , (done)=>{
    
                let request_body = {"start_link":"abc" , "end_link":"bcd" , "Timeout":4}
    
                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Please provide valid wikipedia links!!!');
                    done();
                })
    
            })
            
            
            it('Links should not have : or # ' , (done)=>{
    
                let request_body = {"start_link":'https://en.wikipedia.org/wiki/File:World_Peace_Library,_MIT_College,_Pune.jpg' ,
                                    "end_link":'https://en.wikipedia.org/wiki/MIT_World_Peace_University#cite_note-2',
                                    "Timeout":1}
    
                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Please provide valid wikipedia links!!!');
                    done();
                })
    
            })
            
            
            
            it('Links should not have wikimedia in them' , (done)=>{
    
                let request_body = {"start_link":'https://upload.wikimedia.org/wikipedia/commons/8/82/En-us-Barack-Hussein-Obama.ogg' ,
                                    "end_link":'https://en.wikipedia.org/wiki/MIT_World_Peace_University#cite_note-2',
                                    "Timeout":-1}
    
                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Please provide valid wikipedia links!!!');
                    done();
                })
    
            })
            
            
            it('None of the link should be wikipedia Main_page link' , (done)=>{
    
                let request_body = {"start_link":'https://en.wikipedia.org/wiki/Main_Page' ,
                                    "end_link":'https://upload.wikimedia.org/wikipedia/commons/8/82/En-us-Barack-Hussein-Obama.ogg',
                                    "Timeout":3}
    
                chai.request(app)
                .post('/api/ladder')
                .send(request_body)
                .end((err,res)=>{
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Please provide valid wikipedia links!!!');
                    done();
                })
    
            })
    })
        


})

