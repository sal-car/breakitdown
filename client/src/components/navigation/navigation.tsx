import React from 'react';

type NavigationProps = {
	toggleCreateModal?: () => void;
};

const Navigation: React.FC<NavigationProps> = ({ toggleCreateModal }) => {
	return (
		<div className="Navigation h-20">
			<header className="header flex justify-between items-center pt-5">
				<div className="middle-header"></div>
				<h1>Break It Down</h1>
				<button
					className="bg-transparent hover:bg-violet-900 text-violet-900 font-semibold hover:text-white py-2 px-4 border border-violet-900 hover:border-transparent rounded  mx-5 mr-10"
					onClick={toggleCreateModal}
				>
					New project
				</button>
			</header>
		</div>
	);
};

export default Navigation;
