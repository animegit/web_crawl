function printReport(pages){
    console.log('========')
    console.log("Report")
    console.log('========')
    const sortedPages=sortPages(pages)
    for(const sortpage of sortedPages){
        const url=sortpage[0]
        const hits=sortpage[1]
        console.log(`Found ${hits} links to page:${url} `)
    }
    
    console.log('========')
    console.log("End Report")
    console.log('========')


}

function sortPages(pages){
    const pagesarr=Object.entries(pages)
    pagesarr.sort((a,b)=>{
        ahits=a[1]
        bhits=b[1]
        return b[1]-a[1]
    })
    return pagesarr
}
module.exports={
    sortPages,
    printReport
}