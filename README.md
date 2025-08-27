# Monopoly App

## Overview
This project is a web-based Monopoly game that allows 3 to 6 players to enjoy a digital version of the classic board game. The application consists of multiple screens, including a start screen, rules explanation, and the main gameplay screen.

## Project Structure
```
monopoly-app
├── src
│   ├── start.html          # HTML for the start screen
│   ├── rules.html         # HTML for the rules explanation screen
│   ├── game.html          # HTML for the gameplay screen
│   ├── css
│   │   ├── start.css      # Styles for the start screen
│   │   ├── rules.css      # Styles for the rules screen
│   │   └── game.css       # Styles for the game screen
│   └── js
│       ├── start.js       # JavaScript for the start screen functionality
│       ├── rules.js       # JavaScript for the rules screen functionality
│       └── game.js        # JavaScript for the game logic
├── package.json            # npm configuration file
└── README.md               # Project documentation
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using npm:
   ```
   npm install
   ```
4. Open the `src/start.html` file in your web browser to begin playing.

## Gameplay Details
- Players can select the number of participants (3 to 6).
- The game follows traditional Monopoly rules with some modifications.
- Players start with a set amount of money and take turns purchasing properties.
- The rules are detailed in the `rules.html` file.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.