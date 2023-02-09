import { View, Text, Image, TouchableOpacity } from "react-native"
import React from "react"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const SingleCard = ({ item, type = "movie" }) => {
	const navigation = useNavigation()
	return (
		<View className='relative rounded-3xl overflow-hidden m-5'>
			<View className='px-1 z-10 absolute gap-1 flex-row justify-center items-center top-5 left-4 rounded-full bg-white '>
				<AntDesign name='star' size={10} color='gold' />
				<Text className='text-xs'>{item.vote_average.toFixed(1)} </Text>
			</View>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate(`Details-${type}`, { id: item.id })
				}}
			>
				<Image
					className='h-[500px] w-[360px] rounded-3xl object-cover object-left-top opacity-70'
					source={{
						uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
					}}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default SingleCard
