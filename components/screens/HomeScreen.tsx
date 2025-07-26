import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, RefreshControl, View, Alert, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { NewsCard } from '@/components/news/NewsCard';
import { CategorySelector } from '@/components/news/CategorySelector';
import { SearchBar } from '@/components/news/SearchBar';
import { useThemeColor } from '@/hooks/useThemeColor';
import { NewsService, NewsArticle } from '@/services/NewsService';
import { ArticleView } from '@/components/news/ArticleView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export function HomeScreen() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const insets = useSafeAreaInsets();
  
  const tintColor = useThemeColor({}, 'tint');

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await NewsService.getTopHeadlines(selectedCategory);
      
      if (response && Array.isArray(response.articles)) {
        setNews(response.articles);
        setFilteredNews(response.articles);
      } else {
        setError('Could not load news at this time');
        setNews([]);
        setFilteredNews([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Network error. Please check your connection and try again.');
      setNews([]);
      setFilteredNews([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setIsSearching(false);
      setFilteredNews(news);
    } else {
      setIsSearching(true);
      const filtered = news.filter(item => 
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredNews(filtered);
    }
  }, [searchQuery, news]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleArticlePress = (article: NewsArticle) => {
    try {
      // Make sure article has all required fields before setting it
      if (article && article.title) {
        setSelectedArticle(article);
      } else {
        Alert.alert(
          "Article Unavailable",
          "Sorry, this article cannot be displayed at the moment.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error('Error handling article press:', error);
      Alert.alert(
        "Error",
        "Something went wrong. Please try again later.",
        [{ text: "OK" }]
      );
    }
  };
  
  const handleBackFromArticle = () => {
    setSelectedArticle(null);
  };

  const renderEmptyState = () => {
    // Show different empty states based on whether we're searching or not
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={50} color={tintColor} style={styles.emptyIcon} />
          <ThemedText style={styles.emptyHeaderText}>
            {error}
          </ThemedText>
          <ThemedText style={styles.emptyText}>
            We're experiencing some technical difficulties. Please try again later.
          </ThemedText>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <ThemedText style={styles.refreshButtonText}>Try Again</ThemedText>
          </TouchableOpacity>
        </View>
      );
    }
    
    if (isSearching) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={50} color={tintColor} style={styles.emptyIcon} />
          <ThemedText style={styles.emptyHeaderText}>
            No Results Found
          </ThemedText>
          <ThemedText style={styles.emptyText}>
            We couldn't find any articles matching "{searchQuery}".
            Try different keywords or browse by category.
          </ThemedText>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="newspaper-outline" size={50} color={tintColor} style={styles.emptyIcon} />
        <ThemedText style={styles.emptyHeaderText}>
          No News Available
        </ThemedText>
        <ThemedText style={styles.emptyText}>
          We're currently under maintenance. Please check back later for the latest updates.
        </ThemedText>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <ThemedText style={styles.refreshButtonText}>Refresh</ThemedText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {selectedArticle ? (
        <ArticleView article={selectedArticle} onBack={handleBackFromArticle} />
      ) : (
        <>
          <SearchBar onSearch={handleSearch} />
          <CategorySelector 
            selectedCategory={selectedCategory} 
            onCategorySelect={handleCategorySelect} 
          />
          
          {loading && !refreshing ? (
            <ActivityIndicator size="large" color={tintColor} style={styles.loader} />
          ) : filteredNews.length > 0 ? (
            <FlatList
              data={filteredNews}
              keyExtractor={(item, index) => `${item.url || ''}-${index}`}
              renderItem={({ item }) => <NewsCard article={item} onPress={handleArticlePress} />}
              contentContainerStyle={[
                styles.newsList,
                { paddingBottom: 80 + insets.bottom } // Add extra padding for tab bar
              ]}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  tintColor={tintColor}
                />
              }
            />
          ) : (
            renderEmptyState()
          )}
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsList: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
    opacity: 0.7,
  },
  refreshButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  touchableOpacity: {
    opacity: 1,
  }
}); 