  var on_tap_api = {
    url: 'http://localhost:3000',

  ajax: function (config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/register',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
    console.log("success")
  },

  login: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
      console.log("success")
    },


  logout: function (token, id, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/logout/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json',
      dataType: 'json'
    }, callback);
      console.log("success")
  },

  beers: function (token, id, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/beers',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }, callback);
  }
};

  //   $('imaginary_container').on('submit', function(event){
  //   $.ajax({
  //     method: 'POST',
  //     url: 'http://localhost:3000/beers',
  //     contentType: 'application/json; charset=utf-8',
  //     data: JSON.stringify(location),
  //     dataType: 'json'
  //   }, callback);
  // })
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

  //     });
  // });
