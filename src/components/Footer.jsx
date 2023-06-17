import React from 'react';

import logo from '../assets/logo.png';
const Footer = () => {
	const currentYear = new Date().getFullYear();

	setTimeout(() => {
		const name = document.querySelector('.name');
		const job = document.querySelector('.job');

		name.classList.remove('name-start');
		job.classList.remove('job-start');

		setTimeout(() => {
			name.classList.add('name-mid');
			job.classList.add('job-mid');
			setTimeout(() => {
				name.classList.add('lifted');
				job.classList.add('lifted');
				document.querySelector('.logo').classList.add('shown');
			}, 1200);
		}, 4500);
	}, 1500);

	return (
		<div className="footer">
			<h3>Copyright &copy; R-design {currentYear}</h3>
			<div className="logo-animated">
				<div className="name name-start">
					<span>I</span>van <span>R</span>adev
				</div>
				<div className="job job-start">
					<span>C</span>reative <span>D</span>eveloper
				</div>
				<img src={logo} className="logo" alt="logo" />
			</div>
		</div>
	);
};

export default Footer;
