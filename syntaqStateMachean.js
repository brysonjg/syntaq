class SyntaqStateMachine {
    constructor(grammar) {
        this.grammar = grammar;
    }

    matchesRule(rule, text, position) {
        if (!Object.hasOwn(syntaqRules, rule.type)) {
            throw new Error("Cannot execute rule which is not defined in syntaqRules");
        }

        const ruleHandler = syntaqRules[rule.type];
        const ruleContext = {
            rule: rule,
            position: position,
            source: text,
            text: text.slice(position),
            grammar: {
                lists: this.grammar.lists,
            }
        };

        const result = ruleHandler.call(ruleContext);

        if (!result) return false;
        return result;
    }

    nextStates(context, stack) {
        stack = [...stack];

        if (!context || context === "#stay") {
            return stack;
        }

        while (context.startsWith("#pop")) {
            stack.pop();

            if (context.startsWith("#pop!")) {
                context = context.slice(5);
                break;
            }

            context = context.slice(4);
        }

        if (stack.length === 0) {
            throw new Error("Cannot pop the last element of the context stack");
        }

        if (context === "") {
            return stack;
        }

        if (!Object.hasOwn(this.grammar.contexts, context)) {
            throw new Error("Cannot switch to undefined context");
        }

        stack.push(context);

        return stack;
    }

    parseBoolean(value) {
        if (!value) return false;

        const trueValues = ["1", "true"];
        if (trueValues.includes(value)) return true;

        const falseValues = ["0", "false"];
        if (falseValues.includes(value)) return false;

        return false;
    }

    tokenize(text) {
        const contextNames = Object.keys(this.grammar.contexts);
        let states = [contextNames[0]];

        let tokens = [];
        let index = 0;

        while (index < text.length) {
            const contextName = states[states.length - 1];
            const context = this.grammar.contexts[contextName];
            let matchedText = false;

            for (const rule of context.rules) {
                const match = this.matchesRule(rule, text, index);
                if (!match) continue;

                states = this.nextStates(rule.context, states);

                if (this.parseBoolean(rule?.lookAhead)) {
                    matchedText = true;
                    continue;
                }

                tokens.push({
                    type: rule.attribute,
                    content: match
                });

                index += match.length;
                matchedText = true
                break;
            }

            if (!matchedText) {
                let contextAttribute = context.attribute || "Unknown";

                tokens.push({
                    type: contextAttribute,
                    content: text[index]
                });
                index++;
            }
        }

        return tokens;
    }
}
