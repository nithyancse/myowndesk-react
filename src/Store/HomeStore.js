import { computed, observable, action } from "mobx"
import Messages from '../Constant/Messages'

export class HomeStore {
  @observable user = {}
  @observable isRefresh = false
  @observable isActive = false
  @observable registerStatus = Messages.EMPTY
  @observable registerStatusColor = Messages.EMPTY
  @observable responseStatus = Messages.EMPTY
  @observable responseColor = Messages.EMPTY
  @observable responseClass = Messages.EMPTY
  @observable windowWidth = Messages.EMPTY
  @observable windowHeight = Messages.EMPTY
  @observable headerWidth = Messages.EMPTY
  @observable headerHeight = Messages.EMPTY
  @observable footerWidth = Messages.EMPTY
  @observable footerHeight = Messages.EMPTY
  @observable minHeight = Messages.EMPTY
  @observable mainMinHeight = Messages.EMPTY

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

  @action setIsRefresh(isRefresh){
    this.isRefresh = isRefresh;
  }

  @action setIsActive(loginStatus){
    this.isActive = loginStatus;
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

  @action setWindowWidth(width){
    this.windowWidth = width;
  }

  @action setWindowHeight(height){
    this.windowHeight = height;
  }

  @action setHeaderWidth(width){
    this.headerWidth = width;
  }

  @action setHeaderHeight(height){
    this.headerHeight = height;
  }

  @action setFooterWidth(width){
    this.footerWidth = width;
  }

  @action setFooterHeight(height){
    this.footerHeight = height;
  }

  @action setMinHeight(height){
    this.minHeight = height;
  }

  @action setMainMinHeight(height){
    this.mainMinHeight = height;
  }
}

export default new HomeStore