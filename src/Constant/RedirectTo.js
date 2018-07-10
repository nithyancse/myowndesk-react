const RedirectTo = {
    MYOWNDESK: "/myowndesk",
    LANDING: "/mod",
    LOGIN: "/login",
    SIGNUP: "/signup",
    ADD_NAME:"/addName",
    HOME:"/home",
    LOGOUT:"/logout",
    MENU_MODAL:"/menuModal",
    MANAGE_MENU:"/managemenu",
    TOPIC:"/topic",
    TOPIC_LIST:"/topicList",
    TOPIC_MODAL:"/topicModal",

    AXIOS_LOGIN:"/oauth/token",
    AXIOS_ADD_NAME:"/user/addName",
    AXIOS_ADD_USER:"/user/addUser",
    AXIOS_FETCH_MENU_LIST:"/menu/fetchMenuList?userId=",
    AXIOS_ADD_MENU:"/menu/addMenu",
    AXIOS_UPDATE_MENU:"/menu/updateMenu",
    AXIOS_DELETE_MENU:"/menu/deleteMenu",
    AXIOS_FETCH_TOPIC_LIST:"/topic/fetchTopicList?menuId=",
    AXIOS_ADD_TOPIC:"/topic/addTopic",
    AXIOS_UPDATE_TOPIC:"/topic/updateTopic",
    AXIOS_DELETE_TOPIC:"/topic/deleteTopic",
};

export default RedirectTo;