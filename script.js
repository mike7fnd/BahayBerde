
  const icons = [
    {id: 'icon1', normal: 'icon1.png', clicked: 'icon1_clicked.png', page: 'hero'},
    {id: 'icon2', normal: 'icon2.png', clicked: 'icon2_clicked.png', page: 'maps'},
    {id: 'icon3', normal: 'icon3.png', clicked: 'icon3_clicked.png', page: 'cart'},
    {id: 'icon4', normal: 'icon4.png', clicked: 'icon4_clicked.png', page: 'profile'}
  ];

  icons.forEach(icon => {
    const el = document.getElementById(icon.id);
    el.addEventListener('click', () => {
      icons.forEach(i => {
        const imgEl = document.getElementById(i.id);
        imgEl.src = i.normal;
        imgEl.classList.remove('selected');
      });

      el.src = icon.clicked;
      el.classList.add('selected');

      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById(icon.page).classList.add('active');
    });
  });


  function initializeMap() {
    // Check if map already exists
    if (window.myMap) return;

    const map = L.map('leaflet-map').setView([14.5995, 120.9842], 6); // Philippines center

    // Save to global to prevent reinitialization
    window.myMap = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Example Plant Owners
    const owners = [
      {
        name: "Maria's Mini Farm",
        location: "Quezon City",
        lat: 14.6760,
        lng: 121.0437,
        plants: 12
      },
      {
        name: "Green Thumb Garden",
        location: "Tagaytay",
        lat: 14.1006,
        lng: 120.9904,
        plants: 8
      }
    ];

    owners.forEach(owner => {
      const marker = L.marker([owner.lat, owner.lng]).addTo(map);
      marker.bindPopup(`
        <strong>${owner.name}</strong><br>
        ${owner.location}<br>
        🌿 ${owner.plants} plants available
      `);
    });
  }

  // Modify SPA navigation to trigger map init
  function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    // Trigger map init when opening map page
    if (pageId === 'map') {
      setTimeout(initializeMap, 100); // wait for map container to be visible
    }
  }

// Expand/Collapse function for Read More 
// Expand/Collapse function for Read More buttons
document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.story-card');
    const shortText = card.querySelector('.short-text');
    const fullText = card.querySelector('.full-text');

    if (fullText.style.display === 'block') {
      fullText.style.display = 'none';
      shortText.style.display = 'block';
      btn.textContent = 'Read More';
    } else {
      fullText.style.display = 'block';
      shortText.style.display = 'none';
      btn.textContent = 'Read Less';
    }
  });
});


document.querySelectorAll('.carousel').forEach(carousel => {
  let index = 0;
  const images = carousel.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  images[index].classList.add('active');

  prevBtn.addEventListener('click', () => {
    images[index].classList.remove('active');
    index = (index - 1 + images.length) % images.length;
    images[index].classList.add('active');
  });

  nextBtn.addEventListener('click', () => {
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
  });
});

  function updateCartTotal() {
    let total = 0;
    const items = document.querySelectorAll('#cart .cart-item');

    items.forEach(item => {
      const priceText = item.querySelector('p').textContent.replace('$', '').replace('/month', '');
      const qty = parseInt(item.querySelector('input').value);
      total += parseFloat(priceText) * qty;
    });

    document.getElementById('cart-total').textContent = `$${total}`;
  }

  // Recalculate when quantity changes
  document.querySelectorAll('#cart input[type="number"]').forEach(input => {
    input.addEventListener('input', updateCartTotal);
  });

  // Remove item from cart
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.target.closest('.cart-item').remove();
      updateCartTotal();
    });
  });

  // Call once on load
  updateCartTotal();



  function toggleDetails(button) {
    const details = button.nextElementSibling;
    const isVisible = details.style.display === 'block';
    details.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? 'View Details' : 'Hide Details';
  }