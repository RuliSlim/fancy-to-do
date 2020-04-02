// everything()
let token = localStorage.getItem('access_token') || null;
let show = false;

checkLogin()
// $( function() {
//   $( "#datepicker" ).datepicker();
// } );
// $( document ).ready(function() {
//   $('.main-body, .user').hide();
//   checkLogin()
// });

function checkLogin() {
  $('.main-body, .user').hide();
  token = localStorage.getItem('access_token') || null;
  show = false;
  if (token) {
    loggedIn()
  } else {
    $('#login, #register').show();
    let showUserRegister = true
    let showUserLogin = false
    $('#login').click(function() {
      showUserRegister = !showUserRegister
      showUserLogin = !showUserLogin
      if (showUserRegister) {
        $('#register-form').hide()
        $('#login-form').show()
      } else {
        $('#register-form').hide()
        $('#login-form').hide()
      }
    });
    $('#register').click(function() {
      showUserLogin = !showUserLogin
      showUserRegister = !showUserRegister
      if (showUserLogin) {
        $('#register-form').show()
        $('#login-form').hide()
      } else {
        $('#register-form').hide()
        $('#login-form').hide()
      }
    });
  }
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
    console.log(result, 'RESUL NIH');
    // location.reload();
    // window.location.reload();
    checkLogin()
    $('#alert').empty();
  })
  .fail(err => {
    console.log(err)
    let errors = ['Email has registered']
    errors.forEach(el => {
      $('#alert').append(`
        <div class="alert alert-primary" role="alert">
          ${el}
        </div>
      `)
    })
  })
}

// REGISTER FUNCTION
$( "#form-register" ).submit(function( event ) {
  event.preventDefault();
  let name = $('#first_name').val();
  let last_name = $('#last_name').val();
  let email = $('#email').val();
  let password = $('#password').val();
  console.log(name, email, password)
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
      console.log(result, 'RESUL NIH');
      checkLogin()
      $('#alert').empty();
    }
  )
  .fail(error => {
    console.log(error, 'ERROR INI')
    let errors = error.responseJSON.errors
    errors.forEach(el => {
      $('#alert').append(`
        <div class="alert alert-primary" role="alert">
          ${el.message}
        </div>
      `)
    })
    }
  )
});

// LOGIN FUNCTION
$('#form-login').submit(function(e){
  e.preventDefault();
  alert('u')
  let email = $('#email2').val();
  let password = $('#password2').val();
  console.log(email)
  console.log(password)
  $.ajax({
    url: 'http://localhost:3000/auth/login',
    method: 'POST',
    data: {email, password}
  })
  .done((result) => {
    let {access_token} = result
    console.log(result)
    console.log(access_token)
    localStorage.setItem('access_token', access_token)
    checkLogin();
    $('#alert').empty();
  })
  .fail(err => {
    console.log(err, 'Error')
    let errors = err.responseJSON.errors
    errors.forEach(el => {
      $('#alert').append(`
        <div class="alert alert-primary" role="alert">
          ${el.message}
        </div>
      `)
    })
  })
})

// LOGOUT FUNCTION
$('#logout').click(function(e) {
  e.preventDefault();
  localStorage.removeItem('access_token');
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  checkLogin()
})

// REFRESH FUNCTION
function loggedIn() {
  $('#list-todo, #logout').show();
  $('#voice').remove();
  $('#content').empty();
  $('#form-todo').hide();
  $('#form-todo').empty();
  $('#table').show()
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
    console.log(err)
    let errors = err.responseJSON.errors
    errors.forEach(el => {
      $('#alert').append(`
        <div class="alert alert-primary" role="alert">
          ${el.message}
        </div>
      `)
    })
  })
}

// SHOW FORM ADD
$('#show-form-todo').click(function() {
  show = !show
  if (show) {
    $('#form-todo').show();
    $('#form-todo').append(`
      <form id="form-add-todo">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title-todo" name="title" placeholder="Title">
        </div>
        <div class="form-group">
          <label for="datepicker">Dude date</label>
          <input class="form-control" id="due-date" data-toggle="datepicker">
        </div>
        <div class="form-group">
          <label for="description-todo">Desciption</label>
          <textarea class="form-control" id="description-todo" name="desciption" placeholder="Desciption"></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Register</button>
      </form>
    `);
    $('#table').hide()
    $('[data-toggle="datepicker"]').datepicker();
    // $().datepicker({
    //   format: 'yyyy-mm-dd'
    // })
  } else {
    $('#form-todo').hide();
    $('#form-todo').empty();
    $('#table').show();
  }
})

// SHOW EDIT TODO
$('#content').on('click', '#edit', function(e) {
  $.ajax({
    url: 'http://localhost:3000/todos/' + e.currentTarget.value,
    method: 'GET',
    headers: {
      access_token: token
    }
  })
  .done(result => {
    $('#form-todo').append(`
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title-todo" name="title" value="${result.title}">
      </div>
      <div class="form-group">
        <label for="datepicker">Dude date</label>
        <input class="form-control" id="due-date" data-toggle="datepicker" value="${moment(result.due_date).format('MM-DD-YYYY')}">
      </div>
      <div class="form-group">
        <label for="description-todo">Desciption</label>
        <textarea class="form-control" id="description-todo" name="desciption" placeholder="Desciption">${result.description}</textarea>
      </div>
      <button id="form-edit" value="${result.id}" class="btn btn-primary btn-block">Edit</button>
    `);
    $('[data-toggle="datepicker"]').datepicker();
    $('#form-todo').show();
    $('#table').hide();
    $('#alert').empty();
  })
  .fail(err => {
    let errors = err.responseJSON.errors
    errors.forEach(el => {
      $('#alert').append(`
        <div class="alert alert-primary" role="alert">
          ${el.message}
        </div>
      `)
    })
  })
})

// ADD FUNCTION
$('#form-todo').on('submit', '#form-add-todo', function(e) {
  e.preventDefault();
  ajaxFunction('POST')
})

// PUT FUNCTION
$('#form-todo').on('click', '#form-edit', function(e) {
  e.preventDefault();
  ajaxFunction('PUT', e.currentTarget.value)
})

// DELETE
$('#content').on('click', '#delete', function(e) {
  console.log(e.currentTarget.value)
  ajaxFunction('DELETE', e.currentTarget.value)
})

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
  console.log(due_date)  
  $.ajax({
    url: url,
    method: type,
    data: {title, description, due_date},
    headers: {
      access_token: token
    }
  })
  .done(result => {
    console.log(result)
    checkLogin()
    $('#alert').empty();
  })
  .fail(err => {
    console.log(err)
    let errors = err.responseJSON.errors
    errors.forEach(el => {
      $('#alert').append(`
        <div class="alert alert-primary" role="alert">
          ${el.message}
        </div>
      `)
    })
  })
}