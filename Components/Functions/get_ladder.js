const {bfs} = require('./a_star.js')

const send_response_data = async (data)=>{

    console.log(data);
         
    let start_time = new Date();
    
    const answer = await bfs( data.start_link , data.end_link );
    
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
        let Timeout = req.body.Timeout;
        if(Timeout==-1)
        {
            let response_data = await send_response_data(req.body);
            console.log(response_data);
            res.status(200).json({ "message":response_data['message'] , "Time":response_data['Time'] , "error":response_data['error'] });
        }

        else
        {
            console.log("HERE")
            let timeoutPromise = new Promise((_, reject) => {
                setTimeout(reject, Timeout*1000, new Error('Timeout'));
            });


            let response_data = await Promise.race([timeoutPromise, send_response_data(req.body)]);
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