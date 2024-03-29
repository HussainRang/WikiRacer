const cherio = require('cheerio');
const request = require('request-promise');

const scrape_links = (html,link) =>{

	let selector = cherio.load(html);
	let anchor_set = new Set();

	let para_anchors = selector("a[href*='/wiki/']:not([href*=':']):not([href*='#']):not([href*='/Main_Page']):not([href*='wikimedia'])");
	
	var data;
	for(let i=0;i<para_anchors.length;i=i+1)
	{
		data = selector(para_anchors[i]);
		if("https://en.wikipedia.org"+data.attr('href')!==link)
			anchor_set.add("https://en.wikipedia.org"+data.attr('href'));
	}
	//console.log(anchor_set);
	return anchor_set;

}



const req_page = async ( link )=>{

	try {
		const html = await request({uri:link});
		return html;
		
	} catch (error) {
		console.log(error.message);
		return undefined;
	}
}


const get_links = async ( link , req_page , scrape_links )=>{
		const html = await req_page(link);
		if(!html) return undefined;
		
		const links_set = await scrape_links(html,link);
		return links_set;
}


module.exports = { get_links , req_page , scrape_links };