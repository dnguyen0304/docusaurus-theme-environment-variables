import type { Props as LineProps } from '@theme/CodeBlock/Line';
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

interface Props extends Pick<LineProps, 'getTokenProps'> {
    line: PrismToken[];
};

export default function PartitionedLines(
    {
        line,
        getTokenProps,
    }: Props,
): JSX.Element {
    // const partitionIndices = getPartitionIndices(line);
    const lineTokens: JSX.Element[] = [];

    line.forEach((token, key) => {
        const lineToken = <span key={key} {...getTokenProps({ token, key })} />;
        lineTokens.push(lineToken);
    });

    return (
        <>
            {lineTokens}
        </>
    );
};
