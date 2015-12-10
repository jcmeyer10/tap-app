$(document).ready(function() {
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
          on_tap_api.get_beers;
          $('#login').each(function(){
            this.reset();
          });

        };
        e.preventDefault();
        on_tap_api.login(credentials, cb);
        $('#login').hide();
        $('#register').hide();
        on_tap_api.get_beers;
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
      });

      $('#add-beer').on('submit', function(e) {
        e.preventDefault();
        var token = $('.token').val();
        var new_beer = wrap('beer', form2object(this));
        on_tap_api.new_beer(token, new_beer, function(err, beerData) {
          if (err) {
            return;
          } else {
            $('.beer-list').show();
            $('#add-beer').each(function(){
            this.reset();
            $.each(beerData, function(index, element) {
            $('.beer-list').append("<li> Beer: " + element.name + '   ' + "Brewery: " + element.brewery + '         ' + "Style: " + element.style + '         ' + "ID: " + element.id + "</li>");
          });
            console.log(beerData);
        });
        }
      });
    });

      // TODO: Create a function that can changes beer
      //       beer values

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
            console.log(data);
          // $.each(beerData, function(index, element) {
          //   $('.beer-list').append("<li> Beer: " + element.name + '   ' + "Brewery: " + element.brewery + '         ' + "Style: " + element.style + '         ' + "ID: " + element.id + "</li>");
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
        console.log(data);
        on_tap_api.get_beers(token, function(err, data) {
          if (err) {
            console.log(err);
            return;
          } else {
            $.each(data.beers, function(index, element) {
              $('.beer-list').append("<li> Beer: " + element.name + '   ' + "Brewery: " + element.brewery + '         ' + "Style: " + element.style + '         ' + "ID: " + element.id + "</li>");
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
        // $('#delete-beer').each(function(){
        //   this.reset();
        // });
        // $.each(beerid, function(index, element) {
        //   $('#beer-list').remove(element.name);
        // });
      }
    });
  });

}); // End of Document Ready

