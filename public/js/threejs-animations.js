// Three.js animations for Famous Tech

// Fonction pour initialiser les animations Three.js
document.addEventListener('DOMContentLoaded', function() {
    // Animation pour la section hero
    initHeroAnimation();
    
    // Animation pour la section impact
    initImpactAnimation();
});

// Animation pour la section hero
function initHeroAnimation() {
    const container = document.getElementById('hero-animation');
    
    if (!container) return;
    
    // Configuration de base
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Création de la scène, caméra et renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Ajout de lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Création des particules
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // Couleurs pour les particules (bleu et violet)
    const color1 = new THREE.Color(0x4361ee); // Bleu primaire
    const color2 = new THREE.Color(0x7209b7); // Violet secondaire
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position aléatoire dans un espace 3D
        posArray[i] = (Math.random() - 0.5) * 10;
        posArray[i + 1] = (Math.random() - 0.5) * 10;
        posArray[i + 2] = (Math.random() - 0.5) * 10;
        
        // Couleur aléatoire entre les deux couleurs définies
        const mixRatio = Math.random();
        const mixedColor = new THREE.Color().lerpColors(color1, color2, mixRatio);
        
        colorsArray[i] = mixedColor.r;
        colorsArray[i + 1] = mixedColor.g;
        colorsArray[i + 2] = mixedColor.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Position de la caméra
    camera.position.z = 5;
    
    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // Effet de respiration
        const time = Date.now() * 0.001;
        particlesMesh.scale.x = 1 + Math.sin(time) * 0.1;
        particlesMesh.scale.y = 1 + Math.sin(time) * 0.1;
        particlesMesh.scale.z = 1 + Math.sin(time) * 0.1;
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Redimensionnement
    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(newWidth, newHeight);
    });
}

// Animation pour la section impact
function initImpactAnimation() {
    const container = document.getElementById('impact-animation');
    
    if (!container) return;
    
    // Configuration de base
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Création de la scène, caméra et renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Ajout de lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Création d'une sphère représentant l'impact global
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x4361ee,
        transparent: true,
        opacity: 0.7,
        wireframe: true
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Création de petites sphères représentant les points d'impact
    const impactPoints = [];
    const impactColors = [0x4361ee, 0x7209b7, 0xf72585];
    
    for (let i = 0; i < 15; i++) {
        const size = Math.random() * 0.2 + 0.1;
        const geometry = new THREE.SphereGeometry(size, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: impactColors[Math.floor(Math.random() * impactColors.length)],
            emissive: 0x222222
        });
        
        const impactPoint = new THREE.Mesh(geometry, material);
        
        // Position aléatoire sur la sphère
        const phi = Math.acos(-1 + (2 * Math.random()));
        const theta = 2 * Math.PI * Math.random();
        
        const radius = 1.5;
        impactPoint.position.x = radius * Math.sin(phi) * Math.cos(theta);
        impactPoint.position.y = radius * Math.sin(phi) * Math.sin(theta);
        impactPoint.position.z = radius * Math.cos(phi);
        
        scene.add(impactPoint);
        impactPoints.push({
            mesh: impactPoint,
            initialPosition: impactPoint.position.clone(),
            pulseFactor: Math.random() * 0.5 + 0.5,
            rotationSpeed: Math.random() * 0.02 - 0.01
        });
    }
    
    // Position de la caméra
    camera.position.z = 5;
    
    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotation de la sphère principale
        sphere.rotation.y += 0.005;
        
        // Animation des points d'impact
        const time = Date.now() * 0.001;
        
        impactPoints.forEach(point => {
            // Effet de pulsation
            const pulse = Math.sin(time * point.pulseFactor) * 0.2;
            point.mesh.position.x = point.initialPosition.x * (1 + pulse);
            point.mesh.position.y = point.initialPosition.y * (1 + pulse);
            point.mesh.position.z = point.initialPosition.z * (1 + pulse);
            
            // Rotation autour de la sphère
            point.mesh.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), point.rotationSpeed);
            point.initialPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), point.rotationSpeed);
        });
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Redimensionnement
    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(newWidth, newHeight);
    });
} 