/* This file is used for functions that are usefull within different files */

//Function that transforms a Timestamp to a Date yyyy - mm - dd
export const formatDate = (dateString) => {
    if (dateString !== "0000-00-00") {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } else {
        return "[Not Set]";
    }
};