import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    state = {
        credentials: {
            username: "",
            password: ""
        }
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();

        //console.log(res.data.payload);
        axios
            .post("https://wunderlist-backend.herokuapp.com/api/auth/login", this.state.credentials)
            .then(res => {
                console.log("login: ", res);
                localStorage.setItem("token", res.data.payload);
                this.props.history.push("/protected");
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    render() {
        return (
            <div>
                <h1> Login</h1>
                <form onSubmit={this.login}>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Log in</button>
                </form>
            </div>
        )
    }
}

export default Login; 