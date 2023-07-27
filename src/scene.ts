import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three-stdlib";
import data from "./data.json";

export default function runThree() {
	const HOVER_COLOR = 0xf7c67c;
	const DEFAULT_COLOR = 0xffffff;
	const SELECTED_COLOR = 0xf7af7c;

	let parent = document.getElementById("brain-parent") as HTMLDivElement;
	let canvas = document.getElementById("brain-canvas") as HTMLCanvasElement;
	let tooltip = document.getElementById("brain-tooltip") as HTMLDivElement;

	const scene = new THREE.Scene();
	// scene.background = new THREE.Color(0xcccccc);
	scene.background = null;
	scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

	const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
	const loader = new GLTFLoader();

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.useLegacyLights = false;
	renderer.shadowMap.enabled = true;

	const ambientLight = new THREE.AmbientLight(0xffffff, 10);
	scene.add(ambientLight);

	for (let i = 0; i < 3; i++) {
		let dirLight = new THREE.DirectionalLight(0xffffff, 2);
		dirLight.position.set(i == 0 ? 10 : 0, i == 1 ? 10 : 0, i == 2 ? 10 : 0);
		dirLight.castShadow = true;
		scene.add(dirLight);

		dirLight = new THREE.DirectionalLight(0xffffff, 2);
		dirLight.position.set(i == 0 ? -10 : 0, i == 1 ? -10 : 0, i == 2 ? -10 : 0);
		dirLight.castShadow = true;
		scene.add(dirLight);
	}

	const brain = new THREE.Group();
	console.log(data);

	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		loader.load("./assets/models/" + element.code + ".glb", (gltf: GLTF) => {
			const model = gltf.scene.children[0] as THREE.Mesh;
			model.userData = element;
			brain.add(model);
		});
	}

	brain.receiveShadow = true;
	scene.add(brain);

	camera.position.z = 25;

	const raycaster = new THREE.Raycaster();
	const pointer = new THREE.Vector2();
	let hovered: THREE.Mesh | null = null;
	let selected: THREE.Mesh | null = null;

	canvas.onpointermove = (event: PointerEvent) => {
		pointer.x = ((event.clientX + parent.offsetLeft) / canvas.clientWidth) * 2 - 1;
		pointer.y = -((event.clientY - parent.offsetTop) / canvas.clientHeight) * 2 + 1;
	};

	canvas.onpointerdown = () => {
		if (!hovered) return;
		console.log(hovered);

		if (selected && selected.material instanceof THREE.MeshStandardMaterial)
			selected.material.color.set(DEFAULT_COLOR);
		selected = hovered;

		if (selected.material instanceof THREE.MeshStandardMaterial) selected.material.color.set(SELECTED_COLOR);

		// let pos = new THREE.Vector3(5, -7, 6);

		// // create cube at pos
		// const geometry = new THREE.BoxGeometry(1, 1, 1);
		// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		// const cube = new THREE.Mesh(geometry, material);
		// cube.position.set(pos.x, pos.y, pos.z);
		// scene.add(cube);

		let pos = hovered.userData.clickPoint;

		controls.setAzimuthalAngle(Math.atan(pos.x / pos.z) + (pos.z < 0 ? Math.PI : 0));
		controls.setPolarAngle(Math.acos(pos.y / pos.length()));

		const card = document.getElementById("card") as HTMLDivElement;
		if (card.classList.contains("-translate-x-[120%]")) {
			card.classList.remove("-translate-x-[120%]");
		}

		const cardName = document.getElementById("card-name") as HTMLDivElement;
		const cardOtherName = document.getElementById("card-othername") as HTMLDivElement;
		const cardDescription = document.getElementById("card-description") as HTMLDivElement;
		const cardUrl = document.getElementById("card-url") as HTMLAnchorElement;

		console.log(hovered.userData);

		cardName.innerText = hovered.userData.name;

		if (hovered.userData.othername) {
			cardOtherName.innerText = hovered.userData.othername;
			cardName.classList.remove("mb-2");
			cardOtherName.classList.remove("hidden");
		} else {
			cardOtherName.classList.add("hidden");
			cardName.classList.add("mb-2");
		}

		let desc = (hovered.userData.description as string).replace(/\n/g, "<br>");
		// desc = desc.replace(/<br>\*/g, "<br>• ");
		desc = desc.replace(/<br>\*([^.]*)\./g, '<li class="mt-2">$1</li>');
		desc = desc.replace(/\*\*([^\*]*)\*\*/g, "<b>$1</b>");

		cardDescription.innerHTML = desc;

		cardUrl.href = hovered.userData.url;

		// controls.setAzimuthalAngle(Math.atan(pos.y / Math.sqrt(pos.x * pos.x + pos.z * pos.z)));
		// controls.setPolarAngle(Math.acos(pos.y / pos.length()));
	};

	function animate() {
		if (canvas.clientWidth != canvas.width || canvas.clientHeight != canvas.height) {
			renderer.setSize(canvas.clientWidth, canvas.clientHeight);
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		raycaster.setFromCamera(pointer, camera);
		const intersects = raycaster.intersectObjects(brain.children, false);
		if (intersects.length > 0) {
			if (hovered && hovered.material instanceof THREE.MeshStandardMaterial && hovered != selected)
				hovered.material.color.set(DEFAULT_COLOR);

			hovered = intersects[0].object as THREE.Mesh;
			hovered.userData.clickPoint = intersects[0].point;

			if (hovered.material instanceof THREE.MeshStandardMaterial && hovered != selected)
				hovered.material.color.set(HOVER_COLOR);

			canvas.style.cursor = "pointer";
			tooltip.style.opacity = "100";
			tooltip.style.left = ((pointer.x + 1) / 2) * canvas.clientWidth + "px";
			tooltip.style.top = -((pointer.y - 1) / 2) * canvas.clientHeight + "px";
			tooltip.dataset.tip = hovered.userData.name;
		} else {
			if (hovered && hovered.material instanceof THREE.MeshStandardMaterial && hovered != selected)
				hovered.material.color.set(DEFAULT_COLOR);
			hovered = null;

			canvas.style.cursor = "default";
			tooltip.style.opacity = "0";
		}

		controls.update();
		renderer.render(scene, camera);

		window.requestAnimationFrame(animate);
	}

	window.requestAnimationFrame(animate);
}
