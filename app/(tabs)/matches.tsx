import React, { useState } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.7;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface CardData {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  image: string;
  interests: string[];
}

const MOCK_DATA: CardData[] = [
  {
    id: "1",
    name: "Priya Sharma",
    age: 28,
    location: "Mumbai, India",
    bio: "Software engineer who loves traveling and photography. Looking for someone who shares similar interests.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    interests: ["Travel", "Photography", "Technology"],
  },
  {
    id: "2",
    name: "Anjali Patel",
    age: 26,
    location: "Delhi, India",
    bio: "Doctor by profession, foodie by heart. Love cooking and trying new cuisines.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    interests: ["Cooking", "Food", "Medicine"],
  },
  {
    id: "3",
    name: "Kavya Reddy",
    age: 29,
    location: "Bangalore, India",
    bio: "Marketing professional passionate about fitness and wellness. Yoga enthusiast.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    interests: ["Fitness", "Yoga", "Wellness"],
  },
  {
    id: "4",
    name: "Sneha Kumari",
    age: 27,
    location: "Hyderabad, India",
    bio: "Artist and designer. Love painting, music, and exploring new art forms.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    interests: ["Art", "Music", "Design"],
  },
  {
    id: "5",
    name: "Meera Singh",
    age: 30,
    location: "Pune, India",
    bio: "Entrepreneur and bookworm. Always up for a good conversation over coffee.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    interests: ["Business", "Reading", "Coffee"],
  },
];

interface SwipeableCardProps {
  card: CardData;
  index: number;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isTop: boolean;
  onLike: () => void;
  onPass: () => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  card,
  onSwipeLeft,
  onSwipeRight,
  onLike,
  onPass,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const swipeDistance = event.translationX;

      if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
        const direction = swipeDistance > 0 ? 1 : -1;
        translateX.value = withSpring(direction * SCREEN_WIDTH * 1.5, {
          damping: 20,
          stiffness: 90,
        });
        translateY.value = withSpring(0);

        if (direction > 0) {
          runOnJS(onSwipeRight)();
        } else {
          runOnJS(onSwipeLeft)();
        }
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [-15, 0, 15],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  const likeOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const nopeOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        className="rounded-2xl bg-white overflow-hidden shadow-lg"
        style={[
          {
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
          },
          cardStyle,
        ]}
      >
        <Image
          source={{ uri: card.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Gradient overlay for better text contrast */}
        <View className="absolute inset-0 bg-black/20" />
        <View
          className="absolute bottom-0 left-0 right-0"
          // style={{
          //   height: '100%',
          //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
          // }}
        />
        <View className="absolute bottom-0 left-0 right-0 p-5 pb-24">
          <View className="mb-2.5">
            <Text
              className="text-white text-3xl font-bold"
              style={{
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 3,
              }}
            >
              {card.name}, {card.age}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text
                className="text-white text-base"
                style={{
                  textShadowColor: "rgba(0, 0, 0, 0.75)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                📍 {card.location}
              </Text>
            </View>
          </View>

          <View className="mt-2.5">
            <Text
              className="text-white text-base mb-3"
              style={{
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              {card.bio}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {card.interests.map((interest, idx) => (
                <View
                  key={idx}
                  className="bg-white/90 px-3 py-1.5 rounded-full"
                >
                  <Text className="text-gray-800 text-sm font-medium">
                    {interest}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Like/Nope Labels */}
        <Animated.View
          className="absolute top-12 right-5 border-4 border-green-400 rounded-lg p-2.5"
          style={[
            {
              transform: [{ rotate: "15deg" }],
            },
            likeOpacity,
          ]}
        >
          <Text className="text-3xl font-bold text-green-400">LIKE</Text>
        </Animated.View>
        <Animated.View
          className="absolute top-12 left-5 border-4 border-red-400 rounded-lg p-2.5"
          style={[
            {
              transform: [{ rotate: "-15deg" }],
            },
            nopeOpacity,
          ]}
        >
          <Text className="text-3xl font-bold text-red-400">NOPE</Text>
        </Animated.View>

        {/* Action Buttons inside the card */}
        <View className="absolute bottom-5 left-0 right-0 flex-row justify-center items-center gap-10">
          <TouchableOpacity
            className="w-[60px] h-[60px] rounded-full justify-center items-center bg-white border-2 border-red-400 shadow-lg"
            onPress={onPass}
            activeOpacity={0.7}
          >
            <Text className="text-3xl text-red-500 font-bold">✕</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[60px] h-[60px] rounded-full justify-center items-center bg-white border-2 border-green-400 shadow-lg"
            onPress={onLike}
            activeOpacity={0.7}
          >
            <Text className="text-3xl text-green-500 font-bold">♥</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default function MatchesScreen() {
  const [cards, setCards] = useState<CardData[]>(MOCK_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    console.log("Swiped left on:", cards[currentIndex]?.name);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSwipeRight = () => {
    console.log("Swiped right on:", cards[currentIndex]?.name);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleLike = () => {
    if (currentIndex < cards.length) {
      handleSwipeRight();
    }
  };

  const handlePass = () => {
    if (currentIndex < cards.length) {
      handleSwipeLeft();
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-5 pt-2.5 flex-row justify-between items-center">
        <Text className="text-2xl font-bold dark:text-white">Discover</Text>
        <Text className="text-gray-600 dark:text-gray-400">
          {currentIndex < cards.length
            ? `${currentIndex + 1} of ${cards.length}`
            : "No more cards"}
        </Text>
      </View>

      <View
        className="flex-1 items-center justify-center pt-5"
        style={{ overflow: "hidden" }}
      >
        {currentIndex >= cards.length ? (
          <View className="items-center justify-center p-10">
            <Text className="text-xl font-semibold mb-2 dark:text-white">
              No more profiles!
            </Text>
            <Text className="text-gray-500 dark:text-gray-400">
              Check back later for more matches.
            </Text>
          </View>
        ) : currentCard ? (
          <SwipeableCard
            key={currentCard.id}
            card={currentCard}
            index={0}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            isTop={true}
            onLike={handleLike}
            onPass={handlePass}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}
