// app/login.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground
        source={require("../assets/images/login.jpeg")}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.logo}>SafeTrails</Text>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100} style={{ flex: 1, width: '100%' }}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" contentInsetAdjustmentBehavior="always" automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#666"
        />
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  container: {
    width: "90%",
    marginTop: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    color: "#666633", // golden olive color
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#ff884d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});