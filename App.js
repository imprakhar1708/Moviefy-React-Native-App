import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TvDetails from "./screens/Details-tv"
import HomeScreen from "./screens/HomeScreen"
import MovieDetails from "./screens/Details-movie"
import SearchScreen from "./screens/SearchScreen"
import TrendingScreen from "./screens/Trending-movie"
import TrendingScreentv from "./screens/Trending-tv"

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					options={{
						headerShown: false,
					}}
					name='Home'
					component={HomeScreen}
				/>
				<Stack.Screen
					options={{
						headerShown: false,
					}}
					name='Search'
					component={SearchScreen}
				/>
				<Stack.Screen
					options={{
						headerShown: false,
					}}
					name='Trending-movie'
					component={TrendingScreen}
				/>
				<Stack.Screen
					options={{
						headerShown: false,
					}}
					name='Trending-tv'
					component={TrendingScreentv}
				/>
				<Stack.Screen
					options={{
						headerShown: false,
					}}
					name='Details-movie'
					component={MovieDetails}
				/>
				<Stack.Screen
					options={{
						headerShown: false,
					}}
					name='Details-tv'
					component={TvDetails}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
