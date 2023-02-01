import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import '../../styles.css';
import {
    DATA_ATTRIBUTE_NAME,
    TARGET_CLASS_NAME
} from '../PartitionedLineTokens';
import styles from './styles.module.css';

const KEY_PREFIX = 'environmentVariable';

// TODO(dnguyen0304): Support defaultValue property.
// TODO(dnguyen0304): Support isRequired property.
interface Entry {
    readonly key: string;
    readonly element: HTMLElement;
};

export default function WorkbenchTab(): JSX.Element {
    const [entries, setEntries] = React.useState<Entry[]>([]);

    const enableHighlight = (entry: Entry) => {
        const className = styles['target--highlight'];
        if (className) {
            entry.element.classList.add(className);
        }
    };

    const disableHighlight = (entry: Entry) => {
        const className = styles['target--highlight'];
        if (className) {
            entry.element.classList.remove(className);
        }
    };

    //     const handleBlur = (selector: string) => {
    //         document.querySelector(selector)!.classList.remove('highlight');
    //     };

    //     const handleChange = (
    //         event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    //         changeIndex: number,
    //         selector: string,
    //     ) => {
    //         setEntries(entries => entries.map((entry, index) => {
    //             if (index !== changeIndex) {
    //                 return entry;
    //             }
    //             return {
    //                 ...entry,
    //                 value: event.target.value,
    //             }
    //         }));

    //         document.querySelector(selector)!.innerHTML = event.target.value + ' ';
    //     };

    React.useEffect(() => {
        const newEntries: Entry[] = [];
        document.querySelectorAll(`.${TARGET_CLASS_NAME}`).forEach(element => {
            if (!(element instanceof HTMLElement)) {
                return;
            }
            const key = element.dataset[DATA_ATTRIBUTE_NAME];
            if (!key) {
                return;
            }
            newEntries.push({
                key,
                element,
            });
        });
        setEntries(newEntries);
    }, []);

    return (
        <Box>
            <h3
                className='ifm_text__reset'
                style={{
                    color: 'var(--docupotamus-color-grey-800)',
                    fontFamily: 'var(--docupotamus-font-family)',
                    fontSize: 'var(--font-size-0)',
                    fontWeight: 'var(--docupotamus-heading-font-weight)',
                }}
            >
                Environment Variables
            </h3>
            <ul className={styles['entries-container']}>
                {entries.map((entry) => {
                    return (
                        <li key={`${KEY_PREFIX}-${entry.key}`}>
                            <TextField
                                autoComplete='off'
                                label={entry.key}
                                onBlur={() => disableHighlight(entry)}
                                //   onChange={event => handleChange(
                                //       event,
                                //       index,
                                //       entry.selector,
                                //   )}
                                onFocus={() => enableHighlight(entry)}
                                onMouseEnter={() => enableHighlight(entry)}
                                onMouseLeave={() => disableHighlight(entry)}
                                value={''}
                                variant='outlined'
                                fullWidth
                                required
                            />
                        </li>
                    );
                })}
            </ul>
        </Box>
    );
};
