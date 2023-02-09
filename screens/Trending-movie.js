import {
	FlatList,
	ImageBackground,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useEffect, useRef, useState } from "react"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import SingleTrendCard from "../components/SingleTrendCard"

const TrendingScreen = () => {
	const navitation = useNavigation()
	const [data, setdata] = useState(null)
	const [page, setpage] = useState(1)
	const scrollRef = useRef(null)
	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=9126021014a60e59b03c4b28f3264efb&page=${page}`
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
	}, [page])

	return (
		<SafeAreaView className='pt-6 px-1 flex-1'>
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
			<View className='flex-row justify-center items-center pb-7'>
				<TouchableOpacity
					onPress={() => {
						navitation.goBack()
					}}
					className='absolute top-1 left-5'
				>
					<AntDesign name='leftcircleo' size={24} color='black' />
				</TouchableOpacity>

				<Text
					className='text-2xl text-[#343434]'
					style={{ fontFamily: "Poppins_700Bold" }}
				>
					Trending Movies
				</Text>
			</View>
			<ScrollView ref={scrollRef} className=' w-full'>
				<View className='flex-row flex-wrap justify-evenly'>
					{data?.map((item) => (
						<SingleTrendCard
							type='movie'
							key={item.id}
							item={item}
						/>
					))}
				</View>
			</ScrollView>
			<View className='flex-row justify-evenly py-5 px-2'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
					<TouchableOpacity
						key={n}
						onPress={() => {
							setpage(n)
						}}
						className={`w-8 h-8 rounded-full justify-center items-center ${
							page === n ? "bg-[#1e1e1e]" : "bg-[#898989]"
						}`}
					>
						<Text
							style={{ fontFamily: "Poppins_700Bold" }}
							className='text-white'
						>
							{n}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</SafeAreaView>
	)
}

export default TrendingScreen
