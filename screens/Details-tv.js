import {
	View,
	FlatList,
	Text,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
	Image,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import SingleCastCard from "../components/SingleCastCard"
import SingleTrendCard from "../components/SingleTrendCard"
const TvDetails = ({ route }) => {
	const [data, setdata] = useState(null)
	const [credit, setcredit] = useState(null)
	const [similar, setsimilar] = useState(null)
	const [genres, setgenres] = useState(null)
	const navigation = useNavigation()
	const { id } = route.params
	const scrollRef = useRef(null)
	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/tv/${id}?api_key=9126021014a60e59b03c4b28f3264efb`
		)
			.then((data) => data.json())
			.then((json) => {
				setdata(json)
				setgenres(json?.genres?.map((n) => n.name))
			})
			.catch((error) => {
				console.log(error)
			})
		fetch(
			`https://api.themoviedb.org/3/tv/${id}/credits?api_key=9126021014a60e59b03c4b28f3264efb`
		)
			.then((data) => data.json())
			.then((json) => {
				setcredit(json.cast)
			})
			.catch((error) => {
				console.log(error)
			})
		fetch(
			`https://api.themoviedb.org/3/tv/${id}/similar?api_key=9126021014a60e59b03c4b28f3264efb`
		)
			.then((data) => data.json())
			.then((json) => {
				setsimilar(json.results)
			})
			.catch((error) => {
				console.log(error)
			})
		scrollRef.current?.scrollTo({
			y: 0,
			animated: true,
		})
	}, [id])

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
			<Image
				className='h-[500px] w-full object-contain opacity-75'
				source={{
					uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
				}}
			/>
			<TouchableOpacity
				onPress={() => {
					navigation.goBack()
				}}
				className='absolute top-16 left-10'
			>
				<AntDesign name='leftcircleo' size={32} color='black' />
			</TouchableOpacity>
			<ScrollView ref={scrollRef} className='relative flex-1'>
				<View className='p-3'>
					<View className='mb-5'>
						<Text className='text-5xl mt-3 tracking-tighter text-[#343434] font-black'>
							{data?.name}
						</Text>
						<View className='flex-row gap-1 mt-2 mb-5'>
							{genres?.map((genre, idx) => (
								<View
									key={idx}
									className=' bg-[#4c4c4c] rounded-full'
								>
									<Text
										style={{
											fontFamily: "Poppins_300Light",
										}}
										className='text-xs text-white p-1'
									>
										{genre}
									</Text>
								</View>
							))}
						</View>
						<View>
							<Text
								className='text-xs'
								style={{ fontFamily: "Poppins_300Light" }}
							>
								{data?.overview}
							</Text>
						</View>
					</View>
					<View className='my-5'>
						<View className='flex-row gap-1 items-center'>
							<View className='w-1 h-5 bg-black'></View>
							<Text
								className='text-2xl text-[#343434] '
								style={{ fontFamily: "Poppins_700Bold" }}
							>
								Top Casts
							</Text>
						</View>

						<View>
							<FlatList
								className='mt-1'
								data={credit}
								keyExtractor={({ id }) => id}
								renderItem={({ item }) => (
									<SingleCastCard item={item} />
								)}
								horizontal
								pagingEnabled
								snapToAlignment='start'
							/>
						</View>
					</View>
					<View className='my-5'>
						<View className='flex-row gap-1 items-center'>
							<View className='w-1 h-5 bg-black'></View>
							<Text
								className='text-2xl text-[#343434] '
								style={{ fontFamily: "Poppins_700Bold" }}
							>
								Similar TV Shows
							</Text>
						</View>

						<View>
							<FlatList
								className='mt-1'
								ItemSeparatorComponent={
									<View className='w-3'></View>
								}
								data={similar}
								keyExtractor={({ id }) => id}
								renderItem={({ item }) => (
									<SingleTrendCard type='tv' item={item} />
								)}
								horizontal
								pagingEnabled
								snapToAlignment='start'
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default TvDetails
