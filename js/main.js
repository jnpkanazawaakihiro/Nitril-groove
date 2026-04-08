// スムーズスクロール
document.addEventListener('DOMContentLoaded', function() {
    
    // すべてのアンカーリンクにスムーズスクロールを適用
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // href="#"のみの場合はスキップ
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // ヘッダーの高さを考慮してスクロール
                const headerHeight = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // フォーム送信時の処理（実際の送信先に合わせて調整してください）
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(form);
            
            // ここに実際の送信処理を追加
            // 例：fetch APIを使った送信、Google Formsへの送信など
            
            // デモ用のアラート
            alert('お見積依頼を受け付けました。\n担当者より折り返しご連絡いたします。\n\n※実際の運用時は、このアラートを削除し、適切な送信処理を実装してください。');
            
            // フォームのリセット
            form.reset();
        });
    }
    
    // スクロール時のヘッダー影の追加
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // フェードインアニメーション（スクロール時）
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    const animateElements = document.querySelectorAll('section');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
});
