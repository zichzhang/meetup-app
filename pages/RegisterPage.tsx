import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { onboardingStyle } from '../ui/onboarding-pages/onboardingStyle'
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react'
import { RootStackParamList } from '../App';
import { authentication } from '../api/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';

type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
	navigation: LoginPageNavigationProp;
}

const RegisterPage = ({ navigation }: Props) => {

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = () => {
		createUserWithEmailAndPassword(authentication, email, password)
			.then((userCredentials) => {
				console.log(`User account ${userCredentials.user.email} created and signed in successfully!`)
			})
			.catch(error => {
				if (error.code === 'auth/email-already-in-use') {
					console.log('That email address is already in use!');
				}

				if (error.code === 'auth/invalid-email') {
					console.log('That email address is invalid!');
				}
				console.log(error);
			});
	}

  return (
	<KeyboardAvoidingView style={onboardingStyle.container} behavior="padding">
		<View style={onboardingStyle.inputContainer}>
			<TextInput
				placeholder='Email'
				value={email}
				onChangeText={text => setEmail(text)}
				style={onboardingStyle.input}
			>
			</TextInput>
			<TextInput
				placeholder='Username'
				value={username}
				onChangeText={text => setUsername(text)}
				style={onboardingStyle.input}
			>
			</TextInput>
			<TextInput
				placeholder='Password'
				value={password}
				onChangeText={text => setPassword(text)}
				style={onboardingStyle.input}
				secureTextEntry
			>
			</TextInput>
		</View>

		<View style={onboardingStyle.buttonContainer}>
			<TouchableOpacity
				onPress={handleRegister}
				style={[onboardingStyle.button, onboardingStyle.buttonOutline]}
			>
				<Text style={onboardingStyle.buttonText}>Register</Text>
			</TouchableOpacity>
		</View>
		<View style={onboardingStyle.redirectToLoginContainer}>
			<Text style={onboardingStyle.redirectText}>
				Joined us before? 
			</Text>
			<Pressable
				style={onboardingStyle.redirectButton}
				onPress={() => navigation.navigate('Login', {name: 'Login'}) }
			>
				<Text 
					style={onboardingStyle.redirectButtonText}
				>
					Login
				</Text>

			</Pressable>
		</View>
	</KeyboardAvoidingView>
  )
}

export default RegisterPage