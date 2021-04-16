import React from "react";
import { tw } from "../TailwindClasses/Buttons";

const Landing = () => {
	return (
		<section className="relative">
			{/* Illustration behind hero content */}
			<div
				className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
				aria-hidden="true"
			>
				<svg
					width="1360"
					height="578"
					viewBox="-50 -50 1360 578"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient
							x1="50%"
							y1="0%"
							x2="50%"
							y2="100%"
							id="illustration-01"
						>
							<stop stopColor="#FFF" offset="0%" />
							<stop stopColor="#EA2AEA" offset="77.402%" />
							<stop stopColor="#DFDFDF" offset="100%" />
						</linearGradient>
					</defs>
					<g fill="url(#illustration-01)" fillRule="evenodd">
						<circle cx="1202" cy="228" r="64" />
						<circle cx="30" cy="443" r="64" />
					</g>
				</svg>
			</div>

			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pt-32 pb-12 md:pt-40 md:pb-20">
					<div className="text-center pb-12 md:pb-16">
						<h1
							className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
							data-aos="zoom-y-out"
						>
							Project {""}
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200">
								emailmar
							</span>
						</h1>
						<div className="max-w-3xl mx-auto">
							<p
								className="text-xl text-gray-600 mb-8"
								data-aos="zoom-y-out"
								data-aos-delay="150"
							>
								Easiest way to send micro-surveys to your team. Name your email,
								give a subject, ask a question, and provide a list of emails. We
								will take it from there.
							</p>
							<div
								className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
								data-aos="zoom-y-out"
								data-aos-delay="300"
							>
								<div>
									<a className={tw.button.white} href="/auth/google">
										Start free trial
									</a>
								</div>
								<div>
									<a
										className={tw.button.white}
										href="https://github.com/TimarTimar/ts-emailmar"
									>
										Learn more
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
