var authCreds = {
  token: null,
  id: null,
  email: null
};

$(document).ready(function() {

  var beerIndexTemplate = Handlebars.compile($('#beer-index').html());

  $('#add-beer').hide();
  $('#change-beer').hide();
  $('#get-beer').hide();
  $('#delete-beer').hide();

  var form2object = function(form) {
    var data = {};
    $(form).find('input').each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !=='hidden') {
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
      $('#result').val('status: ' + error.status + ', error: ' + error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('#register').on('submit', function(e) {
    e.preventDefault();
    var credentials = wrap('credentials', form2object(this));
    on_tap_api.register(credentials, callback);
    $('#register').hide();
  });

  $('#login').on('submit', function(e) {
    e.preventDefault();
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      } else {
      callback(null, data);
      authCreds.email = data.user.email;
      authCreds.token = data.user.token;
      authCreds.id = data.user.id;
      console.log(data);
      getBeerCb();
    }
    e.preventDefault();

    $('#login').hide();
    $('#register').hide();
    $('#change-beer').show();
    $('#get-beer').show();
    $('#delete-beer').show();
    $('#add-beer').show();
    $('#beers').show();
  };
  on_tap_api.login(credentials, cb);
});

  $('.logout').on('click', function(e) {
    var token = authCreds.token;
    var id = authCreds.id;
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      } else {
    $('#login').show();
    $('#register').show();
    $('#add-beer').hide();
    $('#change-beer').hide();
    $('#get-beer').hide();
    $('#delete-beer').hide();
    $('#beers').hide();
  }
};
   on_tap_api.logout(token, id, cb);
});


  $('#add-beer').on('submit', function(e) {
    e.preventDefault();
    var token = authCreds.token;
    var id = authCreds.id;
    var new_beer = wrap('beer', form2object(this));
    on_tap_api.new_beer(token, new_beer, function(err, beerData) {
      if (err) {
        return;
      } else {
        console.log(new_beer);
        getBeerCb();
        }
      });
    });

  // Allows user to delete beers

  $("#beers").on('click', "button[data-type=delete]", function(e) {
    e.preventDefault();
    var token = authCreds.token;
    var beerid = $(this).data("id");
    console.log(beerid);
    on_tap_api.delete_beer(token, beerid, function(err, data) {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log(data);
        getBeerCb();
    }
  });
  });

// allows users to bring up editable fields
  $('#beers').on("click", 'button[data-type="edit"]', function(e) {
    e.preventDefault();
    var token = authCreds.token;
    var beerd = $(this).data("id");

    $(e.target).parent().parent().children().children(".beerstatic").hide();
    $(e.target).parent().parent().children().children(".beeredit").show();
  });


// allows user to commit new or change values
  $("#beers").on('click', 'button[data-type="commit"]', function(e) {
    e.preventDefault();
    var token = authCreds.token;
    var beerid = $(this).data("id");

    var diff_beer = {
      beer: {
      name: $('[data-field=name][data-id='+ beerid +']').val(),
      brewery: $('[data-field=brewery][data-id='+ beerid +']').val(),
      style: $('[data-field=style][data-id='+ beerid +']').val(),
      quantity: $('[data-field=quantity][data-id='+ beerid +']').val()
    }
  };

  on_tap_api.change_beer(token, beerid, diff_beer, function(err, data) {
      if (err) {
        console.error(err);
        return;
      } else {
        getBeerCb();
      }
    });

});

// a little helper so that the new list is automatically brought up after any interaction

  var getBeerCb = function (){
    $('#beers').html('');
    var token = authCreds.token;
    var id = authCreds.id;
    on_tap_api.get_beers(token, function(err, data) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(data);
        $('#beers').show();
        var template = Handlebars.compile($("#beer-index").html());
          var newHTML = beerIndexTemplate({beers: data.beers});
        $('#beers').html(newHTML);
      }
    });
  };

}); // End of Document Ready

