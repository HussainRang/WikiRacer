const {a_star} = require('./a_star.js')

const get_ladder = async (req,res,next)=>{

    try 
    {    
        let start_time = new Date();
        
        const answer = await a_star( req.body.start_link , req.body.end_link );
        
        let end_time = new Date();
        
        let time_diff = end_time - start_time;
        time_diff = time_diff/1000;
        console.log(time_diff);
        
        let response_time = "";
        if(Math.floor(time_diff/60) != 0) response_time += Math.floor(time_diff/60).toString() + " minutes and ";
        response_time+=Math.floor(time_diff%60).toString() + " seconds ";

        res.status(200).json({"message":answer,"Time": response_time,"error":"No"});   
    } 
    catch (error) 
    {
        next(error);
    }
   
}


module.exports = {get_ladder};