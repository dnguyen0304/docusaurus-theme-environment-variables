import type { Plugin } from '@docusaurus/types';

export default function themeEnvironmentVariables(): Plugin<undefined> {
    return {
        name: 'docusaurus-theme-environment-variables',

        getThemePath() {
            return '../lib/theme';
        },

        getTypeScriptThemePath() {
            return '../src/theme';
        },
    };
};

export { validateThemeConfig } from './validateThemeConfig';

export const getSwizzleComponentList = (): string[] => [];
