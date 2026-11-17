import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (password.length < 8) {
            alert("Password must be at least 8 characters!");
            return;
        }

        alert("Login UI is working! Backend will be connected later.");
    };

    return (
        <main className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    BGMI <span>ESPORTS HUB</span>
                </div>

                <p className="auth-tag">WELCOME BACK, PLAYER</p>

                <h1>LOGIN TO <span>YOUR ACCOUNT</span></h1>

                <p className="auth-description">
                    Enter your details and get back into the battleground.
                </p>

                <form onSubmit={handleLogin}>

                    {/* EMAIL */}
                    <div className="form-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="form-group">
                        <label>Password</label>

                        <div className="password-wrapper">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={8}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>

                        </div>
                    </div>

                    <div className="forgot-password">
                        <a href="#forgot-password">Forgot Password?</a>
                    </div>

                    <button type="submit" className="auth-submit">
                        LOGIN NOW →
                    </button>

                </form>

                <p className="auth-switch">
                    Don't have an account?
                    <Link to="/signup"> Sign Up</Link>
                </p>

                <Link to="/" className="back-home">
                    ← Back to Home
                </Link>

            </div>

        </main>
    );
}

export default Login;