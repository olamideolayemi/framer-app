import { TrendingUp } from 'lucide-react';

const StatCard = ({
	title,
	value,
	icon: Icon,
	change,
	trend,
}: StatCardProps) => (
	<div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
		<div className='flex items-center justify-between'>
			<div>
				<p className='text-sm font-medium text-gray-600'>{title}</p>
				<p className='text-3xl font-bold text-gray-900 mt-2'>{value}</p>
				{change && (
					<p
						className={`text-sm mt-1 flex items-center ${
							trend === 'up' ? 'text-green-600' : 'text-red-600'
						}`}
					>
						<TrendingUp
							className={`w-4 h-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`}
						/>
						{change}
					</p>
				)}
			</div>
			<div className='w-12 h-12 bg-gradient-to-br from-teal-700 to-teal-600/90 rounded-xl flex items-center justify-center'>
				<Icon className='w-6 h-6 text-white' />
			</div>
		</div>
	</div>
);

export default StatCard;
