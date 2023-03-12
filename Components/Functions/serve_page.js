const serve_page = (req,res,next)=>{

    try 
    {
        console.log("Serving HTML Page");
        res.status(200).redirect('../index.html');
    } 
    catch (error) 
    {
        console.log(error);
        throw {status: 400, message: error.message};
    }

}

module.exports = {serve_page};