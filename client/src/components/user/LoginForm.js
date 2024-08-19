function LoginForm() {

  return (
    <section id="user-login-form">
      <form id="login-form">
        <h2>Login (WIP)</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        {/* placeholder */}
        <a href="google.ca">Forgot password?</a>
        <input type="submit" value="Log in"/>
      </form>
      <div class="separator">
        <span>OR</span>
      </div>
    </section>
    
  );
}

export default LoginForm;