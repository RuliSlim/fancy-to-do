// everything()
let token = localStorage.getItem('access_token') || null;
let userName = localStorage.getItem('name') || null;
let show = false;
// checkLogin()
$( document ).ready(function() {
  // M.AutoInit();
  $('.materialSelect').formSelect();
  $('.materialSelect').on('contentChanged', function() {
    $(this).formSelect();
  });
  $('.collapsible').collapsible();
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
        localStorage.setItem('name', result.user)
        token = localStorage.access_token
        userName = localStorage.name
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
      console.log(result)
      let {access_token} = result
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('name', result.user)
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
    localStorage.removeItem('name');
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

  // User Home
  $('#todos').click(function (e) { 
    e.preventDefault();
    $('#list-todo').show();
    $('#user-home').hide();
  });

  // navbar home
  $('#home').click(function (e) { 
    e.preventDefault();
    checkLogin();
  });

  // datepicker
  $('.datepicker').datepicker();
  $('.timepicker').timepicker();
  
  // SHOW FORM ADD
  $('#show-form-todo').click(function() {
    $('#form-todo').toggle();
    $('#content').toggle();
    $('#title-todo').val('');
    $('#due-date').val('');
    $('#description-todo').val('');
    $('#form-todo #submit').html('Add').val('');
    $('.timepicker').val('');
    $('#form-todo form').removeClass('edit-todo').addClass('add-todo');
    show = !show
    show ? $('#show-form-todo').html('Back') : $('#show-form-todo').html('Add')
  })
  // SHOW EDIT TODO
  $('#content').on('click', '#edit', function(e) {
    $('#form-todo').toggle();
    $('#content').toggle();
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
      $('#due-date').removeAttr('placeholder');
      $('#description-todo').val(result.description);
      $('#form-todo #submit').html('Edit').val(result.id);
      $('.timepicker').val(result.time);
      $('#alert').empty();
      show = !show
      show ? $('#show-form-todo').html('Back') : $('#show-form-todo').html('Add')  
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
    show ? $('#show-form-todo').html('Back') : $('#show-form-todo').html('Add')  
  })
  
  // PUT FUNCTION
  $('#form-todo').on('submit', '.edit-todo', function(e) {
    const id = $('#form-todo #submit').val();
    e.preventDefault();
    ajaxFunction('PUT', id);
    show = !show
    show ? $('#show-form-todo').html('Back') : $('#show-form-todo').html('Add')  
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
  $('#user-home, #logout').show();
  $('#voice').remove();
  $('#content').empty();
  $('select').empty();
  $('#form-todo').hide();
  $('#content').show();
  $('#show-form-todo').show();
  $('#show-form-todo').html('Add')
  $.ajax({
    url: 'http://localhost:3000/projects',
    method: 'GET',
    headers: {
      access_token: token
    }
  })
  .done(result => {
    console.log(result, 'Projects')
    let name = localStorage.getItem('name')
    $('.display-4').html(`Hello, ${name}`);
    result.forEach(el => {
      let nullP = '<option value="null">Choose your project</option>'
      let project = $('<option>').attr('value', el.Project.id).text(el.Project.name)
      $('#projectid').append(nullP)
      $('#projectid').append(project)
    })
    $("#projectid").trigger('contentChanged');
  })
  .catch(err => console.log(err))
  $.ajax({
    url: 'http://localhost:3000/todos',
    method: 'GET',
    headers: {
      access_token: token
    }
  })
  .done(result => {
    console.log(result, 'resul dari todos')
    let todo = result.todo.filter(el => el.ProjectId == null)
    
    $('#list-todo h3').append(`
    <audio controls id="voice">
      <source src="${result.voice}" type="audio/mpeg">
    </audio>
    `);
    todo.forEach(el => {
      let status = `
      <a class="btn-floating btn-large status" id="show-form-todo">
        <i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i>
      </a>
      `
      if(el.status == true) {
        status = `
        <a class="btn-floating btn-large status" id="show-form-todo">
          <i class="fa fa-check" aria-hidden="true"></i>
        </a>
        `
      }
      let title = `<li class="collection-item pink lighten-5">
      `

      if(el.status) {
        title = ` <li class="collection-item pink lighten-5 done">
        `
      }
      
      $('#content').append(
        `
        ${title}
        ${status}
        <span class="title" >${el.title}</span>
          <div class="options">
            <button id="edit" value="${el.id}" class="btn-floating btn-large cyan pulse"><i class="fas fa-pen"></i></button>
            <button id="delete" value="${el.id}" class="btn-floating btn-large red pulse"><i class="fa fa-trash" aria-hidden="true"></i></button>
          </div>
          <p class="white-text truncate">
            ${el.description}<br>
          </p>
          <p class="white-text">
            ${moment(el.due_date).format('MMM Do YY, h:mm a')}
          </p>
        </li>
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
  let status = $('#status')[0].checked
  let ProjectId = $('#projectid').val();
  let data= {title, description, due_date, status, ProjectId}
  if(ProjectId == 'null') {
    data = {title, description, due_date, status}
  }
  console.log(projectid)
  $.ajax({
    url: url,
    method: type,
    data,
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
    console.log(result)
    localStorage.setItem('access_token', result.access_token)
    localStorage.setItem('name', result.user)
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