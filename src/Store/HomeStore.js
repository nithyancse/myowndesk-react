import { computed, observable, action } from "mobx"
import Messages from '../Constant/Messages'

export class HomeStore {
  @observable user = {}
  @observable isLoggedIn = false
  @observable registerStatus = Messages.EMPTY
  @observable registerStatusColor = Messages.EMPTY
  @observable responseStatus = Messages.EMPTY
  @observable responseColor = Messages.EMPTY
  @observable responseClass = Messages.EMPTY

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

  @action setResponseClass(color){
    this.responseClass = color;
  }
}

export default new HomeStore