export default class SubstringRange {
    constructor(begin = 0, end = 0) {
        this.setBeginIndex(begin);
        this.setEndIndex(end);
    }

    getBeginIndex() {
        return this.beginIndex;
    }

    getEndIndex() {
        return this.endIndex;
    }

    getLength() {
        return this.endIndex - this.beginIndex;
    }

    setBeginIndex(begin) {
        this.beginIndex = begin > 0 ? begin : 0;
    }

    setEndIndex(end) {
        this.endIndex = end > 0 ? end : 0;
    }
}
