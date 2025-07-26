import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { id: 'general', label: 'General' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'health', label: 'Health' }
];

const { width } = Dimensions.get('window');

export function CategorySelector({ selectedCategory, onCategorySelect }: CategorySelectorProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  // Custom colors for dark mode
  const darkModeBgColor = '#333';
  const darkModeBorderColor = '#555';
  
  return (
    <View style={[
      styles.outerContainer,
      { backgroundColor: isDarkMode ? '#1A1A1A' : 'rgba(0,0,0,0.03)' }
    ]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        decelerationRate="fast"
        snapToInterval={width / 3}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                { 
                  backgroundColor: isSelected 
                    ? tintColor 
                    : isDarkMode ? darkModeBgColor : 'white' 
                },
                { 
                  borderColor: isSelected 
                    ? tintColor 
                    : isDarkMode ? darkModeBorderColor : '#ccc' 
                }
              ]}
              onPress={() => onCategorySelect(category.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  { 
                    color: isSelected 
                      ? '#ffffff' 
                      : isDarkMode ? '#ffffff' : textColor,
                    fontWeight: isSelected ? '600' : '500'
                  }
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: 5,
    marginBottom: 5,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryText: {
    fontSize: 15,
    textAlign: 'center',
  },
}); 