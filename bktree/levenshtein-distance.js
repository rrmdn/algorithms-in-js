// @flow

// source: https://www.reddit.com/r/programming/comments/w4gs6/levenshtein_distance_in_haskell/c5a8ei4/

const memo = new Map();
const memoize = fn => (...args) => {
    const cachekey = args.join(':');
    const cachedResult = memo.get(cachekey);
    if (cachedResult) {
        // console.log('cacheHit', cachekey);
        return cachedResult;
    }
    const computedResult = fn(...args);
    memo.set(cachekey, computedResult);
    return computedResult;
};

const getDistance = memoize((a: string, b: string) => {
    if (!a.length) return b.length;
    if (!b.length) return a.length;

    const [x, ...xs] = a;
    const [y, ...ys] = b;
    if (x === y) return getDistance(xs, ys);
    return 1 + Math.min(getDistance(xs, b), getDistance(a, ys), getDistance(xs, ys));
});

exports.getDistance = getDistance;
