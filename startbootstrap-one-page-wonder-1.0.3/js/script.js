$(document).ready(function(){
  var form2object = function(form) {
    var data = {};
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

  $.ajax

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
      console.log(data.user.token);

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


  //  TODO: Create function to show a list of locations with
  //        the beers that are attached to them via taps on
  //        load


  //  TODO: Create a function that submits a new location to
  //        backend when submit button is clicked
    $('#add-loc').on('submit', function(e) {
      e.preventDefault();
      var token = $('.token').val();
      var new_location = wrap('location', form2object(this));
      on_tap_api.new_location(token, new_location, function(err, locData) {
        if(err) {
          // do something with the error
          return;
        } else{
          console.log(locData);
        }
      });
   });

   //  TODO: Create a function that submits a new location to
  //        backend when submit button is clicked

    $('#add-beer').on('submit', function(e) {
      e.preventDefault();
      var token = $('.token').val();
      var new_beer = wrap('beer', form2object(this));
      on_tap_api.new_beer(token, new_beer, function(err, beerData) {
        if(err) {
          // do something with the error
          return;
        } else{
          console.log(beerData);
        }
      });
    });

    // TODO: Create a function that can changes beer
    //       beer values

    $('#change-beer').on('submit', function(e) {
      e.preventDefault();
      var beer_id = beerID();
      var token = $('.token').val();
      var change_beer = wrap('beer', form2object(this));
      on_tap_api.change_beer(token, beer_id, change_beer, function(err, beerData) {
        if(err) {
          // do something with the error
          return;
        } else{
          console.log(beerData);
        }
      });
    });

    // TODO: Create function that changes location values

    $('#change-loc').on('submit', function(e) {
      e.preventDefault();
      var beerID = beerID();
      var token = $('.token').val();
      var change_loc = wrap('location', form2object(this));
      on_tap_api.change_loc(token, location_id, change_loc, function(err, locData) {
        if(err) {
          // do something with the error
          return;
        } else{
          console.log(locData);
        }
      });
    });

    $("#create-taps").on('submit', function(e) {
      e.preventDefault();
      var token = $('.token').val();
      var data = [];
      on_tap_api.get_beers(token, function(err, data) {
        if (err) {
          console.log(err);
          return;
        } else {
          $.each(data.beers, function(index, element){
            $('#beer-list').append(element.name);
        })
      }
      var selectLocations = on_tap_api.get_locations(token, function(err, data) {
        if (err) {
          console.log(err);
          return;
        } else {
          // create location options for beer select (in html)
          console.log("get_locations returned ", data);
          $.each(data.locations, function(index, element){
            $('#beer-list').append(element.name);
          })
        }
      });
    });
  });
});

  // TODO: create event handler that creates tap (which will
  //       be the submit handler for the form), that takes
  //       beer_id and location_id that are selected and
  //       creates tap in back end

