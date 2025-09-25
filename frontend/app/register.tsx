// app/register.tsx
import React, { useMemo, useState } from "react";
import { useFonts } from 'expo-font';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import { supabase } from "../utils/supabaseClient";
import { registerForPushNotificationsAsync } from "../utils/notifications";

export default function RegisterScreen() {

    const router = useRouter();
    const [fontsLoaded] = useFonts({
      'safetrails-font': require('../assets/Fonts/Foda_Display.ttf'),
    });

  // Basic Details
  const [fullName, setFullName] = useState("");
  const [nationality, setNationality] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Identity (Light KYC)
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");

  // Trip Information
  const [tripStart, setTripStart] = useState("");
  const [tripEnd, setTripEnd] = useState("");
  const [destinations, setDestinations] = useState("");

  // Emergency Contact
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const mandatoryMissing = useMemo(() => {
    return !fullName || !nationality || !email || !password || !idType || !idNumber || !tripStart || !tripEnd || !emergencyName || !emergencyRelationship || !emergencyContact;
  }, [fullName, nationality, email, password, idType, idNumber, tripStart, tripEnd, emergencyName, emergencyRelationship, emergencyContact]);

  const handleRegister = async () => {
    try {
      if (mandatoryMissing) {
        Alert.alert("Missing info", "Please fill all required fields.");
        return;
      }

      setSubmitting(true);

      const deviceToken = await registerForPushNotificationsAsync();

      const { error } = await supabase
        .from('Tourist')
        .insert({
          full_name: fullName,
          nationality,
          age: age ? Number(age) : null,
          gender,
          email,
          password,
          id_type: idType,
          id_number: idNumber,
          trip_start: tripStart,
          trip_end: tripEnd,
          destinations,
          emergency_name: emergencyName,
          emergency_relationship: emergencyRelationship,
          emergency_contact: emergencyContact,
          device_token: deviceToken ?? null,
        });

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Registration complete.");
      router.push('/login');
    } catch (err: any) {
      Alert.alert("Error", err?.message ?? 'Failed to register.');
    } finally {
      setSubmitting(false);
    }
  };

    if (!fontsLoaded) {
      return null;
    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/register.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.logo}>SafeTrails</Text>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, width: '100%' }}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <Text style={styles.title}>Create Your Account</Text>

            <Text style={styles.sectionTitle}>Basic Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#666"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput 
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Nationality / Country"
          placeholderTextColor="#666"
          value={nationality}
          onChangeText={setNationality}
        />
        <TextInput 
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Age (optional)"
          keyboardType="number-pad"
          placeholderTextColor="#666"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender (optional)"
          placeholderTextColor="#666"
          value={gender}
          onChangeText={setGender}
        />

            <Text style={styles.sectionTitle}>Identity (Light KYC)</Text>
        <TextInput
          style={styles.input}
          placeholder="ID Type (Passport / Driving License / Govt. ID)"
          placeholderTextColor="#666"
          value={idType}
          onChangeText={setIdType}
        />
        <TextInput
          style={styles.input}
          placeholder="ID Number"
          value={idNumber}
          onChangeText={setIdNumber}
          secureTextEntry
          placeholderTextColor="#666"
        />

            <Text style={styles.sectionTitle}>Trip Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Trip Start Date (e.g., 2025-09-24)"
          placeholderTextColor="#666"
          value={tripStart}
          onChangeText={setTripStart}
        />
        <TextInput
          style={styles.input}
          placeholder="Trip End Date (e.g., 2025-09-28)"
          placeholderTextColor="#666"
          value={tripEnd}
          onChangeText={setTripEnd}
        />
        <TextInput
          style={styles.input}
          placeholder="Planned Destination(s) (optional)"
          placeholderTextColor="#666"
          value={destinations}
          onChangeText={setDestinations}
        />

            <Text style={styles.sectionTitle}>Emergency Contact</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#666"
          value={emergencyName}
          onChangeText={setEmergencyName}
        />
        <TextInput
          style={styles.input}
          placeholder="Relationship"
          placeholderTextColor="#666"
          value={emergencyRelationship}
          onChangeText={setEmergencyRelationship}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number / Email"
          placeholderTextColor="#666"
          value={emergencyContact}
          onChangeText={setEmergencyContact}
          keyboardType="email-address"
        />

              <TouchableOpacity style={[styles.primaryButton, submitting || mandatoryMissing ? { opacity: 0.6 } : null]} disabled={submitting || mandatoryMissing} onPress={handleRegister}>
                {submitting ? <ActivityIndicator color="#000" /> : <Text style={styles.primaryButtonText}>Register</Text>}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 16,
    alignItems: "center",
  },
  logo: {
    fontSize: 40,
    color: "black",
    fontFamily: "safetrails-font",
    marginBottom: 20,
  },
  container: {
    width: "90%",
    marginTop: 10,
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
    marginBottom: 12,
    color: "#666633",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: "#ff884d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});


