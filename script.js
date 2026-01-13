// 平滑滚动
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(11, 15, 25, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(11, 15, 25, 0.95)';
        }
    });

    // 新闻分类切换
    const newsCategories = document.querySelectorAll('.news-category');
    const newsItems = document.querySelectorAll('.news-item');
    
    newsCategories.forEach(category => {
        category.addEventListener('click', function(e) {
            e.preventDefault();
            // 移除所有活跃状态
            newsCategories.forEach(cat => cat.classList.remove('active'));
            // 添加当前活跃状态
            this.classList.add('active');
            
            // 获取当前分类
            const selectedCategory = this.getAttribute('data-category');
            
            // 筛选新闻
            newsItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (selectedCategory === '全部' || itemCategory === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 地区标签切换
    const regionTabs = document.querySelectorAll('.region-tab');
    const universityItems = document.querySelectorAll('.university-item');
    
    regionTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            // 移除所有活跃状态
            regionTabs.forEach(t => t.classList.remove('active'));
            // 添加当前活跃状态
            this.classList.add('active');
            
            // 获取当前地区
            const selectedRegion = this.getAttribute('data-region');
            
            // 筛选高校
            universityItems.forEach(item => {
                const itemRegion = item.getAttribute('data-region');
                if (selectedRegion === '全部' || itemRegion === selectedRegion) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 表单提交处理
    const joinForm = document.querySelector('.join-form');
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const member = {
                name: formData.get('name'),
                school: formData.get('school'),
                major: formData.get('major'),
                grade: formData.get('grade'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                interest: formData.get('interest'),
                about: formData.get('about'),
                timestamp: new Date().toISOString()
            };
            
            // 保存到localStorage
            const members = JSON.parse(localStorage.getItem('startupDreamersMembers')) || [];
            members.push(member);
            localStorage.setItem('startupDreamersMembers', JSON.stringify(members));
            
            alert('表单提交成功！我们会尽快与您联系。');
            this.reset();
        });
    }

    // 动态添加随机噪点背景效果
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.position = 'relative';
        
        // 创建噪点 canvas
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.right = '0';
        canvas.style.bottom = '0';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.03';
        heroSection.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;     // R
            data[i + 1] = value; // G
            data[i + 2] = value; // B
            data[i + 3] = 255;   // A
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // 窗口大小改变时重新绘制
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const newImageData = ctx.createImageData(canvas.width, canvas.height);
            const newData = newImageData.data;
            
            for (let i = 0; i < newData.length; i += 4) {
                const value = Math.random() * 255;
                newData[i] = value;
                newData[i + 1] = value;
                newData[i + 2] = value;
                newData[i + 3] = 255;
            }
            
            ctx.putImageData(newImageData, 0, 0);
        });
    }

    // 统计数字动画
    const animateNumbers = () => {
        const counters = document.querySelectorAll('.trust-data-item h3');
        counters.forEach(counter => {
            const target = counter.textContent;
            const isPlus = target.includes('+');
            const isText = target.includes('每周');
            
            if (isText) {
                return; // 文本内容不执行动画
            }
            
            const numericTarget = parseInt(target);
            let current = 0;
            const increment = numericTarget / 50;
            const duration = 2000;
            const startTime = Date.now();
            
            const updateCounter = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                current = progress * numericTarget;
                
                if (isPlus) {
                    counter.textContent = Math.floor(current) + '+';
                } else {
                    counter.textContent = Math.floor(current);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        });
    };
    
    // 当滚动到统计数字区域时执行动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const trustDataSection = document.querySelector('.trust-data');
    if (trustDataSection) {
        observer.observe(trustDataSection);
    }
});