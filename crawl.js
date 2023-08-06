const { url } = require("inspector");
const{JSDOM}=require('jsdom');

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
}