import { useEffect } from "react";
import scene from "./scene";

export default function App() {
	useEffect(() => {
		scene();
	}, []);

	return (
		<div className="drawer ">
			<input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				<div className="flex flex-col h-screen">
					<nav className="navbar bg-base-300">
						<div className="flex-none">
							<label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							</label>
						</div>
						<div className="flex-1">
							<a className="btn btn-ghost normal-case text-xl">Brain Anatomy</a>
						</div>
						<div className="flex-none">
							<div className="tooltip tooltip-bottom" data-tip="Github">
								<a
									className="btn btn-square btn-ghost drawer-button normal-case"
									href="https://github.com/hackedXD/brain-anatomy"
									target="_blank"
								>
									<svg
										width="20"
										height="20"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										className="inline-block h-5 w-5 fill-current md:h-6 md:w-6"
									>
										<path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"></path>
									</svg>
								</a>
							</div>
						</div>
					</nav>
					<div id="brain-parent" className="w-full h-full flex-1 relative bg-base-300">
						<canvas id="brain-canvas" className="!w-full !h-full flex-1 "></canvas>
						<div
							id="brain-tooltip"
							className="tooltip tooltip-open tooltip-info absolute opacity-0 transition duration-100 pointer-events-none"
							data-tip="hello"
						></div>
						<div
							id="card"
							className="absolute block top-1/2 -translate-y-1/2 left-5 h-[95%] card w-96 bg-base-100 shadow-xl -translate-x-[120%] transition duration-500"
						>
							<div className="card-body flex flex-col h-full">
								<h2 id="card-name" className="card-title text-2xl font-bold leading-none" />
								<h3 id="card-othername" className="card-subtitle text-md font-bold mb-2" />

								<p id="card-description" className="text-sm overflow-y-scroll" />
								<div className="card-actions justify-end">
									<div className="tooltip tooltip-top duration-200" data-tip="Wikipedia">
										<a id="card-url" target="_blank" className="btn btn-info">
											<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
												<path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
											</svg>
											See More
										</a>
									</div>
								</div>
							</div>
						</div>
						{/* <div className="w-10 h-10 bg-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div> */}
					</div>
				</div>
			</div>
			<div className="drawer-side">
				<label htmlFor="drawer-toggle" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 h-full bg-base-300 text-base !duration-200 flex-col">
					{/* <li className="flex flex-row items-center justify-center">
						<kbd className="kbd kbd-sm m-1">Scroll Up</kbd> to Zoom In
					</li> */}
					<div className="mockup-code h-full bg-base-100">
						<pre data-prefix=">">
							<code className="text-sm">
								<kbd className="kbd kbd-sm">Scroll Up</kbd> to Zoom In
							</code>
						</pre>
						<pre data-prefix=">">
							<code className="text-sm">
								<kbd className="kbd kbd-sm">Scroll Down</kbd> to Zoom Out
							</code>
						</pre>
						<pre data-prefix=">">
							<code className="text-sm">
								<kbd className="kbd kbd-sm">Mouse Down</kbd> to Look Around
							</code>
						</pre>
						<pre data-prefix=">">
							<code className="text-sm">
								<kbd className="kbd kbd-sm">Click</kbd> to See Details
							</code>
						</pre>
						<pre data-prefix=">">
							<code className="text-sm">
								<kbd className="kbd kbd-sm">See More</kbd> to see Wikipedia
							</code>
						</pre>
					</div>
				</ul>
			</div>
		</div>
	);
}
