// Modal functionality for menu items
function showSection(sectionName) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('sectionModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'sectionModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-body" id="modalBody"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close button
        modal.querySelector('.modal-close').onclick = function() {
            modal.style.display = 'none';
        };
        
        // Close on outside click
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }
    
    // Content for different sections
    const content = {
        tribute: `
            <h2>Lt Safiullah Shaheed</h2>
            <div class="star-badge">⭐ Sitara-e-Basalat</div>
            <p>Born on 19th January 1987 at Killi Meer Sharif of Nushki. Joined 117 L/C in Apr 2006. Commissioned in 16 Baloch Regiment in April 2008.</p>
            <p>On 17th May 2009, while undertaking operations against Terrorists in Op Rah-e-Haq, Swat, the brave son of soil embraced Shahadat.</p>
            <p><strong>Lt Safiullah (Shaheed) Education Academy was established to acknowledge his services to the country.</strong></p>
        `,
        message: `
            <h2>Principal's Message</h2>
            <h3>Mr. Yasir Ali - Principal & English Subject Specialist</h3>
            <p>Dear Students and Parents,</p>
            <p>It is with great pride that I welcome you to Lt Safiullah Shaheed Academy. We are dedicated to providing quality education and nurturing excellence in every student.</p>
            <p>Our qualified faculty ensures 100% syllabus coverage with board pattern papers and regular assessments.</p>
            <p><strong>Best wishes for your academic journey!</strong></p>
        `,
        why: `
            <h2>Why Choose LSSA?</h2>
            <ul class="why-list">
                <li>✓ Quality Education in Reasonable Fee</li>
                <li>✓ Qualified Permanent Faculty (15-20 years experience)</li>
                <li>✓ Board Pattern Papers</li>
                <li>✓ 100% Syllabus Coverage</li>
                <li>✓ Best Educational Environment</li>
                <li>✓ Individual Results Monitoring</li>
                <li>✓ Monthly Tests & Assessments</li>
                <li>✓ Parent-Teacher Communication</li>
                <li>✓ Career Guidance</li>
                <li>✓ NO PROFIT NO LOSS BASIS</li>
            </ul>
        `,
        achievements: `
            <h2>Our Achievements</h2>
            <h3>Matric Results (Recent Session)</h3>
            <p>🏆 90%+ Students: 45%</p>
            <p>🏆 80-90% Students: 35%</p>
            <p>🏆 Pass Percentage: 100%</p>
            <h3>FSc Results (Recent Session)</h3>
            <p>🏆 90%+ Students: 40%</p>
            <p>🏆 80-90% Students: 38%</p>
            <p>🏆 Pass Percentage: 98%</p>
        `,
        alumni: `
            <h2>Our Distinguished Alumni</h2>
            <div class="alumni-grid-modal">
                <div class="alumni-item">👨‍⚕️ Dr. Mahnoor Khalid - FCPS-II Dermatologist</div>
                <div class="alumni-item">⚓ Lt. Cdr. Waqas Ahmed Khan - Pakistan Navy</div>
                <div class="alumni-item">🎖️ Maj. Imtasal Faisal - SSG Commando</div>
                <div class="alumni-item">👨‍⚕️ Dr. Younis Bazai - MBBS-GMC UK</div>
                <div class="alumni-item">⚖️ Mian Nadir Munir - Lawyer</div>
                <div class="alumni-item">🎓 Nouman Naeem - PhD Mathematics China</div>
            </div>
        `,
        dresscode: `
            <h2>Dress Code</h2>
            <div class="dresscode-section">
                <h3>Male Students</h3>
                <h4>Allowed:</h4>
                <ul>
                    <li>✓ Shalwar Kameez</li>
                    <li>✓ Pant and Shirt</li>
                    <li>✓ T-shirts (without vulgar tags)</li>
                </ul>
                <h4>Not Allowed:</h4>
                <ul>
                    <li>✗ Slippers (except medical reasons)</li>
                    <li>✗ Rings</li>
                    <li>✗ Track suits</li>
                    <li>✗ Cultural dress</li>
                </ul>
            </div>
            <div class="dresscode-section">
                <h3>Female Students</h3>
                <h4>Allowed:</h4>
                <ul>
                    <li>✓ Shalwar Kameez with scarf</li>
                </ul>
                <h4>Not Allowed:</h4>
                <ul>
                    <li>✗ Jeans or T-shirts</li>
                    <li>✗ Fit trousers</li>
                </ul>
            </div>
        `,
        fee: `
            <h2>Fee Structure</h2>
            <p><strong>Operating on NO PROFIT NO LOSS BASIS</strong></p>
            <table class="fee-table-modal">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Monthly Fee</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Shuhada Wards</td><td class="free">FREE</td></tr>
                    <tr><td>Shuhada Wards (with Transport)</td><td>Rs. 1,000</td></tr>
                    <tr><td>Officers</td><td>Rs. 18,000</td></tr>
                    <tr><td>JCOs</td><td>Rs. 16,000</td></tr>
                    <tr><td>Soldiers</td><td>Rs. 14,000</td></tr>
                    <tr><td>Defence Paid Employees</td><td>Rs. 24,000</td></tr>
                    <tr><td>Civilians</td><td>Rs. 42,000</td></tr>
                </tbody>
            </table>
            <p><strong>Session Timings:</strong></p>
            <p>☀️ Summer: 4:00 PM - 7:40 PM</p>
            <p>❄️ Winter: 3:00 PM - 6:40 PM</p>
        `,
        contact: `
            <h2>Contact Us</h2>
            <div class="contact-info-modal">
                <p><strong>📍 Address:</strong><br>Garrison HRDC Campus "B"<br>Quetta Cantonment, Pakistan</p>
                <p><strong>📞 Phone:</strong><br>+92-XXX-XXXXXXX</p>
                <p><strong>✉ Email:</strong><br>info@lssa.edu.pk</p>
                <p><strong>💬 WhatsApp:</strong><br>
                <a href="https://wa.me/923428769898?text=Hello%20LSSA,%20I%20want%20to%20inquire%20about%20admission" target="_blank" class="btn-whatsapp">Message on WhatsApp</a></p>
            </div>
        `
    };
    
    // Show modal with content
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = content[sectionName] || '<p>Content not available</p>';
    modal.style.display = 'block';
}

// Toggle menu
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
}
