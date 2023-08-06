const { url } = require("inspector");
const{JSDOM}=require('jsdom');
async function crawlPage(givenurl){
    console.log(`Actively Crawling: ${givenurl}`)
try{
    const resp=await fetch(givenurl);

if(resp.status>399){
    console.log(`Error in fetch with status code ${resp.status}`)
    return
   
}
const content=resp.headers.get('content-type')
if(!content.includes('text/html')){
    console.log(`Non html response,contnt-type:${content}`)
    return
}

console.log(await resp.text())
}catch(err){
    console.log(`Error in crawling: ${givenurl}`)

}
}

function normalizeUrl(URLString){
   const urlobj=new URL(URLString);
  const hostpath= `${urlobj.hostname}${urlobj.pathname}`
  if(hostpath.length>0&&hostpath.slice(-1)=='/'){
    return hostpath.slice(0,-1);

  }
  return hostpath;

}

function getURLFromHTML(htmlBody,baseURL){
    const URLS=[]
    const dom=new JSDOM(htmlBody);
    const links=dom.window.document.querySelectorAll('a')
    for(const link of links){
        if(link.href.slice(0,1)=='/'){
            //relative
           
            try{
                const urlobj=new URL(`${baseURL}${link.href}`)
                URLS.push(urlobj.href)
            }
            catch(err){
                console.log(`Erorr normalizing relative url: ${err.message}`)
            }

            
        }
        else{
        try{
            const urlobj=new URL(link.href)
            URLS.push(urlobj.href)
        }
        catch(err){
            console.log(`Erorr normalizing absolute url: ${err.message}`)
        }}
        
    }
    return URLS;

}

module.exports={
    normalizeUrl,
    getURLFromHTML,
    crawlPage,
}