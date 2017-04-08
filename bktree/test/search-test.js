const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;

const BKTree = require('../BKTree');
const { getDistance } = require('../levenshtein-distance');

const corpus = [
    'some',
    'same',
    'sort',
    'soft',
    'sold',
    'sound',
];

describe('Levenshtein distance', () => {
    it('should return int', () => {
        const distance = getDistance(corpus[0], corpus[2]);
        expect(distance).to.equals(2);
    });
});

describe('BKTree', () => {
    const bktree = new BKTree(getDistance);
    it('should be able to add elements', () => {
        corpus.forEach((word) => {
            bktree.add(word);
        });
    });
    it('should return search results, given query and max distance', () => {
        const results = bktree.search('sort', 1);
        expect(results).to.deep.equal(['sort', 'soft']);
    });
});
