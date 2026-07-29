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

            case "DetectSpaces":
                const spaceRegexp = /^[ \t\r\n]+/;
                const match = spaceRegexp.exec(text);
                if (match) {
                    return match[0];
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
                tokens.push({
                    type: "Unknown",
                    content: text[i]
                });
                i++;
            }
        }

        return tokens;
    }
}
