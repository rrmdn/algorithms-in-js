// @flow
const Node = require('./Node');

type DistanceFunction<T>= (x: T, y: T) => number;

class BKTree<T> {
    root: Node<T> | null;
    _distanceFunction: DistanceFunction<T>;
    constructor(distanceFunction) {
        this._distanceFunction = distanceFunction;
        this.root = null;
    }
    add(element: T) {
        if (this.root === null) {
            const distance = 0;
            const newRoot: Node<T> = new Node(element, distance);
            this.root = newRoot;
        } else {
            let node = this.root;
            while (node.element !== element) {
                const distance = this._distanceFunction(node.element, element);
                const parent = node;
                node = parent.getByDistance(distance);
                if (node === null) {
                    node = parent.putChildrenWithDistance(distance, element);
                    break;
                }
            }
        }
    }
    search(query: T, maxDistance: number): Array<T> {
        const results: Array<T> = [];
        if (this.root === null) {
            return results;
        }
        const searchQueue: Array<Node<T>> = [];
        searchQueue.push(this.root);
        while (searchQueue.length) {
            const node = searchQueue.pop();
            const distance = this._distanceFunction(query, node.element);
            if (distance <= maxDistance) {
                results.push(node.element);
            }
            const minSearchDistance = distance - maxDistance;
            const maxSearchDistance = distance + maxDistance;
            for (let searchDistance = minSearchDistance; searchDistance <= maxSearchDistance; ++searchDistance) {
                const foundChildren = node.getByDistance(searchDistance);
                if (foundChildren) {
                    searchQueue.push(foundChildren);
                }
            }
        }
        return results;
    }
}

module.exports = BKTree;
