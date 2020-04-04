// everything()
let token = localStorage.getItem('access_token') || null;
let show = false;
// checkLogin()
$( document ).ready(function() {
  // $('.main-body, .user').hide();
  checkLogin()

  // REGISTER FUNCTION
  $("#form-register").submit(function( event ) {
    event.preventDefault();
    let name = $('#first_name').val();
    let last_name = $('#last_name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    $.ajax({
      url: 'http://localhost:3000/auth/register',
      method: 'POST',
      data: {
        name,
        email,
        password
      }
    })
    .done(result => {
        localStorage.setItem('access_token', result.access_token)
        token = localStorage.access_token
        checkLogin()
      }
    )
    .fail(err => {
      if(err.responseJSON.errors) {
        let errors = err.responseJSON.errors
        errors.forEach(el => {
          $('#alert').append(`
            <div class="alert alert-primary" role="alert">
              ${el.message}
            </div>
          `)
        })
      }
      if(err.responseJSON.error) {
        $('#alert').append(`<div class="alert alert-primary" role="alert">${err.responseJSON.error}</div>`)
      }
    })
  });

  // test
  let resu;
  $('#download').click(function (e) { 
    e.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/voices',
      method: 'POST',
    })
    .done(result => {
      console.log(result)
      resu = result
    })
  });

  function getData(audioFile, callback) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var data = event.target.result.split(',')
         , decodedImageData = btoa(data[1]);                    // the actual conversion of data from binary to base64 format
        callback(decodedImageData);        
    };
    reader.readAsDataURL(audioFile);
}

// getData(resu, (data) => {
//   $("#source").attr("src", data);
// })
  $("#btn").click(function(){
    alert('yo')
    // const encodedData = window.btoa(resu); // encode a string
    // const decodedData = window.atob(encodedData); 
    getData(resu, (data) => {
      $("#source").attr("src", data);
    })
    
    // var binary= convertDataURIToBinary(data);
    // var blob = new Blob([resu], {type : 'audio/ogg'});
    // var blobUrl = URL.createObjectURL(blob);
    // $('body').append('<br> Blob URL : <a href="'+blobUrl+'" target="_blank">'+blobUrl+'</a><br>');
    // $("#source").attr("src", decodedData);
    // $("#audio")[0].pause();
    // $("#audio")[0].load();//suspends and restores all audio element
    // $("#audio")[0].oncanplaythrough =  $("#audio")[0].play();
  });

  // LOGIN FUNCTION
  $('#form-login').submit(function(e){
    e.preventDefault();
    let email = $('#email2').val();
    let password = $('#password2').val();
    $.ajax({
      url: 'http://localhost:3000/auth/login',
      method: 'POST',
      data: {email, password}
    })
    .done((result) => {
      let {access_token} = result
      localStorage.setItem('access_token', access_token)
      checkLogin();
      $('#alert').empty();
    })
    .fail(err => {
      if(err.responseJSON.errors) {
        let errors = err.responseJSON.errors
        errors.forEach(el => {
          $('#alert').append(`
            <div class="alert alert-primary" role="alert">
              ${el.message}
            </div>
          `)
        })
      }
      if(err.responseJSON.error) {
        $('#alert').append(`<div class="alert alert-primary" role="alert">${err.responseJSON.error}</div>`)
      }
    })
  })

  // LOGOUT FUNCTION
  $('#logout').click(function(e) {
    e.preventDefault();
    localStorage.removeItem('access_token');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {});
    $('#email2').val('');
    $('#password2').val('');
    $('#alert').empty();
    $('#first_name').val('');
    $('#last_name').val('');
    $('#email').val('');
    $('#password').val('');
    checkLogin()
  })

  // datepicker
  $('.datepicker').datepicker();
  $('.timepicker').timepicker();
  
  // SHOW FORM ADD
  $('#show-form-todo').click(function() {
    $('#form-todo').toggle();
    $('#table').toggle();
    $('#title-todo').val('');
    $('#due-date').val('');
    $('#description-todo').val('');
    $('#form-todo button').html('Add').val('');
    $('.timepicker').val('');
    $('#form-todo form').removeClass('edit-todo').addClass('add-todo');
    show = !show
    show ? $('#show-form-todo').html('Back') : $('#show-form-todo').html('Add Todo')
  })
  // SHOW EDIT TODO
  $('#content').on('click', '#edit', function(e) {
    $('#form-todo').toggle();
    $('#table').toggle();
    $('#form-todo form').removeClass('add-todo').addClass('edit-todo');
    $.ajax({
      url: 'http://localhost:3000/todos/' + e.currentTarget.value,
      method: 'GET',
      headers: {
        access_token: token
      }
    })
    .done(result => {
      $('#title-todo').val(result.title);
      $('#due-date').val(moment(result.due_date).format('MM-DD-YYYY'));
      $('#description-todo').val(result.description);
      $('#form-todo button').html('Edit').val(result.id);
      $('.timepicker').val(result.time);
      $('#alert').empty();
      show = !show
      show ? $('#show-form-todo').html('Back') : $('#show-form-todo').html('Add Todo')  
    })
    .fail(err => {
      if(err.responseJSON.errors) {
        let errors = err.responseJSON.errors
        errors.forEach(el => {
          $('#alert').append(`
            <div class="alert alert-primary" role="alert">
              ${el.message}
            </div>
          `)
        })
      }
      if(err.responseJSON.error) {
        $('#alert').append(`<div class="alert alert-primary" role="alert">${err.responseJSON.error}</div>`)
      }
    })
  })

  // ADD FUNCTION
  $('#form-todo').on('submit', '.add-todo', function(e) {
    e.preventDefault();
    ajaxFunction('POST')
    show = !show
    show ? $('#show-form-todo').html('Back') : $('#show-form-todo').html('Add Todo')  
  })
  
  // PUT FUNCTION
  $('#form-todo').on('submit', '.edit-todo', function(e) {
    const id = $('#form-todo button').val();
    e.preventDefault();
    ajaxFunction('PUT', id);
    show = !show
    show ? $('#show-form-todo').html('Back') : $('#show-form-todo').html('Add Todo')  
  })

  // DELETE
  $('#content').on('click', '#delete', function(e) {
    ajaxFunction('DELETE', e.currentTarget.value)
  })
});

function checkLogin() {
  $('.main-body, .user').hide();
  token = localStorage.getItem('access_token') || null;
  show = false;
  $('#alert').empty();
  if (token) {
    loggedIn()
  } else {
    $('#form-user').show();
  }
}

// REFRESH FUNCTION
function loggedIn() {
  $('#list-todo, #logout').show();
  $('#voice').remove();
  $('#content').empty();
  $('#form-todo').hide();
  // $('#form-todo').empty();
  $('#table').show()
  $('#show-form-todo').show()
  $.ajax({
    url: 'http://localhost:3000/todos',
    method: 'GET',
    headers: {
      access_token: token
    }
  })
  .done(result => {
    $('#table').append(`
      <audio controls id="voice">
        <source src="${result.voice}" type="audio/mpeg">
      </audio>
    `);
    result.todo.forEach(el => {
      $('#content').append(
        `
          <tr>
            <th>${el.id}</th>
            <td>${el.title}</td>
            <td>${el.description}</td>
            <td>${moment(el.due_date).format('MMM Do YY, h:mm a')}</td>
            <td>
              <button class="btn btn-warning" value="${el.id}" id="edit">Edit</button>
              <button class="btn btn-danger" value="${el.id}" id="delete">Delete</button>
            </td>
          </tr>
        `
      )
    });
    $('#alert').empty();
  })
  .fail(err => {
    if(err.responseJSON.errors) {
      let errors = err.responseJSON.errors
      errors.forEach(el => {
        $('#alert').append(`
          <div class="alert alert-primary" role="alert">
            ${el.message}
          </div>
        `)
      })
    }
    if(err.responseJSON.error) {
      $('#alert').append(`<div class="alert alert-primary" role="alert">${err.responseJSON.error}</div>`)
    }
  })
}

// AJAX TODOS
function ajaxFunction(type='POST', id=0) {
  let url
  if(type == 'POST') {
    url = 'http://localhost:3000/todos'
  } else {
    url = 'http://localhost:3000/todos/' + id
  }
  let title = $('#title-todo').val();
  let description = $('#description-todo').val();
  let due_date = $('#due-date').val() || new Date(Date.now());
  $.ajax({
    url: url,
    method: type,
    data: {title, description, due_date},
    headers: {
      access_token: token
    }
  })
  .done(result => {
    checkLogin()
    $('#alert').empty();
  })
  .fail(err => {
    if(err.responseJSON.errors) {
      let errors = err.responseJSON.errors
      errors.forEach(el => {
        $('#alert').append(`
          <div class="alert alert-primary" role="alert">
            ${el.message}
          </div>
        `)
      })
    }
    if(err.responseJSON.error) {
      $('#alert').append(`<div class="alert alert-primary" role="alert">${err.responseJSON.error}</div>`)
    }
  })
}

//  GOOGLE FUNCTION
function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: 'http://localhost:3000/auth/google',
    method: 'POST',
    data: {
      id_token
    }
  })
  .done(result => {
    localStorage.setItem('access_token', result.access_token)
    token = localStorage.access_token
    checkLogin()
    $('#alert').empty();
  })
  .fail(err => {
    if(err.responseJSON.errors) {
      let errors = err.responseJSON.errors
      errors.forEach(el => {
        $('#alert').append(`
          <div class="alert alert-primary" role="alert">
            ${el.message}
          </div>
        `)
      })
    }
    if(err.responseJSON.error) {
      $('#alert').append(`<div class="alert alert-primary" role="alert">${err.responseJSON.error}</div>`)
    }
  })
}


// audio
// function working(text) {
//   var url = 'http://localhost:8080/nlc/synthesize';
//   var req = {
//       method: 'POST',
//       url: url,
//       responseType: 'blob',
//       data: {
//           "text": text
//       },
//       headers: {
//           'Content-Type': 'application/json',
//       }
//   }

//   $http(req).then(function(response) {
//       console.log(response);
//       audio.pause();
//       audio.src = URL.createObjectURL(response.data);
//       audio.play();
//   })
// };