// Import merchants data
import { merchants } from './model.js';
import { merchantDetails } from './detailsModel.js';

// Function to render all merchants on the index page
function renderMerchants() {
    const merchantContainer = document.getElementById('merchant-container');
    if (merchantContainer) {
        merchants.forEach(merchant => {
            const merchantCard = document.createElement('div');
            merchantCard.classList.add('merchant-card');
            merchantCard.innerHTML = `
                <img src="${merchant.image}" alt="${merchant.name}">
                <h2>${merchant.name}</h2>
                <p><strong>Specialized Goods:</strong> ${merchant.goods}</p>
                <p>${merchant.description}</p>
                <a href="details.html?id=${merchant.id}">View Details</a>
            `;
            merchantContainer.appendChild(merchantCard);
        });
    }
}

// Function to render a single merchant's details on the details page
function renderMerchantDetails() {
    const merchantDetailsElement = document.getElementById('merchant-details');
    if (merchantDetailsElement) {
        const urlParams = new URLSearchParams(window.location.search);
        const merchantId = urlParams.get('id');
        const merchant = merchants.find(m => m.id == merchantId);
        const details = merchantDetails.find(m => m.id == merchantId);

        if (merchant && details) {
            merchantDetailsElement.innerHTML = `
                <!-- Profile Section -->
                <section class="profile-section">
                    <h2 id="merchant-name">${merchant.name}</h2>
                    <img src="${merchant.image}" alt="${merchant.name}" class="merchant-image">
                    <p id="merchant-description">${merchant.description}</p>
                </section>

                <!-- Offerings Section -->
                <section class="offerings-section">
                    <h3>Inventory</h3>
                    <table id="inventory-table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${
                                details.offerings && Array.isArray(details.offerings)
                                    ? details.offerings.map(item => `
                                        <tr>
                                            <td>${item.name}</td>
                                            <td>${item.description}</td>
                                            <td>${item.price}</td>
                                            <td>${item.availability}</td>
                                        </tr>
                                      `).join('')
                                    : '<tr><td colspan="4">No inventory available.</td></tr>'
                            }
                        </tbody>
                    </table>
                    <p><strong>Special Offers:</strong> <span id="special-offers">${details.specialOffers || 'None available'}</span></p>
                    <p><strong>Trade Policy:</strong> <span id="trade-policy">${details.tradePolicy || 'Standard policy applies'}</span></p>
                </section>

                <!-- Merchant Traits Section -->
                <section class="traits-section">
                    <h3>Merchant Traits</h3>
                    <p><strong>Personality Traits:</strong> <span id="personality-traits">${details.personalityTraits?.join(', ') || 'None provided'}</span></p>
                    <p><strong>Quirks:</strong> <span id="quirks">${details.quirks?.join(', ') || 'None provided'}</span></p>
                    <p><strong>Catchphrases:</strong> <span id="catchphrases">${details.catchphrases?.join(', ') || 'None provided'}</span></p>
                    <p><strong>Disposition:</strong> <span id="disposition">${details.disposition || 'Unknown'}</span></p>
                </section>

                <!-- Hooks & Secrets Section -->
                <section class="hooks-section">
                    <h3>Hooks & Secrets</h3>
                    <p><strong>Rumors:</strong> <span id="rumors">${details.hooks?.rumors || 'None available'}</span></p>
                    <p><strong>Side Quest:</strong> <span id="side-quest">${details.hooks?.sideQuest || 'None available'}</span></p>
                    <p><strong>Hidden Motive:</strong> <span id="hidden-motive">${details.hooks?.hiddenMotive || 'None provided'}</span></p>
                </section>

                <!-- Free Token Offer Section -->
                <section class="token-section">
                    <h3>Character Token</h3>
                    <img id="character-token" src="${details.token || ''}" alt="Merchant Token" class="character-token">
                </section>

                <!-- Additional Details Section -->
                <section class="additional-elements">
                    <h3>Additional Details</h3>
                    <p><strong>Shop Description:</strong> <span id="shop-description">${details.shopDescription || 'Not described'}</span></p>
                    <p><strong>Rules of Trade:</strong> <span id="rules-of-trade">${details.rulesOfTrade || 'None specified'}</span></p>
                    <p><strong>Hours of Operation:</strong> <span id="hours-of-operation">${details.hours || 'Unknown'}</span></p>
                    <p><strong>Unique Selling Point:</strong> <span id="unique-selling-point">${details.uniqueSellingPoint || 'None'}</span></p>
                </section>
            `;
        } else {
            merchantDetailsElement.innerHTML = `<p>Merchant details not found.</p>`;
        }
    }
}




// Determine which page to render
if (document.getElementById('merchant-container')) {
    renderMerchants(); // Render merchant list on index page
} else if (document.getElementById('merchant-details')) {
    renderMerchantDetails(); // Render merchant details on details page
}
