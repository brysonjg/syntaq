class syntaq {
    static languages = {};

    static resolveIncludes(contexts, name, resolving) {
        if (resolving.has(name)) {
            throw new Error(`this definistion has a IncludeRules cycle.`);
        }

        resolving.add(name);

        const output = [];

        for (const rule of contexts[name].rules) {

            if (rule.type === "IncludeRules") {
                output.push(
                    ...this.resolveIncludes(contexts, rule.context, resolving)
                );
            } else {
                output.push(rule);
            }
        }

        resolving.delete(name);

        contexts[name].rules = output

        return output;
    }

    static grammerize(xmlText) {
        const xmlParser = new DOMParser();
        const xmlDocument = xmlParser.parseFromString(xmlText, 'text/xml');
        const highlighting = xmlDocument.querySelector("highlighting");

        let outputJson = {
            lists: {},
            contexts: {},
            itemDatas: {},
        };

        // parse lists
        const lists = highlighting.querySelectorAll("list");

        for (let list of lists) {
            const items = list.querySelectorAll("item");
            const listName = list.getAttribute("name");

            outputJson.lists[listName] = Array.from(
                items,
                item => item.textContent
            );
        }

        // parse contexts
        const contextContainer = highlighting.querySelector("contexts");
        const contexts = contextContainer.querySelectorAll("context");

        for (let context of contexts) {
            const contextName = context.getAttribute("name");

            outputJson.contexts[contextName] = {};

            for (let attribute of context.attributes) {
                if (attribute.name === "name") continue;

                outputJson.contexts[contextName][attribute.name] = attribute.value;
            }

            outputJson.contexts[contextName].rules = [];

            for (let rule of context.children) {
                const ruleType = rule.tagName;
                let attributes = {};

                for (let attribute of rule.attributes) {
                    attributes[attribute.name] = attribute.value;
                }

                outputJson.contexts[contextName].rules.push({
                    type: ruleType,
                    ...attributes
                });
            }
        }

        // parse IncludeRules
        for (let name of Object.keys(outputJson.contexts)) {
            outputJson.contexts[name].rules = this.resolveIncludes(
                outputJson.contexts,
                name,
                new Set(),
            );
        }

        // parse itemDatas
        const itemDataContainer = highlighting.querySelector("itemDatas");
        const itemDatas = itemDataContainer.querySelectorAll("itemData");

        for (let itemData of itemDatas) {
            const itemDataName = itemData.getAttribute("name");

            outputJson.itemDatas[itemDataName] = {};

            for (let attribute of itemData.attributes) {
                if (attribute.name === "name") continue;

                outputJson.itemDatas[itemDataName][attribute.name] = attribute.value;
            }
        }

        return outputJson;
    }

    static tokenize(text, language) {
        const xmlText = this.languages[language];
        const grammer = this.grammerize(xmlText);

        const stateMachean = new SyntaqStateMachine(grammer);
        const tokens = stateMachean.tokenize(text);

        return tokens;
    }
}
