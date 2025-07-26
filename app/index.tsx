import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { CategoryScreen } from '@/components/screens/CategoryScreen';
import { BookmarkScreen } from '@/components/screens/BookmarkScreen';
import { SettingsScreen } from '@/components/screens/SettingsScreen';
import { BottomTabBar } from '@/components/BottomTabBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabName = 'home' | 'categories' | 'bookmarks' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const insets = useSafeAreaInsets();

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'categories':
        return <CategoryScreen />;
      case 'bookmarks':
        return <BookmarkScreen />;
      case 'settings':
        return <SettingsScreen />;
    }
  };

  const getScreenTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'News';
      case 'categories':
        return 'Categories';
      case 'bookmarks':
        return 'Bookmarks';
      case 'settings':
        return 'Settings';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: getScreenTitle(),
          headerShown: true
        }} 
      />
      
      {/* Content container with padding to avoid tab bar overlap */}
      <View style={[
        styles.contentContainer, 
        { paddingBottom: Math.max(insets.bottom, 10) + 60 } // Add padding for bottom tab bar
      ]}>
        {renderScreen()}
      </View>
      
      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
}); 