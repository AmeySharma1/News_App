# News App

A modern, responsive news application built with React Native and Expo. This app provides a seamless news browsing experience with features like category filtering, bookmarking, and dark mode support.

## 📱 Features

- **Latest News**: Browse the most recent headlines across multiple categories
- **Category Filtering**: Filter news by General, Business, Technology, Sports, and Health categories
- **Search Functionality**: Search for specific news articles
- **Bookmarking**: Save articles to read later
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Optimized for various screen sizes
- **Error Handling**: Graceful error handling and fallback UI states
- **Offline Support**: View previously loaded content when offline
- **Article Detail View**: Read full articles within the app

## 📱 Usage

### Home Screen
The home screen displays the latest news articles. You can:
- Scroll through articles
- Pull down to refresh
- Tap on article cards to read the full article
- Use the category pills at the top to filter news by category
- Use the search bar to find specific news

### Article Screen
When viewing an article, you can:
- Bookmark for later reading
- Share the article
- Return to the news feed with the back button

### Bookmarks
Access your saved articles by:
- Navigating to the Bookmarks tab
- Tap on any saved article to read it
- Pull down to refresh the list
- Bookmarks are persisted between app sessions

### Settings
In the settings screen, you can:
- Toggle between light, dark, or system theme
- Adjust text size
- Toggle notification preferences
- Clear cache

## 🔍 Implementation Details

### News Data
Currently, the app uses mock data provided in the `NewsService.ts` file. In a production environment, you would integrate with a real news API like NewsAPI.org by:

1. Obtaining an API key from the service
2. Replacing the mock data fetching with actual API calls
3. Adding the API key to your environment variables (not in source control)

### Error Handling
The app implements comprehensive error handling to ensure a smooth user experience:

- Network error states
- Empty state views
- Image loading fallbacks
- Data validation

### State Management
Application state is managed using React's Context API and hooks. Local component state is handled with useState, while more complex state logic uses useReducer.

## 🙏 Acknowledgements

- [Expo](https://expo.dev/) for the development framework
- [React Native](https://reactnative.dev/) for the mobile UI framework
- [NewsAPI](https://newsapi.org/) for the news data structure inspiration

---

Built with ❤️ using React Native and Expo
