// スムーズスクロール
document.addEventListener('DOMContentLoaded', function() {
    
    // ハンバーガーメニューの動作
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    
    if (mobileMenuBtn && mobileMenu && mobileMenuPanel && mobileMenuClose) {
        // メニューを開く
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔵 メニューを開く');
            
            // 1. hiddenクラスを削除して表示
            mobileMenu.classList.remove('hidden');
            
            // 2. 少し待ってからアニメーション開始
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0');
                mobileMenu.classList.add('opacity-100');
                mobileMenuPanel.style.transform = 'translateX(0)';
            }, 10);
        });
        
        // メニューを閉じる
        const closeMenu = () => {
            console.log('🔴 メニューを閉じる');
            
            // 1. アニメーション開始
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
            mobileMenuPanel.style.transform = 'translateX(100%)';
            
            // 2. アニメーション完了後にhiddenを追加
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        };
        
        // ×ボタンでメニューを閉じる
        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
        });
        
        // オーバーレイをクリックして閉じる
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });
        
        // Escapeキーでメニューを閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMenu();
            }
        });
        
        // メニュー内のリンクをクリックしたら閉じる
        const menuLinks = mobileMenuPanel.querySelectorAll('a[href^="#"]');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });
        
        console.log('✅ ハンバーガーメニュー初期化完了');
        console.log('📱 メニュー要素:', {
            mobileMenuBtn: !!mobileMenuBtn,
            mobileMenu: !!mobileMenu,
            mobileMenuPanel: !!mobileMenuPanel,
            mobileMenuClose: !!mobileMenuClose
        });
    } else {
        console.error('❌ メニュー要素が見つかりません', {
            mobileMenuBtn: !!mobileMenuBtn,
            mobileMenu: !!mobileMenu,
            mobileMenuPanel: !!mobileMenuPanel,
            mobileMenuClose: !!mobileMenuClose
        });
    }
    
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
    
    // ========================================
    // Google Ads コンバージョントラッキング
    // ========================================
    
    // 1. 見積フォームCTAクリック計測（主要コンバージョン）
    const quoteButtons = document.querySelectorAll('a[href*="medialphaplus.myshopify.com/pages"], a[href*="お見積もり"]');
    
    quoteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Google Ads コンバージョン送信（申し込みコンバージョン）
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-16540234234/MhdjCJmNsZUcEPrj_849'
                });
                
                console.log('✅ 見積フォームCTAクリック - コンバージョン計測完了');
            } else {
                console.warn('⚠️ gtag関数が読み込まれていません');
            }
            
            // Google Analytics イベント送信（オプション）
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click_quote_button', {
                    'event_category': 'CTA',
                    'event_label': 'Quote Form Click',
                    'value': 1
                });
            }
        });
    });
    
    // 2. 電話CTAクリック計測（主要コンバージョン）
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            
            // Google Ads コンバージョン送信
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-16540234234/YYYYY-YYYYY', // ← Google Adsで取得した電話用コンバージョンラベルに置き換えてください
                    'value': 8000.0,
                    'currency': 'JPY'
                });
                
                console.log('✅ 電話CTAクリック - コンバージョン計測完了: ' + phoneNumber);
            } else {
                console.warn('⚠️ gtag関数が読み込まれていません');
            }
            
            // Google Analytics イベント送信（オプション）
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_click', {
                    'event_category': 'Contact',
                    'event_label': 'Phone Number Click - ' + phoneNumber,
                    'value': 1
                });
            }
        });
    });
    
    // 3. PDFダウンロード計測（マイクロコンバージョン）
    const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');
    
    pdfLinks.forEach(link => {
        link.addEventListener('click', function() {
            const pdfUrl = this.getAttribute('href');
            const pdfName = pdfUrl.split('/').pop();
            
            // Google Analytics イベント送信
            if (typeof gtag !== 'undefined') {
                gtag('event', 'pdf_download', {
                    'event_category': 'Engagement',
                    'event_label': pdfName,
                    'value': 1
                });
                
                console.log('📄 PDFダウンロード計測: ' + pdfName);
            }
        });
    });
    
    // 4. 2分以上滞在計測（エンゲージメント測定）
    let startTime = Date.now();
    let twoMinutesFired = false;
    
    setInterval(function() {
        let elapsedTime = (Date.now() - startTime) / 1000; // 秒単位
        
        if (elapsedTime >= 120 && !twoMinutesFired) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'engaged_user', {
                    'event_category': 'Engagement',
                    'event_label': '2 Minutes on Site',
                    'value': 1
                });
                
                console.log('⏱️ 2分以上滞在 - エンゲージメント計測完了');
                twoMinutesFired = true;
            }
        }
    }, 10000); // 10秒ごとにチェック
    
    // 初回読み込み時のログ
    console.log('🚀 Google Ads コンバージョントラッキング初期化完了');
    console.log('📊 計測対象: 見積CTA=' + quoteButtons.length + '個, 電話CTA=' + phoneLinks.length + '個, PDF=' + pdfLinks.length + '個');
    
});
