const {normalizeUrl, getURLFromHTML}=require("./crawl.js");
const{test,expect}=require("@jest/globals");

test('normalizeUrl strip protocols',()=>{
    const input='https://msrit.edu/exams';
    const actual=normalizeUrl(input);
    const expected='msrit.edu/exams';
    expect(actual).toEqual(expected)

})

test('normalizeUrl strip path',()=>{
    const input='https://msrit.edu/exams/';
    const actual=normalizeUrl(input);
    const expected='msrit.edu/exams';
    expect(actual).toEqual(expected)

})
test('normalizeUrl capitals',()=>{
    const input='https://MSRIT.edu/exams/';
    const actual=normalizeUrl(input);
    const expected='msrit.edu/exams';
    expect(actual).toEqual(expected)

})
test('normalizeUrl http',()=>{
    const input='http://MSRIT.edu/exams/';
    const actual=normalizeUrl(input);
    const expected='msrit.edu/exams';
    expect(actual).toEqual(expected)

})

test('normalizeUrl HTMLBODY',()=>{
    const inputHTMLBody = `
<html>
<body>
    <a href="https://msrit.edu/">
msrit edu
   </a>
</body>
</html>
`

const baseURL='https://msrit.edu'
    const actual=getURLFromHTML(inputHTMLBody,baseURL);
    const expected=['https://msrit.edu/'];
    expect(actual).toEqual(expected)

})

test('normalizeUrl relative',()=>{
    const inputHTMLBody = `
<html>
<body>
    <a href="/path/">
msrit edu
   </a>
</body>
</html>
`

const baseURL='https://msrit.edu'
    const actual=getURLFromHTML(inputHTMLBody,baseURL);
    const expected=['https://msrit.edu/path/'];
    expect(actual).toEqual(expected)

})

test('normalizeUrl invalid',()=>{
    const inputHTMLBody = `
<html>
<body>
    <a href="invalid">
msrit edu
   </a>
</body>
</html>
`

const baseURL='https://msrit.edu'
    const actual=getURLFromHTML(inputHTMLBody,baseURL);
    const expected=[];
    expect(actual).toEqual(expected)

})


