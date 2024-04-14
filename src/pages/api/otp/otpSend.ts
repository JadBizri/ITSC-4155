import { env } from '~/env';
import type { NextApiRequest, NextApiResponse } from 'next';
import Twilio from 'twilio';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	var { phoneNumber } = req.body;
	const client = Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
	try {
		const result = await client.verify.v2
			.services(env.TWILIO_VERIFICATION_SERVICE_SID)
			.verifications.create({ to: '+1' + phoneNumber, channel: 'sms', locale: 'en' });
		if (result.status === 'pending') {
			res.status(200).json({ msg: `Verification code sent!` });
		} else {
			res.status(500).json({ msg: `Failed to send OTP => ${result.status}` });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: `Failed to send OTP => ${error}` });
	}
};
