document.addEventListener('DOMContentLoaded', () => {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  // Remove testimonials carousel related code
  const testimonials = document.querySelector('.testimonials-carousel');
  if (testimonials) {
    testimonials.remove();
  }

  // Efecto parallax suave en el header
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGraphics = document.querySelector('.hero-graphics');
    if (heroGraphics) {
      heroGraphics.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Animación suave del scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // Efecto de revelación del nav al hacer scroll
  let lastScroll = 0;
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      nav.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
      nav.classList.remove('scroll-up');
      nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
      nav.classList.remove('scroll-down');
      nav.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
  });

  // Efecto hover en las características
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseover', () => {
      card.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    
    card.addEventListener('mouseout', () => {
      card.style.background = 'rgba(255, 255, 255, 0.05)';
    });
  });

  // Animación del dispositivo mockup con la imagen
  const mockup = document.querySelector('.device-mockup');
  const screenshot = document.querySelector('.app-screenshot');
  
  if (mockup && screenshot) {
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const rotateY = (clientX - innerWidth / 2) * 0.02;
      const rotateX = (clientY - innerHeight / 2) * -0.02;
      
      mockup.style.transform = `
        perspective(1000px)
        rotateY(${rotateY}deg)
        rotateX(${rotateX}deg)
      `;

      // Sutil efecto parallax en la imagen dentro del mockup
      screenshot.style.transform = `scale(1.05) translate(${rotateY * 0.5}px, ${rotateX * 0.5}px)`;
    });
  }

  // Remove experience posts related code
  const experiencePosts = document.querySelector('.experience-post');
  if (experiencePosts) {
    experiencePosts.remove();
  }

  // Remove all experience-related event listeners and functions
  const commentForms = document.querySelectorAll('.comment-form');
  if (commentForms) {
    commentForms.forEach(form => form.remove());
  }

  // Add neon pulse effect to buttons
  const buttons = document.querySelectorAll('.btn-primary');
  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.animation = 'neonPulse 1.5s infinite';
    });
    button.addEventListener('mouseout', () => {
      button.style.animation = 'none';
    });
  });

  // Add smooth reveal for sections
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 1s ease-out';
    sectionObserver.observe(section);
  });

  // Payment and Download System - Updated to handle separate downloads with unique URLs and file names
  const mobilePurchaseBtn = document.querySelector('.mobile-download-btn');
  const tvPurchaseBtn = document.querySelector('.tv-download-btn');
  const mobilePaymentModal = document.querySelector('.mobile-payment-modal');
  const tvPaymentModal = document.querySelector('.tv-payment-modal');
  const closeMobileModalBtn = mobilePaymentModal.querySelector('.close-modal');
  const closeTvModalBtn = tvPaymentModal.querySelector('.close-modal');
  const confirmMobilePaymentBtn = document.querySelector('#confirmMobilePayment');
  const confirmTvPaymentBtn = document.querySelector('#confirmTvPayment');
  const mobileFileInput = document.querySelector('#mobilePaymentProof');
  const tvFileInput = document.querySelector('#tvPaymentProof');

  // Unique download URLs and file names for mobile and TV versions
  const DOWNLOAD_CONFIG = {
    mobile: {
      url: 'https://aeroflow-ia.com/downloads/AeroflowIA_Mobile_v5.8.1.apk',
      fileName: 'AeroflowIA_Mobile_v5.8.1.apk'
    },
    tv: {
      url: 'https://aeroflow-ia.com/downloads/AeroflowIA_SmartTV_v5.8.1.apk',
      fileName: 'AeroflowIA_SmartTV_v5.8.1.apk'
    }
  };

  // Open mobile payment modal
  mobilePurchaseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetPaymentForm(mobilePaymentModal, mobileFileInput, confirmMobilePaymentBtn);
    mobilePaymentModal.classList.add('active');
  });

  // Open TV payment modal
  tvPurchaseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetPaymentForm(tvPaymentModal, tvFileInput, confirmTvPaymentBtn);
    tvPaymentModal.classList.add('active');
  });

  // Reset payment form function
  function resetPaymentForm(modal, fileInput, confirmBtn) {
    fileInput.value = '';
    confirmBtn.innerHTML = 'Confirmar Pago';
    confirmBtn.disabled = false;
  }

  // Close mobile modal
  closeMobileModalBtn.addEventListener('click', () => {
    mobilePaymentModal.classList.remove('active');
    resetPaymentForm(mobilePaymentModal, mobileFileInput, confirmMobilePaymentBtn);
  });

  // Close TV modal
  closeTvModalBtn.addEventListener('click', () => {
    tvPaymentModal.classList.remove('active');
    resetPaymentForm(tvPaymentModal, tvFileInput, confirmTvPaymentBtn);
  });

  // Mobile payment confirmation
  confirmMobilePaymentBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (!mobileFileInput.files[0]) {
      alert('Por favor, adjunta el comprobante de pago. Es requisito obligatorio para continuar.');
      return;
    }

    await handlePaymentConfirmation(confirmMobilePaymentBtn, mobilePaymentModal, DOWNLOAD_CONFIG.mobile);
  });

  // TV payment confirmation
  confirmTvPaymentBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (!tvFileInput.files[0]) {
      alert('Por favor, adjunta el comprobante de pago. Es requisito obligatorio para continuar.');
      return;
    }

    await handlePaymentConfirmation(confirmTvPaymentBtn, tvPaymentModal, DOWNLOAD_CONFIG.tv);
  });

  // Common payment confirmation handler
  async function handlePaymentConfirmation(confirmBtn, modal, downloadConfig) {
    // Show loading state
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
    confirmBtn.disabled = true;
    
    // Simulate payment verification
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Close modal
    modal.classList.remove('active');
    
    // Celebration effects
    startConfetti();
    showSuccessMessage();

    // Start download after delay
    setTimeout(() => {
      // Create a temporary link and trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadConfig.url;
      downloadLink.download = downloadConfig.fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      showDownloadStartedMessage();
    }, 1500);
  }

  function startConfetti() {
    const duration = 4000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#00ff88', '#6c00ff']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00ff88', '#6c00ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  function showSuccessMessage() {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
      <div class="success-content">
        <i class="fas fa-check-circle"></i>
        <h3>¡Gracias por tu compra!</h3>
        <p>Tu descarga comenzará automáticamente en unos segundos...</p>
      </div>
    `;
    document.body.appendChild(successMsg);

    setTimeout(() => {
      successMsg.remove();
    }, 5000);
  }

  function showDownloadStartedMessage() {
    const downloadMsg = document.createElement('div');
    downloadMsg.className = 'download-message';
    downloadMsg.innerHTML = `
      <div class="download-content">
        <i class="fas fa-download"></i>
        <p>¡Tu descarga ha comenzado!</p>
      </div>
    `;
    document.body.appendChild(downloadMsg);

    setTimeout(() => {
      downloadMsg.remove();
    }, 3000);
  }
});