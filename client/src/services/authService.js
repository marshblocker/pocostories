class AuthService {
    storeBasicAuthInCookie = (username, maxAge) => {
        document.cookie = "username=" + username + "; path=/; max-age=" + maxAge * 3600;
    };
    
    deleteBasicAuthInCookie = () => {
        if (this.basicAuthInCookie()) {
            document.cookie =
                "username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
    };
    
    basicAuthInCookie = () => {
        return document.cookie.split(";").some((c) => {
            return c.trim().startsWith("username=");
        });
    };
    
    getBasicAuthInCookie = (name) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split(';');
    
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
    
        // Return null if the cookie is not found
        return null;
    }
}

const authService = new AuthService();
export default authService;