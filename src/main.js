import {
  IMAGES,
  MENU_CATEGORIES,
  MENU_ITEMS,
  SIGNATURE_SHOWCASE,
  GALLERY_ITEMS,
  TESTIMONIALS,
} from './data.js';

document.documentElement.classList.add('js-ready');

// ---------------------------------------------------------------------------
// 1. Hydrate Static Images & Attach Resilient Fallbacks
// ---------------------------------------------------------------------------
function attachImageFallback(imgEl, labelText = 'SABLE & STEAM') {
  if (!imgEl) return;
  imgEl.addEventListener(
    'error',
    () => {
      imgEl.classList.add('opacity-0');
      const parent = imgEl.parentElement;
      if (parent && !parent.querySelector('.fallback-badge')) {
        parent.classList.add('img-fallback-shell', 'relative');
        const fallback = document.createElement('div');
        fallback.className =
          'fallback-badge absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[#FAF7F2]/85 pointer-events-none';
        fallback.innerHTML = `
          <span class="font-serif-editorial text-xl tracking-[0.1em]">${labelText}</span>
          <span class="mt-1 text-xs text-[#E6DDD0]/70">Specialty Coffee · Sydney</span>
        `;
        parent.appendChild(fallback);
      }
    },
    { once: true }
  );
}

function hydrateStaticAssets() {
  const staticImgs = document.querySelectorAll('img[data-asset]');
  staticImgs.forEach((img) => {
    const key = img.getAttribute('data-asset');
    if (key && IMAGES[key]) {
      img.src = IMAGES[key];
    }
    attachImageFallback(img, img.alt || 'SABLE & STEAM');
  });
}

// ---------------------------------------------------------------------------
// 2. Sticky Header Scroll State & Mobile Navigation Drawer
// ---------------------------------------------------------------------------
function initNavigation() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('header .nav-link');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileOpenBtn = document.getElementById('mobile-menu-open');
  const mobileCloseBtn = document.getElementById('mobile-menu-close');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const updateHeaderOnScroll = () => {
    if (!header) return;
    if (window.scrollY > 44) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  const sectionIds = ['home', 'story', 'menu', 'space', 'gallery', 'contact'];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const matches = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('is-active', matches);
          });
        }
      });
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  const openMobileMenu = () => {
    if (!mobileDrawer || !mobileOpenBtn) return;
    mobileDrawer.classList.remove('hidden');
    mobileOpenBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');
    mobileCloseBtn?.focus();
  };

  const closeMobileMenu = () => {
    if (!mobileDrawer || !mobileOpenBtn) return;
    mobileDrawer.classList.add('hidden');
    mobileOpenBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
  };

  mobileOpenBtn?.addEventListener('click', openMobileMenu);
  mobileCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
      closeMobileMenu();
      mobileOpenBtn?.focus();
    }
  });
}

// ---------------------------------------------------------------------------
// 3. Interactive Coffee & Café Menu + Selective Photography Spotlight
// ---------------------------------------------------------------------------
let activeCategory = 'all';
let activeSpotlightId = 'brown-butter-latte';

function updateSpotlight(item) {
  if (!item || !item.featuredImage) return;
  activeSpotlightId = item.id;

  const imgEl = document.getElementById('menu-spotlight-img');
  const kickerEl = document.getElementById('menu-spotlight-kicker');
  const priceEl = document.getElementById('menu-spotlight-price');
  const titleEl = document.getElementById('menu-spotlight-title');
  const captionEl = document.getElementById('menu-spotlight-caption');

  if (imgEl) {
    imgEl.src = item.featuredImage;
    imgEl.alt = `${item.name} — ${item.description}`;
    attachImageFallback(imgEl, item.name);
  }
  if (kickerEl) kickerEl.textContent = `${item.categoryLabel} · ${item.serving}`;
  if (priceEl) priceEl.textContent = item.price;
  if (titleEl) titleEl.textContent = item.name;
  if (captionEl) captionEl.textContent = item.featuredCaption || item.description;
}

function renderMenuFilterTabs() {
  const tabContainer = document.getElementById('menu-filter-tabs');
  const subtitleEl = document.getElementById('menu-category-subtitle');
  if (!tabContainer) return;

  tabContainer.innerHTML = '';

  MENU_CATEGORIES.forEach((cat) => {
    const isSelected = cat.id === activeCategory;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(isSelected));
    btn.className = isSelected
      ? 'px-4 py-2 text-xs font-medium tracking-[0.03em] bg-[#1E1612] text-[#FAF7F2] transition-colors whitespace-nowrap shrink-0 cursor-pointer'
      : 'px-4 py-2 text-xs font-medium tracking-[0.03em] text-[#564940] hover:text-[#1E1612] transition-colors whitespace-nowrap shrink-0 cursor-pointer';
    btn.textContent = cat.label;

    btn.addEventListener('click', () => {
      activeCategory = cat.id;
      if (subtitleEl) subtitleEl.textContent = cat.subtitle;
      renderMenuFilterTabs();
      renderMenuItems();

      const matchingFeatured = MENU_ITEMS.find(
        (m) => (activeCategory === 'all' || m.category === activeCategory) && m.featuredImage
      );
      if (matchingFeatured) {
        updateSpotlight(matchingFeatured);
      }
    });

    tabContainer.appendChild(btn);
  });
}

function renderMenuItems() {
  const container = document.getElementById('menu-items-container');
  if (!container) return;

  const filtered =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  container.innerHTML = '';

  filtered.forEach((item) => {
    const row = document.createElement('article');
    const hasPhoto = Boolean(item.featuredImage);
    const isCurrentSpotlight = item.id === activeSpotlightId;

    row.className = `py-5 transition-colors ${
      hasPhoto ? 'cursor-pointer hover:bg-[#FAF7F2]/60 px-3 -mx-3' : ''
    }`;

    row.innerHTML = `
      <div class="flex items-baseline justify-between gap-4">
        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 class="font-serif-editorial text-2xl font-semibold text-[#1E1612]">
            ${item.name}
          </h3>
          <span class="text-xs text-[#564940]">
            ${item.serving}
          </span>
          ${
            hasPhoto
              ? `<span class="text-xs font-medium ${
                  isCurrentSpotlight ? 'text-[#556148]' : 'text-[#564940]/80'
                }">· ${isCurrentSpotlight ? 'Viewing Photo' : 'Photo Preview'}</span>`
              : ''
          }
        </div>
        <span class="text-[15px] font-semibold text-[#1E1612] tabular-price shrink-0">
          ${item.price}
        </span>
      </div>
      <p class="mt-2 text-sm text-[#564940] leading-relaxed max-w-[62ch]">
        ${item.description}
      </p>
    `;

    if (hasPhoto) {
      row.setAttribute('tabindex', '0');
      row.setAttribute('role', 'button');
      row.setAttribute('aria-label', `Preview photograph of ${item.name}`);
      const selectHandler = () => {
        updateSpotlight(item);
        renderMenuItems();
      };
      row.addEventListener('click', selectHandler);
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectHandler();
        }
      });
    }

    container.appendChild(row);
  });
}

function initMenu() {
  renderMenuFilterTabs();
  const initialSpotlight = MENU_ITEMS.find((i) => i.id === activeSpotlightId) || MENU_ITEMS[0];
  updateSpotlight(initialSpotlight);
  renderMenuItems();

  const footerCatBtns = document.querySelectorAll('[data-footer-category]');
  const subtitleEl = document.getElementById('menu-category-subtitle');
  footerCatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetCat = btn.getAttribute('data-footer-category');
      if (!targetCat) return;
      activeCategory = targetCat;
      const catMeta = MENU_CATEGORIES.find((c) => c.id === targetCat);
      if (catMeta && subtitleEl) subtitleEl.textContent = catMeta.subtitle;
      renderMenuFilterTabs();
      renderMenuItems();
      const matchingFeatured = MENU_ITEMS.find(
        (m) => m.category === activeCategory && m.featuredImage
      );
      if (matchingFeatured) updateSpotlight(matchingFeatured);
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ---------------------------------------------------------------------------
// 4. Full Menu Broadsheet Modal ("View Full Menu")
// ---------------------------------------------------------------------------
function initFullMenuModal() {
  const modal = document.getElementById('full-menu-modal');
  const openBtn = document.getElementById('open-full-menu-btn');
  const footerOpenBtn = document.getElementById('footer-full-menu-btn');
  const sheetBody = document.getElementById('full-menu-sheet-body');
  const closeTriggers = document.querySelectorAll('[data-close-full-menu]');

  if (sheetBody) {
    const categoriesOnly = MENU_CATEGORIES.filter((c) => c.id !== 'all');
    sheetBody.innerHTML = categoriesOnly
      .map((cat) => {
        const items = MENU_ITEMS.filter((i) => i.category === cat.id);
        const rows = items
          .map(
            (item) => `
            <div class="py-3.5 border-b border-[#DFD5C5]/80 last:border-b-0">
              <div class="flex items-baseline justify-between gap-4">
                <h4 class="font-serif-editorial text-xl font-semibold text-[#1E1612]">${item.name}</h4>
                <span class="text-sm font-medium text-[#1E1612] tabular-price shrink-0">${item.price}</span>
              </div>
              <p class="text-xs text-[#556148] mt-0.5">${item.serving}</p>
              <p class="mt-1.5 text-xs text-[#564940] leading-relaxed">${item.description}</p>
            </div>
          `
          )
          .join('');

        return `
          <section>
            <div class="pb-3 border-b-2 border-[#1E1612]">
              <h3 class="font-serif-editorial text-2xl font-semibold text-[#1E1612]">${cat.label}</h3>
              <p class="mt-1 text-xs text-[#564940]">${cat.subtitle}</p>
            </div>
            <div class="mt-2">${rows}</div>
          </section>
        `;
      })
      .join('');
  }

  let lastTrigger = null;

  const openModal = (triggerEl) => {
    if (!modal) return;
    lastTrigger = triggerEl || document.activeElement;
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    const closeBtn = modal.querySelector('button[data-close-full-menu]');
    closeBtn?.focus();
  };

  const closeModal = () => {
    if (!modal || modal.classList.contains('hidden')) return;
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
  };

  openBtn?.addEventListener('click', () => openModal(openBtn));
  footerOpenBtn?.addEventListener('click', () => openModal(footerOpenBtn));
  closeTriggers.forEach((el) => el.addEventListener('click', closeModal));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

// ---------------------------------------------------------------------------
// 5. Signature Drinks Showcase
// ---------------------------------------------------------------------------
function renderSignatureShowcase() {
  const grid = document.getElementById('signature-drinks-grid');
  if (!grid) return;

  grid.innerHTML = '';

  SIGNATURE_SHOWCASE.forEach((drink, idx) => {
    const offsetClass = idx === 1 ? 'md:mt-10' : idx === 2 ? 'md:mt-4' : '';
    const article = document.createElement('article');
    article.className = `reveal-block group ${offsetClass}`;

    article.innerHTML = `
      <div class="relative overflow-hidden aspect-[3/4] img-fallback-shell bg-[#2C211B]">
        <img
          src="${drink.image}"
          alt="${drink.alt}"
          referrerpolicy="no-referrer"
          loading="lazy"
          class="w-full h-full object-cover editorial-photo"
        />
        <div
          aria-hidden="true"
          class="absolute inset-0 bg-gradient-to-t from-[#120D0A]/80 via-transparent to-transparent"
        ></div>
        <div class="absolute bottom-0 inset-x-0 p-6 flex items-baseline justify-between gap-4 text-[#FAF7F2]">
          <span class="text-xs tracking-[0.06em] text-[#E6DDD0]/90">${drink.temperature}</span>
          <span class="text-sm font-medium tabular-price">${drink.price}</span>
        </div>
      </div>

      <div class="mt-6 pt-5 border-t border-white/15">
        <p class="text-xs text-[#E6DDD0]/65 tracking-[0.04em]">
          ${drink.index}. ${drink.notes}
        </p>
        <h3 class="mt-2 font-serif-editorial text-3xl text-[#FAF7F2]">
          ${drink.name}
        </h3>
        <p class="mt-3 text-sm text-[#E6DDD0]/80 leading-relaxed">
          ${drink.description}
        </p>
      </div>
    `;

    const img = article.querySelector('img');
    attachImageFallback(img, drink.name);
    grid.appendChild(article);
  });
}

// ---------------------------------------------------------------------------
// 6. Café Space Gallery & Working Lightbox
// ---------------------------------------------------------------------------
function initGalleryAndLightbox() {
  const galleryGrid = document.getElementById('gallery');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentIndex = 0;
  let lastFocusedCard = null;

  const updateLightboxSlide = (index) => {
    currentIndex = (index + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    const item = GALLERY_ITEMS[currentIndex];
    if (lightboxImg) {
      lightboxImg.src = item.image;
      lightboxImg.alt = item.alt;
      attachImageFallback(lightboxImg, item.title);
    }
    if (lightboxCounter) {
      const currentNum = String(currentIndex + 1).padStart(2, '0');
      const totalNum = String(GALLERY_ITEMS.length).padStart(2, '0');
      lightboxCounter.textContent = `${currentNum} / ${totalNum}`;
    }
    if (lightboxCategory) lightboxCategory.textContent = item.category;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
  };

  const openLightbox = (index, triggerEl) => {
    if (!lightbox) return;
    lastFocusedCard = triggerEl || document.activeElement;
    updateLightboxSlide(index);
    lightbox.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    closeBtn?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    lightbox.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    if (lastFocusedCard && typeof lastFocusedCard.focus === 'function') {
      lastFocusedCard.focus();
    }
  };

  if (galleryGrid) {
    galleryGrid.innerHTML = '';
    GALLERY_ITEMS.forEach((item, index) => {
      const figure = document.createElement('figure');
      figure.className = `reveal-block group relative overflow-hidden bg-[#2C211B] img-fallback-shell cursor-pointer ${item.gridClass}`;
      figure.setAttribute('tabindex', '0');
      figure.setAttribute('role', 'button');
      figure.setAttribute('aria-label', `Open ${item.category}: ${item.title} in lightbox`);

      figure.innerHTML = `
        <img
          src="${item.image}"
          alt="${item.alt}"
          referrerpolicy="no-referrer"
          loading="lazy"
          class="w-full h-full object-cover editorial-photo"
        />
        <div
          aria-hidden="true"
          class="absolute inset-0 bg-gradient-to-t from-[#120D0A]/80 via-[#120D0A]/15 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"
        ></div>
        <figcaption class="absolute bottom-0 inset-x-0 p-6 md:p-7 text-[#FAF7F2]">
          <p class="text-xs tracking-[0.06em] text-[#E6DDD0]/85">${item.category}</p>
          <h3 class="mt-1 font-serif-editorial text-2xl text-[#FAF7F2]">${item.title}</h3>
        </figcaption>
      `;

      const img = figure.querySelector('img');
      attachImageFallback(img, item.title);

      figure.addEventListener('click', () => openLightbox(index, figure));
      figure.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index, figure);
        }
      });

      galleryGrid.appendChild(figure);
    });
  }

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => updateLightboxSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => updateLightboxSlide(currentIndex + 1));

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightboxSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') updateLightboxSlide(currentIndex + 1);
  });
}

// ---------------------------------------------------------------------------
// 7. Customer Testimonials
// ---------------------------------------------------------------------------
function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  grid.innerHTML = TESTIMONIALS.map(
    (t) => `
      <blockquote class="reveal-block flex flex-col justify-between pt-6 border-t border-[#DFD5C5]">
        <p class="font-serif-editorial text-2xl leading-[1.45] text-[#1E1612]">
          “${t.quote}”
        </p>
        <footer class="mt-6 text-xs text-[#564940]">
          <span class="font-semibold text-[#1E1612]">${t.author}</span>
          <span aria-hidden="true" class="mx-1.5">·</span>
          <span>${t.context}</span>
        </footer>
      </blockquote>
    `
  ).join('');
}

// ---------------------------------------------------------------------------
// 8. Visit Directions Modal, Copy Address, Contact Form & Footer Demo Links
// ---------------------------------------------------------------------------
function initVisitAndForms() {
  const dirModal = document.getElementById('directions-modal');
  const openDirBtn = document.getElementById('open-directions-btn');
  const closeDirTriggers = document.querySelectorAll('[data-close-directions]');

  const openDir = () => {
    if (!dirModal) return;
    dirModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    dirModal.querySelector('button[data-close-directions]')?.focus();
  };

  const closeDir = () => {
    if (!dirModal || dirModal.classList.contains('hidden')) return;
    dirModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    openDirBtn?.focus();
  };

  openDirBtn?.addEventListener('click', openDir);
  closeDirTriggers.forEach((el) => el.addEventListener('click', closeDir));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dirModal && !dirModal.classList.contains('hidden')) {
      closeDir();
    }
  });

  const copyBtn = document.getElementById('copy-address-btn');
  const copyFeedback = document.getElementById('copy-address-feedback');
  copyBtn?.addEventListener('click', async () => {
    const addressText = '48 Reservoir Street, Surry Hills NSW 2010, Australia';
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(addressText);
      }
      if (copyFeedback) {
        copyFeedback.textContent = 'Address copied to clipboard.';
        setTimeout(() => {
          copyFeedback.textContent = '';
        }, 3500);
      }
    } catch {
      if (copyFeedback) {
        copyFeedback.textContent = addressText;
      }
    }
  });

  const form = document.getElementById('contact-enquiry-form');
  const formFeedback = document.getElementById('form-feedback');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = /** @type {HTMLInputElement | null} */ (document.getElementById('enquiry-name'));
    const emailInput = /** @type {HTMLInputElement | null} */ (document.getElementById('enquiry-email'));
    const messageInput = /** @type {HTMLTextAreaElement | null} */ (document.getElementById('enquiry-message'));

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailValid || !message) {
      if (formFeedback) {
        formFeedback.className = 'text-xs font-medium text-[#8B3A2B]';
        formFeedback.textContent = 'Please provide your name, a valid email, and a brief note.';
      }
      return;
    }

    if (formFeedback) {
      formFeedback.className = 'text-xs font-medium text-[#556148]';
      formFeedback.textContent = `Thank you, ${name}. Your demonstration enquiry has been recorded.`;
    }
    if (form instanceof HTMLFormElement) {
      form.reset();
    }
  });

  const demoSocialBtns = document.querySelectorAll('[data-demo-social]');
  const demoSocialFeedback = document.getElementById('demo-social-feedback');
  demoSocialBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const label = btn.getAttribute('data-demo-social');
      if (demoSocialFeedback) {
        demoSocialFeedback.textContent = `${label} is presented as a portfolio demonstration link.`;
      }
    });
  });

  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

// ---------------------------------------------------------------------------
// 9. Subtle Scroll Reveal Observer
// ---------------------------------------------------------------------------
function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const blocks = document.querySelectorAll('.reveal-block');
  blocks.forEach((block) => {
    const rect = block.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.92) {
      block.classList.add('is-pending');
    }
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  blocks.forEach((block) => {
    if (block.classList.contains('is-pending')) {
      observer.observe(block);
    }
  });
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
hydrateStaticAssets();
initNavigation();
initMenu();
initFullMenuModal();
renderSignatureShowcase();
initGalleryAndLightbox();
renderTestimonials();
initVisitAndForms();
initScrollReveal();
