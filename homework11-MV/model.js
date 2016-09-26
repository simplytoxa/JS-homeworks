'use strict';

module.exports = {
  login(appId, perms) {
    return new Promise(function(resolve, reject) {
      VK.init({
        apiId: appId
      });

      VK.Auth.login(function(response) {
        if (response.session) {
          resolve(response);
        }else {
          reject(new Error('Не удалось авторизоваться'));
        }
      }, perms);
    });
  },
  callApi(method, params) {
    return new Promise(function(resolve, reject) {
      VK.api(method, params, function(response) {
        if (response.error) {
          reject(new Error(response.error.error_msg));
        }else {
          resolve(response.response);
        }
      });
    });
  },
  getUser(userId) {
    if (!userId) {
      return this.callApi('users.get', {v: '5.53'});
    } else {
      return this.callApi('users.get', {user_ids: userId, fields: 'photo_50', v: '5.53'});
    }
  },
  getMusic() {
    return this.callApi('audio.get', {v: '5.53'});
  },
  getFriends() {
    return this.callApi('friends.get', {fields: 'photo_100', v: '5.53'});
  },
  getNews() {
    return this.callApi('newsfeed.get', {filters: 'post', count: 20, v: '5.53'});
  },
  getGroups() {
    return this.callApi('groups.get', {filter: 'groups', extended: '1', fields: 'photo_100, name', v: '5.53'});
  },
  getPhotos() {
    return this.callApi('photos.getAll', {extended: '1', v: '5.53'});
  },
  getAlbums() {
    return this.callApi('photos.getAlbums', {need_system: '1', v: '5.53'});
  },
  execute(code) {
    return this.callApi('execute', {code: code});
  }
};
