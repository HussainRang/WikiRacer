const heuristic = async (current_link,end_links_set,end_link , get_links_fn , req_page_fn , scrape_links_fn )=>{
  
    let current_link_set = await get_links_fn(current_link,req_page_fn,scrape_links_fn);
    if(!current_link_set) return undefined;

    let current_link_list = [... current_link_set];
    
    let heuristic=0;
    for( let i=0 ; i<current_link_list.length ; i=i+1 )
    {
        if( end_links_set.has(current_link_list[i]) )  heuristic=heuristic+1;
        if( end_link === current_link_list[i] ) 
        {
            return {"heuristic":heuristic , "found_end":true};
        }
    } 

    return {"heuristic":heuristic , "found_end":false};

}


module.exports = {heuristic};