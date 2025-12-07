// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// チャプターと成長カードを監視
document.addEventListener('DOMContentLoaded', () => {
    const chapters = document.querySelectorAll('.chapter');
    const growthCards = document.querySelectorAll('.growth-card');
    
    chapters.forEach(chapter => {
        observer.observe(chapter);
    });
    
    growthCards.forEach((card, index) => {
        observer.observe(card);
        // スタaggered animation用の遅延
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// ナビゲーションの表示/非表示
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // 下にスクロール
        nav.classList.add('hidden');
    } else {
        // 上にスクロール
        nav.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// スクロールインジケーターのクリック
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    const firstChapter = document.querySelector('#chapter1');
    if (firstChapter) {
        const navHeight = nav.offsetHeight;
        const targetPosition = firstChapter.offsetTop - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
});

// パララックス効果（ヒーローセクション）
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// アクティブなナビゲーション項目のハイライト
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = nav.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - navHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// テキストアニメーション（タイプライター効果のオプション）
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ページ読み込み時のアニメーション
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// カードホバー効果の強化
document.querySelectorAll('.growth-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// チャプター番号のアニメーション
const chapterNumbers = document.querySelectorAll('.chapter-number');
chapterNumbers.forEach((num, index) => {
    observer.observe(num);
    num.addEventListener('animationend', () => {
        num.style.animation = 'none';
    });
});

// パフォーマンス最適化：デバウンス関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// スクロールイベントの最適化
const optimizedScrollHandler = debounce(() => {
    // スクロール関連の処理
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

