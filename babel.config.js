module.exports = function (api) {
    api.cache(true);
    return {
    presets: [
        ['babel-preset-expo', { jsxImportSource: "nativewind" }],
        "nativewind/babel"
    ],
    plugins: [
        [
            "module-resolver",
            {
                root: ["."],
                extensions: [
                    ".ios.js",
                    ".android.js",
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx",
                    ".ios.ts",
                    ".android.ts",
                    ".ios.tsx",
                    ".android.tsx"
                  ],
                alias: {
                    components: './app/components',
                    lib: './app/lib',
                    hooks: './app/hooks',
                    app: './app',
                },
            },
            'nativewind/babel'
        ],
        'react-native-reanimated/plugin',
    ],
    env: {
        production: {
            plugins: ['react-native-paper/babel'],
        },
    }
}
};