export default class QueryOption {
    name: string;
    display_name: string;
    type: string;

    constructor(name: string, display_name: string, type: string) {
        this.name = name;
        this.display_name = display_name;
        this.type = type;
    }
}