import { parseLines } from '@docusaurus/theme-common/internal';
import type { Props as LineProps } from '@theme/CodeBlock/Line';
import Line from '@theme/CodeBlock/Line';
import * as React from 'react';

// TODO(dnguyen0304): Investigate if importing from prism-react-renderer is
//   possible.
interface PrismToken {
    types: string[];
    content: string;
    empty?: boolean;
};

interface Props extends Omit<LineProps, 'classNames' | 'line'> {
    code: string;
    tokens: PrismToken[][];
    lineClassNames: ReturnType<typeof parseLines>['lineClassNames']
    showLineNumbers: boolean;
};

export default function PartitionedLines(
    {
        code,
        tokens,
        lineClassNames,
        showLineNumbers,
        getLineProps,
        getTokenProps,
    }: Props,
): JSX.Element {
    return (
        <>
            {tokens.map((line, i) => (
                <Line
                    key={i}
                    classNames={lineClassNames[i]}
                    line={line}
                    getLineProps={getLineProps}
                    getTokenProps={getTokenProps}
                    showLineNumbers={showLineNumbers}
                />
            ))}
        </>
    );
};
