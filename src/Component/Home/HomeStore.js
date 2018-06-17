import { computed, observable, action } from "mobx"
import Common from '../../Constant/Common'

export class HomeStore {
  @observable user = {}
  @observable isLoggedIn = false
  @observable registerStatus = Common.EMPTY
  @observable registerStatusColor = Common.EMPTY
  @observable menuList = {}

  @action setUser(user){
    this.user = user;
  }

  @action setMenuList(menuList){
    this.menuList = menuList;
  }
  @action setUserName(name){
    this.user.name = name;
  }

  @action setRegisterStatus(status){
    this.registerStatus = status;
  }

  @action setRegisterStatusColor(color){
    this.registerStatusColor = color;
  }

  @action setIsLoggedIn(loginStatus){
    this.isLoggedIn = loginStatus;
  }

  
}

export default new HomeStore