class AssemblySourceLine {
    constructor(source, range, line, addr = -1) {
        this.sourceString = source;
        this.sourceSubstringRange = { beginIndex: range.beginIndex, endIndex: range.endIndex };
        this.lineNumber = this.setLineNumber(line);
        this.address = this.setAddress(addr);

        let pattern = /[^\s]+/g; // Pattern to match non-whitespace sequences (words)
        let regex = new RegExp(pattern);
        let tokenVector = [];
        let searchIndex = this.sourceSubstringRange.beginIndex;

        let matches = this.toString().matchAll(regex);

        for (let match of matches) {
            let tokenSubstringRange = this.findSourceTokenSubstringRange(match[0], searchIndex);
            tokenVector.push(tokenSubstringRange);
            searchIndex = tokenSubstringRange.endIndex;
        }

        this.sourceTokenArray = tokenVector.length > 0 ? tokenVector : null;
    }

    toString() {
        return this.sourceString.substring(this.sourceSubstringRange.beginIndex, this.sourceSubstringRange.endIndex);
    }

    getSubstringRange() {
        return { ...this.sourceSubstringRange };
    }

    getLineNumber() {
        return this.lineNumber;
    }

    getAddress() {
        return this.address;
    }

    setLineNumber(line) {
        return line > 0 ? line : 0;
    }

    setAddress(addr) {
        return addr >= 0 ? addr : -1;
    }

    getSourceTokenStringArray() {
        if (this.sourceTokenArray !== null) {
            return this.sourceTokenArray.map(tokenRange =>
                this.sourceString.substring(tokenRange.beginIndex, tokenRange.endIndex));
        } else {
            return null;
        }
    }

    getSourceTokenSubstringRangeArray() {
        return this.sourceTokenArray !== null ? [...this.sourceTokenArray] : null;
    }

    sourceTokenLength() {
        return this.sourceTokenArray !== null ? this.sourceTokenArray.length : 0;
    }

    containsLabel() {
        let tokens = this.getSourceTokenStringArray();
        return tokens !== null && this.isLabel(tokens[0]);
    }

    getLabel() {
        let tokens = this.getSourceTokenStringArray();
        return tokens !== null && this.isLabel(tokens[0]) ? tokens[0] : '';
    }

    isLabel(token) {
        return token.indexOf(':') !== -1 && token.indexOf(':') === token.length - 1 && token.length > 1;
    }

    findSourceTokenSubstringRange(sourceToken, searchIndex) {
        let beginIndex = this.sourceString.indexOf(sourceToken, searchIndex);
        let endIndex = beginIndex + sourceToken.length;
        return { beginIndex, endIndex };
    }
}
