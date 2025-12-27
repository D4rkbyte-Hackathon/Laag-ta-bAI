import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// --- IMPORTS: Components ---
import ScreenNavbar from './app/components/ScreenNavbar';

// --- IMPORTS: Onboarding ---
import SplashScreen from './app/screens/onboarding/SplashScreen';
import OnboardingCarousel from './app/screens/onboarding/OnboardingCarousel';
import PermissionsScreen from './app/screens/onboarding/PermissionsScreen';
import WelcomeScreen from './app/screens/onboarding/WelcomeScreen';

// --- IMPORTS: Home / Explore ---
import ExploreScreen from './app/screens/home/explore/ExploreScreen';
import FullMapView from './app/screens/home/explore/FullMapView';
import TransitInfo from './app/screens/home/explore/TransitInfo';

// --- IMPORTS: Archives ---
import ArchivesScreen from './app/screens/home/archives/ArchivesScreen';

// --- IMPORTS: Scan ---
import ScanScreen from './app/screens/home/scan/ScanScreen';
import IdentifyingModal from './app/screens/home/scan/IdentifyingModal'; //no need
import LandmarkDetails from './app/screens/home/scan/LandmarkDetails';
import AIChatScreen from './app/screens/home/scan/AIChatScreen';

// --- IMPORTS: Mastery ---
import MasteryScreen from './app/screens/home/mastery/MasteryScreen';
import AchievementDetails from './app/screens/home/mastery/AchievementDetails';

// --- IMPORTS: Profile ---
import ProfileScreen from './app/screens/home/profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Create the Bottom Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <ScreenNavbar {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="Explore"
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Archives" component={ArchivesScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Mastery" component={MasteryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          
          {/* Onboarding Flow */}
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Onboarding" component={OnboardingCarousel} options={{ headerShown: false }} />
          <Stack.Screen name="Permissions" component={PermissionsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />

          {/* Main "Home" Hub - This now loads the Tab Navigator */}
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          
          {/* Sub-screens that should cover the tabs (Detailed Views) */}
          <Stack.Screen name="FullMap" component={FullMapView} options={{ headerShown: false }}/>
          <Stack.Screen name="TransitInfo" component={TransitInfo} options={{ headerShown: false }}/>

          {/* Scan Flow Details */}
          <Stack.Screen name="LandmarkDetails" component={LandmarkDetails} options={{ headerShown: false }}/>
          <Stack.Screen name="AIChat" component={AIChatScreen} options={{ headerShown: false }}/>

          {/* Mastery Details */}
          <Stack.Screen name="AchievementDetails" component={AchievementDetails} options={{ headerShown: false }}/>

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}