import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './Login.css';
import Header from '../../common/Header';
import { CardContent, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            usernameRequired: "dispNone",
            username: "",
            validUserName:"Ravi",
            loginPasswordRequired: "dispNone",
            invalidCredentials:"dispNone",
            loginPassword: "",
            validLoginPassword:"123",
            token:"IGQVJXMlpCQmxoNGZA4OWQzNmN6YW84aXBJNlNWcU9LR3dCOVBvWUxCMGdmWjdTdjA4MjFlbm53R212c2JtZAm16YTNVaDZARbzc5b0tMWEFmeUxxNmtIa0lWemRjYWNSUDhLRnR0aXBrLXkxTzI1ZAVAzSWxwelZAWQjhhVUEw"
        }


    }


    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
        if(this.state.username !== this.state.validUserName || this.state.loginPassword !== this.state.validLoginPassword){
            this.setState({ invalidCredentials: "dispBlock" }); 
        }else{
           this.setState({ invalidCredentials: "dispNone" }); 
           this.props.history.push('/home');
           var accessToken = this.state.token;
           sessionStorage.setItem("access-token",accessToken);
        }
    }

    render() {
        return (
            <div className="mainDiv">
               <Header showSearch={false}></Header>
                <Card className="cardStyle">
                    <CardContent>
                        <Typography component="h5" variant="h5">
                            LOGIN
                        </Typography>

                        <FormControl required className="formControl">
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler}></Input>

                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>

                        </FormControl>

                        <FormControl required className="formControl">
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl> <br></br> <br></br>
                        <FormHelperText className={this.state.invalidCredentials}>
                                <span className="red">Incorrect username and/or password</span>
                            </FormHelperText>
                        {/* <Link to="/home"><Button variant="contained" color="primary" onClick={this.loginClickHandler} >LOGIN</Button></Link> */}
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler} >LOGIN</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

}

export default Login;