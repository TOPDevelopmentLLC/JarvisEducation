module.exports = function (api) {
    api.cache(true);
    return {
    presets: ['babel-preset-expo'],
    plugins: [
        [
            "module-resolver",
            {
                root: ["./"],
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
                    modals: './app/modals',
                    app: './app',
                },
            },
        ],
    ],
}
};