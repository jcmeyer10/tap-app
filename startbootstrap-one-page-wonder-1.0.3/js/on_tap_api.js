'use strict';
var on_tap_api = {
  url: 'http://localhost:3000',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/register',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
    console.log("success")
  },
}

//   // Do this when the page loads
//   console.log('page loaded');

// var on_tap =
//   $('#register').('submit', (function(event) {
//    $.ajax({
//       method: 'GET',
//       url: 'http://localhost:3000/register'
//       contentType: 'application/json; charset=utf-8',
//       data: JSON.stringify(credentials),
//       dataType: 'json'
//     }, callback);
//   });

//   $('#login').on('submit', function(event){

//     $.ajax({
//       method: 'GET',
//       url: 'http://localhost:3000/login'
//       contentType: 'application/json; charset=utf-8',
//       data: JSON.stringify(credentials),
//       dataType: 'json'
//     }, callback);

//   });

  $('imaginary_container').on('submit', function(event){
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/locations',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
    })
//   });
