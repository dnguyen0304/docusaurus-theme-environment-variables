import type { WrapperProps } from '@docusaurus/types';
import StringInit from '@theme-init/CodeBlock/Content/String';
import type StringType from '@theme/CodeBlock/Content/String';
import * as React from 'react';
import useEnvironmentVariablesThemeConfig from '../../docupotamus-environment-variables/hooks/useEnvironmentVariablesThemeConfig';
import StringSwizzle from '../../docupotamus-environment-variables/theme/CodeBlock/Content/String';

type Props = Readonly<WrapperProps<typeof StringType>>;

export default function StringWrapper(props: Props): JSX.Element {
    const { swizzleIsEnabled } = useEnvironmentVariablesThemeConfig();

    return (
        (swizzleIsEnabled)
            ? <StringSwizzle {...props} />
            : <StringInit {...props} />
    );
};
