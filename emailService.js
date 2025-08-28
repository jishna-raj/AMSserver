const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

// Validate environment variables
if (!accountSid || !authToken || !twilioPhone) {
    throw new Error('Twilio credentials not properly configured in environment variables');
}

const client = twilio(accountSid, authToken);

exports.sendBulkSMS = async (message, phoneNumbers) => {
    // Validate input parameters
    if (!message || !phoneNumbers || !Array.isArray(phoneNumbers)) {
        throw new Error('Invalid parameters: message and phoneNumbers array required');
    }

    try {
        const results = await Promise.allSettled(
            phoneNumbers.map(async (number) => {
                try {
                    // Validate phone number format (basic check)
                    if (!number.startsWith('+')) {
                        throw new Error('Phone number must be in E.164 format (e.g., +15551234567)');
                    }

                    const msg = await client.messages.create({
                        body: message,
                        from: twilioPhone,
                        to: number
                    });
                    
                    console.log(`Message sent to ${number}, SID: ${msg.sid}`);
                    return {
                        phoneNumber: number,
                        status: 'fulfilled',
                        sid: msg.sid
                    };
                } catch (error) {
                    console.error(`Failed to send to ${number}:`, error.message);
                    return {
                        phoneNumber: number,
                        status: 'rejected',
                        error: error.message
                    };
                }
            })
        );

        // Process results
        const formattedResults = results.map(result => {
            if (result.status === 'fulfilled') {
                return {
                    phoneNumber: result.value.phoneNumber,
                    status: 'fulfilled',
                    sid: result.value.sid
                };
            } else {
                return {
                    phoneNumber: result.reason.phoneNumber,
                    status: 'rejected',
                    error: result.reason.error
                };
            }
        });

        return formattedResults;
    } catch (error) {
        console.error('Bulk SMS processing error:', error);
        throw error;
    }
};