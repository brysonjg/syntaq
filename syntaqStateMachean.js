class SyntaqStateMachine {
    constructor(grammer) {
        this.grammer = grammer;
    }

    matchesRule(rule, text, position) {
        text = text.slice(position);

        switch (rule.type) {
            case "DetectChar":
                if (text[0] === rule.char) {
                    return rule.char;
                }
                return false;

            case "Detect2Chars":
                if (text[0] === rule.char && text[1] === rule.char1) {
                    return rule.char +  rule.char1;
                }
                return false;

            case "DetectSpaces":
                const spaceRegexp = /^[ \t\r\n]+/;
                const match = spaceRegexp.exec(text);
                if (match) {
                    return match[0];
                }
                return false;

            case "StringDetect":
                if (text.startsWith(rule.String)) {
                    return rule.String;
                }
                return false;

            case "AnyChar":
                const chars = rule.String.split("");
                if (chars.includes(text[0])) {
                    return text[0];
                }
                return false;

            case "keyword":
                const words = this.grammer.lists[rule.String];
                for (const word of words) {
                    if (text.startsWith(word)) {
                        return word;
                    }
                }
                return false;

            case "RegExpr":
                const regexp = new RegExp("^" + rule.String);
                const matches = regexp.exec(text);
                if (matches) {
                    return matches[0];
                }
                return false;
        }
    }

    nextStates(rule, stack) {
        stack = [...stack];
        let context = rule.context;

        if (!context || context === "#stay") {
            return stack;
        }

        while (context.startsWith("#pop")) {
            if (context.startsWith("#pop!")) {
                stack.pop();
                context = context.slice(5);
                break;
            }

            stack.pop();
            context = context.slice(4);
        }

        if (stack.length === 0) {
            throw new Error("cannot pop the last element of the context stack");
        }

        if (context === "") {
            return stack;
        }

        if (!this.grammer.contexts.hasOwnProperty(context)) {
            throw new Error("cannot switch to undefined context");
        }

        stack.push(context);

        return stack;
    }

    coaxSrtingToBool(value) {
        if (!value) return false;

        const trueValues = ["1", "true"];
        if (trueValues.includes(value)) return true;

        const falseValues = ["0", "false"];
        if (falseValues.includes(value)) return false;

        return false;
    }

    tokenize(text) {
        const statesKeys = Object.keys(this.grammer.contexts);

        let states = [statesKeys[0]];
        let tokens = [];

        let i = 0;

        while (i < text.length) {
            const contextState = states[states.length - 1];
            const context = this.grammer.contexts[contextState];
            let matchedText = false;

            for (const rule of context.rules) {
                const answer = this.matchesRule(rule, text, i);
                if (answer === false) {
                    continue;
                }
                else {
                    states = this.nextStates(rule, states);

                    if (this.coaxSrtingToBool(rule?.lookAhead)) {
                        matchedText = true;
                        continue;
                    }

                    tokens.push({
                        type: rule.attribute,
                        content: answer
                    });

                    i += answer.length;
                    matchedText = true;

                    break;
                }
            }

            if (!matchedText) {
                let contextAttribute = context?.attribute;
                if (!contextAttribute) {
                    contextAttribute = "Unknown";
                }

                tokens.push({
                    type: contextAttribute,
                    content: text[i]
                });
                i++;
            }
        }

        return tokens;
    }
}
