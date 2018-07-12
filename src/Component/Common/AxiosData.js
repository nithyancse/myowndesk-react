import axios from 'axios';
import Messages from '../../Constant/Messages'

export function setAuthorizationToken() {
    let token = sessionStorage.getItem(Messages.SESSION_ACCESS_TOKEN);
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + token
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}