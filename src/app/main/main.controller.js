(function() {
  'use strict';

  angular
    .module('trump')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, ModalService, Facebook) {

    var vm = this;

    $log.debug('Main');

    vm.share = function() {

      var data = document.getElementById('the-don').toDataURL("image/png");

      try {
          var blob = dataURItoBlob(data);
      } catch (e) {
          console.log(e);
      }

      Facebook.getLoginStatus(function (response) {
          console.log(response);
          if (response.status === "connected") {
              postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
          } else if (response.status === "not_authorized") {
              Facebook.login(function (response) {
                  postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
              }, {scope: "publish_actions"});
          } else {
              Facebook.login(function (response) {
                  postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
              }, {scope: "publish_actions"});
          }
      });

    }

    function dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], {type: 'image/png'});
    }

    function postImageToFacebook(token, filename, mimeType, imageData, message) {

        var fd = new FormData();
        fd.append("access_token", token);
        fd.append("source", imageData);
        fd.append("no_story", true);

        // Upload image to facebook without story(post to feed)
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + token,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success: ", data);

                // Get image source url
                Facebook.api(
                    "/" + data.id + "?fields=images",
                    function (response) {
                        if (response && !response.error) {
                            //console.log(response.images[0].source);

                            // Create facebook post using image
                            Facebook.api(
                                "/me/feed",
                                "POST",
                                {
                                    "message": "",
                                    "picture": response.images[0].source,
                                    "link": window.location.href,
                                    "name": 'Trumpsformation',
                                    "description": message,
                                    "privacy": {
                                        value: 'SELF'
                                    }
                                },
                                function (response) {
                                    if (response && !response.error) {
                                        /* handle the result */
                                        console.log("Posted story to facebook");
                                        console.log(response);
                                    }
                                }
                            );
                        }
                    }
                );
            },
            error: function (shr, status, data) {
                console.log("error " + data + " Status " + shr.status);
            },
            complete: function (data) {
                //console.log('Post to facebook Complete');
            }
        });
    }

    vm.showHairModal = function() {

      ModalService.showModal({
        templateUrl: 'app/hairModal/hairModal.html',
        controller: 'HairModalController'
      }).then(function(modal) {

        modal.close.then(function() {
          //$log.debug('modal promise');
        });
      });

    };

    vm.showDrawModal = function() {

      ModalService.showModal({
        templateUrl: 'templates/draw.html',
        controller: 'DrawController'
      }).then(function(modal) {
        modal.close.then(function() {

        });
      });

    };

  }
})();
