import React from 'react';

const Card = ({ repository }) => (
	<div className="border rounded-lg p-2 shadow-sm">
		<div className="flex items-center justify-between">
			<a	
				href={repository.svn_url}
				target="_blank" rel="noopener noreferrer"
				className="text-sm font-semibold text-blue-500 hover:text-blue-600 hover:underline transition"
			>
				{repository.name}
			</a>
			<span className="border rounded-full text-xs px-2 capitalize text-gray-600">
				{repository.visibility}
			</span>
		</div>
		<p className="text-xs text-gray-600 mt-3">{repository.language}</p>
	</div>
);

export default Card;
