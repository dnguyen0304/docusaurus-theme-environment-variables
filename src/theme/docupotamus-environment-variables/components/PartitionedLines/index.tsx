import { parseLines } from '@docusaurus/theme-common/internal';
import type { Props as LineProps } from '@theme/CodeBlock/Line';
import Line from '@theme/CodeBlock/Line';
import * as React from 'react';

const REGEX = /\{\{\s\S+\s\}\}/g;

const getPartitionIndices = (text: string): number[] => {
    const matches = [
        // See: https://github.com/microsoft/TypeScript/issues/36788
        ...text.matchAll(REGEX) as IterableIterator<RegExpExecArray>,
    ];
    const indices: number[] = [];
    // if (matches[0].index !== 0) {
    //     // if (matches[0]?.index !== 0) {
    //     indices.push(0);
    // }
    matches.forEach(match => {
        indices.push(match.index);
        indices.push(match.index + match[0].length);
    });
    // if (matches[matches.length - 1] !== text.length) {
    //     indices.push(text.length);
    // }
    return indices;
};

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
    // console.log(getPartitionIndices(code));

    const chunks: JSX.Element[] = [];

    tokens.forEach((line, i) => {
        const chunk = (
            <Line
                key={i}
                classNames={lineClassNames[i]}
                line={line}
                getLineProps={getLineProps}
                getTokenProps={getTokenProps}
                showLineNumbers={showLineNumbers}
            />
        );
        chunks.push(chunk);
    });

    return (
        <>
            {chunks}
        </>
    );
};
