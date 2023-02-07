const {get_links} = require('./get_links');
const {heuristic} = require('./heuristic.js');
const {priority_queue} = require('../Classes/p_queue');

const bfs = async (start_link,end_link)=>{

    const end_links_set = await get_links(end_link);

    let start_link_heuristics = await heuristic(start_link,end_links_set,end_link);

    let obj = {"links":[start_link],"heuristic":start_link_heuristics["heuristic"]};
    if(start_link_heuristics["found_end"]==true)  return return_links_list(end_link,obj);

    let pq = new priority_queue();  pq.enqueue(obj);
    let previous_elements = new Set();


    while(pq.size!=0)
    {
        let current_obj = pq.peek();
        pq.dequeue();
        previous_elements.add(current_obj["links"][current_obj["links"].length-1]);


        let links_set = await get_links(current_obj["links"][current_obj["links"].length-1]);
        let links_list = [... links_set];
        let max_heuristic=0,max_heuristic_link="";

        for( let i=0; i<links_list.length ; i=i+1)
        {
            if(!previous_elements.has(links_list[i]))
            {

                /*if(links_list[i]===end_link) 
                {
                    let obj = {... current_obj};
                    let links_arr = [... obj["links"] ]; 
                    obj["links"] = links_arr;
                    obj["links"].push(links_list[i]);
                    console.log(obj);

                    return obj["links"];
                }
                else
                {*/

                    let heur = await heuristic(links_list[i],end_links_set,end_link);
                    let obj = {... current_obj};
                    let links_arr = [... obj["links"] ]; 
                    
                    obj["heuristic"]=heur["heuristic"];
                    obj["links"] = links_arr;
                    obj["links"].push(links_list[i]);
                    
                    if(heur["found_end"]==true) return return_links_list(end_link,obj);    

                    if(heur>max_heuristic) 
                    {
                        max_heuristic = heur;
                        max_heuristic_link = links_list[i];
                    }
                    console.log(`
                    ${obj["links"]}
                    ${obj["heuristic"]}
                    ${links_list.length}      ${i}
                    ${max_heuristic}     ${max_heuristic_link}


                    `);
                    
                    pq.enqueue(obj);
                //} 
            }
        }
    }
    return "Nothing Found ";
}     


const return_links_list = (end_link,current_obj)=>
{
    let obj = {... current_obj};
    let links_arr = [... obj["links"] ]; 
    obj["links"] = links_arr;
    obj["links"].push(end_link);
    console.log(obj);

    return obj["links"];
}


module.exports = {bfs};