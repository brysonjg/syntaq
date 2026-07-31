const text = `{
    "name": "Syntax Test",
    "version": 1.2,
    "enabled": true,
    "count": 42,
    "price": 19.99,
    "tags": ["json", "test", "highlighting \\u0075d", 123, false, null,],
    "nested": {
        "users": [
            { "id": 1, "name": "Alice", "scores": [10, 20, 30] },
            { "id": 2, "name": "Bo\\"b", "scores": [15, 25.5, 35], }
            { "id": 3, "name": "Charlie \\n", "active": true }
        ],
        "matrix": [[1,2,3], [4,5,6], [7,8,9]],
        "misc": { "empty": {}, "list": [], "value": .75 }
    },
    "message": 'Single quotes are invalid in JSON',
    "unicode": "😀 π こんにちは",
    "missingEnd": { "a": 1e, "b": 2}
}`;

const language = "json";
