// src/utils/LoadingOverlay.js
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

/**
 * @param {number} progress - The "clamped" progress from 1..99 or 100
 * @param {boolean} hasReachedFirstBreakpoint - Whether we've hit breakpoint 0 (frame 44)
 * @param {Function} onEnter - Called when the user clicks the Enter button
 */
function LoadingOverlay({ progress, hasReachedFirstBreakpoint, onEnter }) {
	const overlayRef = useRef(null);
	const messageRef = useRef(null);
	const barRef = useRef(null);
	const buttonRef = useRef(null);

	// Define a set of aesthetic messages.
	const messages = [
		"Loading assets...",
		"Loading materials...",
		"Loading meshes...",
		"Loading lights...",
		"We are working hard...",
	];

	// Start with a random message.
	const [message, setMessage] = useState(
		messages[Math.floor(Math.random() * messages.length)]
	);
	const [showEnter, setShowEnter] = useState(false);

	// Randomly cycle through messages while progress < 100.
	useEffect(() => {
		let interval;
		// If progress < 100, keep cycling messages
		if (progress < 100) {
			interval = setInterval(() => {
				// Fade out old message
				gsap.to(messageRef.current, {
					duration: 0.5,
					opacity: 0,
					onComplete: () => {
						// Pick a random message & fade in
						const randomIndex = Math.floor(Math.random() * messages.length);
						setMessage(messages[randomIndex]);
						gsap.to(messageRef.current, { duration: 0.5, opacity: 1 });
					},
				});
			}, 3000);
		}

		return () => clearInterval(interval);
	}, [progress, messages]);

	// Animate the loading bar width as "progress" changes.
	useEffect(() => {
		gsap.to(barRef.current, {
			duration: 0.5,
			width: `${progress}%`,
			ease: "power1.out",
		});
	}, [progress]);

	// Show Enter button ONLY when we've reached the first breakpoint.
	// This is your custom logic that REPLACES the old "progress === 100" check.
	useEffect(() => {
		if (hasReachedFirstBreakpoint) {
			// First fade out the message quickly (optional)
			gsap.to(messageRef.current, {
				duration: 0.5,
				opacity: 0,
				onComplete: () => {
					setShowEnter(true);
					// Animate the button's appearance.
					gsap.fromTo(
						buttonRef.current,
						{ opacity: 0, scale: 0.9 },
						{ duration: 1, opacity: 1, scale: 1, ease: "elastic.out(1, 0.5)" }
					);
					// Subtle pulsating border effect
					gsap.to(buttonRef.current, {
						duration: 1,
						scale: 1.05,
						yoyo: true,
						repeat: -1,
						ease: "power1.inOut",
					});
				},
			});
		}
	}, [hasReachedFirstBreakpoint]);

	// On clicking Enter, fade out the overlay, then trigger onEnter callback.
	const handleEnterClick = () => {
		// Button click animation
		const tl = gsap.timeline({
			onComplete: () => {
				// Fade out entire overlay
				gsap.to(overlayRef.current, {
					duration: 1,
					opacity: 0,
					onComplete: () => {
						if (overlayRef.current) {
							overlayRef.current.style.display = "none";
						}
						// Notify parent that we're done
						onEnter();
					},
				});
			},
		});
		tl.to(buttonRef.current, {
			duration: 0.3,
			scale: 0.8,
			ease: "power1.inOut",
		}).to(buttonRef.current, {
			duration: 0.3,
			scale: 1,
			ease: "power1.inOut",
		});
	};

	return (
		<div
			ref={overlayRef}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "#fff", // White background
				color: "#b93e22", // Orange text
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 9999,
				fontFamily: "DM Sans",
			}}
		>
			{!showEnter && (
				<>
					<div
						ref={messageRef}
						style={{
							fontSize: "2rem",
							textAlign: "center",
							marginBottom: "20px",
							opacity: 1,
						}}
					>
						{message} <br /> {Math.floor(progress)}%
					</div>
					<div
						style={{
							width: "60%",
							height: "3px",
							backgroundColor: "#ddd",
							borderRadius: "5px",
							overflow: "hidden",
						}}
					>
						<div
							ref={barRef}
							style={{
								height: "100%",
								width: "0%",
								backgroundColor: "#b93e22",
								borderRadius: "5px",
							}}
						/>
					</div>
				</>
			)}
			{showEnter && (
				<button
					ref={buttonRef}
					onClick={handleEnterClick}
					style={{
						marginTop: "20px",
						width: "100px",
						height: "100px",
						padding: "10px 20px",
						fontSize: "1.5rem",
						background: "transparent",
						color: "#b93e22",
						border: "2px solid #b93e22",
						borderRadius: "50%",
						cursor: "pointer",
						outline: "none",
					}}
				>
					Enter
				</button>
			)}
		</div>
	);
}

export default LoadingOverlay;
