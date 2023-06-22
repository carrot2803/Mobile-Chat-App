import React, { useState } from "react";
import { Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { form } from "../components/styles";
const bg = require("../assets/background.png");

export default function Signup({ navigation }: any) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onHandleSignup = () => {
		if (email !== "" && password !== "")
			createUserWithEmailAndPassword(auth, email, password)
				.then(() => console.log("Signup success"))
				.catch((err) => Alert.alert("Login error", err.message));
	};

	return (
		<View style={form.container}>
			<Image source={bg} style={form.bgImage} />
			<View style={form.whiteSheet} />
			<SafeAreaView style={form.form}>
				<Text style={form.title}>Sign Up</Text>
				<TextInput style={form.input} placeholder="Enter email" autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress" autoFocus={true} value={email} onChangeText={(text) => setEmail(text)}/>
				<TextInput style={form.input} placeholder="Enter password" autoCapitalize="none" autoCorrect={false} secureTextEntry={true}	textContentType="password"	value={password} onChangeText={(text) => setPassword(text)}/>
				<TouchableOpacity style={form.button} onPress={onHandleSignup}>
					<Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}> Sign Up</Text>
				</TouchableOpacity>
				<View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
					<Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>Don't have an account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate("Login")}>
						<Text style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}> Log In</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
			<StatusBar barStyle="light-content" />
		</View>
	);
}
