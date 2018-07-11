import axios from 'axios';
import Messages from '../../Constant/Messages'

export function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function getAuthorizationToken() {
    let tokenStr = sessionStorage.getItem(Messages.ACCESS_TOKEN);
    let obj = ({
        headers: {
            "Authorization": "Bearer " + tokenStr
        }
    })
    return obj;
}