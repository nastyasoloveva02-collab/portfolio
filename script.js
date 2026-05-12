// ----------- Generic scroll reveal -----------
const revealElements = document.querySelectorAll('.edu-item, .section-title');
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ----------- About: header + text fade in together (photo shows instantly) -----------
const aboutHeader  = document.querySelector('.about-header');
const aboutContent = document.querySelector('.about-content');

if (aboutHeader && aboutContent) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutHeader.classList.add('visible');
        aboutContent.classList.add('visible');
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  aboutObserver.observe(aboutHeader);
}

// ----------- Nav border on scroll -----------
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});
/* ============ EXPERIENCE CAROUSEL ============ */
(function () {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  function getScrollStep() {
    const card = track.querySelector('.exp-card');
    if (!card) return 300;
    const style = getComputedStyle(track);
    const gap = parseInt(style.columnGap || style.gap || 30, 10);
    return card.getBoundingClientRect().width + gap;
  }

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  });

  const modal = document.getElementById('expModal');
  const modalBody = modal.querySelector('.exp-modal-body');
  const modalClose = modal.querySelector('.exp-modal-close');
  const backdrop = modal.querySelector('.exp-modal-backdrop');

  const fullDetails = [
    {
      company: 'Food with Benefits',
      role: 'Brand & Communications Intern',
      meta: 'Hong Kong · 2025',
      body: `Led a full packaging rework guided by A/B user testing, landing on a 10% size reduction that lifted both sales and customer sentiment. Built and secured a partnership with Cordis Hotel and headed communications for the Social Enterprise Summit — shaping the brand's voice across press, events, and retail touchpoints.`
    },
    {
      company: 'Gamilearn / QualiFly',
      role: 'Digital Marketing Analyst — Team Lead',
      meta: 'Hong Kong · 2024',
      body: `Designed B2C and B2B marketing frameworks built on competitive research and emerging-trend analysis. Led pitch-deck creation for the Hult Prize and helped shape the product's launch narrative — turning raw positioning work into a story that investors and early users both responded to.`
    },
    {
      company: 'TopTier Education',
      role: 'Social Media Marketing Intern',
      meta: 'Almaty · 2022',
      body: `Scaled the brand's social following from 18K to 90K within six months through a content strategy built around situational virality, Facebook ad targeting, and directing in-house video production. The work reframed how the team approached organic growth for the rest of the year.`
    },
    {
      company: 'HKUST Library Maps Exhibition',
      role: 'Student Docent',
      meta: 'Hong Kong · Feb 2024 — Jun 2024',
      body: `Curated exhibition storytelling and guided more than 200 visitors through centuries of Chinese mapmaking across a four-month run. Worked closely with the library team to translate archival material into a narrative audiences could actually connect with.`
    },
    {
      company: 'HKUST Undergraduate Admissions',
      role: 'Senior Student Ambassador',
      meta: 'Hong Kong · Feb 2023 — May 2026',
      body: `Hosted campus tours and delivered outreach presentations to prospective students, and produced promotional video content that supported university-wide recruitment campaigns. The role sits at the intersection of storytelling, public speaking, and content production.`
    },
    {
      company: 'HKUST Investment Circle & BSAMC',
      role: 'Marketing Associate',
      meta: 'Hong Kong · Feb 2024 — Jun 2024',
      body: `Designed promotional materials and conducted industry and competitor analysis for a semiconductor equity research report — bridging the gap between finance rigor and clean, readable design.`
    }
  ];

  document.querySelectorAll('.exp-readmore').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.exp-card');
      const i = parseInt(card.dataset.index, 10);
      const d = fullDetails[i];
      modalBody.innerHTML = `
        <h3>${d.company}</h3>
        <p class="modal-role">${d.role}</p>
        <p class="modal-meta">${d.meta}</p>
        <p>${d.body}</p>
      `;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();