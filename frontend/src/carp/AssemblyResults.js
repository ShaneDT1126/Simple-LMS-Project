export default class AssemblyResults {
    constructor(errors, source) {
        this.errors = errors || [];
        this.source = source;
    }

    getErrors() {
        return this.errors;
    }

    getErrorCount() {
        return this.errors.length;
    }

    getSource() {
        return this.source;
    }
}
