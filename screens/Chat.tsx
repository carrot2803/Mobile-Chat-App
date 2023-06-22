import React, { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { TouchableOpacity, ImageBackground } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../components/var";

interface IMessage {
	_id: number;
	text: string;
	createdAt: Date;
	user: { _id: number; name: string; avatar: string };
}

export default function Chat() {
	const [msgs, setMsgs] = useState<IMessage[]>([]);
	const navigation = useNavigation();

	useEffect(() => {
		setMsgs([]);
	}, []);

	const onSend = useCallback((newMsgs: any) => {
		setMsgs((prevMsgs) => GiftedChat.append(prevMsgs, newMsgs));
		const { _id, createdAt, text, user } = newMsgs[0];
		addDoc(collection(db, "chats"), { _id, createdAt, text, user });
	}, []);

	const onSignOut = () => {
		signOut(auth).catch((error) => console.log(error));
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
					<AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	useLayoutEffect(() => {
		const collectionRef = collection(db, "chats");
		const q = query(collectionRef, orderBy("createdAt", "desc"));

		const unsub = onSnapshot(q, (querySnapshot) => {
			console.log("querySnapshot unsusbscribe");
			setMsgs(
				querySnapshot.docs.map((doc) => ({
					_id: doc.data()._id,
					createdAt: doc.data().createdAt.toDate(),
					text: doc.data().text,
					user: doc.data().user,
				}))
			);
		});
		return unsub;
	}, []);

	return (
		<ImageBackground source={require("../assets/chat.webp")} style={{ flex: 1, backgroundColor: "#1F3E6E" }}>
			<GiftedChat
				messages={msgs}
				showAvatarForEveryMessage={false}
				showUserAvatar={false}
				onSend={(newMsgs) => onSend(newMsgs)}
				messagesContainerStyle={{
					backgroundColor: "transparent", // Set the background color of the chat messages container to transparent
				}}
				user={{
					_id: auth?.currentUser?.email || "",
					avatar: "https://placedog.net/640/480?r",
				}}
			/>
		</ImageBackground>
	);
}
