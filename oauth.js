// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      var init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
      fetch(
          'https://www.google.com/m8/feeds/contacts/default/full',
          init)
          .then((response) => response.json())
          .then(function(data) {
            let photoDiv = document.querySelector('#friendDiv');
            let returnedContacts = data.memberResourceNames;
            for (var i = 0; i < returnedContacts.length; i++) {
              fetch(
                  'https://www.google.com/m8/feeds/' + returnedContacts[i] +
                      '?personFields=photos&key=AIzaSyDbrFE2K4TVC-VlcIoY--X-o-4po2Ei72w',
                  init)
                  .then((response) => response.json())
                  .then(function(data) {
                    let profileImg = document.createElement('img');
                    profileImg.src = data.photos[0].url;
                    photoDiv.appendChild(profileImg);
                  });
            };
          });
    });
  });
};
