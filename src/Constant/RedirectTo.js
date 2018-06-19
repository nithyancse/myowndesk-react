const RedirectTo = {
    LOGIN: "/login",
    SIGNUP: "/signup",
    ADD_NAME:"/addName",
    HOME:"/home",
    LOGOUT:"/logout",
    MENU:"/menu",
    MANAGE_MENU:"/managemenu",
    TOPIC:"/topic",
    TOPIC_LIST:"/topicList",

    AXIOS_LOGIN:"/user/login",
    AXIOS_ADD_NAME:"/user/addName",
    AXIOS_ADD_USER:"/user/addUser",
    AXIOS_FETCH_MENU_LIST:"/menu/fetchMenuList?userId=",
    AXIOS_ADD_MENU:"/menu/addMenu",
    AXIOS_UPDATE_MENU:"/menu/updateMenu",
    AXIOS_DELETE_MENU:"/menu/deleteMenu",
    AXIOS_FETCH_TOPIC_LIST:"/topic/fetchTopicList?menuId=",
};

export default RedirectTo;