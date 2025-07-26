import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useColorScheme, setThemePreference } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const [pushNotifications, setPushNotifications] = useState(true);
  const [breakingNews, setBreakingNews] = useState(true);
  const [manualTheme, setManualTheme] = useState<'system' | 'light' | 'dark'>('system');
  const [fontSize, setFontSize] = useState<'small' | 'default' | 'large'>('default');
  
  // Load saved preferences
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themePreference');
        if (savedTheme) {
          setManualTheme(JSON.parse(savedTheme));
        }
        
        const savedPushNotifications = await AsyncStorage.getItem('pushNotifications');
        if (savedPushNotifications) {
          setPushNotifications(JSON.parse(savedPushNotifications));
        }
        
        const savedBreakingNews = await AsyncStorage.getItem('breakingNews');
        if (savedBreakingNews) {
          setBreakingNews(JSON.parse(savedBreakingNews));
        }
        
        const savedFontSize = await AsyncStorage.getItem('fontSize');
        if (savedFontSize) {
          setFontSize(JSON.parse(savedFontSize));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    
    loadPreferences();
  }, []);
  
  const toggleTheme = async () => {
    try {
      // Toggle between system, light and dark
      const nextTheme = manualTheme === 'system' 
        ? 'light' 
        : manualTheme === 'light' 
          ? 'dark' 
          : 'system';
      
      setManualTheme(nextTheme);
      await setThemePreference(nextTheme);
      
      // Show confirmation toast
      Alert.alert(
        'Theme Changed', 
        `Theme set to ${nextTheme === 'system' ? 'System Default' : nextTheme === 'light' ? 'Light Mode' : 'Dark Mode'}`,
        [{ text: 'OK' }],
        { cancelable: true }
      );
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };
  
  const togglePushNotifications = async (value: boolean) => {
    setPushNotifications(value);
    await AsyncStorage.setItem('pushNotifications', JSON.stringify(value));
  };
  
  const toggleBreakingNews = async (value: boolean) => {
    setBreakingNews(value);
    await AsyncStorage.setItem('breakingNews', JSON.stringify(value));
  };
  
  const cycleFontSize = async () => {
    const nextSize = fontSize === 'small' ? 'default' : fontSize === 'default' ? 'large' : 'small';
    setFontSize(nextSize);
    await AsyncStorage.setItem('fontSize', JSON.stringify(nextSize));
  };
  
  const clearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached news articles. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: async () => {
            try {
              // In a real app, you would clear the cache here
              Alert.alert('Cache Cleared', 'All cached data has been removed.');
            } catch (error) {
              console.error('Error clearing cache:', error);
            }
          } 
        },
      ]
    );
  };
  
  const getThemeLabel = () => {
    switch(manualTheme) {
      case 'system': return 'System Default';
      case 'light': return 'Light';
      case 'dark': return 'Dark';
    }
  };
  
  const getFontSizeLabel = () => {
    switch(fontSize) {
      case 'small': return 'Small';
      case 'default': return 'Default';
      case 'large': return 'Large';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>
        
        <TouchableOpacity style={styles.settingRow} onPress={toggleTheme}>
          <View style={styles.settingInfo}>
            <Ionicons 
              name={isDarkMode ? "moon" : "sunny"} 
              size={22} 
              color={isDarkMode ? "#fff" : "#000"} 
              style={styles.settingIcon}
            />
            <ThemedText style={styles.settingText}>Theme</ThemedText>
          </View>
          <View style={styles.valueContainer}>
            <ThemedText style={styles.valueText}>{getThemeLabel()}</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#fff" : "#000"} />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow} onPress={cycleFontSize}>
          <View style={styles.settingInfo}>
            <Ionicons name="text" size={22} color={isDarkMode ? "#fff" : "#000"} style={styles.settingIcon} />
            <ThemedText style={styles.settingText}>Text Size</ThemedText>
          </View>
          <View style={styles.valueContainer}>
            <ThemedText style={styles.valueText}>{getFontSizeLabel()}</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#fff" : "#000"} />
          </View>
        </TouchableOpacity>
        
        <ThemedText style={[styles.sectionTitle, {marginTop: 30}]}>Notifications</ThemedText>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications" size={22} color={isDarkMode ? "#fff" : "#000"} style={styles.settingIcon} />
            <ThemedText style={styles.settingText}>Push Notifications</ThemedText>
          </View>
          <Switch 
            value={pushNotifications} 
            onValueChange={togglePushNotifications}
            trackColor={{ false: '#767577', true: '#0a7ea4' }}
            thumbColor={pushNotifications ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="globe" size={22} color={isDarkMode ? "#fff" : "#000"} style={styles.settingIcon} />
            <ThemedText style={styles.settingText}>Breaking News</ThemedText>
          </View>
          <Switch 
            value={breakingNews}
            onValueChange={toggleBreakingNews}
            trackColor={{ false: '#767577', true: '#0a7ea4' }}
            thumbColor={breakingNews ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
        
        <ThemedText style={[styles.sectionTitle, {marginTop: 30}]}>Data</ThemedText>
        
        <TouchableOpacity style={styles.settingRow} onPress={clearCache}>
          <View style={styles.settingInfo}>
            <Ionicons name="trash-bin-outline" size={22} color={isDarkMode ? "#fff" : "#000"} style={styles.settingIcon} />
            <ThemedText style={styles.settingText}>Clear Cache</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
        
        <ThemedText style={[styles.sectionTitle, {marginTop: 30}]}>About</ThemedText>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="information-circle" size={22} color={isDarkMode ? "#fff" : "#000"} style={styles.settingIcon} />
            <ThemedText style={styles.settingText}>Version</ThemedText>
          </View>
          <ThemedText>1.0.0</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="document-text" size={22} color={isDarkMode ? "#fff" : "#000"} style={styles.settingIcon} />
            <ThemedText style={styles.settingText}>Privacy Policy</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="help-circle" size={22} color={isDarkMode ? "#fff" : "#000"} style={styles.settingIcon} />
            <ThemedText style={styles.settingText}>Help & Support</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    opacity: 0.8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.15)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    marginRight: 5,
    fontSize: 14,
    opacity: 0.7,
  },
}); 