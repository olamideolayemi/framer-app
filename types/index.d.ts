/* eslint-disable no-unused-vars */

declare type FrameSelectorProps = {
	selected: string;
	onSelect: (frame: string) => void;
};

declare type ImageUploaderProps = {
	onUpload: (imageUrl: File | string) => void;
	uploadedImage: File | string;
};

declare type FramePreviewProps = {
	image: File | string;
	frame: string;
	room: string;
	size: string;
};

declare type RoomSelectorProps = {
	selected: string;
	onSelect: (room: string) => void;
};

declare type SizeSelectorProps = {
	selected: string;
	onSelect: (size: string) => void;
};

declare interface OrderFormProps {
	image: File | string;
	frame: string;
	size: string;
	room: string;
}

// ADMIN
declare type Order = {
	name: string;
	contact: string;
	email: string;
	phone: string;
	address: string;
	frame: string;
	size: string;
	room: string;
	image?: string | File;
	status: OrderStatus;
	createdAt?: { seconds: number; nanoseconds?: number } | number | null;
	id?: string;
};

declare type Timestamp = { seconds: number; nanoseconds?: number };

declare type OrderCardProps = {
	order: Order;
	onStatusChange: (id: string, status: string) => void;
	isAdmin?: boolean;
	onDelete?: (orderId: string) => void;
	track?: (orderId: string) => void;
};

declare type StatCardProps = {
	title: string;
	value: string | number;
	icon: React.ComponentType<{ className?: string }>;
	change?: string;
	trend?: 'up' | 'down';
};

declare type OrderStatus =
	| 'Pending'
	| 'In Progress'
	| 'Shipped'
	| 'Delivered'
	| 'Cancelled'
	| 'draft';

export interface UserInfo {
	uid: string;
	email: string | null;
}
