import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

type FriendsPageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
	navigation: FriendsPageNavigationProp;
}

const users = firestore().collection('users').get();
console.log(users);

const FriendsPage = ({ navigation }: Props) => {

	const [searchQuery, setSearchQuery] = useState('');

	const onChangeSearch = (query: string) => setSearchQuery(query);

	return (
		<SafeAreaView>
			<Searchbar
				placeholder="Search"
				onChangeText={onChangeSearch}
				value={searchQuery}
	  		/>
			<ScrollView>

			</ScrollView>
		</SafeAreaView>

	)
}

export default FriendsPage

const styles = StyleSheet.create({})