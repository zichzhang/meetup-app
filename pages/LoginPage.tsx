import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { onboardingStyle } from '../ui/onboarding-pages/onboardingStyle'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { authentication } from '../api/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

type RegisterPageNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
	navigation: RegisterPageNavigationProp;
}

const LoginPage = ({ navigation }: Props) => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		signInWithEmailAndPassword(authentication, email, password)
		.then((userCredentials) => {
			navigation.navigate('Home', {name: 'Home'});
			console.log(userCredentials.user.email + " is logged in");
		})
		.catch(error => {
			console.log(error);
		})
	}

	return (
		<KeyboardAvoidingView style={onboardingStyle.container} behavior="padding">
			<View style={onboardingStyle.inputContainer}>
				<TextInput
					placeholder='Email or Username'
					value={email}
					onChangeText={text => setEmail(text)}
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
					onPress={handleLogin}
					style={[onboardingStyle.button, onboardingStyle.buttonOutline]}
				>
					<Text style={onboardingStyle.buttonText}>Login</Text>
				</TouchableOpacity>
			</View>

			<View style={onboardingStyle.redirectToLoginContainer}>
				<Text style={onboardingStyle.redirectText}>
					New to Meetup?
				</Text>
				<Pressable
					style={onboardingStyle.redirectButton}
					onPress={() => navigation.navigate('Register', { name: 'Register' })}
				>
					<Text
						style={onboardingStyle.redirectButtonText}
					>
						Register
					</Text>

				</Pressable>
			</View>
		</KeyboardAvoidingView>
	)
}

export default LoginPage

