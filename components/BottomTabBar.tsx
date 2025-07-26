import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabName = 'home' | 'categories' | 'bookmarks' | 'settings';

interface BottomTabBarProps {
  activeTab: TabName;
  setActiveTab: (tab: TabName) => void;
}

export function BottomTabBar({ activeTab, setActiveTab }: BottomTabBarProps) {
  const tintColor = useThemeColor({}, 'tint');
  const tabIconDefaultColor = useThemeColor({}, 'tabIconDefault');
  const backgroundColor = useThemeColor({}, 'background');
  const insets = useSafeAreaInsets();
  
  // Ensure bottom inset is applied with minimum padding
  const bottomPadding = Math.max(insets.bottom, 5);
  
  return (
    <View 
      style={[
        styles.tabBar, 
        { 
          backgroundColor: backgroundColor === '#fff' ? '#fff' : '#1A1A1A',
          paddingBottom: bottomPadding,
          height: 60 + bottomPadding,
        }
      ]}
    >
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setActiveTab('home')}
      >
        <Ionicons
          name={activeTab === 'home' ? 'home' : 'home-outline'}
          size={24}
          color={activeTab === 'home' ? tintColor : tabIconDefaultColor}
        />
        <ThemedText style={[
          styles.tabLabel,
          { color: activeTab === 'home' ? tintColor : tabIconDefaultColor }
        ]}>
          Home
        </ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setActiveTab('categories')}
      >
        <Ionicons
          name={activeTab === 'categories' ? 'apps' : 'apps-outline'}
          size={24}
          color={activeTab === 'categories' ? tintColor : tabIconDefaultColor}
        />
        <ThemedText style={[
          styles.tabLabel,
          { color: activeTab === 'categories' ? tintColor : tabIconDefaultColor }
        ]}>
          Categories
        </ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setActiveTab('bookmarks')}
      >
        <Ionicons
          name={activeTab === 'bookmarks' ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color={activeTab === 'bookmarks' ? tintColor : tabIconDefaultColor}
        />
        <ThemedText style={[
          styles.tabLabel,
          { color: activeTab === 'bookmarks' ? tintColor : tabIconDefaultColor }
        ]}>
          Bookmarks
        </ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setActiveTab('settings')}
      >
        <Ionicons
          name={activeTab === 'settings' ? 'settings' : 'settings-outline'}
          size={24}
          color={activeTab === 'settings' ? tintColor : tabIconDefaultColor}
        />
        <ThemedText style={[
          styles.tabLabel,
          { color: activeTab === 'settings' ? tintColor : tabIconDefaultColor }
        ]}>
          Settings
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 100,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 3,
  },
}); 