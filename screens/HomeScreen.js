import { ImageBackground, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import {
	useFonts,
	Poppins_400Regular,
	Poppins_300Light,
	Poppins_700Bold,
} from "@expo-google-fonts/poppins"
import MainCaraosel from "../screens/MainCaraosel"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"

const HomeScreen = () => {
	const [active, setActive] = useState("0")
	const Stack = createNativeStackNavigator()
	const navigator = useNavigation()
	let [fontsLoaded] = useFonts({
		Poppins_700Bold,
		Poppins_400Regular,
		Poppins_300Light,
	})

	if (!fontsLoaded) {
		return null
	}
	return (
		<View className='pt-6 px-5 flex-1'>
			<ImageBackground
				style={{
					width: "120%",
					height: "120%",
				}}
				className='absolute'
				source={{
					uri: "https://images.unsplash.com/photo-1656274404460-14427bdd5fff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fG1lc2glMjBncmFkaWVudHxlbnwwfHwwfHw%3D&w=1000&q=80",
				}}
				resizeMode='cover'
			/>
			<SafeAreaView className='flex-1'>
				<View className='flex-row justify-between items-center'>
					<Text
						className='text-4xl text-[#343434]'
						style={{ fontFamily: "Poppins_700Bold" }}
					>
						Welcome !
					</Text>
					<TouchableOpacity
						onPress={() => {
							navigator.navigate("Search")
						}}
					>
						<Ionicons
							name='ios-search-circle-outline'
							size={40}
							color='#343434'
						/>
					</TouchableOpacity>
				</View>
				<Text
					className='text-md text-[#4e4e4e] mb-5'
					style={{ fontFamily: "Poppins_300Light" }}
				>
					Let's Discover Some Trending Releases !
				</Text>
				<View className='flex-row justify-around'>
					<TouchableOpacity
						onPress={() => {
							setActive("0")
							navigator.navigate("movies")
						}}
						className={`p-1 ${
							active === "0" ? "border-b-2 border-[#343434]" : ""
						}`}
					>
						<MaterialCommunityIcons
							name='movie-open-outline'
							size={32}
							color='#343434'
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setActive("1")
							navigator.navigate("series")
						}}
						className={`p-1 ${
							active === "1" ? "border-b-2 border-[#343434]" : ""
						}`}
					>
						<Ionicons
							name='ios-tv-outline'
							size={32}
							color='#343434'
						/>
					</TouchableOpacity>
				</View>
				<Stack.Navigator
					screenOptions={{
						animation: "none",
						contentStyle: { backgroundColor: "transparent" },
					}}
				>
					<Stack.Screen
						name='movies'
						options={{ headerShown: false }}
					>
						{(props) => <MainCaraosel type='movie' />}
					</Stack.Screen>
					<Stack.Screen
						name='series'
						options={{ headerShown: false }}
					>
						{(props) => <MainCaraosel type='tv' />}
					</Stack.Screen>
				</Stack.Navigator>
			</SafeAreaView>
		</View>
	)
}

export default HomeScreen
