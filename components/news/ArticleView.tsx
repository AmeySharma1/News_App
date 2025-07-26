import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Share, View } from 'react-native';
import { Image } from 'expo-image';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { NewsArticle } from '@/services/NewsService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ArticleViewProps {
  article: NewsArticle;
  onBack: () => void;
}

const BOOKMARKS_STORAGE_KEY = 'news_bookmarks';

// Helper function to check if an article is bookmarked
const isArticleBookmarked = async (articleUrl: string): Promise<boolean> => {
  try {
    const bookmarksJson = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (bookmarksJson) {
      const bookmarks: NewsArticle[] = JSON.parse(bookmarksJson);
      return bookmarks.some(bookmark => bookmark.url === articleUrl);
    }
    return false;
  } catch (error) {
    console.error('Error checking bookmark status:', error);
    return false;
  }
};

// Helper function to add or remove a bookmark
const toggleBookmark = async (article: NewsArticle): Promise<boolean> => {
  try {
    // Get current bookmarks
    const bookmarksJson = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
    let bookmarks: NewsArticle[] = bookmarksJson ? JSON.parse(bookmarksJson) : [];
    
    // Check if article is already bookmarked
    const existingIndex = bookmarks.findIndex(bookmark => bookmark.url === article.url);
    
    if (existingIndex >= 0) {
      // Remove bookmark
      bookmarks.splice(existingIndex, 1);
      await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
      return false;
    } else {
      // Add bookmark
      bookmarks.push(article);
      await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
      return true;
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return false;
  }
};

export function ArticleView({ article, onBack }: ArticleViewProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  // Load bookmark status when component mounts
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (article?.url) {
        const bookmarked = await isArticleBookmarked(article.url);
        setIsBookmarked(bookmarked);
      }
    };
    
    checkBookmarkStatus();
  }, [article?.url]);

  const handleBookmark = async () => {
    if (article) {
      const newStatus = await toggleBookmark(article);
      setIsBookmarked(newStatus);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article?.title || 'News article'} - Read more: ${article?.url || ''}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const formatDate = useCallback((dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return dateString || 'Unknown date';
    }
  }, []);

  // Error handling - If article is missing essential data
  if (!article || !article.title) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Error</ThemedText>
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={60} color={tintColor} style={styles.errorIcon} />
          <ThemedText style={styles.errorText}>
            We couldn't load this article.
          </ThemedText>
          <ThemedText style={styles.errorSubtext}>
            The article may be temporarily unavailable. Please try again later.
          </ThemedText>
          <TouchableOpacity 
            style={styles.backToNewsButton} 
            onPress={onBack}
          >
            <ThemedText style={styles.backToNewsText}>Back to news</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle} numberOfLines={1}>
          {article.source?.name || 'News'}
        </ThemedText>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={handleBookmark} style={styles.headerButton}>
            <Ionicons 
              name={isBookmarked ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color={tintColor} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color={tintColor} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: article.urlToImage || 'https://picsum.photos/id/237/800/600' }}
            style={styles.image}
            contentFit="cover"
            onError={() => setImageError(true)}
          />
          {imageError && (
            <View style={styles.imageFallback}>
              <Ionicons name="image-outline" size={40} color="#999" />
              <ThemedText style={styles.imageFallbackText}>Image unavailable</ThemedText>
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          <ThemedText style={styles.title}>{article.title}</ThemedText>
          
          <View style={styles.meta}>
            <ThemedText style={styles.source}>{article.source?.name || 'Unknown source'}</ThemedText>
            <ThemedText style={styles.date}>{formatDate(article.publishedAt || '')}</ThemedText>
          </View>
          
          {article.author && (
            <ThemedText style={styles.author}>By {article.author}</ThemedText>
          )}
          
          {article.description ? (
            <ThemedText style={styles.description}>{article.description}</ThemedText>
          ) : (
            <ThemedText style={styles.description}>No description available for this article.</ThemedText>
          )}
          
          {article.content ? (
            <ThemedText style={styles.contentText}>{article.content}</ThemedText>
          ) : (
            <ThemedText style={styles.contentText}>Full content unavailable. Please visit the source website for more information.</ThemedText>
          )}
          
          {article.url ? (
            <ThemedText style={styles.fullArticle}>
              For the full article, visit {article.url}
            </ThemedText>
          ) : (
            <ThemedText style={styles.fullArticle}>
              Source link unavailable
            </ThemedText>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 5,
  },
  backButton: {
    padding: 8,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  imageFallbackText: {
    marginTop: 8,
    color: '#999',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  source: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  date: {
    fontSize: 14,
    color: '#687076',
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 16,
    color: '#687076',
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    lineHeight: 26,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  fullArticle: {
    marginTop: 30,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#687076',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorIcon: {
    marginBottom: 20,
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorSubtext: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#687076',
  },
  backToNewsButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backToNewsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 