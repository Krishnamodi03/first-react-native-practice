import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";

const Practice = () => {
  const [pressCount, setPressCount] = useState(0);
  const handleCustomTectPress = () => {
    setPressCount((prev) => prev + 1);
  };
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

      <View className="flex-1 items-center justify-center bg-white">
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

      <ScrollView>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        {/* Add more items */}
      </ScrollView>

      <Button
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        title="Press me"
        onPress={() => alert("Why pressed me without permission?")}
      />

      <TouchableOpacity onPress={() => alert("Pressed!")}>
        <Text>Press Me</Text>
      </TouchableOpacity>
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
