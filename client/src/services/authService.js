function storeBasicAuthInCookie(username, maxAge) {
	document.cookie = "username=" + username + "; path=/; max-age=" + maxAge * 3600;
};

function deleteBasicAuthInCookie() {
	if (basicAuthInCookie()) {
		document.cookie =
			"username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
	}
};

function basicAuthInCookie() {
	return document.cookie.split(";").some((c) => {
		return c.trim().startsWith("username=");
	});
};

// Function to get the value of a cookie by name
function getBasicAuthInCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if the cookie starts with the specified name
        if (cookie.startsWith(name + '=')) {
            // Extract and return the value of the cookie
            return cookie.substring(name.length + 1);
        }
    }

    // Return null if the cookie is not found
    return null;
}

export {
    storeBasicAuthInCookie,
    deleteBasicAuthInCookie,
    basicAuthInCookie,
	getBasicAuthInCookie
}