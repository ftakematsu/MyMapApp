import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import { StatusBar } from 'react-native';

import api from '../../services/api';
import { StackActions, NavigationActions } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';


export default class SignUp extends Component {
  static navigationOptions = {
    header: [],
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func, 
      goBack: PropTypes.func, 
    }).isRequired,
  }; 

  state = {
    username: 'anonimo',
    email: 'anonimo@mail.com',
    password: '123456',
    error: '',
    success: '',
  };

  handleUsernameChange = (username) => {
    this.setState({ username });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  handleSignUpPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
        
        //try {
        await api.post('/users', {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        });


        /*const response = await fetch("http://localhost:3333/users",
        {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            })
            }).then((response) => {
                //buscarTodos();
                //alert("Todo incluído com sucesso!");
            }).catch((error) => {
        });*/

        this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });

        setTimeout(this.goToLogin, 2500);
      /*} catch (_err) {
          alert(_err);
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
      }*/
    }
  };

  goToLogin = () => {
    /*const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn' }),
      ],
    });
    
    this.props.navigation.dispatch(resetAction);*/
    this.props.navigation.navigate('SignIn');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {this.state.success.length !== 0 && <Text style={styles.success}>{this.state.success}</Text>}
        <TextInput style={styles.input}
          placeholder="Nome de usuário"
          value={this.state.username}
          onChangeText={this.handleUsernameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput style={styles.input}
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput style={styles.input}
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.error.length !== 0 && <Text style={styles.error}>{this.state.error}</Text>}
        <Button onPress={this.handleSignUpPress} title="Criar conta" />
        <TouchableHighlight style={styles.createAccout} onPress={this.handleBackToLoginPress}>
          <Text style={styles.createAccoutText}>Voltar ao login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5F5F5'
    },
    logo: {
      height: '30%',
      marginBottom: 40
    },
    input: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 5,
      backgroundColor: '#FFF',
      alignSelf: 'stretch',
      marginBottom: 15,
      marginHorizontal: 20,
      fontSize: 16
    },
    button: {
      padding: 20,
      borderRadius: 5,
      backgroundColor: '#FC6663',
      alignSelf: 'stretch',
      margin: 15,
      marginHorizontal: 20
    },
    error: {
      textAlign: 'center',
      color: '#ce2029',
      fontSize: 16,
      marginBottom: 15,
      marginHorizontal: 20
    },
    success: {
      textAlign: 'center',
      fontSize: 16,
      marginBottom: 15,
      marginHorizontal: 20
    },
    createAccout: {
      padding: 10,
      marginTop: 20
    },
    createAccoutText: {
      color: '#999',
      fontSize: 16,
      textAlign: 'center'
    }
  });