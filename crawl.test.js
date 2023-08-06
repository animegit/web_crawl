const {normalizeUrl}=require("./crawl.js");
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


