const config = {
	birthdayPerson: "Alyssa",
	sender: "Anntigonne"
};

window.onload = () => {

	const intro = document.getElementById("intro");
	const startBtn = document.getElementById("startBtn");

	const scene = document.getElementById("scene");

	const music = document.getElementById("music");
	const musicBtn = document.getElementById("musicBtn");

	const glow = document.querySelector(".cursor-glow");

	const canvas = document.getElementById("confetti");
	const ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let started = false;
	let currentScene = 0;

	const scenes = [

		`Hey ${config.birthdayPerson}...`,

		"I was thinking of you.",

		"I couldn't forget your day today.",

		"You mean a lot to me and you always have since the first day I met you",

		"I admire the person that you are, the strength and courage that you have.",

		"All of the little things that make you so unique, I admire that of you.",

		"You deserve a life filled with everything you can imagine.",

		"Adventure, happiness, peace. Everything that makes you feel whole.",

		"I hope this 27th chapter brings you only the best.",

		"Wherever life takes us, I'll always be grateful to have crossed your path.",

		"Never forget how special you are to those around you.",

		"Happy Birthday Alyssa ❤️",

		"Thank you for being a part of my life :) ",

		"3... ",

		"2...",

		"1...",

		`🎂 HAPPY BIRTHDAY ${config.birthdayPerson} 🎂`,

		"3 Years left until you become ancient like me :P",

		`With ❤️ ${config.sender}`
	];

	startBtn.addEventListener("click", () => {

		if (started) return;

		started = true;

		intro.classList.add("hide");

		music.play().catch(() => { });

		hearts();
		setTimeout(() => {

			nextScene();

			setInterval(nextScene, 3500);

		}, 800);
	});

	function nextScene() {

		if (currentScene >= scenes.length) return;

		scene.classList.remove("show");

		setTimeout(() => {

			scene.innerHTML = `<h1>${scenes[currentScene]}</h1>`;

			scene.classList.add("show");

			currentScene++;

			if (currentScene === 10) {
				balloons();
			}

			if (currentScene === 17) {
				confetti();
			}

			if (currentScene === scenes.length && !music.paused) {

				let volume = music.volume;

				const fade = setInterval(() => {

					if (volume > 0.05) {

						volume -= 0.05;
						music.volume = volume;

					} else {

						clearInterval(fade);

						music.pause();
						music.currentTime = 0;
						music.volume = 1;

					}

				}, 200);
			}

		}, 300);
	}

	musicBtn.addEventListener("click", () => {

		if (music.paused) {

			music.play();

		} else {

			music.pause();
		}
	});

	music.addEventListener("play", () => {

		musicBtn.innerHTML =
			'<i class="fas fa-pause"></i>';

		musicBtn.classList.add("playing");
	});

	music.addEventListener("pause", () => {

		musicBtn.innerHTML =
			'<i class="fas fa-play"></i>';

		musicBtn.classList.remove("playing");
	});

	document.addEventListener("mousemove", e => {

		glow.style.left = e.clientX + "px";
		glow.style.top = e.clientY + "px";
	});

	function hearts() {

		setInterval(() => {

			const heart = document.createElement("div");

			heart.className = "heart";

			heart.innerHTML = "❤️";

			heart.style.left =
				Math.random() * 100 + "vw";

			document.body.appendChild(heart);

			setTimeout(() => {

				heart.remove();

			}, 5000);

		}, 400);
	}

	function balloons() {

		for (let i = 0; i < 12; i++) {

			const balloon =
				document.createElement("div");

			balloon.className = "balloon";

			balloon.style.left =
				Math.random() * 100 + "vw";

			balloon.style.background =
				`hsl(${Math.random() * 360},70%,70%)`;

			document.body.appendChild(balloon);
		}
	}

	let particles = [];

	function confetti() {

		for (let i = 0; i < 200; i++) {

			particles.push({

				x: Math.random() * canvas.width,

				y: Math.random() * canvas.height,

				dy: Math.random() * 4 + 2,

				color:
					`hsl(${Math.random() * 360},100%,60%)`
			});
		}

		animateConfetti();
	}

	function animateConfetti() {

		ctx.clearRect(
			0,
			0,
			canvas.width,
			canvas.height
		);

		particles.forEach(p => {

			ctx.fillStyle = p.color;

			ctx.fillRect(
				p.x,
				p.y,
				6,
				6
			);

			p.y += p.dy;

			if (p.y > canvas.height) {

				p.y = 0;
			}
		});

		requestAnimationFrame(
			animateConfetti
		);
	}

	window.addEventListener("resize", () => {

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});
};
