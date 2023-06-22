import React, { useEffect } from "react";
import { View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { home, colors } from "../components/styles";

const pfp = "https://wallpapercave.com/wp/wp10104139.png";

const Home = () => {
	const nav = useNavigation();

	useEffect(() => {
		nav.setOptions({
			headerLeft: () => <FontAwesome name="search" size={24} color={colors.gray} style={{ marginLeft: 15 }} />,
			headerRight: () => <Image source={{ uri: pfp }} style={{ width: 40, height: 40, marginRight: 15 }} />,
		});
	}, [nav]);

	return (
		<ImageBackground source={require("../assets/chat.webp")} style={{ flex: 1 }}>
			<View style={home.container}>
				<TouchableOpacity onPress={() => nav.navigate("Chat" as never)} style={home.chatBtn}>
					<Entypo name="chat" size={24} color={colors.lightGray} />
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
};

export default Home;
