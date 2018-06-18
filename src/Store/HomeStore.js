import { computed, observable, action } from "mobx"
import Common from '../Constant/Common'

export class HomeStore {
  @observable user = {}
  @observable isLoggedIn = false
  @observable registerStatus = Common.EMPTY
  @observable registerStatusColor = Common.EMPTY
  @observable responseStatus = Common.EMPTY
  @observable responseColor = Common.EMPTY

  @action setUser(user){
    this.user = user;
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

  @action setResponseStatus(status){
    this.responseStatus = status;
  }

  @action setResponseColor(color){
    this.responseColor = color;
  }
}

export default new HomeStore