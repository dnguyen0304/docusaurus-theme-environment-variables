import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import * as React from 'react';
// import { DATA_ATTRIBUTE, TARGET_CLASS_NAME } from '../PartitionedLineTokens';
// import styles from './styles.module.css';

// const KEY_PREFIX = 'environmentVariable';

// // TODO(dnguyen0304): Support defaultValue property.
// // TODO(dnguyen0304): Support isRequired property.
// interface Entry {
//     readonly key: string;
//     readonly element: Element;
// };

export default function WorkbenchTab(): JSX.Element {
    //     const [entries, setEntries] = React.useState<Entry[]>([]);

    //     const handleBlur = (selector: string) => {
    //         document.querySelector(selector)!.classList.remove('highlight');
    //     };

    //     const handleFocus = (selector: string) => {
    //         document.querySelector(selector)!.classList.add('highlight');
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

    //     React.useEffect(() => {
    //         const newEntries: Entry[] = [];
    //         document.querySelectorAll(`.${TARGET_CLASS_NAME}`).forEach(element => {
    //             if (!(element instanceof HTMLElement)) {
    //                 return;
    //             }
    //             const key = element.dataset[DATA_ATTRIBUTE];
    //             if (!key) {
    //                 return;
    //             }
    //             newEntries.push({
    //                 key,
    //                 element,
    //             });
    //         });
    //         setEntries(newEntries);
    //     }, []);

    return (
        <Box>
            {/* //             <h3>Environment Variables</h3>
//             <ul
//                 className={
//                     `${styles['UnorderedList-container--unstyled']} `
//                     + `${styles['Environment-unorderedList']}`
//                 }
//             >
//                 {entries.map((entry, index, array) => {
//                     return (
//                         <li
//                             key={`${KEY_PREFIX}-${index}`}
//                             className={
//                                 `${styles['Environment-listItem']} `
//                                 + `${styles['Environment-listItem--margin']}`
//                             }
//                         >
//                             <TextField
//                                 label={entry.key}
//                                 onBlur={() => handleBlur(entry.selector)}
//                                 onChange={event => handleChange(
//                                     event,
//                                     index,
//                                     entry.selector,
//                                 )}
//                                 onFocus={() => handleFocus(entry.selector)}
//                                 // required={entry.isRequired}
//                                 // value={entry.value}
//                                 variant='outlined'
//                                 fullWidth
//                             />
//                         </li>
//                     );
//                 })}
//             </ul> */}
        </Box>
    );
};