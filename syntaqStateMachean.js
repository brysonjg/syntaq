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

    arraysEquivalent(arrayA, arrayB) {
        if (arrayA.length !== arrayB.length) return false;

        // this loop compairs backwards because state stacks
        // are most likly to differ at the end
        for (let i = arrayA.length - 1; i >= 0; i--) {
            if (arrayA[i] !== arrayB[i]) return false;
        }

        return true;
    }

    computeEndLineContexts(states) {
        states = [...states];

        let contextName = states[states.length - 1];
        let context = this.grammar.contexts[contextName];

        if (!context.lineEndContext) return states;

        let endlessLoopCounter = 0;

        while (true) {
            const nextStates = this.nextStates(context.lineEndContext, states);
            if (this.arraysEquivalent(nextStates, states)) break;
            states = nextStates;

            endlessLoopCounter++;
            if (endlessLoopCounter > 1024) {
                throw new Error("Endless looping for endLineContext context switching");
            }

            contextName = states[states.length - 1];
            context = this.grammar.contexts[contextName];
        }

        return states;
    }

    tokenizeLine(text, states) {
        states = [...states]
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

        states = this.computeEndLineContexts(states);

        return {tokens, states};
    }

    tokenize(text) {
        const contextNames = Object.keys(this.grammar.contexts);
        let states = [contextNames[0]];

        const lines = text.split("\n");
        let tokens = [];

        for (const line of lines) {
            const output = this.tokenizeLine(line, states);
            states = output.states;
            tokens.push(...output.tokens);

            try{tokens[tokens.length - 1].content += "\n";}catch{}
        }

        return tokens;
    }
}
