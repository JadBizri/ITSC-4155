import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { SiteHeader } from '~/components/site-header';
import Head from 'next/head';
import router from 'next/router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import React from 'react';
import { ProfileImage } from '~/components/ui/profile-img';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { PatternFormat } from 'react-number-format';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '~/components/ui/input-otp';
import otpVerify from './api/otp/otpVerify';
import { api } from '~/utils/api';

export default function Profile() {
	const mutation = api.user.verifyUser.useMutation();

	const { data: sessionData } = useSession();
	const [phoneNumber, setPhoneNumber] = useState('');
	const [otpCode, setOtpCode] = useState('');
	const [otpSent, setOtpSent] = useState(false);
	const [phoneVerified, setPhoneVerified] = useState(false);
	const [loading, setLoading] = useState(false);
	const [feedbackMessage, setFeedbackMessage] = useState('');

	if (!sessionData) {
		return (
			<>
				<Head>
					<title>Unauthorized Access</title>
					<meta name="error" content="Error" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
					<SiteHeader />
					<h1 className="m-auto text-center text-4xl">
						Unauthorized Access: You need to be signed in to view this page
					</h1>
				</div>
			</>
		);
	}
	const handleSendOTP = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/otp/otpSend', { phoneNumber });
			if (response.status === 200) {
				setOtpSent(true);
			} else {
				setOtpSent(false);
			}
			setOtpSent(true);
		} catch (error) {
			setOtpSent(false);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyOTP = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/otp/otpVerify', { phoneNumber, otpCode });
			if (response.status === 200) {
				setPhoneVerified(true);
				await mutation.mutateAsync({ phone: phoneNumber, phoneVerified: new Date() });
			} else {
				setPhoneVerified(false);
			}
		} catch (error) {
			setPhoneVerified(false);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const handleOtpChange = async (otp: string) => {
		setOtpCode(otp);
	};
	return (
		<>
			<Head>
				<title>FlipMart Profile</title>
				<meta name="description" content="Profile page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
				<SiteHeader />
				<div className="mt-8 flex flex-col items-center space-y-10 text-center">
					<div className="flex flex-col items-center">
						{sessionData.user.image && <ProfileImage imageUrl={sessionData.user.image} size="100px" />}
						<h1 className="mt-3 text-4xl">Profile Settings</h1>
						<div className="m-10 flex w-[80%]">
							<Tabs defaultValue="account" className="w-[400px]">
								<TabsList className="grid w-full grid-cols-1">
									<TabsTrigger value="account">Account</TabsTrigger>
								</TabsList>
								<TabsContent value="account">
									<Card>
										<CardHeader>
											<CardTitle>Phone Number</CardTitle>
											<CardDescription>Add a phone number to your account here and verify it.</CardDescription>
										</CardHeader>
										<CardContent className="space-y-2">
											<div className="space-y-1">
												<PatternFormat
													format="+1 (###) ### ####"
													allowEmptyFormatting
													placeholder="(555) 555 5555"
													customInput={Input}
													onValueChange={values => setPhoneNumber(values.value)}
												/>
											</div>
										</CardContent>
										<CardFooter>
											<Popover>
												<PopoverTrigger asChild>
													<Button onClick={handleSendOTP} variant="outline" className="m-auto">
														Send Verification Code
													</Button>
												</PopoverTrigger>
												<div className="flex flex-col items-center justify-center">
													{otpSent ? (
														<PopoverContent className="w-80">
															<div className="flex flex-col items-center justify-center">
																<InputOTP maxLength={6} onChange={handleOtpChange}>
																	<InputOTPGroup>
																		<InputOTPSlot index={0} />
																		<InputOTPSlot index={1} />
																		<InputOTPSlot index={2} />
																	</InputOTPGroup>
																	<InputOTPSeparator />
																	<InputOTPGroup>
																		<InputOTPSlot index={3} />
																		<InputOTPSlot index={4} />
																		<InputOTPSlot index={5} />
																	</InputOTPGroup>
																</InputOTP>
																<Popover>
																	<PopoverTrigger asChild>
																		<Button
																			variant="outline"
																			className="mx-auto my-2"
																			onClick={handleVerifyOTP}
																			disabled={loading}
																		>
																			{' '}
																			Verify Code{' '}
																		</Button>
																	</PopoverTrigger>
																	<PopoverContent>
																		{loading ? (
																			<p>Verifying...</p>
																		) : phoneVerified ? (
																			<p className="text-green-500">Phone number has been added and verified!</p>
																		) : (
																			<p className="text-red-500">Fail to verify phone number</p>
																		)}
																	</PopoverContent>
																</Popover>
															</div>
														</PopoverContent>
													) : (
														<PopoverContent>
															{loading ? (
																<p>Sending...</p>
															) : (
																<p className="text-red-500">Fail to send OTP...please try again later.</p>
															)}
														</PopoverContent>
													)}
												</div>
											</Popover>
										</CardFooter>
									</Card>
								</TabsContent>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
