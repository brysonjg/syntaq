class SyntaqStateMachine {
    constructor(grammar) {
        this.grammar = grammar;
    }

    matchesRule(rule, text, position) {
        text = text.slice(position);

        if (!Object.hasOwn(syntaqRules, rule.type)) {
            throw new Error("Cannot execute rule which is not defined in syntaqRules");
        }

        const ruleHandler = syntaqRules[rule.type];
        const ruleContext = {
            rule,
            text,
            position,
            grammar: {
                lists: this.grammar.lists,
            }
        };

        const result = ruleHandler.call(ruleContext);

        if (!result) return false;
        return result;
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

    coaxSrtingToBool(value) {
        if (!value) return false;

        const trueValues = ["1", "true"];
        if (trueValues.includes(value)) return true;

        const falseValues = ["0", "false"];
        if (falseValues.includes(value)) return false;

        return false;
    }

    tokenize(text) {
        const statesKeys = Object.keys(this.grammar.contexts);

        let states = [statesKeys[0]];
        let tokens = [];

        let i = 0;

        while (i < text.length) {
            const contextState = states[states.length - 1];
            const context = this.grammar.contexts[contextState];
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
