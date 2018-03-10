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
          'https://www.google.com/m8/feeds/contacts/default/full?alt=json',
          init)
          .then((response) => response.json())
          .then(function(data) {
            let photoDiv = document.querySelector('#friendDiv');
            var contacts = [];
	          var data = data;
            	  for (var i = 0, entry; entry = data.feed.entry[i]; i++) {
	    var contact = {
	      'name' : entry['title']['$t'],
	      'id' : entry['id']['$t'],
	      'emails' : []
	    };
                  if (entry['gd$email']) {
	      var emails = entry['gd$email'];
	      for (var j = 0, email; email = emails[j]; j++) {
	        contact['emails'].push(email['address']);
	      }
	    }
	
	    if (!contact['name']) {
	      contact['name'] = contact['emails'][0] || "<Unknown>";
	    }
	    contacts.push(contact);
   
       //Add divs contacts info
    var output = document.getElementById('friendDiv');
	  var div = document.createElement('div');
	  var pName = document.createElement('p');
	  var ulEmails = document.createElement('ul');
	
	  pName.innerText = contact['name'];
	  div.appendChild(pName);
	
	  for (var j = 0, email; email = contact['emails'][j]; j++) {
	    var liEmail = document.createElement('li');
	    liEmail.innerText = email;
	    ulEmails.appendChild(liEmail);
	  }
	
	  div.appendChild(ulEmails);
	  output.appendChild(div);             
                
                  
       }
      
          });
    });
  });
};
