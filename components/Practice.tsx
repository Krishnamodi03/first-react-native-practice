import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Link, Redirect, useRouter } from "expo-router";

const Practice = () => {
  const [pressCount, setPressCount] = useState(0);
  const handleCustomTectPress = () => {
    setPressCount((prev) => prev + 1);
  };
  const router = useRouter();

  const data = [
    { id: "1", name: "Apple" },
    { id: "2", name: "Banana" },
    { id: "3", name: "Cherry" },
  ];
  return (
    <>
      <View style={styles.customView}>
        <Text style={styles.cutomText} onPress={handleCustomTectPress}>
          hey there i am developer (click me)
        </Text>
        {pressCount > 0 && (
          <Text style={styles.visbleText}>i am pressed {pressCount} times</Text>
        )}
      </View>
      <View className="bg-purple-400 p-4 rounded-lg">
        <Text className="text-white text-lg font-bold">
          this is using tailwind css (nativeWind)
        </Text>
      </View>
      <View className="flex-1 items-center justify-center bg-white min-h-fit">
        <Text className="text-xl font-bold text-blue-500">
          Welcome to Nativewind!
        </Text>
      </View>
      <View>
        <Text className="text-gray-400">Local Image : </Text>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ height: 100, width: 100 }}
        />

        <Text className="text-gray-400">Remote Image:</Text>
        <Image
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <ThemedText>ScrollView example: </ThemedText>
      <ScrollView>
        <ThemedText>Item 1</ThemedText>
        <ThemedText>Item 2</ThemedText>
        {/* Add more items */}
      </ScrollView>
      <Button
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => router.navigate("/explore")}
        title="Press me to go to Explore page"
      />
      <TouchableOpacity onPress={() => alert("Pressed!")}>
        <Text className="bg-white w-full text-center">Press Me</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <ThemedText>&hearts;{item?.name}</ThemedText>
          </View>
        )}
      />
      <Link href="/explore">
        <Text className="text-blue-500 font-bold hover:text-red-500">
          About
        </Text>
      </Link>
    </>
  );
};

const styles = StyleSheet.create({
  customView: {
    height: 100,
    // width: 300,
    backgroundColor: "red",
  },
  cutomText: {
    fontSize: 25,
    fontStyle: "italic",
    color: "white",
  },
  visbleText: {
    fontSize: 30,
    color: "yellow",
  },
});
export default Practice;
