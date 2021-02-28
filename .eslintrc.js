module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        // 'eslint:recommended',
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "prettier", "@typescript-eslint"],
    ignorePatterns: ["config/**"],
    rules: {
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/triple-slash-reference": ["off"],
    },
};
