class AssemblySourceProgram {
    constructor(source) {
        this.sourceString = source;
        this.sourceLineArray = [];
        this.tokenizeAndProcess();
    }

    tokenizeAndProcess() {
        const lineVector = [];
        const pattern = /^(?!;)([^;\r\n]+)/gm;
        const regex = new RegExp(pattern);
        let lineNumber = 1;
        const matches = this.sourceString.match(regex);
        
        if (matches) {
            for (const match of matches) {
                const lineString = match.trim();
                if (lineString) {
                    const line = this.findSourceLine(lineString, lineNumber);
                    if (line) {
                        lineVector.push(line);
                    }
                    if (line.sourceTokenLength() > 0) {
                        lineNumber++;
                    }
                }
            }
        }
        this.sourceLineArray = lineVector;
    }

    getSourceLineByLineNumber(line) {
        if (line > 0 && line <= this.sourceLineArray.length) {
            return this.sourceLineArray[line - 1];
        } else {
            return null;
        }
    }

    getSourceLineByAddress(address) {
        if (address >= 0) {
            for (const line of this.sourceLineArray) {
                if (address === line.getAddress()) {
                    return line;
                }
            }
            return null;
        } else {
            return null;
        }
    }

    setSourceLineAddressByLineNumber(address, line) {
        if (line > 0 && line <= this.sourceLineArray.length) {
            this.sourceLineArray[line - 1].setAddress(address);
        }
    }

    sourceLineLength() {
        return this.sourceLineArray.length;
    }

    findSourceLine(sourceLine, line) {
        const beginIndex = this.sourceString.indexOf(sourceLine);
        const endIndex = beginIndex + sourceLine.length;
        const range = new SubstringRange(beginIndex, endIndex);
        return new AssemblySourceLine(this.sourceString, range, line);
    }
}