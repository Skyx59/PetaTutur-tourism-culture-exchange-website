document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itinerary-form');
    const timelineContainer = document.getElementById('timeline-nodes');
    const narrativeContent = document.getElementById('narrative-content');

    // Mock data for our hidden heritage itinerary
    const mockNodes = [
        {
            id: 1,
            time: "09:00 AM",
            title: "Candi Sambisari",
            type: "Underground Temple",
            description: "Unearthed by a farmer in 1966, this 9th-century Hindu temple was buried under five meters of volcanic ash from Mount Merapi. Local folklore often whispers about the protective spirits of the earth that kept it hidden until the time was right for its rediscovery."
        },
        {
            id: 2,
            time: "11:30 AM",
            title: "Plengkung Gading",
            type: "Historical Gate",
            description: "The southern gate of the Yogyakarta Kraton. Legend dictates that the reigning Sultan is strictly forbidden from passing through this specific gate during his lifetime, an ancient taboo linked to the passage of the dead and the spiritual balance of the kingdom."
        },
        {
            id: 3,
            time: "02:00 PM",
            title: "Taman Sari Water Castle",
            type: "Royal Garden",
            description: "A former royal garden of the Sultanate of Yogyakarta. Beyond its beautiful pools lies a network of secret underground tunnels and a subterranean mosque. Myths speak of the Sultan's encounters with Nyi Roro Kidul, the mythical Queen of the Southern Sea, within these watery depths."
        },
        {
            id: 4,
            time: "04:30 PM",
            title: "Kotagede Historic District",
            type: "Ancient Capital",
            description: "The remains of the first capital of the Mataram Sultanate. Wander through narrow alleyways and discover the sacred Royal Cemetery. The atmosphere is thick with tales of Panembahan Senopati, the founder of the empire, and his mystical meditations."
        }
    ];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate loading state
        timelineContainer.innerHTML = '<p class="empty-state">Generating cultural journey...</p>';
        narrativeContent.innerHTML = '<p class="empty-state">Waiting for selection...</p>';

        setTimeout(() => {
            generateTimeline(mockNodes);
        }, 800); // Fake API delay
    });

    function generateTimeline(nodes) {
        timelineContainer.innerHTML = ''; // Clear previous
        
        nodes.forEach((node, index) => {
            const nodeEl = document.createElement('div');
            nodeEl.className = 'timeline-node';
            nodeEl.innerHTML = `
                <h4>${node.title}</h4>
                <span>${node.time}</span>
            `;
            
            nodeEl.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
                nodeEl.classList.add('active');
                
                // Show narrative
                displayNarrative(node);
            });

            timelineContainer.appendChild(nodeEl);
            
            // Auto-select the first node
            if (index === 0) {
                nodeEl.click();
            }
        });
    }

    function displayNarrative(node) {
        // Fade out effect
        narrativeContent.style.opacity = '0';
        
        setTimeout(() => {
            narrativeContent.innerHTML = `
                <h4 class="narrative-title">${node.title}</h4>
                <div class="narrative-meta">${node.type} • ${node.time}</div>
                <p class="narrative-text">${node.description}</p>
            `;
            // Fade in effect
            narrativeContent.style.transition = 'opacity 0.3s ease';
            narrativeContent.style.opacity = '1';
        }, 150); // slight delay for smooth transition
    }
});