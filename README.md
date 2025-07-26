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

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/)
- **SDK**: [Expo](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/routing/introduction/)
- **Styling**: React Native StyleSheet
- **Icons**: [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
- **Storage**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- **Images**: [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)
- **State Management**: React Hooks (useState, useEffect, useContext)
- **API Integration**: RESTful API integration (currently using mock data)

## 📂 Project Structure

```
myApp/
├── app/                 # Expo Router app directory
│   ├── _layout.tsx      # Root layout component
│   ├── index.tsx        # Main app entry point
│   └── [...missing].tsx # 404 page
├── assets/              # Static assets (images, fonts)
├── components/          # Reusable UI components
│   ├── news/            # News-specific components
│   ├── screens/         # Screen components
│   └── ui/              # UI utility components
├── constants/           # App constants
├── hooks/               # Custom React hooks
├── services/            # API services
└── scripts/             # Utility scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional for mobile testing)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/news-app.git
   cd news-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. Run on a specific platform
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

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

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

Please ensure your code follows the existing style and includes appropriate tests.

## 📝 Notes for GitHub Upload

This project doesn't contain any sensitive information like API keys, so it can be pushed directly to GitHub. However, when integrating with real APIs:

1. Create an `.env` file for API keys and add it to `.gitignore`
2. Consider adding a sample `.env.example` file with dummy values
3. Update the README with instructions for setting up the environment variables

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [Expo](https://expo.dev/) for the development framework
- [React Native](https://reactnative.dev/) for the mobile UI framework
- [NewsAPI](https://newsapi.org/) for the news data structure inspiration

---

Built with ❤️ using React Native and Expo
