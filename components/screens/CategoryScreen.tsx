import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { CategorySelector } from '@/components/news/CategorySelector';
import { useThemeColor } from '@/hooks/useThemeColor';

export function CategoryScreen() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} type="title">Browse News By Category</ThemedText>
      <ThemedText style={styles.subtitle}>Select a category to view top news</ThemedText>
      
      <CategorySelector 
        selectedCategory={selectedCategory} 
        onCategorySelect={setSelectedCategory} 
      />
      
      <ThemedView style={styles.categoryDescription}>
        <ThemedText style={styles.categoryTitle}>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</ThemedText>
        <ThemedText style={styles.categoryInfo}>
          {getCategoryDescription(selectedCategory)}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    general: 'Get a broad overview of top stories across various topics including politics, world events, entertainment, and more.',
    business: 'Stay informed about financial markets, company news, economic trends, and business developments worldwide.',
    technology: 'Discover the latest innovations, product launches, scientific breakthroughs, and tech industry insights.',
    sports: 'Follow the latest results, transfers, and stories from sports teams and athletes around the world.',
    health: 'Learn about medical breakthroughs, health research, wellness tips, and healthcare policy updates.',
  };
  
  return descriptions[category] || 'Select a category to see relevant news articles.';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    marginBottom: 20,
    opacity: 0.7,
  },
  categoryDescription: {
    marginTop: 30,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#f2f2f2', // Will be overridden in dark mode
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryInfo: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 