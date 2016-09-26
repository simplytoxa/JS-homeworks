'use strict';

let Model = require('./model'),
    View  = require('./view');


module.exports = {
  musicRoute: function() {
    return Model.getMusic().then(function(music) {
      results.innerHTML = View.render('music', {list: music.items});
    });
  },
  friendsRoute: function() {
    return Model.getFriends().then(function(friends) {
      results.innerHTML = View.render('friends', {list: friends.items});
    });
  },
  newsRoute: function() {
    return Model.getNews().then(function(news) {
      results.innerHTML = View.render('news', {list: news.items});
    });
  },
  groupsRoute: function() {
    return Model.getGroups().then(function(groups) {
      results.innerHTML = View.render('groups', {list: groups.items});
    });
  },
  photosRoute: function() {
    Model.getPhotos().then(function(photos) {
      let code,
          arr = [],
          titles= [],
          commentBlocks,
          albums = {};

      Model.getAlbums().then(albs => {
        // Sorting photos to albums
        albs.items.forEach(alb => {
          photos.items.forEach(el => {
            el.album_id === alb.id && arr.push(el);
          });

          if (alb.id !== -15) {
            albums[`${alb.title}`] = arr;
            titles.push(alb.title);
          }

          arr = [];
        });

        albums.titles = titles;

        photos.albums = albums;

        return photos;
      }).then(photos => {
        let albumTitle,
            div = '';

        arr = [];

        // Rendering photos
        for (let alb in photos.albums) {
          if (photos.albums[alb].length > 0 && alb !== 'titles') {
            div += View.render('photos', {list: photos.albums[alb]});
          }

          alb !== 'titles' && photos.albums[alb].forEach(el => arr.push(el.id));
        }
        results.innerHTML = div;

        albumTitle = document.querySelectorAll('[data-role="album-title"]');

        for (let i = 0; i < albumTitle.length; i++) {
          albumTitle[i].innerHTML = albums.titles[i];
        }

        code = 'var result = []; var x; var i = 0; var photos = [' + arr + '];'
          + 'while(i < ' + photos.items.length + ') {'
          + 'x = API.photos.getComments({"extended": "1", "photo_id": photos[i], "v": "5.53"});'
          + 'result.push(x);'
          + 'i = i + 1;'
          + '};'
          + 'return result;';

        // Getting comments for photos
        Model.execute(code).then(data => {
          commentBlocks = document.querySelectorAll('[data-role="comments"]');

          data.forEach(el => {
            el.items.forEach(comment => {
              el.profiles.forEach(i => {
                if (i.id === comment.from_id) {
                  comment.userName = `${i.first_name} ${i.last_name}`;
                  comment.userPhoto = i.photo_50;
                }
              });
            });
          });

          div = '';
          for (let blockIdx in commentBlocks) {
            data.forEach((el, idx) => {
              if (blockIdx == idx) {
                if (el.items.length > 0) {
                  div = `Comments count: <span>${el.items.length}</span><br>`;
                  div += View.render('comments', {comments: el.items});

                  commentBlocks[blockIdx].innerHTML = div;
                } else {
                  commentBlocks[blockIdx].innerHTML = 'К этому фото нет комментариев.';
                }
              }
            });
          }
        });
      });
    });
  },

  sort: function (e) {
    let parent = e.target.parentNode,
        photoBlock = parent.nextElementSibling,
        photos = photoBlock.children,
        result,
        arr = [],
        display = arr => {
          arr.forEach(likeCount => {
            for (let el of photos) {
              if (el.querySelector('[data-role="likes"]').firstElementChild.innerText === likeCount) {
                photoBlock.appendChild(el);
              }
            }
          });
        };

    switch (e.target.value) {
      case 'likesValue':
        for (let el of photos) {
          result = el.querySelector('[data-role="likes"]').firstElementChild.innerText;
          arr.push(result);
        }

        arr.sort((a, b) => {
          return b - a;
        });

        display(arr);

        break;
      case 'repostsValue':
        for (let el of photos) {
          result = el.querySelector('[data-role="reposts"]').firstElementChild.innerText;
          arr.push(result);
        }

        arr.sort((a, b) => {
          return b - a;
        });

        display(arr);

        break;
      case 'commentsValue':
        for (let el of photos) {
          if (el.querySelector('[data-role="comments"]').firstElementChild) {
            result = el.querySelector('[data-role="comments"]').firstElementChild.innerText;
          } else {
            result = 0;
          }
          arr.push(result);
        }

        arr.sort((a, b) => {
          return b - a;
        });

        display(arr);

        break;
    }
  }
};
