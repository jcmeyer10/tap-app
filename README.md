# tap-app

$(document).ready(function(){
  var form2object = function(form) {
    $(form).find('input').each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };

  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    on_tap_api.register(credentials, callback);
    e.preventDefault();
  });

  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      $('.token').val(data.user.token);
      $('.id').val(data.user.id);
    };
    e.preventDefault();
    on_tap_api.login(credentials, cb);
  });

  $('.logout').on('click', function(e){
    var token = $('.token').val();
    var id = $('.id').val();
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
    }
    on_tap_api.logout(token, id, cb)
  });

});



curl --request PATCH --header "Authorization: Token token=b7c7a672a33732b6816d4f66285be330" --header "Content-Type: application/json" -d '{   "beer": {      "brewery":"Victory Is Mine"   } }'  http://localhost:3000/beers/1
