const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
export const getFormattedDate = (timestamp: number, preformattedDate: null|string = null) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = Number(`0${minutes}`);
    }
    if (preformattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${ preformattedDate } at ${ hours }:${ minutes }`;
    }
    // 10. January 2017. at 10:20
    return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

export const timeAgo = (timestamp: number) => {
    if (!timestamp) {
        return null;
    }

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = Date.now() - timestamp * 1000;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return getFormattedDate(timestamp, 'Today');
    } else if (elapsed > msPerDay && elapsed < msPerDay*2) {
        return getFormattedDate(timestamp, 'Yesterday');
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    return getFormattedDate(timestamp); // 10. January 2017. at 10:20
}