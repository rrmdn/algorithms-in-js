// @flow

class Node<T> {
    element: T;
    childrens: Array<Node<T>>;
    distanceFromParent: number;
    constructor(element, distance) {
        this.element = element;
        this.distanceFromParent = distance;
        this.childrens = [];
    }
    getByDistance(distance: number): Node<T> | null {
        return this.childrens.find(child => child.distanceFromParent === distance) || null;
    }
    putChildrenWithDistance(distance: number, element: T): Node<T> | null {
        if (!this.getByDistance(distance)) {
            const newNode: Node<T> = new Node(element, distance);
            this.childrens.push(newNode);
            return newNode;
        }
        return null;
    }
}

module.exports = Node;
