import type { Props as LineProps } from '@theme/CodeBlock/Line';
import * as React from 'react';

const REGEX = /\{\{\s\S+\s\}\}/g;

interface Partition {
    readonly start: number;
    readonly end: number;
    readonly name: string;
};

const getPartitions = (line: PrismToken[]): Partition[] => {
    const text = line.map(token => token.content).join('');
    const matches = [
        // See: https://github.com/microsoft/TypeScript/issues/36788
        ...text.matchAll(REGEX) as IterableIterator<RegExpExecArray>,
    ];
    const partitions: Partition[] = [];
    matches.forEach(match => {
        partitions.push({
            start: match.index,
            end: match.index + match[0].length,
            name: match[0].slice(3, -3),
        });
    });
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
    const lineTokens: JSX.Element[] = [];
    const partitions = getPartitions(line);

    let temp: JSX.Element[] = [];
    let currCharacterIndex = 0;
    let currPartitionIndex = 0;

    line.forEach((token, key) => {
        const lineToken = <span key={key} {...getTokenProps({ token, key })} />;
        const currPartition = partitions[currPartitionIndex];
        if (!currPartition) {
            // Add all remaining line tokens without changes.
            lineTokens.push(lineToken);
            return;
        }

        const isBeforeStart = currCharacterIndex < currPartition.start;
        const isAfterStart = currCharacterIndex >= currPartition.start;
        const isBeforeEnd = currCharacterIndex < currPartition.end;
        const isAfterEnd = currCharacterIndex > currPartition.end;

        const isOutside = isBeforeStart || isAfterEnd;
        const isBetween = isAfterStart && isBeforeEnd;
        const isImmediatelyAfterEnd = currCharacterIndex === currPartition.end;

        if (isOutside) {
            lineTokens.push(lineToken);
        } else if (isBetween) {
            temp.push(lineToken);
        } else if (isImmediatelyAfterEnd) {
            // Flush the temporary line tokens.
            lineTokens.push(
                <span
                    className='DocupotamusEnvironmentVariable-container'
                    data-environment-variable-name={currPartition.name}
                >
                    {temp}
                </span>
            );
            temp = [];
            currPartitionIndex += 1;
            // Process the current line token.
            lineTokens.push(lineToken);
        }
        currCharacterIndex += token.content.length;
    });

    return (
        <>
            {lineTokens}
        </>
    );
};
