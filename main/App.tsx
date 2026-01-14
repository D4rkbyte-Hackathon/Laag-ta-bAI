import './global.css';
import React from 'react';
import { GradientBackground } from './app/components/GradientBackground';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
import LandmarkDetails from './app/screens/home/scan/LandmarkDetails';
import AIChatScreen from './app/screens/home/scan/AIChatScreen';

// --- IMPORTS: Mastery ---
import MasteryScreen from './app/screens/home/mastery/MasteryScreen';
import AchievementDetails from './app/screens/home/mastery/AchievementDetails';

// --- IMPORTS: Profile ---
import ProfileScreen from './app/screens/home/profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

// Create the Bottom Tab Navigator
function MainTabs() {
  return (
<GradientBackground>
      <Tab.Navigator
        tabBarPosition="bottom"
        tabBar={(props: any) => <ScreenNavbar {...props} />}
        
        screenOptions={{ 
          swipeEnabled: true, // Enable the gesture
          sceneStyle: { backgroundColor: 'transparent' },
          tabBarStyle: { backgroundColor: 'transparent' },
        }}
        initialRouteName="Explore"
      >
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Archives" component={ArchivesScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Mastery" component={MasteryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </GradientBackground>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            gestureEnabled: true,
          }}
        >
          
          {/* --- ONBOARDING FLOW --- */}
          {/* Keep standard slide for linear progression */}
          <Stack.Screen name="Splash" component={SplashScreen}/>
          <Stack.Screen name="Onboarding" component={OnboardingCarousel}/> 
          <Stack.Screen name="Permissions" component={PermissionsScreen}/>
          <Stack.Screen name="Welcome" component={WelcomeScreen}/>

          {/* --- MAIN APP --- */}
          {/* Fade when entering the main app so it feels like a new "chapter" */}
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ animation: 'fade', gestureEnabled: false }} 
          />
          
          {/* --- MODALS & DETAILS --- */}
          {/* These slide up from bottom to feel like "cards" you check and put away */}
          
          <Stack.Screen 
            name="FullMap" 
            component={FullMapView} 
            options={{ animation: 'slide_from_bottom', presentation: 'transparentModal'}}
          />
          <Stack.Screen 
            name="TransitInfo" 
            component={TransitInfo} 
            options={{ animation: 'slide_from_bottom', presentation: 'transparentModal'}}
          />

          {/* Scan Flow Details */}
          <Stack.Screen 
            name="LandmarkDetails" 
            component={LandmarkDetails} 
            options={{ animation: 'slide_from_bottom', presentation: 'transparentModal'}}
          />
          <Stack.Screen 
            name="AIChat" 
            component={AIChatScreen} 
            options={{ animation: 'slide_from_bottom', presentation: 'transparentModal'}}
          />

          {/* Mastery Details */}
          <Stack.Screen 
            name="AchievementDetails" 
            component={AchievementDetails} 
            options={{ animation: 'slide_from_bottom', presentation: 'transparentModal'}} 
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}