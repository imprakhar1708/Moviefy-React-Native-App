import {
	FlatList,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useEffect, useRef, useState } from "react"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import SearchBar from "../components/SearchBar"
import SingleTrendCard from "../components/SingleTrendCard"

const SearchScreen = () => {
	const navitation = useNavigation()
	const [searchPhrase, setSearchPhrase] = useState("")
	const [data, setdata] = useState(null)
	const [clicked, setClicked] = useState(false)
	const scrollRef = useRef(null)
	const [active, setactive] = useState("movie")
	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/search/${active}?api_key=9126021014a60e59b03c4b28f3264efb&query=${searchPhrase}`
		)
			.then((data) => data.json())
			.then((json) => {
				setdata(json.results)
				scrollRef.current?.scrollTo({
					y: 0,
					animated: true,
				})
			})
			.catch((error) => {
				console.log(error)
			})
	}, [searchPhrase, active])

	return (
		<View className='flex-1'>
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

			<TouchableOpacity
				onPress={() => {
					navitation.goBack()
				}}
				className='absolute z-10 top-16 left-7'
			>
				<AntDesign name='leftcircleo' size={24} color='black' />
			</TouchableOpacity>
			<SafeAreaView className='pt-6 px-1 flex-1'>
				<View className='flex-row justify-center items-center'>
					<Text
						className='text-2xl text-[#343434]'
						style={{ fontFamily: "Poppins_700Bold" }}
					>
						Search For Movies/TV
					</Text>
				</View>
				<SearchBar
					searchPhrase={searchPhrase}
					setSearchPhrase={setSearchPhrase}
					clicked={clicked}
					setClicked={setClicked}
				/>
				<View className='flex-row justify-center gap-2 mb-5'>
					<TouchableOpacity
						onPress={() => {
							setactive("movie")
						}}
						className={`p-1 rounded-md border-solid border-[#343434] border-2 ${
							active === "movie" ? "bg-[#343434]" : ""
						}`}
					>
						<Text
							style={{ fontFamily: "Poppins_400Regular" }}
							className={`text-center text-sm ${
								active === "movie" ? "text-[#e3e3e3]" : ""
							}`}
						>
							Movies
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setactive("tv")
						}}
						className={`p-1 rounded-md border-solid border-[#343434] border-2  ${
							active === "tv" ? "bg-[#343434]" : ""
						}`}
					>
						<Text
							style={{ fontFamily: "Poppins_400Regular" }}
							className={`text-center text-sm ${
								active === "tv" ? "text-[#e3e3e3]" : ""
							} `}
						>
							TV Shows
						</Text>
					</TouchableOpacity>
				</View>
				<ScrollView ref={scrollRef} className=' w-full'>
					<View className='flex-row flex-wrap justify-evenly'>
						{data?.map((item) => (
							<SingleTrendCard
								type={active}
								key={item.id}
								item={item}
							/>
						))}
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	)
}

export default SearchScreen
