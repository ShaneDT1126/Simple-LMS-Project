export default class AssemblyInstructions {
    static NOP = "NOP";
    static LDAC = "LDAC";
    static STAC = "STAC";
    static MVAC = "MVAC";
    static MOVR = "MOVR";
    static JUMP = "JUMP";
    static JMPZ = "JMPZ";
    static JPNZ = "JPNZ";
    static ADD = "ADD";
    static SUB = "SUB";
    static INAC = "INAC";
    static CLAC = "CLAC";
    static AND = "AND";
    static OR = "OR";
    static XOR = "XOR";
    static NOT = "NOT";
    static END = "END";

    static opcodeNOP = 0x00;
    static opcodeLDAC = 0x01;
    static opcodeSTAC = 0x02;
    static opcodeMVAC = 0x03;
    static opcodeMOVR = 0x04;
    static opcodeJUMP = 0x05;
    static opcodeJMPZ = 0x06;
    static opcodeJPNZ = 0x07;
    static opcodeADD = 0x08;
    static opcodeSUB = 0x09;
    static opcodeINAC = 0x0a;
    static opcodeCLAC = 0x0b;
    static opcodeAND = 0x0c;
    static opcodeOR = 0x0d;
    static opcodeXOR = 0x0e;
    static opcodeNOT = 0x0f;
    static opcodeEND = 0xff;

    static toMnemonicCode(mnemonic) {
        switch (mnemonic.toUpperCase()) {
            case "NOP":
                return this.opcodeNOP;
            case "LDAC":
                return this.opcodeLDAC;
            case "STAC":
                return this.opcodeSTAC;
            case "MVAC":
                return this.opcodeMVAC;
            case "MOVR":
                return this.opcodeMOVR;
            case "JUMP":
                return this.opcodeJUMP;
            case "JMPZ":
                return this.opcodeJMPZ;
            case "JPNZ":
                return this.opcodeJPNZ;
            case "ADD":
                return this.opcodeADD;
            case "SUB":
                return this.opcodeSUB;
            case "INAC":
                return this.opcodeINAC;
            case "CLAC":
                return this.opcodeCLAC;
            case "AND":
                return this.opcodeAND;
            case "OR":
                return this.opcodeOR;
            case "XOR":
                return this.opcodeXOR;
            case "NOT":
                return this.opcodeNOT;
            case "END":
                return this.opcodeEND;
            default:
                return -1; // Return -1 if failed to match assembly mnemonic
        }
    }

    static toMnemonic(code) {
        switch (code) {
            case this.opcodeNOP:
                return this.NOP;
            case this.opcodeLDAC:
                return this.LDAC;
            case this.opcodeSTAC:
                return this.STAC;
            case this.opcodeMVAC:
                return this.MVAC;
            case this.opcodeMOVR:
                return this.MOVR;
            case this.opcodeJUMP:
                return this.JUMP;
            case this.opcodeJMPZ:
                return this.JMPZ;
            case this.opcodeJPNZ:
                return this.JPNZ;
            case this.opcodeADD:
                return this.ADD;
            case this.opcodeSUB:
                return this.SUB;
            case this.opcodeINAC:
                return this.INAC;
            case this.opcodeCLAC:
                return this.CLAC;
            case this.opcodeAND:
                return this.AND;
            case this.opcodeOR:
                return this.OR;
            case this.opcodeXOR:
                return this.XOR;
            case this.opcodeNOT:
                return this.NOT;
            case this.opcodeEND:
                return this.END;
            default:
                return null;
        }
    }

    static isMnemonic(str) {
        str = str.toUpperCase(); // Convert to uppercase for case-insensitive comparison

        return [
            this.NOP, this.LDAC, this.STAC, this.MVAC, this.MOVR,
            this.JUMP, this.JMPZ, this.JPNZ, this.ADD, this.SUB,
            this.INAC, this.CLAC, this.AND, this.OR, this.XOR,
            this.NOT, this.END
        ].includes(str);
    }

    static toInstructionCode(instruction) {
        if (!instruction || instruction.length === 0) {
            return null;
        }

        if (instruction[0] && (
            [this.NOP, this.MVAC, this.MOVR, this.ADD, this.SUB, this.INAC,
            this.CLAC, this.AND, this.OR, this.XOR, this.NOT, this.END].includes(instruction[0].toUpperCase())) &&
            instruction.length < 2) {
            return [this.toMnemonicCode(instruction[0])];
        }

        if (instruction[0] && (
            [this.LDAC, this.STAC, this.JUMP, this.JMPZ, this.JPNZ].includes(instruction[0].toUpperCase())) &&
            instruction.length < 3 && this.isAddress(instruction[1])) {
            const instructionCode = [this.toMnemonicCode(instruction[0]), ...this.toAddressCode(this.toAddressInteger(instruction[1]))];
            return instructionCode;
        }

        return null;
    }

    static toAddressCode(address) {
        if (this.isAddress(address)) {
            return [(address % 0x100), Math.floor((address / 0x100) % 0x100)];
        } else {
            return null;
        }
    }

    static toAddressInteger(addressString) {
        if (!addressString) return -1;

        let baseSpecifier = addressString[addressString.length - 1];
        let addressRadix = this.toRadix(baseSpecifier);

        if (addressRadix !== -1) {
            addressString = addressString.slice(0, -1);
        } else {
            addressRadix = 10;
        }

        let address;
        try {
            address = parseInt(addressString, addressRadix);
        } catch (e) {
            return -1;
        }

        return this.isAddress(address) ? address : -1;
    }

    static isValidOperands(mnemonic, operands) {
        mnemonic = mnemonic.toUpperCase(); // Convert to uppercase for case-insensitive comparison

        if ([
            this.NOP, this.MVAC, this.MOVR, this.ADD, this.SUB, this.INAC,
            this.CLAC, this.AND, this.OR, this.XOR, this.NOT, this.END
        ].includes(mnemonic)) {
            return !operands || operands.length === 0 || (operands.length === 1 && !operands[0]);
        }

        if ([
            this.LDAC, this.STAC, this.JUMP, this.JMPZ, this.JPNZ
        ].includes(mnemonic)) {
            return operands && operands.length === 1 && this.isAddress(operands[0]);
        }

        return false;
    }

    static expectsOperands(mnemonic) {
        mnemonic = mnemonic.toUpperCase(); // Convert to uppercase for case-insensitive comparison

        if ([
            this.NOP, this.MVAC, this.MOVR, this.ADD, this.SUB, this.INAC,
            this.CLAC, this.AND, this.OR, this.XOR, this.NOT, this.END
        ].includes(mnemonic)) {
            return 0;
        }

        if ([
            this.LDAC, this.STAC, this.JUMP, this.JMPZ, this.JPNZ
        ].includes(mnemonic)) {
            return 1;
        }

        return -1;
    }

    static toByteShort(byteString) {
        if (!byteString) return -1;

        let baseSpecifier = byteString[byteString.length - 1];
        let byteRadix = this.toRadix(baseSpecifier);

        if (byteRadix !== -1) {
            byteString = byteString.slice(0, -1);
        } else {
            byteRadix = 10;
        }

        let byteShort;
        try {
            byteShort = parseInt(byteString, byteRadix);
        } catch (e) {
            console.error(e.message);
            return -1;
        }

        return this.isByte(byteShort) ? byteShort : -1;
    }

    static toWordInteger(wordString) {
        if (!wordString) return -1;

        let baseSpecifier = wordString[wordString.length - 1];
        let wordRadix = this.toRadix(baseSpecifier);

        if (wordRadix !== -1) {
            wordString = wordString.slice(0, -1);
        } else {
            wordRadix = 10;
        }

        let wordInteger;
        try {
            wordInteger = parseInt(wordString, wordRadix);
        } catch (e) {
            console.error(e);
            return -1;
        }

        return this.isWord(wordInteger) ? wordInteger : -1;
    }

    static isAddress(str) {
        return this.toAddressInteger(str) !== -1;
    }

    static isAddress(num) {
        return num >= 0 && num <= 0xFFFF;
    }

    static isByte(num) {
        return num >= 0 && num <= 0xFF;
    }

    static isWord(num) {
        return num >= 0 && num <= 0xFFFF;
    }

    static isConstantByte(num) {
        return num >= 0 && num <= 0xFF;
    }

    static isConstantWord(num) {
        return num >= 0 && num <= 0xFFFF;
    }

    static toRadix(ch) {
        ch = ch.toLowerCase();

        switch (ch) {
            case 'b':
                return 2;
            case 'o':
            case 'q':
                return 8;
            case 'd':
                return 10;
            case 'h':
                return 16;
            default:
                return -1;
        }
    }

    static toWordCode(word) {
        if (this.isWord(word)) {
            return [(word % 0x100), Math.floor((word / 0x100) % 0x100)];
        } else {
            return null;
        }
    }

    static toNumberString(num, radix, length) {
        let str = num.toString(radix);

        while (str.length < length) {
            str = "0" + str;
        }

        return str.slice(-length);
    }
}
