// DOM yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobil menü toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scroll için tüm linkleri seç
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Mobil menüyü kapat
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Header scroll efekti
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.1)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // WhatsApp form submit işlemi
    const whatsappForm = document.getElementById('whatsappForm');
    
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const plate = document.getElementById('plate').value;
            const service = document.getElementById('service').value;
            const problem = document.getElementById('problem').value;
            
            // WhatsApp mesajını oluştur
            const message = `🚗 *ÇALIŞKAN OTO KURTARMA - YENİ TALEP* 🚗

👤 *Müşteri Bilgileri:*
• Ad Soyad: ${name}
• Telefon: ${phone}
• Araç Plakası: ${plate}

🔧 *Hizmet Türü:* ${service}

📝 *Sorun Açıklaması:*
${problem}

📍 *Konum:* Malatya, Turkey

⏰ *Talep Zamanı:* ${new Date().toLocaleString('tr-TR')}`;
            
            // WhatsApp linkini oluştur
            const whatsappUrl = `https://wa.me/905404403144?text=${encodeURIComponent(message)}`;
            
            // WhatsApp'ı aç
            window.open(whatsappUrl, '_blank');
            
            // Başarı mesajı göster
            showNotification('Form bilgileri WhatsApp\'a yönlendiriliyor...', 'success');
            
            // Formu temizle
            this.reset();
        });
    }
    
    // Acil çağrı butonuna tıklandığında
    const emergencyButtons = document.querySelectorAll('.btn-emergency, .emergency-btn');
    
    emergencyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Mobilde direkt arama yap
            if (window.innerWidth <= 768) {
                return; // Normal telefon linki çalışsın
            }
            
            // Desktop'ta onay sor
            e.preventDefault();
            
            if (confirm('Acil çağrı yapmak istediğinizden emin misiniz?')) {
                window.location.href = this.href;
            }
        });
    });
    
    // Animasyonlu sayaçlar
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
        }, 20);
    };
    
    // Intersection Observer ile sayaç animasyonu
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.textContent.replace(/\D/g, ''));
                animateCounter(statNumber, target);
                observer.unobserve(statNumber);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
    
    // Hizmet kartları hover efekti
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Bildirim sistemi
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // CSS stilleri ekle
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animasyon
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Kapatma butonu
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Otomatik kapatma
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Sayfa yüklendiğinde hoş geldin mesajı
    setTimeout(() => {
        showNotification('Çalışkan Oto Kurtarma\'ya hoş geldiniz! 7/24 hizmetinizdeyiz.', 'info');
    }, 1000);
    
    // Loading animasyonu
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
    
    // Parallax efekti (hero section için)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Klavye kısayolları
    document.addEventListener('keydown', function(e) {
        // ESC tuşu ile mobil menüyü kapat
        if (e.key === 'Escape') {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
        
        // 1 tuşu ile acil çağrı
        if (e.key === '1') {
            window.location.href = 'tel:+905404403144';
        }
    });
    
    // Service Worker kaydı (PWA için)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }
    
    // Geolocation (konum bazlı hizmet için)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Konum bilgisini localStorage'a kaydet
            localStorage.setItem('userLocation', JSON.stringify({
                lat: latitude,
                lng: longitude
            }));
        }, function(error) {
            console.log('Konum alınamadı:', error.message);
        });
    }
    
    // Online/Offline durumu kontrolü
    window.addEventListener('online', function() {
        showNotification('İnternet bağlantınız yeniden kuruldu!', 'success');
    });
    
    window.addEventListener('offline', function() {
        showNotification('İnternet bağlantınız kesildi. Acil durumlar için telefon numaramızı kullanın.', 'error');
    });
    
    // Performans optimizasyonu - Lazy loading
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Image Slider
    const sliderImages = document.querySelectorAll('.slider-image');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentImageIndex = 0;
    
    function nextImage() {
        sliderImages[currentImageIndex].classList.remove('active');
        sliderDots[currentImageIndex].classList.remove('active');
        
        currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
        
        sliderImages[currentImageIndex].classList.add('active');
        sliderDots[currentImageIndex].classList.add('active');
    }
    
    // Nokta tıklama ile resim değiştirme
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            sliderImages[currentImageIndex].classList.remove('active');
            sliderDots[currentImageIndex].classList.remove('active');
            
            currentImageIndex = index;
            
            sliderImages[currentImageIndex].classList.add('active');
            sliderDots[currentImageIndex].classList.add('active');
        });
    });
    
    // Her 3 saniyede bir resim değiştir
    setInterval(nextImage, 3000);
    
    console.log('Çalışkan Oto Kurtarma web sitesi yüklendi! 🚗');
}); 