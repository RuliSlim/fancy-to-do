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


module.exports = {
  forms,
  registerForm,
  loginForm,
  googleForm
}
