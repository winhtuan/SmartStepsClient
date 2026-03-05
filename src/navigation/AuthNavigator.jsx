import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import WelcomeScreen from '../features/auth/screens/WelcomeScreen';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import OtpScreen from '../features/auth/screens/OtpScreen';
import ChildProfileScreen from '../features/auth/screens/ChildProfileScreen';
import LearningPersonalizationScreen from '../features/auth/screens/LearningPersonalizationScreen';
import RegisterCompleteScreen from '../features/auth/screens/RegisterCompleteScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 300 } },
    close: { animation: 'timing', config: { duration: 300 } },
  },
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="ChildProfile" component={ChildProfileScreen} />
      <Stack.Screen name="LearningPersonalization" component={LearningPersonalizationScreen} />
      <Stack.Screen name="RegisterComplete" component={RegisterCompleteScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
