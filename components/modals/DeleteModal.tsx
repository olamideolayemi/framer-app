import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type DeleteModalProps = {
	deleteTarget: { id: string } | null;
	deleting: boolean;
	onCancel: () => void;
	onConfirm: () => void;
};

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

const modalVariants = {
	hidden: { opacity: 0, scale: 0.9, y: 50 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
	},
	exit: { opacity: 0, scale: 0.9, y: 50 },
};

const DeleteModal = ({
	deleteTarget,
	deleting,
	onCancel,
	onConfirm,
}: DeleteModalProps) => {
	if (!deleteTarget) return null;

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onCancel();
		};
		if (deleteTarget) {
			document.addEventListener('keydown', handleKey);
		}
		return () => document.removeEventListener('keydown', handleKey);
	}, [deleteTarget, onCancel]);

	return (
		<AnimatePresence>
			{deleteTarget && (
				<motion.div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm'
					variants={backdropVariants}
					initial='hidden'
					animate='visible'
					exit='exit'
				>
					<motion.div
						className='bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full'
						variants={modalVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
					>
						<h2 className='text-lg font-semibold text-gray-900 mb-2'>
							Delete Order?
						</h2>
						<p className='text-gray-600 mb-4'>
							Are you sure you want to delete{' '}
							<span className='font-semibold text-teal-600'>
								Order #{deleteTarget.id}
							</span>
							? This action cannot be undone.
						</p>
						<div className='flex justify-end space-x-3'>
							<button
								className='px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition'
								onClick={onCancel}
								disabled={deleting}
							>
								Cancel
							</button>
							<button
								className='px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50'
								onClick={onConfirm}
								disabled={deleting}
							>
								{deleting ? 'Deleting...' : 'Delete'}
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default DeleteModal;
