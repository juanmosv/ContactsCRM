// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

window.onload = function() {
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
          'https://www.google.com/m8/feeds/contacts/default/full?alt=json&v=3.0',
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
	      'emails' : [],
	      'phone': [],
	      'notes': (entry['content'])? entry['content']['$t'] : [],
	      'lead' : (entry['gContact$userDefinedField']['key']['Lead Type'])? entry['gContact$userDefinedField']['key']['Lead Type'] : [],	    
	    };
                  if (entry['gd$email']) {
	      var emails = entry['gd$email'];
	      for (var j = 0, email; email = emails[j]; j++) {
	        contact['emails'].push(email['address']);
	      }
	    }
	   
	          if (entry['gd$phoneNumber']) {
	      var phone = entry['gd$phoneNumber'];
	      for (var j = 0, number; number = phone[j]; j++) {
	        contact['phone'].push(number['$t']);
	      }
	    }
				  
	    if (!contact['name']) {
	      contact['name'] = " ";
	    }
	    contacts.push(contact);
   
       //Add divs contacts info
          var output = document.getElementById('container');
	
	  for (var j = 0, email; email = contact['emails'][j]; j++) {
	var div = document.createElement("div");

div.innerHTML =
    '<form id="form-'+ contact['id'] +'" class="pure-form-stacked toggle-disabled" onsubmit="handleFormSubmit(this)">\n'+
     '<fieldset class="contactsborder">\n'+
            '<label for="id"></label>\n'+
            '<input name="id" class="uk-input uk-hidden" type="text" value="'+ contact['id'] +'">\n'+
            '<label for="handler"></label>\n'+
            '<input name="handler" class="uk-input uk-hidden" type="text" value="updateContact">\n'+
            '<table>\n'+
            '<tr style="float:left; width:48%;">\n'+
            '<td><label for="Lead Type">Lead Type</label>\n'+
            '<select name="Lead Type" id="leadtype" disabled>\n'+
             '<option>'+ contact['lead'] + '</option>\n'+
             '<option>Call</option>\n'+
             '<option>Cold Call</option>\n'+
             '<option>Walk-in</option>\n'+
             '<option>Internet</option>\n'+
             '<option>Archive</option>\n'+
             '</select>\n'+
             '</td></tr>\n'+
             '<tr style="float:right; width:50%;">\n'+
              '<td> <label for="First Contact">First Contact</label>\n'+
               '<input name="First Contact" class="uk-form-width-small" type="date" value="<?= data[i][10] ?>" disabled>\n'+
              '</td>\n'+
              '<td><label for="Last Contact">Last Contact</label>\n'+     
              '<input name="Last Contact" class="uk-form-width-small" type="date" value="<?= data[i][11] ?>" disabled>\n'+
             '</td>\n'+
             '<td><label for="Next Contact">Next Contact</label>\n'+  
             '<input name="Next Contact" class="uk-form-width-small" type="date" value="<?= data[i][12] ?>" disabled>\n'+
             '</td>\n'+
           '</tr>\n'+
          '</table>\n'+
          '<table>\n'+ 
         '<tr style="margin-top: 25px">\n'+
         '<td> <label for="Name">Name</label>\n'+
         '<input name="Name" id="name" class="uk-form-width-medium" type="text" value="' + contact['name'] + '" disabled>\n'+
         '</td><td><label for="Phone">Phone</label>\n'+   
         '<input name="Phone" class="uk-form-width-small" type="text" value="' + contact['phone']+ '" disabled>\n'+
         '</td><td><label for="Email">Email</label>\n'+  
         '<input name="Email" id="Email" class="uk-form-width-medium" type="email" value="' + contact['emails']+ '" disabled>\n'+
         '</td>\n'+
         '</tr>\n'+
         '</table>\n'+
         '<div style="float:left; width:80%;">\n'+
          '<label for="Notes">Notes</label>\n'+
          '<textarea name="Notes" class="uk-textarea" id="ctextarea" rows="3" placeholder="" disabled>' + contact['notes'] + '</textarea>\n'+
          '<tr><td><button type="submit" id="save-<?= data[i][8][1] ?>" class="uk-button pure-button" style="display:none; height:30px; width: 85px; margin:2px;">Save</button></td></tr>\n'+
          '<tr><td><button type="reset" id="cancel-<?= data[i][8][1] ?>" onclick="resetContact(<?= data[i][8][1] ?>)" class="uk-button pure-button" style="display:none; height:30px; width: 85px; margin:2px;">Cancel</button></td></tr>\n'+
         '</div>\n'+
       '<div class="buttonborder">\n'+
       '<table style="float: right;">\n'+
       '<tr><td><button type="button" id="edit"   onclick="editContact(<?= data[i][8][1] ?>)"class="uk-button-primary pure-button" style="height:30px; width: 85px; margin:2px;">Edit</button></td></tr>\n'+
       '<tr><td><button type="button" id="remove" onclick="removeContact(<?= data[i][8][1] ?>)" class="uk-button-war pure-button" style="height:30px; width: 85px; margin:2px;">Remove</button></td></tr>\n'+
       '<tr><td><button type="button" id="delete" onclick="deleteContact(<?= data[i][8][1] ?>)" class="uk-button-danger pure-button" style="height:30px; width: 85px; margin:2px;">Delete</button></td></tr>\n'+
       '</table>\n'+
      '</div>\n'+
      '</fieldset>\n'+
      '</form> \n';
	  }
	  output.appendChild(div);             
                
                  
       }
      
          });
    });
};
