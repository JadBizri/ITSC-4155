import { env } from '~/env';
import type { NextApiRequest, NextApiResponse } from 'next';
import Twilio from 'twilio';

const otpVerify = async (req: NextApiRequest, res: NextApiResponse) => {
	const { phoneNumber, otpCode } = req.body as { phoneNumber: string; otpCode: string };
	const client = Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

	try {
		const result = await client.verify.v2
			.services(env.TWILIO_VERIFICATION_SERVICE_SID)
			.verificationChecks.create({ to: '+1' + phoneNumber, code: otpCode });
		if (result.status === 'approved') {
			res.status(200).json({ msg: `Verified!` });
		} else {
			res.status(500).json({ msg: `Failed to verify ` + String(result.status) });
			//res.status(500).json({ result });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error as Occured' });
	}
};

export default otpVerify;
