$(document).ready(function() {

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
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      $('.token').val(data.user.token);
      $('.id').val(data.user.id);
      $('#beers').show();
      console.log(data.user.token);
    };
    e.preventDefault();
    on_tap_api.login(credentials, cb);
    $('#login').hide();
    $('#register').hide();
    $('#change-beer').show();
    $('#get-beer').show();
    $('#delete-beer').show();
    $('#add-beer').show();
  });

  $('.logout').on('click', function(e) {
    var token = $('.token').val();
    var id = $('.id').val();
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
    };
    on_tap_api.logout(token, id, cb);
    $('#login').show();
    $('#register').show();
    $('#add-beer').hide();
    $('#change-beer').hide();
    $('#get-beer').hide();
    $('#delete-beer').hide();
    $('.beer-list').hide();
  });

  $('#add-beer').on('submit', function(e) {
    e.preventDefault();
    var token = $('.token').val();
    var new_beer = wrap('beer', form2object(this));
    on_tap_api.new_beer(token, new_beer, function(err, beerData) {
      if (err) {
        return;
      } else {
        console.log(new_beer);
        $('#add-beer').each(function(){
          this.reset();
          $.each(beerData, function(index, element) {
            $('.beer-list').append("<li> Beer: " + element.name + '   ' + "Brewery: " + element.brewery + '         ' + "Style: " + ' ' + element.style + ' ' + "Quantity: " + element.quantity + '         ' + "ID: " + element.id + "</li>");
            $('.beer-list').show();
          });
        });
      }
    });
  });

  $('#change-beer').on('submit', function(e) {
    e.preventDefault();
    var token = $('.token').val();
    var beerid = $('#change-beer > input[name="beer-id"]').val();
    var change_beer = wrap('beer', form2object(this));
    on_tap_api.change_beer(token, beerid, change_beer, function(err, data) {
      if (err) {
        console.error(err);
        return;
      } else {
        $('.beer-list').html("You've Successfully Updated Beer, " + beerid + "Please Press Get Beer List To See Updated Results!");

        // console.log(data);
        // $.each(data.beers, function(index, element) {
        //   $('.beer-list').prepend("<li> Beer: " + element.name + '   ' + "Brewery: " + element.brewery + '         ' + "Style: " + element.style + ' ' + element.quantity + '         ' + "ID: " + element.id + "</li>");
        // });
      }
    });
  });

      // TODO: Create function that changes location values

  $("#get-beer").on('click', function(e) {
    e.preventDefault();
    $('.beer-list').html('');
    var token = $('.token').val();
    var data = [];
    on_tap_api.get_beers(token, function(err, data) {
      if (err) {
        console.log(err);
        return;
      } else {
        $('#beers').show();
        $.each(data.beers, function(index, element) {
          $('.beer-list').append("<li> Beer: " + element.name + '   ' + "Brewery: " + element.brewery + '         ' + "Style: " + ' ' + element.style + ' ' + "Quantity: " + element.quantity +'         ' + "ID: " + element.id + "</li>");
          console.log(element);
          // console.log("Get data: " + data);
        });
      }
    });
  });

  $("#delete-beer").on('submit', function(e) {
    e.preventDefault();
    var token = $('.token').val();
    var beerid = $('#delete-beer > input[name="beer-id"]').val();
    console.log(beerid);
    on_tap_api.delete_beer(token, beerid, function(err, data) {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log(data);
    $('#delete-beer').each(function(){
      this.reset();
    });
    $('.beer-list').html("You've Successfully Deleted Beer " + beerid + ", Please Press Get Beer List To See Updated Results!");
      }
    });
  });

}); // End of Document Ready

