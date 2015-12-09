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
    console.log("success");
  },

  get_beers: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/beers',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8'
    }, callback);
  },

  new_beer: function (token, new_beer, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/beers',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(new_beer),
      dataType: 'json'

    }, callback);
  },

  change_beer: function (token, beer_id, change_beer, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/beers' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(change_beer),
      dataType: 'json'

    }, callback);
  },

  delete_beer: function (token, beer_id, delete_beer, callback) {
    this.ajax({
    method: 'DELETE',
      url: this.url + '/beers/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      // data: JSON.stringify(delete_beer),
      dataType: 'json'

    }, callback);
  }
};
