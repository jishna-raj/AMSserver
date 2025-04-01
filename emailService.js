const twilio = require('twilio');


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

exports.sendBulkSMS = async (message, phoneNumbers) => {
  try {
    const results = await Promise.allSettled(
      phoneNumbers.map(async (number) => {
        return client.messages.create({
          body: message,
          from: twilioPhone,
          to: number
        });
      })
    );

    return results.map((result, index) => ({
      phoneNumber: phoneNumbers[index],
      status: result.status,
      error: result.status === 'rejected' ? result.reason : null
    }));
  } catch (error) {
    console.error('Bulk SMS error:', error);
    throw error;
  }
};