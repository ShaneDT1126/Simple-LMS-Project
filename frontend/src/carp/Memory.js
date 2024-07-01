// Memory.js (or the appropriate file name)
export default class Memory {
    static animation = null;
    static MEMORY_SIZE = 65536;
    static contents = new Array(Memory.MEMORY_SIZE).fill(0);

    static Read(address) {
        if (address < 0 || address >= Memory.MEMORY_SIZE) {
            return -1;
        } else {
            return Memory.contents[address];
        }
    }

    static Write(address, data) {
        if (address < 0 || address >= Memory.MEMORY_SIZE || data < 0 || data > 0xFF) {
            return false;
        }

        Memory.contents[address] = data;
        if (Memory.animation !== null) {
            Memory.animation.IOint = Memory.contents[Memory.MEMORY_SIZE];
            Memory.animation.IO = AssemblyInstructions.ToNumberString(Memory.animation.IOint, 2, 8);
        } else {
            console.log("The animation object is not present.");
        }

        return true;
    }

    static Clear() {
        Memory.contents.fill(0);
    }

    static ToBinaryNybbleStringArray(byteShort) {
        if (byteShort >= 0 && byteShort <= 0xFF) {
            let upperNybble = AssemblyInstructions.ToNumberString(Math.floor(byteShort / 0x10), 2, 4);
            let lowerNybble = AssemblyInstructions.ToNumberString(byteShort % 0x10, 2, 4);
            return [upperNybble, lowerNybble];
        } else {
            return null;
        }
    }

    static FromBinaryNybbleStringArray(nybbleString) {
        if (nybbleString !== null && nybbleString.length === 2) {
            try {
                let upperNybble = parseInt(nybbleString[0], 2);
                let lowerNybble = parseInt(nybbleString[1], 2);
                return (upperNybble * 0x10) + lowerNybble;
            } catch (error) {
                return -1;
            }
        } else {
            return -1;
        }
    }

    static ReadBinaryNybbleStringArray(address) {
        return Memory.ToBinaryNybbleStringArray(Memory.Read(address));
    }

    static WriteBinaryNybbleStringArray(address, dataStringArray) {
        let data = Memory.FromBinaryNybbleStringArray(dataStringArray);
        return Memory.Write(address, data);
    }

    static UpdateMemoryTextBox(textBox, isHex) {
        let sb = [];

        for (let i = 0; i < Memory.MEMORY_SIZE; i++) {
            if (isHex) {
                sb.push(`${i} : ${Memory.contents[i].toString(16).padStart(2, '0')}`);
            } else {
                sb.push(`${i} : ${Memory.contents[i].toString(2).padStart(8, '0')}`);
            }

            sb.push("");

            if ((i + 1) % 8 === 0) {
                sb.push("");
            }
        }

        textBox.innerText = sb.join("\n");
    }

    static GetInstructions() {
        return Memory.contents.slice(); // return a copy of contents array
    }
}
