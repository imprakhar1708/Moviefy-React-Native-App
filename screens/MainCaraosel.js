import {
	View,
	FlatList,
	Text,
	TouchableOpacity,
	ScrollView,
} from "react-native"
import React, { useEffect, useState } from "react"
import SingleCard from "../components/SingleCard"
import { Ionicons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import SingleTrendCard from "../components/SingleTrendCard"
import { useNavigation } from "@react-navigation/native"

const Movies = ({ type }) => {
	const [data, setdata] = useState([])
	const [trend, settrend] = useState([])
	const [sortedTrend, setSortedTrend] = useState([])
	const [active, setactive] = useState(null)
	const navigation = useNavigation()
	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/trending/${type}/week?api_key=9126021014a60e59b03c4b28f3264efb`
		)
			.then((data) => data.json())
			.then((json) => {
				setdata(json.results)
			})
			.catch((error) => {
				console.log(error)
			})
		fetch(
			`https://api.themoviedb.org/3/${type}/popular?api_key=9126021014a60e59b03c4b28f3264efb`
		)
			.then((data) => data.json())
			.then((json) => {
				settrend(json.results)
				setSortedTrend(json.results)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	useEffect(() => {
		active === null
			? setSortedTrend(trend)
			: setSortedTrend(
					trend.filter((item) => item.genre_ids.includes(active))
			  )
	}, [active])

	return (
		<ScrollView className='relative my-5'>
			<View className='absolute top-0 right-3 flex-row items-center'>
				<Text>Swipe </Text>
				<Ionicons
					name='arrow-forward-circle-outline'
					size={16}
					color='black'
				/>
			</View>
			<FlatList
				className='mt-1'
				data={data}
				keyExtractor={({ id }) => id}
				renderItem={({ item }) => (
					<SingleCard type={type} item={item} />
				)}
				horizontal
				pagingEnabled
				snapToAlignment='center'
			/>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate(`Trending-${type}`)
				}}
				className='flex-row justify-between items-center pr-5 mt-10 mb-5'
			>
				<View className='flex-row gap-1 items-center'>
					<View className='w-1 h-5 bg-black'></View>
					<Text
						className='text-2xl text-[#343434] '
						style={{ fontFamily: "Poppins_700Bold" }}
					>
						Trending Now
					</Text>
				</View>
				<View className='flex-row gap-1 items-baseline'>
					<Text
						className='text-lg text-[#343434] '
						style={{ fontFamily: "Poppins_300Light" }}
					>
						All
					</Text>
					<AntDesign name='right' size={12} color='#343434' />
				</View>
			</TouchableOpacity>
			<View className='flex-row justify-around mb-10'>
				<TouchableOpacity
					onPress={() => {
						setactive(null)
					}}
					className={`p-1 rounded-md border-solid border-[#343434] border-2  ${
						active === null ? "bg-[#343434]" : ""
					}`}
				>
					<Text
						style={{ fontFamily: "Poppins_400Regular" }}
						className={`text-center text-sm ${
							active === null ? "text-[#e3e3e3]" : ""
						} `}
					>
						All
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setactive(35)
					}}
					className={`p-1 rounded-md border-solid border-[#343434] border-2 ${
						active === 35 ? "bg-[#343434]" : ""
					}`}
				>
					<Text
						style={{ fontFamily: "Poppins_400Regular" }}
						className={`text-center text-sm ${
							active === 35 ? "text-[#e3e3e3]" : ""
						}`}
					>
						Comedy
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setactive(80)
					}}
					className={`p-1 rounded-md border-solid border-[#343434] border-2 ${
						active === 80 ? "bg-[#343434]" : ""
					}`}
				>
					<Text
						style={{ fontFamily: "Poppins_400Regular" }}
						className={`text-center text-sm ${
							active === 80 ? "text-[#e3e3e3]" : ""
						}`}
					>
						Crime
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setactive(16)
					}}
					className={`p-1 rounded-md border-solid border-[#343434] border-2 ${
						active === 16 ? "bg-[#343434]" : ""
					}`}
				>
					<Text
						style={{ fontFamily: "Poppins_400Regular" }}
						className={`text-center text-sm ${
							active === 16 ? "text-[#e3e3e3]" : ""
						}`}
					>
						Animation
					</Text>
				</TouchableOpacity>
			</View>

			<View>
				<FlatList
					ItemSeparatorComponent={<View className='w-3'></View>}
					data={sortedTrend}
					keyExtractor={({ id }) => id}
					renderItem={({ item }) => (
						<SingleTrendCard type={type} item={item} />
					)}
					horizontal
					pagingEnabled
					snapToAlignment='start'
				/>
			</View>
		</ScrollView>
	)
}

export default Movies
