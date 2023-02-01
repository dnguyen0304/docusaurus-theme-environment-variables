import type { Props as LineProps } from '@theme/CodeBlock/Line';
import * as React from 'react';

const REGEX = /\{\{\s\S+\s\}\}/g;

interface Partition {
    readonly start: number;
    readonly end: number;
};

const getPartitions = (line: PrismToken[]): Partition[] => {
    const text = line.map(token => token.content).join('');
    const matches = [
        // See: https://github.com/microsoft/TypeScript/issues/36788
        ...text.matchAll(REGEX) as IterableIterator<RegExpExecArray>,
    ];
    const partitions: Partition[] = [];
    // if (matches[0].index !== 0) {
    //     // if (matches[0]?.index !== 0) {
    //     partitions.push(0);
    // }
    matches.forEach(match => {
        partitions.push({
            start: match.index,
            end: match.index + match[0].length,
        });
    });
    // if (matches[matches.length - 1] !== text.length) {
    //     partitions.push(text.length);
    // }
    return partitions;
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
    const partitions = getPartitions(line);
    const lineTokens: JSX.Element[] = [];
    const temp: PrismToken[] = [];

    let currCharacterIndex = 0;
    let currPartition = partitions[0];

    line.forEach((token, key) => {
        // if (currCharacterIndex === currPartitionIndex) {
        //     temp.push(token);
        //     return;
        // }
        const lineToken = <span key={key} {...getTokenProps({ token, key })} />;
        lineTokens.push(lineToken);
        currCharacterIndex += token.content.length;
    });

    return (
        <>
            {lineTokens}
        </>
    );
};
