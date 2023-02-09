import { View, Text, Image, FlatList } from "react-native"
import React from "react"
import { genre_pick } from "../assets/genre"
import { AntDesign } from "@expo/vector-icons"

const SingleCastCard = ({ item }) => {
	return (
		<View className={`relative rounded-xl w-[180px] my-2 ml-1`}>
			<Image
				className={`h-[300px] rounded-xl object-cover object-left-top opacity-70`}
				source={{
					uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
				}}
			/>
			<View className='max-w-full'>
				<Text
					className=' text-[#343434] mt-1 tracking-tighter'
					style={{ fontFamily: "Poppins_700Bold" }}
				>
					{item.name}
				</Text>
				<Text className='text-xs text-[#343434] tracking-tighter'>
					<Text className='text-xs'>{item.character}</Text>
				</Text>
			</View>
		</View>
	)
}

export default SingleCastCard
