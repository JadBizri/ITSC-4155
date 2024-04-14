import { env } from '~/env';
import type { NextApiRequest, NextApiResponse } from 'next';
import Twilio from 'twilio';

const otpSend = async (req: NextApiRequest, res: NextApiResponse) => {
	const { phoneNumber } = req.body as { phoneNumber: string };
	const client = Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
	try {
		const result = await client.verify.v2
			.services(env.TWILIO_VERIFICATION_SERVICE_SID)
			.verifications.create({ to: '+1' + phoneNumber, channel: 'sms', locale: 'en' });
		if (result.status === 'pending') {
			res.status(200).json({ msg: `Verification code sent!` });
		} else {
			res.status(500).json({ msg: `Failed to send OTP => ${String(result.status)}` });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: `Failed to send OTP => ${String(error)}` });
	}
};

export default otpSend;
