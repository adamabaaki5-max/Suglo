// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing scene...');
    console.log('New Colors Applied:');
    console.log('- Table & Chairs: Blue-Black (#1a237e)');
    console.log('- MiLo Tin: Green (#4CAF50)');
    console.log('- Milk Tin: White (#FFFFFF)');
    
    // Force immediate visibility by removing loading screen
    setTimeout(() => {
        const loader = document.querySelector('.a-loader');
        if (loader) {
            loader.style.display = 'none';
        }
        
        // Set canvas to visible
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.opacity = '1';
        }
        
        initializeScene();
    }, 100); // Small delay to ensure A-Frame is ready
});

function initializeScene() {
    console.log('Scene initialization started...');
    
    // Ensure all elements are visible immediately
    const allElements = document.querySelectorAll('a-box, a-cylinder, a-sphere, a-plane');
    allElements.forEach(el => {
        el.setAttribute('visible', 'true');
        el.setAttribute('opacity', '1');
    });
    
    // Set ground to bright green
    const ground = document.querySelector('a-plane[color="#228B22"]');
    if (ground) {
        ground.setAttribute('color', '#32CD32'); // Lime green
        ground.setAttribute('roughness', '0.7');
        console.log('Ground color set to green');
    }
    
    // Set sky color
    const sky = document.querySelector('a-sky');
    if (sky) {
        sky.setAttribute('color', '#87CEEB'); // Light blue sky
    }
    
    // Apply specific material properties for blue-black furniture
    const blueBlackElements = document.querySelectorAll('.table-top, .table-leg, .chair-seat, .chair-back, .chair-leg');
    blueBlackElements.forEach(el => {
        el.setAttribute('metalness', '0.3');
        el.setAttribute('roughness', '0.8');
    });
    
    // Apply green color to MiLo tin with enhanced properties
    const miloTin = document.querySelector('#milo-tin');
    if (miloTin) {
        miloTin.setAttribute('color', '#4CAF50');
        miloTin.setAttribute('metalness', '0.2');
        miloTin.setAttribute('roughness', '0.4');
        console.log('MiLo tin set to green');
    }
    
    // Apply white color to Milk tin with enhanced properties
    const milkTin = document.querySelector('#milk-tin');
    if (milkTin) {
        milkTin.setAttribute('color', '#FFFFFF');
        milkTin.setAttribute('metalness', '0.1');
        milkTin.setAttribute('roughness', '0.3');
        console.log('Milk tin set to white');
    }
    
    // Position camera for optimal immediate view
    const camera = document.querySelector('a-camera');
    if (camera) {
        camera.setAttribute('position', '0 3 8');
        camera.setAttribute('rotation', '0 180 0');
        console.log('Camera positioned for optimal view');
    }
    
    // Add enhanced lighting for better visibility
    const ambientLight = document.querySelector('a-entity[light="type: ambient"]');
    if (ambientLight) {
        ambientLight.setAttribute('light', 'color: #ffffff; intensity: 0.9');
    }
    
    // Add a directional light to highlight blue-black surfaces
    const directionalLight = document.createElement('a-entity');
    directionalLight.setAttribute('light', 'type: directional; color: #ffffff; intensity: 0.6');
    directionalLight.setAttribute('position', '3 5 3');
    document.querySelector('a-scene').appendChild(directionalLight);
    
    // Add interactive features after a brief delay
    setTimeout(() => {
        addHoverEffects();
        addClickEffects();
        console.log('Interactive features enabled');
    }, 500);
    
    console.log('Scene fully initialized with new colors');
    console.log('Color Summary:');
    console.log('- Ground: Green (#32CD32)');
    console.log('- Table & Chairs: Blue-Black (#1a237e)');
    console.log('- MiLo Tin: Green (#4CAF50)');
    console.log('- Milk Tin: White (#FFFFFF)');
    console.log('- Cups: Blue & Pink (unchanged)');
}

function addHoverEffects() {
    const interactiveElements = [
        '#milo-tin',
        '#milk-tin',
        '#cup-blue',
        '#cup-pink',
        '.chair-seat',
        '#vase',
        '#wall-art',
        '.table-top'
    ];
    
    interactiveElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                const animation = {
                    property: 'scale',
                    to: '1.05 1.05 1.05',
                    dur: 200,
                    easing: 'easeInOutQuad'
                };
                this.setAttribute('animation', animation);
                
                // Different emissive colors based on element
                if (this.id === 'milo-tin') {
                    this.setAttribute('material', 'emissive: #4CAF50; emissiveIntensity: 0.2');
                } else if (this.id === 'milk-tin') {
                    this.setAttribute('material', 'emissive: #ffffff; emissiveIntensity: 0.1');
                } else if (this.classList.contains('table-top') || this.classList.contains('chair-seat')) {
                    this.setAttribute('material', 'emissive: #1a237e; emissiveIntensity: 0.15');
                } else {
                    this.setAttribute('material', 'emissive: #444; emissiveIntensity: 0.2');
                }
            });
            
            el.addEventListener('mouseleave', function() {
                const animation = {
                    property: 'scale',
                    to: '1 1 1',
                    dur: 200,
                    easing: 'easeInOutQuad'
                };
                this.setAttribute('animation', animation);
                this.setAttribute('material', 'emissive: #000; emissiveIntensity: 0');
            });
        });
    });
}

function addClickEffects() {
    // MiLo Tin (Green) interaction
    const miloTin = document.querySelector('#milo-tin');
    if (miloTin) {
        miloTin.addEventListener('click', function() {
            const lid = this.querySelector('.tin-lid');
            if (lid) {
                // Add green particle effect
                createParticles(this, '#4CAF50');
                
                lid.setAttribute('animation', {
                    property: 'position',
                    to: '0 0.2 0',
                    dur: 500,
                    easing: 'easeOutBack'
                });
                
                setTimeout(() => {
                    lid.setAttribute('animation', {
                        property: 'position',
                        to: '0 0.13 0',
                        dur: 500,
                        easing: 'easeInBack'
                    });
                }, 2000);
            }
        });
    }
    
    // Milk Tin (White) interaction
    const milkTin = document.querySelector('#milk-tin');
    if (milkTin) {
        milkTin.addEventListener('click', function() {
            const lid = this.querySelector('.tin-lid');
            if (lid) {
                // Add white particle effect
                createParticles(this, '#FFFFFF');
                
                lid.setAttribute('animation', {
                    property: 'position',
                    to: '0 0.25 0',
                    dur: 500,
                    easing: 'easeOutBack'
                });
                
                setTimeout(() => {
                    lid.setAttribute('animation', {
                        property: 'position',
                        to: '0 0.15 0',
                        dur: 500,
                        easing: 'easeInBack'
                    });
                }, 2000);
            }
        });
    }
    
    // Cup filling effect
    const cups = document.querySelectorAll('#cup-blue, #cup-pink');
    cups.forEach(cup => {
        cup.addEventListener('click', function() {
            const isBlue = this.id === 'cup-blue';
            const liquidColor = isBlue ? '#4682B4' : '#FF69B4';
            
            // Remove any existing liquid
            const existingLiquid = this.querySelector('.liquid');
            if (existingLiquid) {
                existingLiquid.parentNode.removeChild(existingLiquid);
            }
            
            // Create new liquid
            const liquid = document.createElement('a-cylinder');
            liquid.setAttribute('class', 'liquid');
            liquid.setAttribute('position', '0 -0.02 0');
            liquid.setAttribute('radius', '0.07');
            liquid.setAttribute('height', '0.1');
            liquid.setAttribute('color', liquidColor);
            liquid.setAttribute('opacity', '0.8');
            
            this.appendChild(liquid);
            
            setTimeout(() => {
                if (liquid.parentNode) {
                    liquid.setAttribute('animation', {
                        property: 'scale',
                        to: '0 0 0',
                        dur: 500,
                        easing: 'easeInQuad'
                    });
                    setTimeout(() => {
                        if (liquid.parentNode) {
                            liquid.parentNode.removeChild(liquid);
                        }
                    }, 500);
                }
            }, 3000);
        });
    });
    
    // Blue-black furniture click effects
    const furniture = document.querySelectorAll('.table-top, .chair-seat');
    furniture.forEach(item => {
        item.addEventListener('click', function() {
            // Create blue particle effect
            createParticles(this, '#1a237e');
            
            // Add a subtle bounce animation
            this.setAttribute('animation', {
                property: 'position',
                to: this.getAttribute('position').replace(/y:([\d.]+)/, (match, y) => `y:${parseFloat(y) + 0.05}`),
                dur: 300,
                dir: 'alternate',
                loop: 1,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Flower sway effect
    const flowers = document.querySelectorAll('.flower-red, .flower-orange, .flower-yellow');
    flowers.forEach(flower => {
        flower.addEventListener('click', function() {
            this.setAttribute('animation', {
                property: 'rotation',
                to: '0 0 15',
                dur: 1000,
                dir: 'alternate',
                loop: 2,
                easing: 'easeInOutSine'
            });
        });
    });
}

function createParticles(sourceElement, color) {
    const position = sourceElement.getAttribute('position');
    const scene = document.querySelector('a-scene');
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('a-sphere');
        particle.setAttribute('radius', '0.02');
        particle.setAttribute('color', color);
        particle.setAttribute('position', position);
        
        // Random velocity
        const vx = (Math.random() - 0.5) * 0.2;
        const vy = Math.random() * 0.1 + 0.1;
        const vz = (Math.random() - 0.5) * 0.2;
        
        particle.setAttribute('animation', {
            property: 'position',
            to: `${parseFloat(position.x) + vx} ${parseFloat(position.y) + vy} ${parseFloat(position.z) + vz}`,
            dur: 1000,
            easing: 'easeOutQuad'
        });
        
        particle.setAttribute('animation__scale', {
            property: 'scale',
            to: '0 0 0',
            dur: 1000,
            easing: 'easeInQuad'
        });
        
        scene.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Animation component registration
if (!AFRAME.components['animation']) {
    AFRAME.registerComponent('animation', {
        schema: {
            property: {type: 'string'},
            to: {type: 'string'},
            dur: {type: 'number', default: 1000},
            dir: {type: 'string', default: 'normal'},
            loop: {type: 'number', default: 1},
            easing: {type: 'string', default: 'easeInOutQuad'}
        },
        
        init: function() {
            this.animate();
        },
        
        animate: function() {
            const data = this.data;
            const el = this.el;
            
            const animation = {
                property: data.property,
                to: data.to,
                dur: data.dur,
                dir: data.dir,
                loop: data.loop,
                easing: data.easing
            };
            
            el.setAttribute('animation', animation);
        }
    });
}

// Scene controls for debugging
window.sceneControls = {
    resetScene: function() {
        // Remove liquids from cups
        const liquids = document.querySelectorAll('.liquid');
        liquids.forEach(liquid => {
            if (liquid.parentNode) {
                liquid.parentNode.removeChild(liquid);
            }
        });
        
        // Remove particles
        const particles = document.querySelectorAll('a-sphere[radius="0.02"]');
        particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        
        // Reset tin lids
        const lids = document.querySelectorAll('.tin-lid');
        lids.forEach(lid => {
            lid.setAttribute('position', lid.closest('#milo-tin') ? '0 0.13 0' : '0 0.15 0');
        });
        
        // Reset furniture position
        const furniture = document.querySelectorAll('.table-top, .chair-seat');
        furniture.forEach(item => {
            const pos = item.getAttribute('position');
            const resetPos = pos.replace(/y:([\d.]+)/, (match, y) => {
                if (item.classList.contains('table-top')) return 'y:1.2';
                if (item.classList.contains('chair-seat')) {
                    if (pos.includes('-2')) return 'y:0.5';
                    return 'y:0.5';
                }
                return match;
            });
            item.setAttribute('position', resetPos);
        });
        
        console.log('Scene reset to initial state');
    },
    
    getColorInfo: function() {
        return {
            table: document.querySelector('.table-top').getAttribute('color'),
            miloTin: document.querySelector('#milo-tin').getAttribute('color'),
            milkTin: document.querySelector('#milk-tin').getAttribute('color'),
            ground: document.querySelector('a-plane[color="#32CD32"]').getAttribute('color'),
            chairs: document.querySelectorAll('.chair-seat').length + ' chairs (blue-black)',
            cups: document.querySelectorAll('[id^="cup-"]').length + ' cups (blue & pink)'
        };
    },
    
    logColors: function() {
        console.log('Current Color Scheme:');
        console.log('- Table: ' + document.querySelector('.table-top').getAttribute('color'));
        console.log('- Chairs: Blue-Black');
        console.log('- MiLo Tin: ' + document.querySelector('#milo-tin').getAttribute('color'));
        console.log('- Milk Tin: ' + document.querySelector('#milk-tin').getAttribute('color'));
        console.log('- Ground: ' + document.querySelector('a-plane[color="#32CD32"]').getAttribute('color'));
    }
};

console.log('A-Frame scene script loaded successfully');
console.log('New color scheme applied: Blue-Black furniture, Green MiLo, White Milk');