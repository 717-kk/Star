document.addEventListener('DOMContentLoaded', () => {
    createStars();

    // 添加简单的点击交互反馈
    const icons = document.querySelectorAll('.icon-circle, .icon-rect');
    icons.forEach(icon => {
        icon.addEventListener('click', function() {
            // 移除 JS 缩放逻辑，改用 CSS active 状态处理发光效果
        });
    });

    // 设置页面逻辑
    initSettingsPage();
    initCustomSelect();

    // 世界书按钮点击事件
    const worldbookBtn = document.getElementById('icon-worldbook');
    if (worldbookBtn) {
        worldbookBtn.addEventListener('click', () => {
            showToast('世界书功能开发中...');
        });
    }

    // 流星雨按钮点击事件
    const meteorBtn = document.getElementById('meteor-btn');
    if (meteorBtn) {
        meteorBtn.addEventListener('click', createStarShower);
    }

    // 头像上传功能
    const avatarContainer = document.getElementById('avatar-container');
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarImg = document.getElementById('avatar-img');

    if (avatarContainer && avatarUpload && avatarImg) {
        avatarContainer.addEventListener('click', () => {
            avatarUpload.click();
        });

        avatarUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    avatarImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

function createStarShower() {
    const screen = document.querySelector('.screen');
    const starCount = 30; // 星星数量
    
    // 创建星星雨容器
    const showerContainer = document.createElement('div');
    showerContainer.classList.add('star-shower');
    screen.appendChild(showerContainer);

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('falling-star');
        star.innerHTML = '<i class="fas fa-star"></i>'; // 使用 FontAwesome 星星图标
        
        // 随机起始位置
        const startLeft = Math.random() * 100; 
        star.style.left = `${startLeft}%`;
        star.style.top = '-20px'; // 从屏幕上方开始
        
        // 随机动画持续时间，更慢更飘逸
        const duration = Math.random() * 3 + 3; // 3s - 6s
        
        // 随机延迟
        const delay = Math.random() * 3; 
        
        // 随机大小
        const fontSize = Math.random() * 10 + 12; // 12px - 22px
        star.style.fontSize = `${fontSize}px`;
        
        // 使用 linear 或 ease-in-out 让飘落更自然
        star.style.animation = `star-fall ${duration}s linear forwards ${delay}s`;
        
        showerContainer.appendChild(star);
    }

    // 整个动画结束后移除容器，时间需要相应延长
    setTimeout(() => {
        showerContainer.remove();
    }, 10000);
}

function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // 随机位置
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // 随机大小
        const size = Math.random() * 2 + 1;
        
        // 随机动画延迟和持续时间
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;

        starsContainer.appendChild(star);
    }
}

function initSettingsPage() {
    const settingsBtn = document.getElementById('icon-settings');
    const settingsMenu = document.getElementById('settings-menu');
    const apiSettingsPage = document.getElementById('api-settings-page');
    
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    
    const btnApiSettings = document.getElementById('btn-api-settings');
    const btnThemeSettings = document.getElementById('btn-theme-settings');
    const btnDataSettings = document.getElementById('btn-data-settings');

    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const fetchModelsBtn = document.getElementById('fetch-models-btn');
    const tempSlider = document.getElementById('temperature');
    const tempValue = document.getElementById('temp-value');
    
    // 加载保存的设置
    loadSettings();

    // 打开主设置菜单
    if (settingsBtn && settingsMenu) {
        settingsBtn.addEventListener('click', () => {
            settingsMenu.classList.add('active');
        });
    }

    // 关闭主设置菜单
    if (closeMenuBtn && settingsMenu) {
        closeMenuBtn.addEventListener('click', () => {
            settingsMenu.classList.remove('active');
            // 确保子页面也关闭
            if (apiSettingsPage) apiSettingsPage.classList.remove('active');
        });
    }

    // 打开 API 设置页面
    if (btnApiSettings && apiSettingsPage) {
        btnApiSettings.addEventListener('click', () => {
            apiSettingsPage.classList.add('active');
        });
    }

    // 从 API 设置页面返回主菜单
    if (backToMenuBtn && apiSettingsPage) {
        backToMenuBtn.addEventListener('click', () => {
            apiSettingsPage.classList.remove('active');
        });
    }

    // 其他设置按钮（暂未实现功能，仅做点击反馈）
    if (btnThemeSettings) {
        btnThemeSettings.addEventListener('click', () => {
            showToast('美化设置功能开发中...');
        });
    }

    if (btnDataSettings) {
        btnDataSettings.addEventListener('click', () => {
            showToast('数据功能开发中...');
        });
    }

    // 温度滑块变化
    if (tempSlider && tempValue) {
        tempSlider.addEventListener('input', (e) => {
            tempValue.textContent = e.target.value;
        });
    }

    // 拉取模型列表
    if (fetchModelsBtn) {
        fetchModelsBtn.addEventListener('click', async () => {
            const apiUrl = document.getElementById('api-url').value;
            const apiKey = document.getElementById('api-key').value;

            if (!apiUrl || !apiKey) {
                showToast('请先填写 API URL 和 API Key');
                return;
            }

            fetchModelsBtn.classList.add('rotating');
            
            try {
                // 尝试从 API 获取模型列表
                // 这里假设是兼容 OpenAI 格式的 API
                const response = await fetch(`${apiUrl}/models`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const customOptions = document.querySelector('.custom-options');
                
                // 清空现有选项
                customOptions.innerHTML = '<div class="custom-option" data-value="">请选择模型</div>';
                
                // 添加新选项
                if (data.data && Array.isArray(data.data)) {
                    data.data.forEach(model => {
                        const option = document.createElement('div');
                        option.classList.add('custom-option');
                        option.dataset.value = model.id;
                        option.textContent = model.id;
                        customOptions.appendChild(option);
                    });
                    
                    // 重新绑定点击事件
                    initCustomSelect();
                    
                    showToast('模型列表更新成功！');
                } else {
                    showToast('获取到的数据格式不正确');
                }
            } catch (error) {
                console.error('获取模型失败:', error);
                showToast('获取模型失败，请检查 URL 和 Key 是否正确');
            } finally {
                fetchModelsBtn.classList.remove('rotating');
            }
        });
    }

    // 保存设置
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            const settings = {
                apiUrl: document.getElementById('api-url').value,
                apiKey: document.getElementById('api-key').value,
                model: document.getElementById('model-select-value').value,
                temperature: document.getElementById('temperature').value
            };

            localStorage.setItem('starSettings', JSON.stringify(settings));
            
            // 保存模型列表选项，以便下次加载
            const customOptions = document.querySelectorAll('.custom-option');
            const modelOptions = Array.from(customOptions).map(opt => ({
                value: opt.dataset.value,
                text: opt.textContent
            })).filter(opt => opt.value !== ""); // 过滤掉默认提示
            
            localStorage.setItem('starModelOptions', JSON.stringify(modelOptions));

            showToast('设置已保存');
            // 保存后不再自动退出
        });
    }
}

function initCustomSelect() {
    const customSelect = document.querySelector('.custom-select');
    const customOptions = document.querySelectorAll('.custom-option');
    const selectedText = document.getElementById('selected-model-text');
    const hiddenInput = document.getElementById('model-select-value');

    if (!customSelect) return;

    // 切换下拉菜单显示/隐藏
    const trigger = customSelect.querySelector('.custom-select-trigger');
    // 移除旧的事件监听器以防重复绑定
    const newTrigger = trigger.cloneNode(true);
    trigger.parentNode.replaceChild(newTrigger, trigger);
    
    newTrigger.addEventListener('click', (e) => {
        customSelect.classList.toggle('open');
        e.stopPropagation();
    });

    // 选项点击事件
    customOptions.forEach(option => {
        option.addEventListener('click', function() {
            customSelect.classList.remove('open');
            
            // 更新选中状态
            customOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // 更新显示文本和隐藏值
            const value = this.dataset.value;
            const text = this.textContent;
            
            selectedText.textContent = text;
            hiddenInput.value = value;
        });
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;

    container.appendChild(toast);

    // 3秒后移除
    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 3000);
}

function loadSettings() {
    const savedSettings = localStorage.getItem('starSettings');
    const savedModelOptions = localStorage.getItem('starModelOptions');

    if (savedModelOptions) {
        const options = JSON.parse(savedModelOptions);
        const customOptionsContainer = document.querySelector('.custom-options');
        
        if (customOptionsContainer && options.length > 0) {
            // 保留默认提示
            customOptionsContainer.innerHTML = '<div class="custom-option" data-value="">请选择或拉取模型</div>';
            
            options.forEach(opt => {
                const option = document.createElement('div');
                option.classList.add('custom-option');
                option.dataset.value = opt.value;
                option.textContent = opt.text;
                customOptionsContainer.appendChild(option);
            });
            
            // 重新初始化事件绑定
            initCustomSelect();
        }
    }

    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        const apiUrlInput = document.getElementById('api-url');
        const apiKeyInput = document.getElementById('api-key');
        const hiddenInput = document.getElementById('model-select-value');
        const selectedText = document.getElementById('selected-model-text');
        const tempSlider = document.getElementById('temperature');
        const tempValue = document.getElementById('temp-value');

        if (apiUrlInput) apiUrlInput.value = settings.apiUrl || '';
        if (apiKeyInput) apiKeyInput.value = settings.apiKey || '';
        
        if (hiddenInput && settings.model) {
            hiddenInput.value = settings.model;
            // 尝试找到对应的文本并显示
            const option = document.querySelector(`.custom-option[data-value="${settings.model}"]`);
            if (option) {
                selectedText.textContent = option.textContent;
                option.classList.add('selected');
            } else {
                selectedText.textContent = settings.model;
            }
        }
        
        if (tempSlider) tempSlider.value = settings.temperature || 0.7;
        if (tempValue) tempValue.textContent = settings.temperature || 0.7;
    }
}
