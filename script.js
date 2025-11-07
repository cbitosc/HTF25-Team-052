// Enhanced Scroll animation with intersection observer
const sections = document.querySelectorAll("section");
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);
sections.forEach(sec => observer.observe(sec));
// Modal functions with enhanced modes
function showModal(mode = 'create') {
    const modal = document.getElementById('createModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('capsuleForm');
    const loading = document.getElementById('loadingSpinner');
    const gallery = document.getElementById('galleryPreview');
    const successMsg = document.getElementById('successMessage');
    // Reset form and elements
    form.reset();
    form.style.display = 'block';
    loading.style.display = 'none';
    gallery.style.display = 'none';
    successMsg.style.display = 'none';
    successMsg.innerHTML = '';
    document.getElementById('noteField').style.display = 'block';
    document.getElementById('fileField').style.display = 'none';
    switch (mode) {
        case 'create':
            title.textContent = 'Create Your Digital Time Capsule';
            break;
        case 'triggers':
            title.textContent = 'Set AI Triggers';
            form.innerHTML = `
                <div class="form-group">
                    <label for="triggerType">Trigger Type:</label>
                    <select id="triggerType">
                        <option value="event">Life Event</option>
                        <option value="location">GPS Location</option>
                        <option value="time">Time-Based</option>
                        <option value="ai">AI Prediction</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="triggerDetails">Details:</label>
                    <input type="text" id="triggerDetails" placeholder="e.g., Graduation in NYC">
                </div>
                <button type="submit">Save Trigger</button>
            `;
            break;
        case 'seal':
            title.textContent = 'AI-Seal Your Capsule';
            form.innerHTML = `
                <div class="form-group">
                    <label><input type="checkbox" name="quantumSeal" checked> Quantum Seal</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" name="redundantBackup"> Global Redundant Backup</label>
                </div>
                <button type="submit">Seal Now</button>
            `;
            break;
        case 'cultural':
            title.textContent = 'Create Cultural Capsule';
            // Similar to create but with cultural options
            break;
        case 'analytics':
            title.textContent = 'AI Analytics Dashboard';
            form.innerHTML = '<div class="dashboard-preview"><h3>Your Capsules Overview</h3><ul class="capsule-list"><li class="capsule-item"><span>Capsule 1</span><span class="capsule-status">Locked</span></li><li class="capsule-item"><span>Capsule 2</span><span class="capsule-status">Unlocked</span></li></ul></div><button type="button" onclick="closeModal()">Close</button>';
            form.style.display = 'block';
            break;
        case 'art':
            title.textContent = 'Generate AI Art';
            form.innerHTML = `
                <div class="form-group">
                    <label for="artPrompt">Art Prompt:</label>
                    <textarea id="artPrompt" placeholder="Describe your memory..."></textarea>
                </div>
                <button type="submit">Generate Art</button>
                <div id="generatedArt" class="gallery" style="display:none;"></div>
            `;
            break;
        case 'sync':
            title.textContent = 'Enable Mobile Sync';
            form.innerHTML = '<p>Sync enabled across all devices. <button type="button" onclick="closeModal()">Close</button></p>';
            form.style.display = 'block';
            break;
        case 'share':
            title.textContent = 'Share Capsule';
            form.innerHTML = `
                <div class="form-group">
                    <label for="shareRecipient">Recipient:</label>
                    <input type="email" id="shareRecipient">
                </div>
                <div class="form-group">
                    <label for="shareMessage">Message:</label>
                    <textarea id="shareMessage" placeholder="Personal note..."></textarea>
                </div>
                <button type="submit">Send Share</button>
            `;
            break;
        case 'free':
        case 'pro':
        case 'family':
        case 'enterprise':
        case 'pricing':
            title.textContent = `Start ${mode.charAt(0).toUpperCase() + mode.slice(1)} Plan`;
            form.innerHTML = `<p>Redirecting to secure signup... (Mock: Plan activated!)</p><button type="button" onclick="closeModal()">Cancel</button>`;
            form.style.display = 'block';
            break;
        case 'support':
            title.textContent = 'Contact AI Support';
            form.innerHTML = `
                <div class="form-group">
                    <label for="supportSubject">Subject:</label>
                    <input type="text" id="supportSubject">
                </div>
                <div class="form-group">
                    <label for="supportMessage">Message:</label>
                    <textarea id="supportMessage"></textarea>
                </div>
                <button type="submit">Send Support Ticket</button>
            `;
            break;
        case 'social':
            title.textContent = 'Social Links';
            form.innerHTML = '<p>Follow us: <a href="https://twitter.com">Twitter</a> | <a href="https://facebook.com">Facebook</a></p><button type="button" onclick="closeModal()">Close</button>';
            form.style.display = 'block';
            break;
        default:
            title.textContent = 'Create Your Digital Time Capsule';
    }
    modal.style.display = 'block';
    const footerEmail = document.getElementById('footerEmail').value;
    if (footerEmail && mode === 'create') {
        document.getElementById('recipient').value = footerEmail;
    }
}
function closeModal() {
    document.getElementById('createModal').style.display = 'none';
}
// Close modal on outside click or ESC
window.onclick = function(e) {
    const modal = document.getElementById('createModal');
    if (e.target === modal) closeModal();
};
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});
// Enhanced FAQ toggle with active class
function toggleAnswer(element) {
    const faqItem = element;
    const answer = element.nextElementSibling;
    const isVisible = answer.style.display === 'block';
    // Close all others
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.nextElementSibling.style.display = 'none';
    });
    // Toggle current
    if (!isVisible) {
        faqItem.classList.add('active');
        answer.style.display = 'block';
    }
}
// Footer subscribe with validation
function subscribeFooter() {
    const email = document.getElementById('footerEmail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email)) {
        showSuccessMessage('Subscribed! Check your email for AI tips.');
        showModal('create');
    } else {
        showSuccessMessage('Please enter a valid email.', true);
    }
}
// Show success message in modal
function showSuccessMessage(message, isError = false) {
    const successMsg = document.getElementById('successMessage');
    successMsg.innerHTML = `<p>${message}</p>`;
    successMsg.style.display = 'block';
    if (isError) {
        successMsg.style.background = 'rgba(255, 0, 0, 0.2)';
        successMsg.style.color = '#ff4444';
    } else {
        successMsg.style.background = 'rgba(0, 255, 136, 0.2)';
        successMsg.style.color = '#00ff88';
    }
}
// Handle form submission with simulation
document.addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const loading = document.getElementById('loadingSpinner');
    const successMsg = document.getElementById('successMessage');
    loading.style.display = 'block';
    successMsg.style.display = 'none';
    // Simulate processing
    setTimeout(() => {
        if (form.id === 'capsuleForm') {
            const contentType = document.getElementById('contentType') ? document.getElementById('contentType').value : 'note';
            if (contentType !== 'note') {
                // Mock file upload progress
                const progress = document.getElementById('progressFill');
                let width = 0;
                const interval = setInterval(() => {
                    width += 10;
                    progress.style.width = width + '%';
                    if (width >= 100) clearInterval(interval);
                }, 200);
            }
            setTimeout(() => {
                showSuccessMessage('Capsule created, enhanced, and sealed securely with AI! It will unlock based on your settings.');
                form.style.display = 'none';
                loading.style.display = 'none';
            }, 1500);
        } else if (form.contains(document.getElementById('supportMessage'))) {
            setTimeout(() => {
                showSuccessMessage('Support ticket sent! Response within 24 hours.');
                form.style.display = 'none';
                loading.style.display = 'none';
            }, 1000);
        } else {
            setTimeout(() => {
                showSuccessMessage('Action completed successfully!');
                form.style.display = 'none';
                loading.style.display = 'none';
            }, 1000);
        }
    }, 1000);
});
// Handle content type change with dynamic fields
document.addEventListener('change', function(e) {
    if (e.target.id === 'contentType') {
        const type = e.target.value;
        const noteField = document.getElementById('noteField');
        const fileField = document.getElementById('fileField');
        if (type === 'note') {
            noteField.style.display = 'block';
            fileField.style.display = 'none';
        } else {
            noteField.style.display = 'none';
            fileField.style.display = 'block';
        }
    }
});
// Mock AI Art Generation
document.addEventListener('submit', function(e) {
    if (e.target.querySelector('#artPrompt')) {
        const prompt = document.getElementById('artPrompt').value;
        if (prompt) {
            const gallery = document.getElementById('galleryPreview');
            gallery.innerHTML = `
                <div class="gallery-item">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDBmZjg4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj4kJHByb21wdH0gQVJUIDwvZGl2Pg==" alt="Generated Art">
                    <p>AI-Generated: ${prompt}</p>
                </div>
            `;
            gallery.style.display = 'grid';
            showSuccessMessage('AI Art generated successfully!');
        }
    }
});
// Parallax effect on hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});
// Smooth anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Initialize tooltips or popovers if needed (mock)
function initTooltips() {
    // Add title attributes or custom popovers
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.title = 'Click to activate AI feature';
    });
}
initTooltips();
// Service Worker mock for PWA feel
if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('/sw.js'); // Placeholder
}
// Error handling for forms
window.onerror = function(msg, url, line) {
    console.error('Error: ' + msg + ' at line ' + line);
    showSuccessMessage('An error occurred. Please try again.', true);
};
// Performance metrics mock
console.log('Chronos Vault AI loaded in under 2s - Optimized for legacy preservation.');