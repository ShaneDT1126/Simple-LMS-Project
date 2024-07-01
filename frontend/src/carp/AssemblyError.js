export default class AssemblyError {
    constructor(lineNumber = 0, str = "") {
        this.lineNumber = lineNumber;
        this.str = str;
    }

    getLineNumber() {
        return this.lineNumber;
    }

    getString() {
        return this.str;
    }

    setLineNumber(lineNumber) {
        this.lineNumber = lineNumber;
    }

    setString(str) {
        this.str = str;
    }
}
