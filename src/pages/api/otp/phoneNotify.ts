import { env } from '~/env';
import type { NextApiRequest, NextApiResponse } from 'next';
import Twilio from 'twilio';

const phoneNotify = async (req: NextApiRequest, res: NextApiResponse) => {
	const { phoneNumber, notifyType } = req.body as { phoneNumber: string; notifyType: string };
	let messageBody;
	switch (notifyType) {
		case 'newMessage':
			messageBody = 'You have recieved a new message on your listing.';
			break;
		case 'newNewMessage':
			messageBody = 'A new buyer sent you a message on your listing.';
			break;
		case 'newOffer':
			messageBody = 'You have recieved a new Offer on your listing.';
			break;
		default:
			messageBody = 'There is something exciting waiting for you in FlipMart. Visit now!';
			break;
	}
	const client = Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
	try {
		const result = await client.messages.create({
			to: '+1' + phoneNumber,
			from: env.TWILIO_PHONE_NUMBER,
			body: messageBody,
		});
		if (result.status === 'sent' || 'queued') {
			res.status(200).json({ msg: `Message sent!` });
		} else {
			res.status(500).json({ msg: `Failed to send message => ${String(result.status)}` });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: `Failed to send message => error` });
	}
};

export default phoneNotify;
