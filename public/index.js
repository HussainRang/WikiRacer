const send_request = async ()=>{

    try {
        event.preventDefault();
    
        const output_div = document.getElementsByClassName('output_div');
        output_div[0].style.backgroundColor = "#0E185F";
        output_div[0].textContent = "";
    
        console.log("HI");
    
        const start_link = document.getElementById('StartLink').value;
        const end_link = document.getElementById('EndLink').value;
       
        if(check_link(start_link) && check_link(end_link) && start_link!=end_link)
        {
            let btn = document.getElementsByClassName('btn');
            console.log(btn[0]);
            btn[0].disabled =true;
    
            let response = await axios.post('http://localhost:2000/api/ladder', {
                "start_link": start_link,
                "end_link": end_link
              })
    
            console.log(response.data.message);
            if(response.data.error==="No")
            {
                console.log(response.data.Time);
                print_output(response.data.message , response.data.Time);
            }

            btn[0].disabled =false;
        }
        else print_error("Start Link and End Link should be different  !!!")
    
        console.log("Out of request");
        
    } catch (error) {
        console.log("B",error);
        print_error(error.response.data.message)
    }
}


const check_link = (link)=>{

    const regex = new RegExp(/wiki/);
    
    if(regex.test(link))
    {
        let regex_colon = new RegExp(/Help:/);
        let regex_hash = new RegExp(/#/);

        if(!regex_colon.test(link) && !regex_hash.test(link)) return true;
    }

    print_error(" Please make sure that both the links are from Wikipedia and should not have a ':' or a '#' ");
    return false;

}


const print_output = (links_arr,time)=>
{
    const output_div = document.getElementsByClassName('output_div');
    output_div[0].style.backgroundColor = "aqua";

    let page_traversed = document.createElement('h3');
    page_traversed.textContent = `TOTAL PAGES TRAVERSED: ${links_arr.length-2}`;
    page_traversed.style.textAlign = "center"
    output_div[0].appendChild(page_traversed);

    for(let i=0;i<links_arr.length;i=i+1)
    {
        let para = document.createElement('p');
        para.textContent = links_arr[i];
        output_div[0].appendChild(para);
    }

    let time_text = document.createElement('p');
    time_text.textContent = time;
    time_text.style.textAlign = 'right';
    output_div[0].appendChild(time_text);
}


const print_error = (error)=>{
    const output_div = document.getElementsByClassName('output_div');
    output_div[0].style.backgroundColor = "aqua";

    let error_show = document.createElement('h3');
    error_show.textContent = `${error}`;
    error_show.style.textAlign = "center"
    output_div[0].appendChild(error_show);

    let btn = document.getElementsByClassName('btn');
    btn[0].disabled =false;

}