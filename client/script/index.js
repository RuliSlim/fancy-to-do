$( document ).ready(function() {
  $('#main-body').html(forms);

  // REGISTER FUNCTION
  $( "#form-register" ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
    console.log(this.e)
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
    .done((result)=> {
      alert('BERHASIL');
      localstorage.setItem('access_token', response.access_token)
      token = localstorage.access_token
      console.log(result, 'RESUL NIH');
      forms = `Berhasil register`;
      $('#main-body').html(forms);
      }
    )
    .fail((error) => {
      alert('Gagal');
      console.log(error, 'ERROR INI')
      forms = `Gagal register`;
      $('#main-body').html(forms);
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
      alert('Login');
      let {access_token} = result
      console.log(result)
      console.log(access_token)
      localStorage.setItem('access_token', access_token)
      alert(localStorage.getItem('access_token'))
      forms = `Berhasil Login
      <button class="btn btn-primary" id="view-todos">See your todos</button>
      `
      $('#main-body').html(forms);
    })
    .fail((err) => {
      alert('Gagal Login')
      console.log(err, 'Error')
      forms = 'Gagal Login'
      $('#main-body').html(forms);
    })
  })

  // View todos
  $('#view-todos').click(function(e){
    alert('Yo')
    e.preventDefault();
    let token = localStorage.getItem('access_token')
    $.ajax({
      url: 'http://localhost:3000/todos',
      method: 'GET',
      headers: {
        access_token: token
      }
    })
      .done(result => {
        console.log(result)
      })
      .fail(err => {
        console.log(err)
      })
  })
  
  function refreshPage() {
    let forms = `BERUBAH CUK`;
    $('#main-body').html(forms);
  }
//   $("#form-register").bind("submit",function(e){
//     alert('yo')
//     e.preventDefault();
 
//     var ajaxurl = $(this).attr("action");
 
//     var data = $(this).serialize();
 
//     $.post(ajaxurl,data,function(res){
 
//         $("#message").html(res.message);
 
//     },'json');
//  });
});

const registerForm = `
<div class="m-5">
  <div class="form-head">
      <h5>REGISTER</h5>
  </div>
  <div class="form-body p-3">
    <form id="form-register" >
        <div class="form-group">
          <label for="first_name">First Name</label>
          <input type="text" class="form-control" id="first_name" name="first_name" placeholder="Enter your first name">
        </div>
        <div class="form-group">
          <label for="first_name">Last Name</label>
          <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Enter your last name">
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" name="password" placeholder="Password">
        </div>
      <button type="submit" class="btn btn-primary btn-block">Register</button>
    </form>
  </div>
</div>
`

const loginForm = `
<div class="m-5">
  <div class="form-head">
      <h5>LOGIN</h5>
  </div>
  <div class="form-body p-3">
    <form id="form-login">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email2" name="email" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password2" name="password" placeholder="Password">
        </div>
      <button type="submit" class="btn btn-primary btn-block">Register</button>
    </form>
  </div>
</div>
`

const googleForm = `

`

let forms = `
<div class="accordion m-5" id="accordionExample">
  <div class="card d-flex flex-row">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Register
        </button>
      </h2>
    </div>
    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
        ${registerForm}
      </div>
    </div>
  </div>
  <div class="card d-flex flex-row">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn btn-primary collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Login
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
        ${loginForm}
      </div>
    </div>
  </div>
  <div class="card d-flex flex-row">
    <div class="card-header" id="headingThree">
      <h2 class="mb-0">
        <button class="btn btn-primary collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Login With Google
        </button>
      </h2>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
        ${googleForm}
      </div>
    </div>
  </div>
</div>
`

let loggedIn =`<p>Sekarang kalau diklik berubah ga?</p>`

// $('.coba').submit(function(e) { 
//   e.preventDefault();
//   alert('Yo')
//   console.log(e)
//   refreshPage();
// });

