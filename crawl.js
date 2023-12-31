const { url } = require("inspector");
const{JSDOM}=require('jsdom');
async function crawlPage(baseURL,givenurl,pages){
    const baseobj=new URL(baseURL)
    const givenobj=new URL(givenurl)
    if(baseobj.hostname!=givenobj.hostname){
        return pages
    }
    const normalizedurl=normalizeUrl(givenurl)
    if(pages[normalizedurl]>0){
        pages[normalizedurl]++
        return pages
    }
    pages[normalizedurl]=1

    console.log(`Actively Crawling: ${givenurl}`)


try{
    const resp=await fetch(givenurl);

if(resp.status>399){
    console.log(`Error in fetch with status code ${resp.status}`)
    return pages
   
}
const content=resp.headers.get('content-type')
if(!content.includes('text/html')){
    console.log(`Non html response,contnt-type:${content}`)
    return pages
}

const htmlbody=await resp.text()
const nextURLS=getURLFromHTML(htmlbody,baseURL)
for(const nexturl of nextURLS){
    //recursively crawl all website pages
    pages=await crawlPage(baseURL,nexturl,pages)

}


}catch(err){
    console.log(`Error in crawling: ${givenurl}`)

}
return pages
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