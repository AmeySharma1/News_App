import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, View, RefreshControl } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { NewsCard } from '@/components/news/NewsCard';
import { NewsArticle } from '@/services/NewsService';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ArticleView } from '@/components/news/ArticleView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const BOOKMARKS_STORAGE_KEY = 'news_bookmarks';

export function BookmarkScreen() {
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const insets = useSafeAreaInsets();
  
  const loadBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const bookmarksJson = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (bookmarksJson) {
        const loadedBookmarks: NewsArticle[] = JSON.parse(bookmarksJson);
        setBookmarks(loadedBookmarks);
      } else {
        setBookmarks([]);
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      setBookmarks([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Load bookmarks when the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [loadBookmarks])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadBookmarks();
  };
  
  const handleArticlePress = (article: NewsArticle) => {
    setSelectedArticle(article);
  };
  
  const handleBackFromArticle = () => {
    setSelectedArticle(null);
    // Reload bookmarks when going back - the bookmark status might have changed
    loadBookmarks();
  };

  return (
    <ThemedView style={styles.container}>
      {selectedArticle ? (
        <ArticleView article={selectedArticle} onBack={handleBackFromArticle} />
      ) : (
        bookmarks.length > 0 ? (
          <FlatList
            data={bookmarks}
            keyExtractor={(item, index) => `${item.url || ''}-${index}`}
            renderItem={({ item }) => <NewsCard article={item} onPress={handleArticlePress} />}
            contentContainerStyle={[
              styles.list,
              { paddingBottom: Math.max(insets.bottom, 10) + 60 }
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
          <View style={styles.emptyState}>
            <Ionicons name="bookmark-outline" size={70} color={iconColor} />
            <ThemedText style={styles.emptyTitle}>No bookmarks yet</ThemedText>
            <ThemedText style={styles.emptyText}>
              Save articles for later by tapping the bookmark icon when reading a story.
            </ThemedText>
          </View>
        )
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
}); 