import type { WrapperProps } from '@docusaurus/types';
import LineInit from '@theme-init/CodeBlock/Line';
import type LineType from '@theme/CodeBlock/Line';
import * as React from 'react';
import useEnvironmentVariablesThemeConfig from '../../docupotamus-environment-variables/hooks/useEnvironmentVariablesThemeConfig';
import LineSwizzle from '../../docupotamus-environment-variables/theme/CodeBlock/Line';

type Props = Readonly<WrapperProps<typeof LineType>>;

export default function LineWrapper(props: Props): JSX.Element {
    const { swizzleIsEnabled } = useEnvironmentVariablesThemeConfig();

    return (
        (swizzleIsEnabled)
            ? <LineSwizzle {...props} />
            : <LineInit {...props} />
    );
};
