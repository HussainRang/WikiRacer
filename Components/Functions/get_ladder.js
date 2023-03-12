const {bfs} = require('./a_star.js')

const send_response_data = async (start_link,end_link)=>{
         
    let start_time = new Date();
    
    const answer = await bfs( start_link , end_link );
    
    let end_time = new Date();
    
    let time_diff = end_time - start_time;
    time_diff = time_diff/1000;
    console.log(time_diff);
    
    let response_time = "";
    if(Math.floor(time_diff/60) != 0) response_time += Math.floor(time_diff/60).toString() + " minutes and ";
    response_time+=Math.floor(time_diff%60).toString() + " seconds ";

    return ({"message":answer,"Time": response_time,"error":"No"});   
 
}



const get_ladder = async (req,res,next)=>{

    try {
        
        let {start_link,end_link , Timeout} = req.body;
        
        //start_link or end_link not found
        let start_or_end_link_not_found = !start_link || !end_link;
        
        //start_link and end_link should be string
        let is_start_link_string = typeof start_link === 'string' ? true : false;
        let is_end_link_string = typeof end_link === 'string' ? true : false;
        
        // start_link and end_link should be different
        let is_start_and_end_link_same = start_link===end_link;

        //  Timeout should be present and numeric
        let Timeout_cond_satisfied = Timeout && typeof Timeout === 'number' && Timeout>=-1;

        // CHECKING above conditions    
        if( start_or_end_link_not_found || !is_start_link_string || !is_end_link_string || is_start_and_end_link_same || !Timeout_cond_satisfied) 
        {
            let err = new Error('Invalid Request!!!');
            err.status = 400;
            throw err;
        }

        
        // Removing the white space from both sides of the link
        start_link = start_link.trim();                  end_link = end_link.trim();

        
        // CHECKING if the links are valid wikipedia links 
        if( !( isValid_Wikipedia_Link(start_link) && isValid_Wikipedia_Link(end_link) ) )
        {
            let err = new Error('Please provide valid wikipedia links!!!');
            err.status = 400;
            throw err;
        }


        if(Timeout==-1)
        {
            let response_data = await send_response_data(start_link,end_link);
            console.log(response_data);
            res.status(200).json({ "message":response_data['message'] , "Time":response_data['Time'] , "error":response_data['error'] });
        }

        else
        {
            console.log("HERE")
            let timeoutPromise = new Promise((_, reject) => {
                setTimeout(reject, Timeout*1000, new Error('Timeout'));
            });


            let response_data = await Promise.race([timeoutPromise, send_response_data(start_link,end_link)]);
            console.log(response_data);
            res.status(200).json({ "message":response_data['message'] , "Time":response_data['Time'] , "error":response_data['error'] });
        }
    } 
    catch (error) 
    {
        next(error);
    }
}


module.exports = {get_ladder};


function isValid_Wikipedia_Link(link)
{
    // Links should start with     https://en.wikipedia.org/wiki/
    let is_wikipedia_link = link.startsWith('https://en.wikipedia.org/wiki/') ;
    

    /*
        A valid link like https://medium.com/the-web-tub/mocha-chai-js-unit-testing-for-es6-with-istanbul-code-coverage-11b2a141a446
        should have '//' after the protocol (http,https etc.) else the link is not valid. It is checked by link.includes('//').
        If the link is valid link then we split the link by '//' which outputs :-
        [https: , medium.com/the-web-tub/mocha-chai-js-unit-testing-for-es6-with-istanbul-code-coverage-11b2a141a446]
        The list size should be 2 in case of wikipedia links. 
        We take the 2nd element of the list and then check if it contains ':' using "link_excluding_protocol.includes(':');"
    */
    let has_colon=false;
    if(link.includes('//'))
    {
        let link_splitted_list = link.split('//');
        if(link_splitted_list.length!==2) return false;
        let link_excluding_protocol = link_splitted_list[1];
        has_colon = link_excluding_protocol.includes(':');
    } else return false;
    

    // A valid Wikipedia link should not contain '#' 
    let has_hash = link.includes('#');
    
    // A valid Wikipedia page link should not contain 'wikimedia' in URL 
    let does_link_contains_wikimedia = link.includes('wikimedia');

    // The Main_page of the Wikipedia is not considered a valid page here as it only helps in searching the content
    let is_link_Main_page = 'https://en.wikipedia.org/wiki/Main_Page'===link ? true : false;

    if(is_wikipedia_link && !has_colon && !has_hash && !does_link_contains_wikimedia && !is_link_Main_page) return true;
    else return false;
}
