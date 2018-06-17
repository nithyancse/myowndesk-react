export function isValidEmailId(emailId) {
    let emailRejex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRejex.test(emailId)) {
        return (true)
    }
    return (false)
}