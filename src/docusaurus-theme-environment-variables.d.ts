declare module '@docupotamus/docusaurus-theme-command-menu' {
    interface PluginOptions { }
    interface EnvironmentVariablesThemeConfig { }
}

declare module '@docusaurus/theme-environment-variables' {
    export * from '@docupotamus/docusaurus-theme-command-menu';
}
