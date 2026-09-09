import React, { useEffect, useRef } from 'react';

import logo from '../assets/logo.png';
const Footer = () => {
	const currentYear = new Date().getFullYear();
	const nameRef = useRef<HTMLDivElement>(null);
	const jobRef = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const revealNames = window.setTimeout(() => {
			nameRef.current?.classList.remove('name-start');
			jobRef.current?.classList.remove('job-start');
		}, 1500);

		const collapseNames = window.setTimeout(() => {
			nameRef.current?.classList.add('name-mid');
			jobRef.current?.classList.add('job-mid');
		}, 6000);

		const revealLogo = window.setTimeout(() => {
			nameRef.current?.classList.add('lifted');
			jobRef.current?.classList.add('lifted');
			logoRef.current?.classList.add('shown');
		}, 7200);

		return () => {
			window.clearTimeout(revealNames);
			window.clearTimeout(collapseNames);
			window.clearTimeout(revealLogo);
		};
	}, []);

	return (
		<footer className="footer">
			<p>Copyright &copy; R-design {currentYear}</p>
			<div className="logo-animated">
				<div ref={nameRef} className="name name-start">
					<span>I</span>van <span>R</span>adev
				</div>
				<div ref={jobRef} className="job job-start">
					<span>C</span>reative <span>D</span>eveloper
				</div>
				<img ref={logoRef} src={logo} className="logo" alt="R-design logo" />
			</div>
		</footer>
	);
};

export default Footer;
