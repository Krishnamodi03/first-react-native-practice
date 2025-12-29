import { Image, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Mobile app developer passionate about creating amazing user experiences.",
    avatar: null,
  });

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    locationServices: true,
    biometricAuth: false,
  });

  const handleEditProfile = () => {
    alert("Profile editing functionality would go here");
  };

  const handleChangeAvatar = () => {
    alert("Avatar selection functionality would go here");
  };

  const handleLogout = () => {
    router.back();
    alert("Are you sure you want to logout?");
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#f8fafc", dark: "#1e293b" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#6366f1"
          name="person.fill"
          style={{ position: "absolute", bottom: -90, left: -35 }}
        />
      }
    >
      <ThemedView className="flex-row gap-2 mb-5">
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>

      {/* Profile Header */}
      <ThemedView className="flex-row items-center mb-5 px-4">
        <TouchableOpacity
          onPress={handleChangeAvatar}
          className="relative mr-4"
        >
          {userProfile.avatar ? (
            <Image
              source={{ uri: userProfile.avatar }}
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <ThemedView className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 justify-center items-center border-2 border-indigo-200">
              <IconSymbol name="person.fill" size={60} color="#6366f1" />
            </ThemedView>
          )}
          <ThemedView className="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl w-6 h-6 justify-center items-center shadow-sm">
            <IconSymbol name="camera.fill" size={16} color="#fff" />
          </ThemedView>
        </TouchableOpacity>

        <ThemedView className="flex-1">
          <ThemedText type="title" className="text-2xl font-bold mb-1">
            {userProfile.name}
          </ThemedText>
          <ThemedText className="text-base mb-3">
            {userProfile.email}
          </ThemedText>
          <TouchableOpacity
            onPress={handleEditProfile}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-full self-start shadow-sm"
          >
            <ThemedText className="text-white text-sm font-semibold">
              Edit Profile
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* Personal Information */}
      <Collapsible title="Personal Information">
        <ThemedView className="px-4">
          <ThemedView className="flex-row items-center mb-4">
            <ThemedView className="w-8 h-8 bg-indigo-100 rounded-full justify-center items-center">
              <IconSymbol name="envelope.fill" size={16} color="#6366f1" />
            </ThemedView>
            <ThemedText className="text-base font-semibold ml-3 mr-2 min-w-20">
              Email:
            </ThemedText>
            <ThemedText className="text-base flex-1">
              {userProfile.email}
            </ThemedText>
          </ThemedView>

          <ThemedView className="flex-row items-center mb-4">
            <ThemedView className="w-8 h-8 bg-green-100 rounded-full justify-center items-center">
              <IconSymbol name="phone.fill" size={16} color="#10b981" />
            </ThemedView>
            <ThemedText className="text-base font-semibold ml-3 mr-2 min-w-20">
              Phone:
            </ThemedText>
            <ThemedText className="text-base flex-1">
              {userProfile.phone}
            </ThemedText>
          </ThemedView>

          <ThemedView className="flex-row items-center mb-4">
            <ThemedView className="w-8 h-8 bg-blue-100 rounded-full justify-center items-center">
              <IconSymbol name="location.fill" size={16} color="#3b82f6" />
            </ThemedView>
            <ThemedText className="text-base font-semibold ml-3 mr-2 min-w-20">
              Location:
            </ThemedText>
            <ThemedText className="text-base flex-1">
              {userProfile.location}
            </ThemedText>
          </ThemedView>

          <ThemedView className="mt-2">
            <ThemedText className="text-base font-semibold mb-2">
              Bio:
            </ThemedText>
            <ThemedText className="text-base leading-6">
              {userProfile.bio}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </Collapsible>

      {/* Settings */}
      <Collapsible title="Settings">
        <ThemedView className="px-4">
          <TouchableOpacity
            className="flex-row items-center justify-between py-4 border-b border-gray-100"
            onPress={() => toggleSetting("notifications")}
          >
            <ThemedView className="flex-row items-center flex-1">
              <View className="w-8 h-8 bg-orange-100 rounded-full justify-center items-center">
                <IconSymbol name="bell.fill" size={16} color="#f59e0b" />
              </View>
              <ThemedText className="text-base ml-3">
                Push Notifications
              </ThemedText>
            </ThemedView>
            <View
              className={`w-12 h-8 rounded-full p-0.5 ${settings.notifications ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gray-200"}`}
            >
              <View
                className={`w-7 h-7 bg-white rounded-full shadow-sm ${settings.notifications ? "translate-x-4" : ""}`}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between py-4 border-b border-gray-100"
            onPress={() => toggleSetting("darkMode")}
          >
            <ThemedView className="flex-row items-center flex-1">
              <View className="w-8 h-8 bg-slate-100 rounded-full justify-center items-center">
                <IconSymbol name="moon.fill" size={16} color="#64748b" />
              </View>
              <ThemedText className="text-base ml-3">Dark Mode</ThemedText>
            </ThemedView>
            <View
              className={`w-12 h-8 rounded-full p-0.5 ${settings.darkMode ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gray-200"}`}
            >
              <View
                className={`w-7 h-7 bg-white rounded-full shadow-sm ${settings.darkMode ? "translate-x-4" : ""}`}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between py-4 border-b border-gray-100"
            onPress={() => toggleSetting("locationServices")}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-8 h-8 bg-blue-100 rounded-full justify-center items-center">
                <IconSymbol name="location.fill" size={16} color="#3b82f6" />
              </View>
              <ThemedText className="text-base ml-3">
                Location Services
              </ThemedText>
            </View>
            <View
              className={`w-12 h-8 rounded-full p-0.5 ${settings.locationServices ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gray-200"}`}
            >
              <View
                className={`w-7 h-7 bg-white rounded-full shadow-sm ${settings.locationServices ? "translate-x-4" : ""}`}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between py-4 border-b border-gray-100"
            onPress={() => toggleSetting("biometricAuth")}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-8 h-8 bg-emerald-100 rounded-full justify-center items-center">
                <IconSymbol name="faceid" size={16} color="#10b981" />
              </View>
              <ThemedText className="text-base ml-3">
                Biometric Authentication
              </ThemedText>
            </View>
            <View
              className={`w-12 h-8 rounded-full p-0.5 ${settings.biometricAuth ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gray-200"}`}
            >
              <View
                className={`w-7 h-7 bg-white rounded-full shadow-sm ${settings.biometricAuth ? "translate-x-4" : ""}`}
              />
            </View>
          </TouchableOpacity>
        </ThemedView>
      </Collapsible>

      {/* Account Actions */}
      <Collapsible title="Account">
        <ThemedView className="px-4">
          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-8 h-8 bg-red-100 rounded-full justify-center items-center">
              <IconSymbol name="lock.fill" size={16} color="#ef4444" />
            </View>
            <ThemedText className="text-base ml-3 flex-1">
              Change Password
            </ThemedText>
            <IconSymbol name="chevron.right" size={16} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-8 h-8 bg-purple-100 rounded-full justify-center items-center">
              <IconSymbol name="shield.fill" size={16} color="#8b5cf6" />
            </View>
            <ThemedText className="text-base ml-3 flex-1">
              Privacy Settings
            </ThemedText>
            <IconSymbol name="chevron.right" size={16} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-8 h-8 bg-cyan-100 rounded-full justify-center items-center">
              <IconSymbol
                name="questionmark.circle.fill"
                size={16}
                color="#06b6d4"
              />
            </View>
            <ThemedText className="text-base ml-3 flex-1">
              Help & Support
            </ThemedText>
            <IconSymbol name="chevron.right" size={16} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-8 h-8 bg-amber-100 rounded-full justify-center items-center">
              <IconSymbol name="doc.text.fill" size={16} color="#f59e0b" />
            </View>
            <ThemedText className="text-base ml-3 flex-1">
              Terms of Service
            </ThemedText>
            <IconSymbol name="chevron.right" size={16} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-8 h-8 bg-teal-100 rounded-full justify-center items-center">
              <IconSymbol name="hand.raised.fill" size={16} color="#14b8a6" />
            </View>
            <ThemedText className="text-base ml-3 flex-1">
              Privacy Policy
            </ThemedText>
            <IconSymbol name="chevron.right" size={16} color="#9ca3af" />
          </TouchableOpacity>
        </ThemedView>
      </Collapsible>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="flex-row items-center justify-center bg-gradient-to-r from-red-500 to-rose-600 mx-4 mt-5 py-4 rounded-xl shadow-sm"
      >
        <IconSymbol
          name="rectangle.portrait.and.arrow.right"
          size={20}
          color="#fff"
        />
        <ThemedText className="text-white text-base font-semibold ml-2">
          Logout
        </ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}
