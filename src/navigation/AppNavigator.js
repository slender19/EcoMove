import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screen/LoginScreen"; 
import HomeScreen from "../screen/users/HomeScreen";
import Solicitar from "../screen/users/Solicitar";
import Devolucion from "../screen/users/Devolucion";
import Historial from "../screen/users/Historial";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Solicitar"
          component={Solicitar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Historial"
          component={Historial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Devolucion"
          component={Devolucion}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
