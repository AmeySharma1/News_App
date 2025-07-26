import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { NewsArticle } from '@/services/NewsService';
import { Ionicons } from '@expo/vector-icons';

interface NewsCardProps {
  article: NewsArticle;
  onPress?: (article: NewsArticle) => void;
}

const { width } = Dimensions.get('window');

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Unknown date';
  
  try {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (error) {
    return 'Unknown date';
  }
};

export function NewsCard({ article, onPress }: NewsCardProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const [imageError, setImageError] = useState(false);
  
  const handlePress = () => {
    if (onPress && article) {
      onPress(article);
    }
  };
  
  const placeholderImage = 'https://picsum.photos/id/290/800/600';
  
  if (!article) {
    return (
      <ThemedView 
        style={[styles.card, { backgroundColor: backgroundColor === '#fff' ? '#fff' : '#1E1E1E' }]}
      >
        <View style={[styles.image, styles.missingImage]}>
          <Ionicons name="newspaper-outline" size={40} color="#999" />
        </View>
        <View style={styles.contentContainer}>
          <ThemedText style={styles.title}>Unable to load article</ThemedText>
          <ThemedText style={styles.description}>This article is currently unavailable.</ThemedText>
        </View>
      </ThemedView>
    );
  }
  
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: backgroundColor === '#fff' ? '#fff' : '#1E1E1E' }]} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: article.urlToImage || placeholderImage }}
          style={styles.image}
          contentFit="cover"
          transition={300}
          onError={() => setImageError(true)}
        />
        {imageError && (
          <View style={styles.missingImage}>
            <Ionicons name="image-outline" size={40} color="#999" />
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <ThemedView style={styles.sourceContainer}>
          <ThemedText style={styles.source}>{article.source?.name || 'Unknown Source'}</ThemedText>
          <ThemedText style={styles.date}>{formatDate(article.publishedAt)}</ThemedText>
        </ThemedView>
        
        <ThemedText style={styles.title}>{article.title || 'Untitled Article'}</ThemedText>
        
        {article.description ? (
          <ThemedText style={styles.description} numberOfLines={2}>
            {article.description}
          </ThemedText>
        ) : (
          <ThemedText style={styles.description} numberOfLines={2}>
            No description available for this article.
          </ThemedText>
        )}
        
        <ThemedText style={styles.readMore}>Read more →</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: 200,
  },
  missingImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 15,
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  source: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  date: {
    fontSize: 12,
    color: '#687076',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  readMore: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '500',
    marginTop: 5,
  }
}); 