const{crawlPage}=require('./crawl.js')
async function main(){
    if(process.argv.length<3){
        console.log('No website to crawl');
        process.exit(1)
    }
    if(process.argv.length>3){
        console.log('Too many process arguments');
        process.exit(1)
    }
const baseurl=process.argv[2];
 
        console.log(`Start crawling ${baseurl}`);
        const results=await crawlPage(baseurl,baseurl,{})
        for(const res of Object.entries(results) ){
            console.log(res)
        }

    

}
main()
