import { computed, observable, action } from "mobx"
import Common from '../Constant/Common'

export class TopicStore {
    @observable topicList = []
    @observable topicId = 0
    @observable topicTitle = Common.EMPTY
    @observable topicObject = {}
    @observable topicObjectForEdit = {}

    @action setTopicList(topicList) {
        this.topicList = topicList;
    }

    @action setTopicId(topicId) {
        this.topicId = topicId;
    }

    @action setTopicTitle(topicTitle) {
        this.topicTitle = topicTitle;
    }

    @action setPrevPathForTopic(path) {
        this.prevPathForTopic = path;
    }

    @action setTopicObject(topicObject) {
        this.topicObject = topicObject;
    }

    @action setTopicObjectForEdit(topicObject) {
        this.topicObjectForEdit = topicObject;
    }

}

export default new TopicStore