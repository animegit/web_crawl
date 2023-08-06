const{sortPages}=require('./report.js')
const{test,expect}=require('@jest/globals')
test('sortPages',()=>{
    const input={
        'https://msrit.edi': 3,
        'https://msrit.fu': 2,
        }
            const actual=sortPages(input);
    const expected=[['https://msrit.edi',3],['https://msrit.fu', 2,]]
    expect(actual).toEqual(expected)

})