import { View, Text, Image, FlatList, TouchableOpacity } from "react-native"
import React from "react"
import { genre_pick } from "../assets/genre"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const SingleTrendCard = ({ item, type = "movie" }) => {
	const navigation = useNavigation()
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate(`Details-${type}`, { id: item.id })
			}}
			className={`relative rounded-xl w-[170px] my-2`}
		>
			<View className='px-1 z-10 absolute gap-1 flex-row justify-center items-center top-3 left-2 rounded-full bg-white '>
				<AntDesign name='star' size={10} color='gold' />
				<Text className='text-xs'>{item.vote_average.toFixed(1)} </Text>
			</View>
			<Image
				className={`h-[300px] rounded-xl object-cover object-left-top opacity-70`}
				source={{
					uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
				}}
			/>
			<View className='max-w-full'>
				<Text
					className=' text-[#343434] mt-1 tracking-tighter'
					style={{ fontFamily: "Poppins_700Bold" }}
				>
					{item.title === undefined ? item.name : item.title}
				</Text>
				<Text className='text-xs text-[#343434] mt-1 tracking-tighter'>
					{item.genre_ids.map((id, idx) => (
						<Text className='text-xs' key={idx}>
							{idx < 3 ? genre_pick(id) + " | " : ""}
						</Text>
					))}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export default SingleTrendCard
