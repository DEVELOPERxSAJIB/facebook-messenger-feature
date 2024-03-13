import { Link } from "react-router-dom"
import AuthHeader from "../../components/AuthHeader/AuthHeader"
import PageHeader from "../../components/PageHeader/PageHeader"

const Register = () => {
  return (
    <>
      <PageHeader title={"Messenger - Create account"} />
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-top">
            <AuthHeader
              title={"Register as a new user "}
            />

            <div className="auth-form">
              <form action="">
                <input type="text" placeholder="Full Name" />
                <input type="text" placeholder="Email or Phone number" />
                <input type="text" placeholder="Password" />
                <button style={{cursor : "pointer"}} className="fb-bg-green" type="submit">Create Account</button>
              </form>
            </div>

          </div>
          <div className="auth-bottom">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register