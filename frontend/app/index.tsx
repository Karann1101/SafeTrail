// app/index.tsx
import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'my-canva-font': require('../assets/Fonts/biroscriptplus-bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../assets/images/splash.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Text style={styles.quote}>
            Your journey matters, {"\n"}Your safety matters more
          </Text>

          <View style={styles.footer}>
            <View style={styles.buttonsRow}>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/register' as any)}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/login' as any)}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  quote: {
    color: "white",
    fontSize: 28,
    fontFamily: "my-canva-font", // apply loaded font here
    textAlign: "center",
    marginTop: 16,
  },
  footer: {
    backgroundColor: "#f8f8f8",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 16,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});