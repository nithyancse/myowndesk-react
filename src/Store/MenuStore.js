import { computed, observable, action } from "mobx"
import Common from '../Constant/Common'

export class MenuStore {
  @observable menuList = []
  @observable menuId = 0
  @observable menuName = Common.EMPTY
  @observable menuObject = {}

  @action setMenuList(menuList){
    this.menuList = menuList;
  }

  @action setMenuId(menuId){
    this.menuId = menuId;
  }

  @action setMenuName(menuName){
    this.menuName = menuName;
  }

   @action setPrevPathForMenu(path){
    this.prevPathForMenu = path;
  }

  @action setMenuObject(menuObject){
    this.menuObject = menuObject;
  }

}

export default new MenuStore