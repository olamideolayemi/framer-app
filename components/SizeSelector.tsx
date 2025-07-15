import { SIZE_OPTIONS } from '@/constants';
import { PRICING } from '@/constants/pricing';
import { ArrowRight } from 'lucide-react';

const SizeSelector = ({ selected, onSelect }: SizeSelectorProps) => {
	return (
		<div className='mb-8'>
			<h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
				<ArrowRight className='w-5 h-5 text-teal-600' />
				Size & Pricing
			</h3>

			<div className='space-y-3'>
				{SIZE_OPTIONS.map((size) => (
					<button
						key={size}
						onClick={() => onSelect(size)}
						className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
							selected === size
								? 'border-teal-600 bg-indigo-50 shadow-lg'
								: 'border-gray-200 hover:border-teal-100'
						}`}
					>
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-3'>
								<div className='w-8 h-8 bg-gradient-to-br from-teal-700 to-teal-600 rounded-lg flex items-center justify-center'>
									<span className='text-white font-bold text-xs'>
										{size.charAt(1)}
									</span>
								</div>
								<div>
									<p className='font-medium text-gray-800'>{size}</p>
									<p className='text-sm text-gray-500'>Premium quality print</p>
								</div>
							</div>
							<div className='text-right'>
								<p className='text-2xl font-bold text-teal-600'>
									₦{PRICING[size as keyof typeof PRICING]}
								</p>
								<p className='text-sm text-gray-500'>Free shipping</p>
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default SizeSelector;
