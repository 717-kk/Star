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
    initThemeSettings(); // 初始化美化设置
    initDayMode(); // 初始化日间模式
    initCustomSelect();
    initPetFeature(); // 初始化桌宠功能

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
                    const result = e.target.result;
                    avatarImg.src = result;
                    // 保存头像到本地存储
                    try {
                        localStorage.setItem('userAvatar', result);
                        showToast('头像已更新');
                    } catch (err) {
                        console.error('头像保存失败，可能是图片太大', err);
                        showToast('头像保存失败，图片可能过大');
                    }
                };
                reader.readAsDataURL(file);
            }
        });
        
        // 加载保存的头像
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            avatarImg.src = savedAvatar;
        }
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

    // 美化设置按钮
    const themeSettingsPage = document.getElementById('theme-settings-page');
    const backToMenuBtnTheme = document.getElementById('back-to-menu-btn-theme');

    if (btnThemeSettings && themeSettingsPage) {
        btnThemeSettings.addEventListener('click', () => {
            themeSettingsPage.classList.add('active');
        });
    }

    if (backToMenuBtnTheme && themeSettingsPage) {
        backToMenuBtnTheme.addEventListener('click', () => {
            themeSettingsPage.classList.remove('active');
        });
    }
    
    // 关闭主菜单时也关闭美化设置
    if (closeMenuBtn && settingsMenu) {
        closeMenuBtn.addEventListener('click', () => {
            settingsMenu.classList.remove('active');
            // 确保子页面也关闭
            if (apiSettingsPage) apiSettingsPage.classList.remove('active');
            if (themeSettingsPage) themeSettingsPage.classList.remove('active');
            
            // 关闭三级页面
            const wallpaperSettingsPage = document.getElementById('wallpaper-settings-page');
            const iconSettingsPage = document.getElementById('icon-settings-page');
            const cssSettingsPage = document.getElementById('css-settings-page');
            const petOptionsSidebar = document.getElementById('pet-options-sidebar');
            
            if (wallpaperSettingsPage) wallpaperSettingsPage.classList.remove('active');
            if (iconSettingsPage) iconSettingsPage.classList.remove('active');
            if (cssSettingsPage) cssSettingsPage.classList.remove('active');
            if (petOptionsSidebar) petOptionsSidebar.classList.remove('active');
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

    // 1.5秒后移除
    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 1500);
}

function initDayMode() {
    const dayModeToggle = document.getElementById('day-mode-toggle');
    
    // 加载保存的日间模式设置
    const isDayMode = localStorage.getItem('starDayMode') === 'true';
    if (dayModeToggle) {
        dayModeToggle.checked = isDayMode;
        if (isDayMode) {
            applyDayMode(true);
        }
    }

    // 监听切换
    if (dayModeToggle) {
        dayModeToggle.addEventListener('change', (e) => {
            const isDay = e.target.checked;
            localStorage.setItem('starDayMode', isDay);
            applyDayMode(isDay);
        });
    }
}

function applyDayMode(isDay) {
    const root = document.documentElement;
    
    if (isDay) {
        // 日间模式变量
        // 注意：不再直接设置 --bg-gradient，交由 applyWallpaper 处理
        root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.6)');
        root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--glass-shadow', '0 4px 12px rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--text-color', '#1c1c1e');
        
        // 调整星星颜色为深色，以便在浅色背景下可见
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => star.style.background = '#1c1c1e');
        
        // 调整输入框占位符颜色
        const style = document.createElement('style');
        style.id = 'day-mode-style';
        style.innerHTML = `
            .star-input::placeholder { color: rgba(60, 60, 67, 0.6) !important; }
            .star-input { color: rgba(60, 60, 67, 1) !important; }
            .menu-item { background: rgba(255, 255, 255, 0.8) !important; }
            .style-btn { background: rgba(255, 255, 255, 0.8) !important; }
            .css-input { background: rgba(255, 255, 255, 0.8) !important; color: #1c1c1e !important; }
            .settings-page { background: rgba(242, 242, 247, 0.95) !important; }
            .settings-header { border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important; }
            .custom-options { background: rgba(255, 255, 255, 0.95) !important; color: #1c1c1e !important; }
            .custom-option { color: #1c1c1e !important; border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important; }
            .custom-option:hover { background: rgba(0, 0, 0, 0.05) !important; }
            .custom-select-trigger { background: rgba(255, 255, 255, 0.8) !important; color: #1c1c1e !important; }
            .form-group input[type="text"], .form-group input[type="password"] { background: rgba(255, 255, 255, 0.8) !important; color: #1c1c1e !important; }
            .icon-btn { background: rgba(255, 255, 255, 0.8) !important; }
            .save-btn { background: rgba(0, 122, 255, 0.1) !important; color: #007aff !important; border: 1px solid rgba(0, 122, 255, 0.2) !important; }
            .toast { background: rgba(255, 255, 255, 0.9) !important; color: #1c1c1e !important; border: 1px solid rgba(0, 0, 0, 0.1) !important; }
            .home-indicator { background: rgba(0, 0, 0, 0.5) !important; }
            .form-group label { color: rgba(60, 60, 67, 0.8) !important; }
            .range-labels { color: rgba(60, 60, 67, 0.6) !important; }
            #temp-value { color: rgba(60, 60, 67, 0.8) !important; }
            .close-btn { color: #1c1c1e !important; }
            .menu-item .arrow { color: rgba(60, 60, 67, 0.3) !important; }
            .custom-select-trigger .arrow { color: rgba(60, 60, 67, 0.6) !important; }
            .section-title { color: rgba(60, 60, 67, 0.8) !important; }
            .upload-btn { background: #f1f1f4ff !important; color: #1c1c1e !important; border: 1px solid rgba(0, 0, 0, 0.05) !important;  }
            .default-btn { background: #f1f1f4ff !important; color: #1c1c1e !important; border: 1px solid rgba(0, 0, 0, 0.05) !important; }
            .wallpaper-card { background: rgba(255, 255, 255, 0.5) !important; }
            .custom-icons-bubble { background: rgba(255, 255, 255, 0.5) !important; }
            .custom-icon-item .icon-preview { background: rgba(255, 255, 255, 0.8) !important; color: #1c1c1e !important; }
            .custom-icon-item span { color: rgba(60, 60, 67, 0.6) !important; }
            .refresh-btn { color: #1c1c1e !important; }
        `;
        document.head.appendChild(style);
        
    } else {
        // 夜间模式变量 (恢复默认)
        // 注意：不再直接移除 --bg-gradient，交由 applyWallpaper 处理
        root.style.removeProperty('--glass-bg');
        root.style.removeProperty('--glass-border');
        root.style.removeProperty('--glass-shadow');
        root.style.removeProperty('--text-color');
        
        // 恢复星星颜色
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => star.style.background = 'white');
        
        // 移除日间模式特定样式
        const style = document.getElementById('day-mode-style');
        if (style) style.remove();
    }

    // 统一重新应用当前壁纸（根据当前模式和壁纸类型）
    const wallpaperType = document.documentElement.dataset.wallpaperType;
    const wallpaperValue = document.documentElement.dataset.wallpaperValue;
    
    if (wallpaperType === 'custom') {
        applyWallpaper(wallpaperValue, true);
    } else {
        applyWallpaper('default');
    }
}

function initThemeSettings() {
    const styleBtns = document.querySelectorAll('.style-btn');
    const uploadWallpaperBtn = document.getElementById('upload-wallpaper-btn');
    const wallpaperUpload = document.getElementById('wallpaper-upload');
    const resetWallpaperBtn = document.getElementById('reset-wallpaper-btn');
    
    // 三级页面导航
    const btnWallpaperSettings = document.getElementById('btn-wallpaper-settings');
    const btnIconSettings = document.getElementById('btn-icon-settings');
    const btnCssSettings = document.getElementById('btn-css-settings');
    
    const wallpaperSettingsPage = document.getElementById('wallpaper-settings-page');
    const iconSettingsPage = document.getElementById('icon-settings-page');
    const cssSettingsPage = document.getElementById('css-settings-page');
    
    const backFromWallpaper = document.getElementById('back-from-wallpaper');
    const backFromIcon = document.getElementById('back-from-icon');
    const backFromCss = document.getElementById('back-from-css');
    
    // 壁纸设置页面导航
    if (btnWallpaperSettings && wallpaperSettingsPage) {
        btnWallpaperSettings.addEventListener('click', () => {
            wallpaperSettingsPage.classList.add('active');
        });
    }
    
    if (backFromWallpaper && wallpaperSettingsPage) {
        backFromWallpaper.addEventListener('click', () => {
            wallpaperSettingsPage.classList.remove('active');
        });
    }
    
    // 图标设置页面导航
    if (btnIconSettings && iconSettingsPage) {
        btnIconSettings.addEventListener('click', () => {
            iconSettingsPage.classList.add('active');
        });
    }
    
    if (backFromIcon && iconSettingsPage) {
        backFromIcon.addEventListener('click', () => {
            iconSettingsPage.classList.remove('active');
        });
    }
    
    // CSS设置页面导航
    if (btnCssSettings && cssSettingsPage) {
        btnCssSettings.addEventListener('click', () => {
            cssSettingsPage.classList.add('active');
        });
    }
    
    if (backFromCss && cssSettingsPage) {
        backFromCss.addEventListener('click', () => {
            cssSettingsPage.classList.remove('active');
        });
    }
    
    // 加载保存的主题设置
    loadThemeSettings();

    // 上传壁纸
    if (uploadWallpaperBtn && wallpaperUpload) {
        uploadWallpaperBtn.addEventListener('click', () => {
            wallpaperUpload.click();
        });

        wallpaperUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target.result;
                    applyWallpaper(result, true); // true 表示是自定义图片
                    saveThemeSettings();
                    showToast('壁纸已更新');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 恢复默认壁纸
    if (resetWallpaperBtn) {
        resetWallpaperBtn.addEventListener('click', () => {
            applyWallpaper('default');
            saveThemeSettings();
            showToast('已恢复默认壁纸');
        });
    }

    // 图标样式切换
    styleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新 UI
            styleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 应用样式
            const value = btn.dataset.value;
            applyIconStyle(value);
            
            // 保存设置
            saveThemeSettings();
        });
    });

    // 自定义图标上传
    initCustomIcons();
}

function initCustomIcons() {
    const iconUpload = document.getElementById('icon-upload');
    const customIconItems = document.querySelectorAll('.custom-icon-item');
    const resetCustomIconsBtn = document.getElementById('reset-custom-icons-btn');
    let currentTargetId = null;

    if (!iconUpload) return;

    // 点击图标项触发上传
    customIconItems.forEach(item => {
        item.addEventListener('click', () => {
            currentTargetId = item.dataset.target;
            iconUpload.click();
        });
    });

    // 处理文件上传
    iconUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && currentTargetId) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target.result;
                
                // 应用图标
                applyCustomIcon(currentTargetId, result);
                
                // 保存设置
                saveCustomIcon(currentTargetId, result);
                
                showToast('图标已更新');
            };
            reader.readAsDataURL(file);
        }
        // 重置 input 以便重复上传同一文件
        iconUpload.value = '';
    });

    // 恢复默认图标
    if (resetCustomIconsBtn) {
        resetCustomIconsBtn.addEventListener('click', () => {
            // 清除所有自定义图标
            const customIcons = JSON.parse(localStorage.getItem('customIcons') || '{}');
            Object.keys(customIcons).forEach(targetId => {
                resetCustomIcon(targetId);
            });
            
            // 清除本地存储
            localStorage.removeItem('customIcons');
            
            showToast('已恢复默认图标');
        });
    }
}

function resetCustomIcon(targetId) {
    // 恢复主页面图标
    const mainIcon = document.getElementById(targetId);
    if (mainIcon) {
        // 恢复默认图标（根据 ID 判断）
        let iconClass = '';
        switch(targetId) {
            case 'icon-diary': iconClass = 'fas fa-book-open'; break;
            case 'icon-heart': iconClass = 'fas fa-heart-pulse'; break;
            case 'icon-file': iconClass = 'fas fa-folder-open'; break;
            case 'icon-worldbook': iconClass = 'fas fa-book'; break;
            case 'icon-settings': iconClass = 'fas fa-cog'; break;
            case 'icon-paw': iconClass = 'fas fa-paw'; break;
        }
        
        if (iconClass) {
            mainIcon.innerHTML = `<i class="${iconClass}"></i>`;
        }
    }

    // 恢复设置页面的预览图标
    const previewItem = document.querySelector(`.custom-icon-item[data-target="${targetId}"] .icon-preview`);
    if (previewItem) {
        let iconClass = '';
        switch(targetId) {
            case 'icon-diary': iconClass = 'fas fa-book-open'; break;
            case 'icon-heart': iconClass = 'fas fa-heart-pulse'; break;
            case 'icon-file': iconClass = 'fas fa-folder-open'; break;
            case 'icon-worldbook': iconClass = 'fas fa-book'; break;
            case 'icon-settings': iconClass = 'fas fa-cog'; break;
            case 'icon-paw': iconClass = 'fas fa-paw'; break;
        }
        
        if (iconClass) {
            previewItem.innerHTML = `<i class="${iconClass}"></i>`;
        }
    }
}

function applyCustomIcon(targetId, imageData) {
    // 更新主页面图标
    const mainIcon = document.getElementById(targetId);
    if (mainIcon) {
        // 清空原有内容（通常是 <i> 标签）
        mainIcon.innerHTML = '';
        // 创建图片元素
        const img = document.createElement('img');
        img.src = imageData;
        
        // 判断图片类型
        // 如果是 jpeg/jpg，则认为是全覆盖背景图
        // 如果是 png/gif/webp 等，则认为是图标（保留透明背景）
        const isJpg = imageData.indexOf('image/jpeg') !== -1 || imageData.indexOf('image/jpg') !== -1;
        
        if (isJpg) {
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
        } else {
            img.style.width = '60%';
            img.style.height = '60%';
            img.style.objectFit = 'contain';
        }
        
        img.style.pointerEvents = 'none'; // 防止图片干扰点击
        mainIcon.appendChild(img);
    }

    // 更新设置页面的预览图标
    const previewItem = document.querySelector(`.custom-icon-item[data-target="${targetId}"] .icon-preview`);
    if (previewItem) {
        previewItem.innerHTML = `<img src="${imageData}" alt="icon">`;
    }
}

function saveCustomIcon(targetId, imageData) {
    const customIcons = JSON.parse(localStorage.getItem('customIcons') || '{}');
    customIcons[targetId] = imageData;
    localStorage.setItem('customIcons', JSON.stringify(customIcons));
}

function loadCustomIcons() {
    const customIcons = JSON.parse(localStorage.getItem('customIcons') || '{}');
    
    Object.keys(customIcons).forEach(targetId => {
        applyCustomIcon(targetId, customIcons[targetId]);
    });
}

function applyWallpaper(value, isCustom = false) {
    const previewScreen = document.getElementById('wallpaper-preview-screen');
    const starsContainer = document.getElementById('stars-container');
    
    if (isCustom) {
        // 自定义图片壁纸
        // 移除 fixed，因为在非全屏模式下 fixed 会相对于浏览器窗口计算大小，导致图片看起来被放大
        const bgStyle = `url('${value}') center/cover no-repeat`;
        document.documentElement.style.setProperty('--bg-gradient', bgStyle);
        
        // 更新预览
        if (previewScreen) {
            previewScreen.style.background = `url('${value}') center/cover no-repeat`;
        }
        
        // 隐藏星星
        if (starsContainer) starsContainer.style.display = 'none';
        
        // 存储当前壁纸类型为自定义
        document.documentElement.dataset.wallpaperType = 'custom';
        document.documentElement.dataset.wallpaperValue = value;
    } else {
        // 默认渐变壁纸
        // 检查当前是否为日间模式
        const isDayMode = localStorage.getItem('starDayMode') === 'true';
        
        let gradient;
        if (isDayMode) {
            gradient = 'linear-gradient(180deg, #f2f2f7 0%, #ffffff 100%)';
        } else {
            gradient = 'linear-gradient(180deg, #1c1c1e 0%, #000000 100%)';
        }
        
        document.documentElement.style.setProperty('--bg-gradient', gradient);
        
        // 更新预览
        if (previewScreen) {
            previewScreen.style.background = gradient;
        }
        
        // 显示星星
        if (starsContainer) starsContainer.style.display = 'block';
        
        // 存储当前壁纸类型为默认
        document.documentElement.dataset.wallpaperType = 'default';
        document.documentElement.dataset.wallpaperValue = 'default';
    }
}

function applyIconStyle(style) {
    const icons = document.querySelectorAll('.icon-circle, .icon-rect');
    
    icons.forEach(icon => {
        // 移除所有样式类
        icon.classList.remove('style-flat', 'style-outline');
        
        // 根据选择添加类或重置样式
        if (style === 'flat') {
            icon.style.background = 'var(--glass-bg)';
            icon.style.border = 'none';
            icon.style.backdropFilter = 'none';
            icon.classList.add('style-flat');
        } else if (style === 'outline') {
            icon.style.background = 'transparent';
            icon.style.border = '2px solid var(--text-color)';
            icon.style.backdropFilter = 'none';
            icon.classList.add('style-outline');
        } else {
            // Glass (default)
            icon.style.background = '';
            icon.style.border = '';
            icon.style.backdropFilter = '';
        }
    });
}

function saveThemeSettings() {
    const activeStyle = document.querySelector('.style-btn.active');
    const wallpaperType = document.documentElement.dataset.wallpaperType || 'default';
    const wallpaperValue = document.documentElement.dataset.wallpaperValue || 'default';
    
    const settings = {
        wallpaperType: wallpaperType,
        wallpaperValue: wallpaperValue,
        style: activeStyle ? activeStyle.dataset.value : 'glass'
    };
    
    localStorage.setItem('starThemeSettings', JSON.stringify(settings));
}

function loadThemeSettings() {
    const savedSettings = localStorage.getItem('starThemeSettings');
    
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // 应用设置
        if (settings.wallpaperType === 'custom') {
            applyWallpaper(settings.wallpaperValue, true);
        } else {
            applyWallpaper('default');
        }
        
        applyIconStyle(settings.style);
        
        // 更新 UI
        updateThemeUI(settings.style);
    } else {
        // 默认初始化
        applyWallpaper('default');
    }

    // 加载自定义图标
    loadCustomIcons();
}

function updateThemeUI(style) {
    // 更新样式选中
    document.querySelectorAll('.style-btn').forEach(btn => {
        if (btn.dataset.value === style) btn.classList.add('active');
        else btn.classList.remove('active');
    });
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

function initPetFeature() {
    const petBtn = document.getElementById('icon-paw');
    const petSettingsPage = document.getElementById('pet-settings-page');
    const backFromPet = document.getElementById('back-from-pet');
    const petOptionsBtn = document.getElementById('pet-options-btn');
    const petOptionsSidebar = document.getElementById('pet-options-sidebar');
    const closePetOptions = document.getElementById('close-pet-options');
    
    const petUploadTrigger = document.getElementById('pet-upload-trigger');
    const petFileInput = document.getElementById('pet-file-input');
    const petPreview = document.getElementById('pet-preview');
    
    const petNameInput = document.getElementById('pet-name-input');
    const petQuotesInput = document.getElementById('pet-quotes-input');
    const savePetBtn = document.getElementById('save-pet-btn');
    
    const petToggle = document.getElementById('pet-toggle');
    const desktopPet = document.getElementById('desktop-pet');
    const petImageDisplay = document.getElementById('pet-image-display');
    const petBubble = document.getElementById('pet-bubble');

    // 1. 页面导航
    if (petBtn && petSettingsPage) {
        petBtn.addEventListener('click', () => {
            petSettingsPage.classList.add('active');
        });
    }

    if (backFromPet && petSettingsPage) {
        backFromPet.addEventListener('click', () => {
            petSettingsPage.classList.remove('active');
        });
    }

    if (petOptionsBtn && petOptionsSidebar) {
        petOptionsBtn.addEventListener('click', () => {
            petOptionsSidebar.classList.add('active');
        });
    }

    if (closePetOptions && petOptionsSidebar) {
        closePetOptions.addEventListener('click', () => {
            petOptionsSidebar.classList.remove('active');
        });
    }

    // 2. 图片上传
    if (petUploadTrigger && petFileInput) {
        petUploadTrigger.addEventListener('click', () => {
            petFileInput.click();
        });

        petFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target.result;
                    // 更新预览
                    petPreview.innerHTML = `<img src="${result}" alt="Pet Preview">`;
                    // 更新实际桌宠图片
                    petImageDisplay.src = result;
                    // 临时保存到 dataset，点击保存按钮时才写入 localStorage
                    petPreview.dataset.tempSrc = result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 3. 保存设置
    if (savePetBtn) {
        savePetBtn.addEventListener('click', () => {
            const petSettings = {
                name: petNameInput.value,
                quotes: petQuotesInput.value,
                image: petPreview.dataset.tempSrc || localStorage.getItem('petImage') || ''
            };

            try {
                localStorage.setItem('petSettings', JSON.stringify(petSettings));
                if (petSettings.image) {
                    localStorage.setItem('petImage', petSettings.image);
                }
                showToast('桌宠设置已保存');
                
                // 立即应用更改
                updatePetState();
            } catch (e) {
                console.error('保存失败', e);
                showToast('保存失败，图片可能过大');
            }
        });
    }

    // 4. 桌宠开关
    if (petToggle) {
        petToggle.addEventListener('change', (e) => {
            const isEnabled = e.target.checked;
            localStorage.setItem('petEnabled', isEnabled);
            updatePetVisibility(isEnabled);
        });
    }

    // 5. 初始化加载
    loadPetSettings();
    initPetInteraction();
}

function loadPetSettings() {
    const petSettings = JSON.parse(localStorage.getItem('petSettings') || '{}');
    const petImage = localStorage.getItem('petImage');
    const isEnabled = localStorage.getItem('petEnabled') === 'true';

    const petNameInput = document.getElementById('pet-name-input');
    const petQuotesInput = document.getElementById('pet-quotes-input');
    const petPreview = document.getElementById('pet-preview');
    const petToggle = document.getElementById('pet-toggle');
    const petImageDisplay = document.getElementById('pet-image-display');

    if (petNameInput) petNameInput.value = petSettings.name || '';
    if (petQuotesInput) petQuotesInput.value = petSettings.quotes || '';
    
    if (petImage) {
        if (petPreview) petPreview.innerHTML = `<img src="${petImage}" alt="Pet Preview">`;
        if (petImageDisplay) petImageDisplay.src = petImage;
    }

    if (petToggle) {
        petToggle.checked = isEnabled;
        updatePetVisibility(isEnabled);
    }
}

function updatePetVisibility(isEnabled) {
    const desktopPet = document.getElementById('desktop-pet');
    const petImage = localStorage.getItem('petImage');
    
    if (desktopPet) {
        if (isEnabled && petImage) {
            desktopPet.style.display = 'block';
            // 如果没有位置信息，设置默认位置
            if (!desktopPet.style.left) {
                desktopPet.style.left = '50%';
                desktopPet.style.top = '50%';
                desktopPet.style.transform = 'translate(-50%, -50%)';
            }
        } else {
            desktopPet.style.display = 'none';
        }
    }
}

function updatePetState() {
    const isEnabled = localStorage.getItem('petEnabled') === 'true';
    updatePetVisibility(isEnabled);
}

function initPetInteraction() {
    const desktopPet = document.getElementById('desktop-pet');
    const petBubble = document.getElementById('pet-bubble');
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    let clickStartTime;

    if (!desktopPet) return;

    // 拖拽逻辑
    desktopPet.addEventListener('mousedown', startDrag);
    desktopPet.addEventListener('touchstart', startDrag, { passive: false });

    function startDrag(e) {
        isDragging = false;
        clickStartTime = new Date().getTime();
        
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

        // 获取当前位置
        const rect = desktopPet.getBoundingClientRect();
        const parentRect = desktopPet.offsetParent.getBoundingClientRect();
        
        // 计算相对于父容器的偏移
        startX = clientX;
        startY = clientY;
        
        // 记录初始位置（相对于父容器）
        initialLeft = desktopPet.offsetLeft;
        initialTop = desktopPet.offsetTop;

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }

    function drag(e) {
        e.preventDefault(); // 防止滚动
        isDragging = true;
        
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        const dx = clientX - startX;
        const dy = clientY - startY;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        // 边界检查
        const parentRect = desktopPet.offsetParent.getBoundingClientRect();
        const petRect = desktopPet.getBoundingClientRect();
        
        // 限制在屏幕内
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + petRect.width > parentRect.width) newLeft = parentRect.width - petRect.width;
        if (newTop + petRect.height > parentRect.height) newTop = parentRect.height - petRect.height;

        desktopPet.style.left = `${newLeft}px`;
        desktopPet.style.top = `${newTop}px`;
        desktopPet.style.transform = 'none'; // 移除 translate，因为我们直接设置 left/top
    }

    function stopDrag() {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);

        // 如果不是拖拽（即点击），则显示语录
        if (!isDragging || (new Date().getTime() - clickStartTime < 200)) {
            showRandomQuote();
        }
    }

    function showRandomQuote() {
        const petSettings = JSON.parse(localStorage.getItem('petSettings') || '{}');
        const quotes = petSettings.quotes ? petSettings.quotes.split('\n').filter(q => q.trim()) : [];
        
        let text = '';
        if (quotes.length > 0) {
            text = quotes[Math.floor(Math.random() * quotes.length)];
        } else {
            text = `我是 ${petSettings.name || '桌宠'}，你好呀！`;
        }

        if (petBubble) {
            petBubble.textContent = text;
            petBubble.classList.add('show');
            
            // 3秒后隐藏
            setTimeout(() => {
                petBubble.classList.remove('show');
            }, 3000);
        }
    }
}
