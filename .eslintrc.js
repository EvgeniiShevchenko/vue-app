module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    "no-alert": "warn",
    "no-unused-vars": "warn",
    "prefer-object-spread": "warn",
    "prefer-spread": "warn",
    "prefer-const": [
      "error",
      {
          "destructuring": "all"
      }
  ],
  "arrow-parens": [2, "as-needed"],
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
