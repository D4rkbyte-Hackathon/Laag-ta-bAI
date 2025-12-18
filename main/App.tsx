import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
import IdentifyingModal from './app/screens/home/scan/IdentifyingModal';
import LandmarkDetails from './app/screens/home/scan/LandmarkDetails';
import AIChatScreen from './app/screens/home/scan/AIChatScreen';

// --- IMPORTS: Mastery ---
import MasteryScreen from './app/screens/home/mastery/MasteryScreen';
import AchievementDetail from './app/screens/home/mastery/AchievementDetail';

// --- IMPORTS: Profile ---
import ProfileScreen from './app/screens/home/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        
        {/* Onboarding Flow */}
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingCarousel} options={{ headerShown: false }} />
        <Stack.Screen name="Permissions" component={PermissionsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />

        {/* Main "Home" Hub */}
        <Stack.Screen name="Explore" component={ExploreScreen} options={{ headerLeft: () => null, title: 'Explore' }} /> 
        
        {/* Explore Sub-screens */}
        <Stack.Screen name="FullMap" component={FullMapView} />
        <Stack.Screen name="Transit" component={TransitInfo} />

        {/* Archives */}
        <Stack.Screen name="Archives" component={ArchivesScreen} />

        {/* Scan Flow */}
        <Stack.Screen name="Scan" component={ScanScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Identifying" component={IdentifyingModal} options={{ presentation: 'modal' }} />
        <Stack.Screen name="LandmarkDetails" component={LandmarkDetails} />
        <Stack.Screen name="AIChat" component={AIChatScreen} />

        {/* Mastery */}
        <Stack.Screen name="Mastery" component={MasteryScreen} />
        <Stack.Screen name="AchievementDetail" component={AchievementDetail} />

        {/* Profile */}
        <Stack.Screen name="Profile" component={ProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}