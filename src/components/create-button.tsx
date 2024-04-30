'use client';

import router from 'next/router';
import * as React from 'react';

import { Button } from '~/components/ui/button';

export function CreateButton() {
	return <Button onClick={() => router.push('/create')}>Create an Item</Button>;
}
