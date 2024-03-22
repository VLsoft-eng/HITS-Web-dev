export class Group {
    id;
    dots;
    color;
    center;
    constructor(id, color) {
        this.id = id;
        this.dots = []
        this.color = color;
        this.center = {x: 0, y: 0};
    }
}