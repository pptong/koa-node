export default class CurrentUser {
    public static getCurrentUser(): Record<string, any> {
        const getNamespace = require('cls-hooked').getNamespace;
        const session = getNamespace('my_session');
        const currentUser = JSON.parse(session.get("current_user"));
        console.log(currentUser)
        return currentUser.user;
    }
}