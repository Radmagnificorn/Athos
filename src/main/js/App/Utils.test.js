import { expect } from 'chai';
import Utils from './Utils.js';

describe('get page from url', () => {
   it('return a page and chapter', () => {
       let testUrl = "site.com/#chapter3~5";
       let parsedUrl = Utils.getPageFromUrl(testUrl);

       let expectedData = {
           chapter: 'chapter3',
           page: '5'
       };

       expect(parsedUrl).to.deep.equal(expectedData);
   });
});