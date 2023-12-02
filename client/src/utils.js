const utils = {
    prettifyDate: (dateString) => {
        let date = new Date(dateString.replace(' ', 'T'));
        return date.toDateString();
    }
}

export default utils;