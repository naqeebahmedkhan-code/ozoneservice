// 3D Models for Ozone Service Solutions Website
// Using Three.js for interactive 3D graphics

class ThreeDModels {
    constructor() {
        this.scenes = new Map();
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Check if Three.js is loaded
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded. 3D features disabled.');
            return;
        }
        
        this.isInitialized = true;
        
        // Initialize all scenes on page
        this.initAllScenes();
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    initAllScenes() {
        if (!this.isInitialized) return;

        // Main hero scene
        if (document.getElementById('heroScene')) {
            this.initHeroScene('heroScene');
        }

        // Service scenes
        this.initServiceScenes();
        
        // Contact scene
        if (document.getElementById('contactScene')) {
            this.initContactScene('contactScene');
        }
    }

    initServiceScenes() {
        const sceneElements = document.querySelectorAll('[id$="-scene"]');
        
        sceneElements.forEach(element => {
            const sceneId = element.id;
            const serviceType = sceneId.replace('-scene', '');
            
            switch(serviceType) {
                case 'document':
                    this.initDocumentScene(sceneId);
                    break;
                case 'company':
                    this.initCompanyScene(sceneId);
                    break;
                case 'finance':
                    this.initFinanceScene(sceneId);
                    break;
                case 'travel':
                    this.initTravelScene(sceneId);
                    break;
                case 'medical':
                    this.initMedicalScene(sceneId);
                    break;
                case 'tax':
                    this.initTaxScene(sceneId);
                    break;
                case 'passport':
                    this.initPassportScene(sceneId);
                    break;
                case 'doctor':
                    this.initDoctorScene(sceneId);
                    break;
                case 'recharge':
                    this.initRechargeScene(sceneId);
                    break;
                default:
                    this.initGenericScene(sceneId);
            }
        });
    }

    // Hero Scene - Document Globe
    initHeroScene(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f7ff);

        // Camera
        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 8);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Create document globe
        const group = new THREE.Group();

        // Globe (Earth)
        const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
        const globeMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a56db,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        group.add(globe);

        // Continents
        const continentsGeometry = new THREE.IcosahedronGeometry(2.1, 1);
        const continentsMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0d9488,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        const continents = new THREE.Mesh(continentsGeometry, continentsMaterial);
        group.add(continents);

        // Document ring
        const ringGeometry = new THREE.TorusGeometry(2.5, 0.1, 16, 100);
        const ringMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x3b82f6,
            shininess: 80
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);

        // Floating documents
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 3.2;
            
            const docGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.05);
            const docMaterial = new THREE.MeshPhongMaterial({ 
                color: i % 2 === 0 ? 0x10b981 : 0x8b5cf6,
                shininess: 60
            });
            
            const document = new THREE.Mesh(docGeometry, docMaterial);
            document.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * 0.5,
                Math.sin(angle) * radius
            );
            document.rotation.y = angle;
            
            group.add(document);
        }

        scene.add(group);

        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // Store scene
        this.scenes.set(containerId, { scene, camera, renderer, controls, group });

        // Animation
        this.animateScene(containerId);
    }

    // Document Assistance Scene
    initDocumentScene(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);

        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 2, 6);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Document stack
        const group = new THREE.Group();

        // Create stack of documents
        for (let i = 0; i < 6; i++) {
            const geometry = new THREE.BoxGeometry(2.5, 3.5, 0.08);
            const material = new THREE.MeshPhongMaterial({ 
                color: i % 3 === 0 ? 0x1a56db : i % 3 === 1 ? 0x3b82f6 : 0x60a5fa,
                shininess: 80,
                transparent: true,
                opacity: 0.9 - i * 0.1
            });
            
            const doc = new THREE.Mesh(geometry, material);
            doc.position.y = i * 0.05;
            doc.rotation.z = (i - 2.5) * 0.03;
            
            group.add(doc);
        }

        // Passport on top
        const passportGeometry = new THREE.BoxGeometry(1.8, 2.5, 0.1);
        const passportMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xdc2626,
            shininess: 90
        });
        const passport = new THREE.Mesh(passportGeometry, passportMaterial);
        passport.position.set(1.5, 0.3, 0);
        passport.rotation.z = Math.PI / 12;
        group.add(passport);

        // Stamp
        const stampGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32);
        const stampMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xf59e0b,
            shininess: 100
        });
        const stamp = new THREE.Mesh(stampGeometry, stampMaterial);
        stamp.position.set(-1, 0.2, 0.5);
        group.add(stamp);

        scene.add(group);

        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;

        this.scenes.set(containerId, { scene, camera, renderer, controls, group });
        this.animateScene(containerId);
    }

    // Company Registration Scene
    initCompanyScene(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);

        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 3, 8);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Office building
        const group = new THREE.Group();

        // Main building
        const buildingGeometry = new THREE.BoxGeometry(3, 4, 3);
        const buildingMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x3b82f6,
            shininess: 60
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        group.add(building);

        // Windows
        const windowGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.1);
        const windowMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xfbbf24,
            emissive: 0xfbbf24,
            emissiveIntensity: 0.3
        });

        for (let floor = 0; floor < 4; floor++) {
            for (let windowNum = 0; windowNum < 4; windowNum++) {
                const window = new THREE.Mesh(windowGeometry, windowMaterial);
                window.position.set(
                    -1.2 + windowNum * 0.8,
                    -1.5 + floor * 0.8,
                    1.51
                );
                group.add(window);
            }
        }

        // Door
        const doorGeometry = new THREE.BoxGeometry(0.8, 1.5, 0.1);
        const doorMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x92400e
        });
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.position.set(0, -1.25, 1.51);
        group.add(door);

        // Sign board
        const signGeometry = new THREE.BoxGeometry(2, 0.5, 0.05);
        const signMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x10b981
        });
        const sign = new THREE.Mesh(signGeometry, signMaterial);
        sign.position.set(0, 2.5, 1.6);
        group.add(sign);

        scene.add(group);

        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;

        this.scenes.set(containerId, { scene, camera, renderer, controls, group });
        this.animateScene(containerId);
    }

    // Financial Assistance Scene
    initFinanceScene(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);

        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 2, 8);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Financial elements
        const group = new THREE.Group();

        // Coins stack
        const coinGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32);
        const coinMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xf59e0b,
            shininess: 100
        });

        for (let i = 0; i < 10; i++) {
            const coin = new THREE.Mesh(coinGeometry, coinMaterial);
            coin.position.set(
                Math.sin(i * 0.5) * 1.5,
                i * 0.15,
                Math.cos(i * 0.5) * 1.5
            );
            coin.rotation.x = Math.random() * Math.PI;
            coin.rotation.y = Math.random() * Math.PI;
            group.add(coin);
        }

        // Graph
        const points = [];
        for (let i = 0; i <= 20; i++) {
            points.push(new THREE.Vector3(
                i - 10,
                Math.sin(i * 0.3) * 2,
                0
            ));
        }

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x10b981,
            linewidth: 2
        });
        const graphLine = new THREE.Line(lineGeometry, lineMaterial);
        graphLine.position.y = -1;
        group.add(graphLine);

        // Calculator
        const calcGeometry = new THREE.BoxGeometry(1.5, 1, 0.3);
        const calcMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x6b7280,
            shininess: 50
        });
        const calculator = new THREE.Mesh(calcGeometry, calcMaterial);
        calculator.position.set(3, 0, 0);
        group.add(calculator);

        scene.add(group);

        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.7;

        this.scenes.set(containerId, { scene, camera, renderer, controls, group });
        this.animateScene(containerId);
    }

    // Travel Assistance Scene
    initTravelScene(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);

        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 2, 8);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Travel elements
        const group = new THREE.Group();

        // Suitcase
        const suitcaseGeometry = new THREE.BoxGeometry(2, 1.5, 1);
        const suitcaseMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x7c3aed,
            shininess: 60
        });
        const suitcase = new THREE.Mesh(suitcaseGeometry, suitcaseMaterial);
        group.add(suitcase);

        // Handle
        const handleGeometry = new THREE.TorusGeometry(0.4, 0.05, 8, 16);
        const handleMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x4b5563
        });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(0, 1, 0);
        handle.rotation.x = Math.PI / 2;
        group.add(handle);

        // Passport
        const passportGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.05);
        const passportMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xdc2626
        });
        const passport = new THREE.Mesh(passportGeometry, passportMaterial);
        passport.position.set(0.8, 0.2, 0.6);
        passport.rotation.z = Math.PI / 8;
        group.add(passport);

        // Plane
        const planeGroup = new THREE.Group();
        
        // Fuselage
        const fuselageGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
        const fuselageMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x3b82f6
        });
        const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
        fuselage.rotation.z = Math.PI / 2;
        planeGroup.add(fuselage);

        // Wings
        const wingGeometry = new THREE.BoxGeometry(3, 0.1, 0.5);
        const wingMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1d4ed8
        });
        const wing = new THREE.Mesh(wingGeometry, wingMaterial);
        planeGroup.add(wing);

        // Tail
        const tailGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.1);
        const tailMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1e40af
        });
        const tail = new THREE.Mesh(tailGeometry, tailMaterial);
        tail.position.set(-1, 0.2, 0);
        planeGroup.add(tail);

        planeGroup.position.set(-3, 2, 0);
        planeGroup.rotation.y = Math.PI / 4;
        group.add(planeGroup);

        scene.add(group);

        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        this.scenes.set(containerId, { scene, camera, renderer, controls, group });
        this.animateScene(containerId);
    }

    // Medical Scene
    initMedicalScene(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);

        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 2, 8);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Medical elements
        const group = new THREE.Group();

        // Medical cross
        const verticalBar = new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 2, 0.3),
            new THREE.MeshPhongMaterial({ color: 0xdc2626 })
        );
        group.add(verticalBar);

        const horizontalBar = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.3, 0.3),
            new THREE.MeshPhongMaterial({ color: 0xdc2626 })
        );
        group.add(horizontalBar);

        // Stethoscope
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-1, 0.5, 0),
            new THREE.Vector3(-0.5, 0.8, 0.3),
            new THREE.Vector3(0, 0.5, 0),
            new THREE.Vector3(0.5, 0.8, -0.3),
            new THREE.Vector3(1, 0.5, 0)
        ]);

        const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.05, 8, false);
        const tubeMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x4b5563
        });
        const stethoscope = new THREE.Mesh(tubeGeometry, tubeMaterial);
        stethoscope.position.y = 1.5;
        group.add(stethoscope);

        // Pill bottle
        const bottleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 16);
        const bottleMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x10b981,
            transparent: true,
            opacity: 0.7
        });
        const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
        bottle.position.set(1.5, 0, 0);
        group.add(bottle);

        // Pills
        const pillGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const pillMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x3b82f6
        });

        for (let i = 0; i < 5; i++) {
            const pill = new THREE.Mesh(pillGeometry, pillMaterial);
            pill.position.set(
                1.5 + Math.random() * 0.5 - 0.25,
                0.4 + i * 0.15,
                Math.random() * 0.5 - 0.25
            );
            group.add(pill);
        }

        scene.add(group);

        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;

        this.scenes.set(containerId, { scene, camera, renderer, controls, group });
        this.animateScene(containerId);
    }

    // Tax Scene
    initTaxScene(containerId) {
        // Similar implementation for tax scene
        // Contains calculator, documents, and tax forms
    }

    // Passport Scene
    initPassportScene(containerId) {
        // Similar implementation for passport scene
        // Contains passport, visa stamps, and travel documents
    }

    // Doctor Scene
    initDoctorScene(containerId) {
        // Similar implementation for doctor scene
        // Contains medical tools, certificates, and doctor's bag
    }

    // Recharge Scene
    initRechargeScene(containerId) {
        // Similar implementation for recharge scene
        // Contains mobile phone, signal waves, and recharge symbols
    }

    // Contact Scene
    initContactScene(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);

        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 2, 8);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Contact elements
        const group = new THREE.Group();

        // Phone
        const phoneGeometry = new THREE.BoxGeometry(1, 2, 0.1);
        const phoneMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x111827,
            shininess: 90
        });
        const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
        phone.position.set(-2, 0, 0);
        group.add(phone);

        // Email envelope
        const envelopeGroup = new THREE.Group();
        
        const envelopeGeometry = new THREE.BoxGeometry(1.5, 1, 0.1);
        const envelopeMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x3b82f6
        });
        const envelope = new THREE.Mesh(envelopeGeometry, envelopeMaterial);
        envelopeGroup.add(envelope);

        const flapGeometry = new THREE.BoxGeometry(1.5, 0.8, 0.1);
        const flap = new THREE.Mesh(flapGeometry, envelopeMaterial);
        flap.position.set(0, 0.4, 0.05);
        flap.rotation.x = Math.PI / 4;
        envelopeGroup.add(flap);

        envelopeGroup.position.set(2, 0, 0);
        group.add(envelopeGroup);

        // Location pin
        const pinGeometry = new THREE.ConeGeometry(0.3, 0.8, 8);
        const pinMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xef4444
        });
        const pin = new THREE.Mesh(pinGeometry, pinMaterial);
        pin.position.set(0, -1, 0);
        group.add(pin);

        // Base of pin
        const baseGeometry = new THREE.SphereGeometry(0.4, 8, 8);
        const base = new THREE.Mesh(baseGeometry, pinMaterial);
        base.position.set(0, -1.4, 0);
        group.add(base);

        scene.add(group);

        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        this.scenes.set(containerId, { scene, camera, renderer, controls, group });
        this.animateScene(containerId);
    }

    // Generic Scene
    initGenericScene(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);

        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 8);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Simple rotating cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x1a56db,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        this.scenes.set(containerId, { scene, camera, renderer, controls, cube });
        this.animateScene(containerId);
    }

    // Animation loop
    animateScene(sceneId) {
        const sceneData = this.scenes.get(sceneId);
        if (!sceneData) return;

        const animate = () => {
            requestAnimationFrame(animate);
            
            // Rotate the main object
            if (sceneData.group) {
                sceneData.group.rotation.y += 0.005;
            } else if (sceneData.cube) {
                sceneData.cube.rotation.x += 0.005;
                sceneData.cube.rotation.y += 0.005;
            }
            
            sceneData.controls.update();
            sceneData.renderer.render(sceneData.scene, sceneData.camera);
        };
        
        animate();
    }

    // Handle window resize
    handleResize() {
        this.scenes.forEach((sceneData, sceneId) => {
            const container = document.getElementById(sceneId);
            if (!container) return;

            sceneData.camera.aspect = container.clientWidth / container.clientHeight;
            sceneData.camera.updateProjectionMatrix();
            sceneData.renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    // Cleanup
    destroy() {
        this.scenes.forEach((sceneData, sceneId) => {
            const container = document.getElementById(sceneId);
            if (container && sceneData.renderer.domElement) {
                container.removeChild(sceneData.renderer.domElement);
            }
        });
        this.scenes.clear();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is available
    if (typeof THREE !== 'undefined') {
        const threeDModels = new ThreeDModels();
        
        // Make available globally for debugging
        window.ozoneThreeD = threeDModels;
        
        // Handle page transitions
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations when page is hidden
                threeDModels.scenes.forEach(sceneData => {
                    sceneData.controls.autoRotate = false;
                });
            } else {
                // Resume animations when page is visible
                threeDModels.scenes.forEach(sceneData => {
                    sceneData.controls.autoRotate = true;
                });
            }
        });
    } else {
        console.log('Three.js not loaded. 3D features disabled.');
        
        // Show fallback images
        document.querySelectorAll('.scene-container').forEach(container => {
            const fallback = document.createElement('div');
            fallback.className = 'scene-fallback';
            fallback.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1a56db, #3b82f6);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2rem;
            `;
            fallback.innerHTML = '<i class="fas fa-cube"></i>';
            container.appendChild(fallback);
        });
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThreeDModels;
}