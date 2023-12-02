const handleError = (error) => {
    if (error.response.data) {
        alert(error.response.data);
    } else {
        alert(error);
    }
}

export default handleError;