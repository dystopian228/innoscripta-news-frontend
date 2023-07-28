export const capitalizeWord = (word: string) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfString = word.substring(1);
    return firstLetter + restOfString;
}