document.addEventListener('DOMContentLoaded', () => {
    console.log('Peta Tutur App Initialized');

    const form = document.getElementById('itinerary-form');
    const timelineContainer = document.getElementById('timeline-container');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const startPoint = document.getElementById('start-point').value;
        const timeBudget = document.getElementById('time-budget').value;
        
        timelineContainer.innerHTML = '<p>Optimizing route...</p>';

        try {
            // Simulated API call latency for optimization engine
            setTimeout(() => {
                timelineContainer.innerHTML = `
                    <div style="border-left: 3px solid var(--secondary-color); padding-left: 10px; margin-top: 10px;">
                        <p><strong>Start:</strong> ${startPoint}</p>
                        <p><strong>Duration:</strong> ${timeBudget} hours</p>
                        <p><em>Itinerary details will be populated here via OpenRouteService and DB queries.</em></p>
                    </div>
                `;
            }, 800);
        } catch (error) {
            console.error('Error generating itinerary:', error);
            timelineContainer.innerHTML = '<p style="color: red;">Failed to generate itinerary. Please try again.</p>';
        }
    });
});