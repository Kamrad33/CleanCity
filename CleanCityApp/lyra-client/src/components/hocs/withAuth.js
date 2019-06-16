import React, { Component } from 'react';
import AuthService from '../../auth/AuthService';

export default function withAuth(AuthComponent) {

    const Auth = new AuthService('http://10.0.2.2:8080');
        return class AuthWrapped extends Component {
            constructor() {
                super();
                this.state = {
                    user: ""
                };
            }

            async componentWillMount() {
                console.log("err11");
                if (!Auth.loggedIn()) {
                    console.log("err22");
                    this.props.navigation.navigate('Домашняя страница');
                }
                else {
                    try {
                        const profile = JSON.parse(await Auth.getProfile());
                        this.setState({
                            user: profile
                        });
                        console.log("onGetProfile", this.state)
                    }
                    catch(err){
                        Auth.logout();
                        this.props.navigation.navigate('');
                    }
                }
            }

             render() {
                if (this.state.user) {
                    console.log("if");
                    return (
                        <AuthComponent history={this.props.history} user={this.state.user} navigation={this.props.navigation} />
                    )
                }
                else {
                    console.log("else");
                   return (
                    <AuthComponent history={this.props.history} navigation={this.props.navigation} />
                    )
                }
            }
        }
}