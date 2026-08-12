const syntaqRules = {
    DetectChar() {
        if (this.text[0] === this.rule.char) {
            return this.rule.char;
        }
    },

    Detect2Chars() {
        if (this.text[0] === this.rule.char && this.text[1] === this.rule.char1) {
            return this.rule.char +  this.rule.char1;
        }
    },

    DetectSpaces() {
        const spaceRegexp = /^[ \t\r\n]+/;
        const match = spaceRegexp.exec(this.text);

        if (match) {
            return match[0];
        }
    },

    StringDetect() {
        if (this.text.startsWith(this.rule.String)) {
            return this.rule.String;
        }
    },

    AnyChar() {
        const chars = this.rule.String.split("");

        if (this.rule.String.includes(this.text[0])) {
            return this.text[0];
        }
    },

    keyword() {
        const words = this.grammar.lists[this.rule.String];

        for (const word of words) {
            if (this.text.startsWith(word)) {
                return word;
            }
        }
    },

    RegExpr() {
        const regexp = new RegExp("^" + this.rule.String);
        const matches = regexp.exec(this.text);

        if (matches) {
            return matches[0];
        }
    }
}
