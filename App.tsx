import React, { createContext, useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";

import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import { auth } from "./config/firebase";

const Stack = createStackNavigator();
const AuthenticatedUser = createContext({});

const ATP = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState(null);
	return <AuthenticatedUser.Provider value={{ user, setUser }}>{children}</AuthenticatedUser.Provider>;
};

function ChatStack() {
	return (
		// @ts-ignore
		<Stack.Navigator defaultScreenOptions={Home}>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Chat" component={Chat} />
		</Stack.Navigator>
	);
}

function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Signup" component={Signup} />
		</Stack.Navigator>
	);
}

function RootNav() {
	const { user, setUser }: any = useContext(AuthenticatedUser);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (authUser) => {
			authUser ? setUser(authUser) : setUser(null);
			setIsLoading(false);
		});
		return unsub;
	}, [user, setUser]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return <NavigationContainer>{user ? <ChatStack /> : <AuthStack />}</NavigationContainer>;
}

export default function App() {
	return (
		<ATP>
			<RootNav />
		</ATP>
	);
}
