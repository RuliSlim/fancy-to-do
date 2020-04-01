$( document ).ready(function() {
  let show = false;

  $('.main-body, .user').hide();
  let token = localStorage.getItem('access_token') || null;
  if(token) {
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
    // $('#voice').remove();
    // $('#content').empty();
    // $('#form-todo').hide();
    // $('#form-todo').empty();
    // $('#table').show()
  }

  // Show form Todo

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
        location.reload();
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
      location.reload();
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
    location.reload();
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
            <label for="description-todo">Desciption</label>
            <textarea class="form-control" id="description-todo" name="desciption" placeholder="Desciption"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Register</button>
        </form>
      `);
      $('#table').hide()
      $('#form-todo').on('submit', '#form-add-todo', function(e) {
        e.preventDefault();
        ajaxFunction('POST')
      })
    } else {
      $('#form-todo').hide();
      $('#form-todo').empty();
      $('#table').show();
    }
  })

  // DELETE
  $('#content').on('click', '#delete', function(e) {
    console.log(e.currentTarget.value)
    ajaxFunction('DELETE', e.currentTarget.value)
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
          <label for="description-todo">Desciption</label>
          <textarea class="form-control" id="description-todo" name="desciption" placeholder="Desciption">${result.description}</textarea>
        </div>
        <button id="form-edit" value="${result.id}" class="btn btn-primary btn-block">Edit</button>
      `);
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
  // PUT FUNCTION
  $('#form-todo').on('click', '#form-edit', function(e) {
    e.preventDefault();
    ajaxFunction('PUT', e.currentTarget.value)
  })

  function ajaxFunction(type='POST', id=0) {
    let url
    if(type == 'POST') {
      url = 'http://localhost:3000/todos'
    } else {
      url = 'http://localhost:3000/todos/' + id
    }
    let title = $('#title-todo').val();
    let description = $('#description-todo').val();
    let due_date = $('#due-date-todo').val() || new Date(Date.now());    
    // console.log(title)
    // console.log(description)
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
      loggedIn();
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
});

