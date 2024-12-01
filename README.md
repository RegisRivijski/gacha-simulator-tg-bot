# Gacha Simulator Telegram Bot

The gacha-simulator-tg-bot is a Telegram bot that serves as a front-end interface for the gacha-simulator-rest microservice. It handles user interactions via Telegram commands, sends requests to the REST API, and delivers responses back to users. This bot is designed to simulate gacha mechanics, manage user profiles, and provide additional functionalities like leaderboard and referral systems.

Features

  - Telegram Integration: Fully integrated with the Telegram API for seamless user interaction.
  - Gacha Simulation: Allows users to perform single and ten-pull gacha draws.
  - Profile Management: Enables users to view and manage their in-game profiles directly through the bot.
  - Inventory and History: Provides access to user inventory and gacha history.
  - Leaderboard: Displays the leaderboard rankings.
  - Rate Limiting: Prevents spam and abuse through rate-limited commands.
  - Cron Jobs: Handles automated notifications, analytics, and advertisement updates.
  - Proxy Requests: Sends all relevant requests to the gacha-simulator-rest microservice for data processing.

Installation

1. Clone the repository:

```bash
git clone https://github.com/RegisRivijski/gacha-simulator-tg-bot.git
cd gacha-simulator-tg-bot
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file and configure the following variables:

```dotenv
GACHA_SIMULATOR_TG_BOT_API_TOKEN=your_telegram_bot_api_token
GACHA_SIMULATOR_REST_API_KEY=your_gacha_simulator_rest_api_key
GACHA_SIMULATOR_REST_HOST=your_gacha_simulator_rest_host
GACHA_SIMULATOR_REST_PORT=your_gacha_simulator_rest_port
REDIS_URL=your_redis_url
REDIS_HOSTNAME=your_redis_hostname
REDIS_PORT=your_redis_port
DEFAULT_LANGUAGE_CODE=en
```

4. Start the bot:

```bash
npm start
```

## Configuration

### Redis

 - Used for caching and managing rate limits.

### REST API

 - Communicates with the gacha-simulator-rest microservice to handle all business logic and data operations.

### Cron Jobs

1. Primogem Notifications:
   - ID: PRIMOGEMS_LIMIT_CRON_NAME
   - Type: Notification
   - Schedule: 15 7 * * * (7:15 AM daily)
   - Process: Sends notifications about primogem limits.
2. Analytics Configuration:
   - ID: CONFIGURE_NOTIFICATION_CRON_NAME
   - Type: Analytics
   - Schedule: 0 0 * * * (Midnight daily)
   - Process: Configures daily analytics updates.
3. Advertisement Updates:
   - ID: ADVERTISEMENT_CRON_NAME
   - Type: Advertisement
   - Schedule: * * * * * (Every minute)
   - Process: Updates advertisements automatically.

## Dependencies

 - Telegraf: Framework for building Telegram bots.
 - Axios: HTTP client for sending requests to the REST API.
 - Bull: Job queue for managing cron jobs.
 - Redis: Used for caching and rate-limiting.
 - Express: Serves as a lightweight REST API for monitoring and debugging jobs.

## Contribution

Feel free to contribute to the project by opening issues or submitting pull requests.

## Disclaimer

This bot is intended for entertainment purposes and serves as a front-end for a gacha simulation system. It does not involve real-world monetary transactions or probabilities.
