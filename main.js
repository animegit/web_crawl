const{crawlPage}=require('./crawl.js')
function main(){
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
        crawlPage(baseurl)

    

}
main()
