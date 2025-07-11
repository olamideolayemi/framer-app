/* eslint-disable no-unused-vars */

declare type FrameSelectorProps = {
	selected: string;
	onSelect: (frame: string) => void;
};

declare type ImageUploaderProps = {
	onUpload: (imgUrl: string) => void;
};

declare type FramePreviewProps = {
	image: string | null;
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
	address: string;
	frame: string;
	size: string;
	room: string;
	image: string;
	status: string;
	createdAt: string;
	id?: string;
};
