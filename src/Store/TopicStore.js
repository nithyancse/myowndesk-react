import { computed, observable, action } from "mobx"
import Messages from '../Constant/Messages'

export class TopicStore {
    @observable topicList = []
    @observable topicId = 0
    @observable topicTitle = Messages.EMPTY
    @observable topicObject = {}
    @observable topicObjectForEdit = {}
    @observable prevTopicId = 0
    @observable nextTopicId = 0
    @observable isFromTopicPage = false

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

    @action setPrevTopicId(prevTopicId) {
        this.prevTopicId = prevTopicId;
    }

    @action setNextTopicId(nextTopicId) {
        this.nextTopicId = nextTopicId;
    }

    @action setIsFromTopicPage(isFromTopicPage) {
        this.isFromTopicPage = isFromTopicPage;
    }

}

export default new TopicStore