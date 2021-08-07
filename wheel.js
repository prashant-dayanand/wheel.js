const form = document.getElementById("wheel-form");
			const submitBtn = document.getElementById("wheel-submit-btn");
			const giftBox = document.getElementById("gift-box");
			const winningBox = document.getElementById("winning");
			const promoBox = document.getElementById("promoBox");
			const wheelBox = document.getElementById("wheel-box");
			const winCode = document.getElementById("win-code");
			const winInput = document.getElementById("win-input");
			const betterLuck = document.getElementById("better-luck-box");
			const email = document.getElementById("mail-input");
			const text = document.getElementById("validation-msg");

			const codeCopy = document.getElementById("copy-code");

			let wheelCount = 0;

			submitBtn.addEventListener("click", (e) => {
				e.preventDefault();

				const isValid = ValidateEmail();
				if (isValid === true) {
					startSpin();
				}
			});

			console.log(wheelCount);

			//email validation
			function ValidateEmail() {
				const validRegex =
					/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
				if (email.value.match(validRegex)) {
					text.classList.remove("invalid");
					text.innerText = "";
					return true;
				} else {
					text.classList.add("invalid");
					text.innerText = "Please enter a valid email.";
					return false;
				}
			}

			// Create new wheel object specifying the parameters at creation time.
			let theWheel = new Winwheel({
				outerRadius: 250, // Set outer radius so wheel fits inside the background.
				innerRadius: 20, // Make wheel hollow so segments don't go all way to center.
				textFontSize: 20,
				responsive: true, // Set default font size for the segments.
				textOrientation: "horizontal", // Make text vertial so goes down from the outside of wheel.
				textAlignment: "center", // Align text to outside of wheel.
				numSegments: 8, // Specify number of segments.
				// Define segments including colour and text.
				segments: [
					// font size and test colour overridden on backrupt segments.
					{
						fillStyle: "#FFFF00",
						text: "Better Luck \nNext Time",
						textFillStyle: "#000",
					},
					{
						fillStyle: "#FFA07A",
						text: "Get 1 More Spin",
						textFillStyle: "#000",
					},
					{
						fillStyle: "#00FA9A",
						text: "Get 1 More Spin",
						textFillStyle: "#000",
					},
					{
						fillStyle: "#FFFF00",
						text: "Buy 1 Get 1 Free",
						textFillStyle: "#000",
					},
					{
						fillStyle: "#FFA07A",
						text: "Get 1 More Spin",
						textFillStyle: "#000",
					},
					{
						fillStyle: "#cea2fd",
						text: "Get 1 More Spin",
						textFillStyle: "#000",
					},
					{
						fillStyle: "#00FA9A",
						text: "Better Luck \nNext Time",
						textFillStyle: "#000",
					},
					{
						fillStyle: "#cea2fd",
						text: "Buy 2 get 1 Free",
						textFillStyle: "#000",
					},
				],
				// Specify the animation to use.
				animation: {
					type: "spinToStop",
					duration: 15, // Duration in seconds.
					spins: 10, // Default number of complete spins.
					callbackFinished: alertPrize,
					callbackSound: playSound, // Function to call when the tick sound is to be triggered.
					soundTrigger: "segment", // Specify pins are to trigger the sound, the other option is 'segment'.
				},
				// Specify pin parameters.
				pins: {
					number: 12,
					outerRadius: 7,
					responsive: true,
					fillStyle: "#fff",
					strokeStyle: "#ffffff",
				},
			});

			// Loads the tick audio sound in to an audio object.
			let audio = new Audio("tick.mp3");

			// This function is called when the sound is to be played.
			function playSound() {
				audio.pause();
				audio.currentTime = 0;
				audio.play();
			}

			// Vars used by the code in this page to do power controls.
			let wheelSpinning = false;

			// Spinner Function
			function startSpin() {
				// Stop any current animation.
				theWheel.stopAnimation(false);

				// Reset the rotation angle to less than or equal to 360 so spinning again
				// works as expected. Setting to modulus (%) 360 keeps the current position.
				theWheel.rotationAngle = theWheel.rotationAngle % 360;

				// Start animation.
				theWheel.startAnimation();
			}

			// Get Value And Show
			function alertPrize(indicatedSegment) {
				giftBox.style.display = "none";
				betterLuck.style.display = "none";
				wheelBox.style.display = "none";
				winningBox.style.display = "flex";
				promoBox.style.width = "100%";

				if (indicatedSegment.text === "Get 1 More Spin") {
					// text.classList.remove("invalid");
					// text.classList.add("valid");
					// text.innerText = "You Got 1 More Spin";
					alert("hello")
				} else if (indicatedSegment.text === "Better Luck \nNext Time") {
					promoBox.style.display = "none";
					betterLuck.style.display = "block";
					winCode.innerText = `Sorry! Better Luck Next Time.`;
					winInput.value = "GHHGFG89897";
				} else if (indicatedSegment.text === "Buy 1 Get 1 Free") {
					winCode.innerText = `Congratulation! You Got Buy 1 Get 1 Free Discount`;
					winInput.value = "GHHGFG89897";
				} else if (indicatedSegment.text === "Buy 2 get 1 Free") {
					winCode.innerText = `Congratulation! You Got Buy 2 Get 1 Free Discount`;
					winInput.value = "GHHGFG89897";
				} else if (indicatedSegment.text === "50% OFF") {
					winCode.innerText = `Congratulation! You Got 50% Discount`;
					winInput.value = "GHHGFG89897";
				} else if (indicatedSegment.text === "25% OFF") {
					winCode.innerText = `Congratulation! You Got 25% Discount`;
					winInput.value = "GHHGFG89897";
				} else if (indicatedSegment.text === "10% OFF") {
					winCode.innerText = `Congratulation! You Got 10% Discount`;
					winInput.value = "GHHGFG89897";
				} else {
					startSpin();
				}

				//Copy Promo CODE......
				codeCopy.addEventListener("click", () => {
					winInput.select();
					document.execCommand("copy");
					codeCopy.innerText = "Copied";
					codeCopy.classList.add("copied-code");
				});
			}