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
    initInputPersistence(); // 初始化输入框持久化
    initArchivePage(); // 初始化档案页面
    initWorldbookPage(); // 初始化世界书页面
    initChatPage(); // 初始化聊天页面
    initUniversalModals(); // 初始化通用模态框

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
            const archivePage = document.getElementById('archive-page');
            const worldbookPage = document.getElementById('worldbook-page');
            
            if (wallpaperSettingsPage) wallpaperSettingsPage.classList.remove('active');
            if (iconSettingsPage) iconSettingsPage.classList.remove('active');
            if (cssSettingsPage) cssSettingsPage.classList.remove('active');
            if (petOptionsSidebar) petOptionsSidebar.classList.remove('active');
            if (archivePage) archivePage.classList.remove('active');
            if (worldbookPage) worldbookPage.classList.remove('active');
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
    const customSelects = document.querySelectorAll('.custom-select');

    customSelects.forEach(customSelect => {
        const trigger = customSelect.querySelector('.custom-select-trigger');
        const optionsContainer = customSelect.querySelector('.custom-options');
        const customOptions = customSelect.querySelectorAll('.custom-option');
        const wrapper = customSelect.closest('.custom-select-wrapper');
        const hiddenInput = wrapper ? wrapper.querySelector('input[type="hidden"]') : null;
        const selectedTextSpan = trigger.querySelector('span');

        if (!trigger) return;

        // 移除旧的事件监听器
        const newTrigger = trigger.cloneNode(true);
        trigger.parentNode.replaceChild(newTrigger, trigger);
        
        newTrigger.addEventListener('click', (e) => {
            // 关闭其他打开的下拉菜单
            document.querySelectorAll('.custom-select.open').forEach(s => {
                if (s !== customSelect) s.classList.remove('open');
            });
            customSelect.classList.toggle('open');
            e.stopPropagation();
        });

        // 选项点击事件
        // 注意：这里我们需要重新绑定选项事件，因为选项可能是动态生成的
        // 使用事件委托绑定到 optionsContainer 上会更好，但为了保持一致性，我们还是遍历绑定
        // 或者，如果 optionsContainer 存在，我们可以清空并重新绑定
        
        // 为了支持动态添加的选项，我们直接给每个选项绑定
        const currentOptions = customSelect.querySelectorAll('.custom-option');
        currentOptions.forEach(option => {
            // 移除旧的监听器（通过克隆节点）
            // 注意：这可能会导致性能问题如果频繁调用，但在这种规模下应该还好
            // 更好的方式是只在初始化时绑定一次，或者使用事件委托
            
            // 这里简单处理：假设 initCustomSelect 会在选项更新后被调用
            // 我们不克隆选项，直接添加监听器（可能会重复绑定，所以最好先移除）
            // 由于没有简单的方法移除匿名函数，我们使用一个属性标记是否已绑定
            
            if (option.dataset.bound === 'true') return;
            
            option.addEventListener('click', function(e) {
                e.stopPropagation(); // 防止冒泡触发 document click
                customSelect.classList.remove('open');
                
                // 更新选中状态
                currentOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // 更新显示文本和隐藏值
                const value = this.dataset.value;
                const text = this.textContent;
                
                if (selectedTextSpan) selectedTextSpan.textContent = text;
                if (hiddenInput) hiddenInput.value = value;
            });
            
            option.dataset.bound = 'true';
        });
    });

    // 点击外部关闭所有下拉菜单
    // 只需要绑定一次
    if (!document.body.dataset.selectBound) {
        document.addEventListener('click', (e) => {
            document.querySelectorAll('.custom-select.open').forEach(select => {
                if (!select.contains(e.target)) {
                    select.classList.remove('open');
                }
            });
        });
        document.body.dataset.selectBound = 'true';
    }
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
            applyWallpaper(); // 重新应用壁纸
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
            .save-btn { background: rgb(61, 61, 61) !important; color: #ffffff !important; border: 1px solid rgbargba(0, 0, 0, 0.1) !important; }
            .header-action-btn { background: rgb(61, 61, 61) !important; color: #ffffff !important; border: 1px solid rgba(0, 0, 0, 0.1) !important; }
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
            .persona-bubble { background: rgba(255, 255, 255, 0.8) !important; }
            .persona-avatar-container { background: rgba(255, 255, 255, 0.8) !important; border-color: rgba(0, 0, 0, 0.1) !important; }
            .persona-name-input { color: #1c1c1e !important; }
            .persona-name-line { background: rgba(0, 0, 0, 0.1) !important; }
            .persona-bg-input { background: rgba(255, 255, 255, 0.5) !important; color: #1c1c1e !important; }
            .toggle-bubble { background: rgba(255, 255, 255, 0.8) !important; border-color: rgba(0, 0, 0, 0.1) !important; }
            .toggle-item { color: rgba(60, 60, 67, 0.6) !important; }
            .toggle-item.active { color: #1c1c1e !important; background: rgba(0, 0, 0, 0.05) !important; }
            .toggle-divider { background: rgba(0, 0, 0, 0.1) !important; }
            .empty-state { color: rgba(60, 60, 67, 0.4) !important; }
            .emoji-grid { background: rgba(255, 255, 255, 0.5) !important; }
            .emoji-item { background: rgba(255, 255, 255, 0.8) !important; }
            .emoji-name { color: rgba(60, 60, 67, 0.6) !important; }
            .emoji-add-btn { background: rgba(255, 255, 255, 0.5) !important; border-color: rgba(0, 0, 0, 0.1) !important; }
            .emoji-add-btn i { color: rgba(60, 60, 67, 0.4) !important; }
            .select-indicator { border-color: rgba(0, 0, 0, 0.2) !important; background: rgba(255, 255, 255, 0.5) !important; color: #000 !important; }
            .modal-content { background: rgba(242, 242, 247, 0.95) !important; border-color: rgba(0, 0, 0, 0.1) !important; }
            .modal-header { border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important; }
            .modal-header h3 { color: #1c1c1e !important; }
            .close-modal-btn { color: rgba(60, 60, 67, 0.6) !important; }
            .upload-option-btn { background: rgba(255, 255, 255, 0.8) !important; color: #1c1c1e !important; }
            .upload-option-btn span { color: #1c1c1e !important; }
            #emoji-url-input, #emoji-name-input { background: rgba(255, 255, 255, 0.8) !important; color: #1c1c1e !important; }
            .folder-container { background: rgba(255, 255, 255, 0.8) !important; }
            .folder-item { color: #1c1c1e !important; }
            .folder-item:active { background: rgba(0, 0, 0, 0.05) !important; }
            .folder-icon { color: rgba(60, 60, 67, 0.8) !important; }
            .folder-arrow { color: rgba(60, 60, 67, 0.3) !important; }
            .folder-items-list::before { background: rgba(0, 0, 0, 0.1) !important; }
            .folder-actions-bar::before { background: rgba(0, 0, 0, 0.1) !important; }
            .worldbook-item::after { background: rgba(0, 0, 0, 0.1) !important; }
            .worldbook-item { color: #1c1c1e !important; }
            .worldbook-item:active { background: rgba(0, 0, 0, 0.05) !important; }
            .folder-action-btn { color: rgba(60, 60, 67, 0.6) !important; }
            .folder-action-btn:hover { color: #1c1c1e !important; }
            .item-delete-btn { color: rgba(60, 60, 67, 0.3) !important; }
            .folder-empty-msg { color: rgba(60, 60, 67, 0.4) !important; }
            .header-icon-btn { color: #1c1c1e !important; }
            #confirm-url-btn, #confirm-name-btn, #confirm-folder-btn, #prompt-modal-ok-btn { background: #1c1c1e !important; color: #ffffff !important; }
            .preview-label { color: rgba(60, 60, 67, 0.8) !important; }
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

    // 重新应用当前壁纸
    applyWallpaper();
    applyChatWallpaper();
}

function initThemeSettings() {
    const styleBtns = document.querySelectorAll('.style-btn');
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

    // 壁纸上传逻辑
    const nightPreview = document.getElementById('night-wallpaper-preview');
    const dayPreview = document.getElementById('day-wallpaper-preview');
    const nightUpload = document.getElementById('wallpaper-upload-night');
    const dayUpload = document.getElementById('wallpaper-upload-day');

    // 点击预览图触发上传
    if (nightPreview && nightUpload) {
        nightPreview.addEventListener('click', () => nightUpload.click());
        nightUpload.addEventListener('change', (e) => handleWallpaperUpload(e, 'night'));
    }

    if (dayPreview && dayUpload) {
        dayPreview.addEventListener('click', () => dayUpload.click());
        dayUpload.addEventListener('change', (e) => handleWallpaperUpload(e, 'day'));
    }

    // 恢复默认壁纸
    if (resetWallpaperBtn) {
        resetWallpaperBtn.addEventListener('click', () => {
            resetWallpapers();
        });
    }

    // 聊天背景上传逻辑
    const chatNightPreview = document.getElementById('chat-night-wallpaper-preview');
    const chatDayPreview = document.getElementById('chat-day-wallpaper-preview');
    const chatNightUpload = document.getElementById('chat-wallpaper-upload-night');
    const chatDayUpload = document.getElementById('chat-wallpaper-upload-day');
    const resetChatWallpaperBtn = document.getElementById('reset-chat-wallpaper-btn');

    if (chatNightPreview && chatNightUpload) {
        chatNightPreview.addEventListener('click', () => chatNightUpload.click());
        chatNightUpload.addEventListener('change', (e) => handleChatWallpaperUpload(e, 'night'));
    }

    if (chatDayPreview && chatDayUpload) {
        chatDayPreview.addEventListener('click', () => chatDayUpload.click());
        chatDayUpload.addEventListener('change', (e) => handleChatWallpaperUpload(e, 'day'));
    }

    if (resetChatWallpaperBtn) {
        resetChatWallpaperBtn.addEventListener('click', () => {
            resetChatWallpapers();
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

function handleWallpaperUpload(e, mode) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target.result;
            saveWallpaperSetting(mode, 'custom', result);
            updateWallpaperPreviews();
            
            // 如果当前模式匹配，立即应用
            const isDayMode = localStorage.getItem('starDayMode') === 'true';
            if ((mode === 'day' && isDayMode) || (mode === 'night' && !isDayMode)) {
                applyWallpaper();
            }
            
            showToast('壁纸已更新');
        };
        reader.readAsDataURL(file);
    }
    e.target.value = ''; // 重置 input
}

function handleChatWallpaperUpload(e, mode) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target.result;
            saveChatWallpaperSetting(mode, 'custom', result);
            updateChatWallpaperPreviews();
            
            // 如果当前模式匹配，立即应用
            const isDayMode = localStorage.getItem('starDayMode') === 'true';
            if ((mode === 'day' && isDayMode) || (mode === 'night' && !isDayMode)) {
                applyChatWallpaper();
            }
            
            showToast('聊天背景已更新');
        };
        reader.readAsDataURL(file);
    }
    e.target.value = ''; // 重置 input
}

function saveWallpaperSetting(mode, type, value) {
    const settings = JSON.parse(localStorage.getItem('starThemeSettings') || '{}');
    
    // 确保结构完整
    if (!settings.wallpapers) {
        settings.wallpapers = {
            night: { type: 'default', value: 'default' },
            day: { type: 'default', value: 'default' }
        };
    }
    
    settings.wallpapers[mode] = { type, value };
    localStorage.setItem('starThemeSettings', JSON.stringify(settings));
}

function saveChatWallpaperSetting(mode, type, value) {
    const settings = JSON.parse(localStorage.getItem('starThemeSettings') || '{}');
    
    // 确保结构完整
    if (!settings.chatWallpapers) {
        settings.chatWallpapers = {
            night: { type: 'default', value: 'default' },
            day: { type: 'default', value: 'default' }
        };
    }
    
    settings.chatWallpapers[mode] = { type, value };
    localStorage.setItem('starThemeSettings', JSON.stringify(settings));
}

function resetWallpapers() {
    const settings = JSON.parse(localStorage.getItem('starThemeSettings') || '{}');
    settings.wallpapers = {
        night: { type: 'default', value: 'default' },
        day: { type: 'default', value: 'default' }
    };
    localStorage.setItem('starThemeSettings', JSON.stringify(settings));
    
    updateWallpaperPreviews();
    applyWallpaper();
    showToast('已恢复默认壁纸');
}

function resetChatWallpapers() {
    const settings = JSON.parse(localStorage.getItem('starThemeSettings') || '{}');
    settings.chatWallpapers = {
        night: { type: 'default', value: 'default' },
        day: { type: 'default', value: 'default' }
    };
    localStorage.setItem('starThemeSettings', JSON.stringify(settings));
    
    updateChatWallpaperPreviews();
    applyChatWallpaper();
    showToast('已恢复默认聊天背景');
}

function updateWallpaperPreviews() {
    const settings = JSON.parse(localStorage.getItem('starThemeSettings') || '{}');
    // 确保有默认值
    const wallpapers = settings.wallpapers || {
        night: { type: 'default', value: 'default' },
        day: { type: 'default', value: 'default' }
    };

    const nightScreen = document.getElementById('wallpaper-preview-screen-night');
    const dayScreen = document.getElementById('wallpaper-preview-screen-day');

    // 更新夜间预览
    if (nightScreen) {
        if (wallpapers.night && wallpapers.night.type === 'custom') {
            nightScreen.style.background = `url('${wallpapers.night.value}') center/cover no-repeat`;
        } else {
            nightScreen.style.background = 'linear-gradient(180deg, #1c1c1e 0%, #000000 100%)';
        }
    }

    // 更新日间预览
    if (dayScreen) {
        if (wallpapers.day && wallpapers.day.type === 'custom') {
            dayScreen.style.background = `url('${wallpapers.day.value}') center/cover no-repeat`;
        } else {
            dayScreen.style.background = 'linear-gradient(180deg, #f2f2f7 0%, #ffffff 100%)';
        }
    }
}

function updateChatWallpaperPreviews() {
    const settings = JSON.parse(localStorage.getItem('starThemeSettings') || '{}');
    // 确保有默认值
    const chatWallpapers = settings.chatWallpapers || {
        night: { type: 'default', value: 'default' },
        day: { type: 'default', value: 'default' }
    };

    const nightScreen = document.getElementById('chat-wallpaper-preview-screen-night');
    const dayScreen = document.getElementById('chat-wallpaper-preview-screen-day');

    // 更新夜间预览
    if (nightScreen) {
        if (chatWallpapers.night && chatWallpapers.night.type === 'custom') {
            nightScreen.style.background = `url('${chatWallpapers.night.value}') center/cover no-repeat`;
        } else {
            nightScreen.style.background = 'rgba(28, 28, 30, 0.95)';
        }
    }

    // 更新日间预览
    if (dayScreen) {
        if (chatWallpapers.day && chatWallpapers.day.type === 'custom') {
            dayScreen.style.background = `url('${chatWallpapers.day.value}') center/cover no-repeat`;
        } else {
            dayScreen.style.background = 'rgba(242, 242, 247, 0.95)';
        }
    }
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

function applyWallpaper() {
    const isDayMode = localStorage.getItem('starDayMode') === 'true';
    const settings = JSON.parse(localStorage.getItem('starThemeSettings') || '{}');
    // 确保有默认值
    const wallpapers = settings.wallpapers || {
        night: { type: 'default', value: 'default' },
        day: { type: 'default', value: 'default' }
    };
    
    const currentWallpaper = isDayMode ? wallpapers.day : wallpapers.night;
    const starsContainer = document.getElementById('stars-container');
    
    // 默认值处理
    const type = currentWallpaper ? currentWallpaper.type : 'default';
    const value = currentWallpaper ? currentWallpaper.value : 'default';

    if (type === 'custom') {
        // 自定义图片壁纸
        const bgStyle = `url('${value}') center/cover no-repeat`;
        document.documentElement.style.setProperty('--bg-gradient', bgStyle);
        
        // 隐藏星星
        if (starsContainer) starsContainer.style.display = 'none';
    } else {
        // 默认渐变壁纸
        let gradient;
        if (isDayMode) {
            gradient = 'linear-gradient(180deg, #f2f2f7 0%, #ffffff 100%)';
        } else {
            gradient = 'linear-gradient(180deg, #1c1c1e 0%, #000000 100%)';
        }
        
        document.documentElement.style.setProperty('--bg-gradient', gradient);
        
        // 显示星星
        if (starsContainer) starsContainer.style.display = 'block';
    }
}

function applyChatWallpaper() {
    const isDayMode = localStorage.getItem('starDayMode') === 'true';
    const settings = JSON.parse(localStorage.getItem('starThemeSettings') || '{}');
    // 确保有默认值
    const chatWallpapers = settings.chatWallpapers || {
        night: { type: 'default', value: 'default' },
        day: { type: 'default', value: 'default' }
    };
    
    const currentWallpaper = isDayMode ? chatWallpapers.day : chatWallpapers.night;
    const chatPage = document.getElementById('chat-page');
    
    if (!chatPage) return;

    // 默认值处理
    const type = currentWallpaper ? currentWallpaper.type : 'default';
    const value = currentWallpaper ? currentWallpaper.value : 'default';

    if (type === 'custom') {
        // 自定义图片壁纸
        // 使用 !important 覆盖可能存在的日间模式样式
        chatPage.style.setProperty('background', `url('${value}') center/cover no-repeat`, 'important');
    } else {
        // 默认背景
        if (isDayMode) {
            chatPage.style.setProperty('background', 'rgba(242, 242, 247, 0.95)', 'important');
        } else {
            chatPage.style.setProperty('background', 'rgba(28, 28, 30, 0.95)', 'important');
        }
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
    
    // 加载聊天壁纸
    updateChatWallpaperPreviews();
    applyChatWallpaper();
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
                desktopPet.style.left = 'calc(100% - 100px)';
                desktopPet.style.top = 'calc(100% - 200px)';
                desktopPet.style.transform = 'none';
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
        
        // 如果是触摸事件，阻止默认行为以防止触发后续的鼠标事件
        if (e.type === 'touchstart') {
            e.preventDefault();
        }

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

function initInputPersistence() {
    const starInput = document.querySelector('.star-input');
    if (!starInput) return;

    // 加载保存的内容
    const savedContent = localStorage.getItem('starInputContent');
    if (savedContent) {
        starInput.value = savedContent;
    }

    // 监听输入并保存
    starInput.addEventListener('input', (e) => {
        localStorage.setItem('starInputContent', e.target.value);
    });
}

function initWorldbookPage() {
    const worldbookBtn = document.getElementById('icon-worldbook');
    const worldbookPage = document.getElementById('worldbook-page');
    const closeWorldbookBtn = document.getElementById('close-worldbook-btn');
    
    const addFolderBtn = document.getElementById('add-folder-btn');
    const newFolderModal = document.getElementById('new-folder-modal');
    const closeFolderModal = document.getElementById('close-folder-modal');
    const confirmFolderBtn = document.getElementById('confirm-folder-btn');
    const folderNameInput = document.getElementById('folder-name-input');
    const folderList = document.getElementById('folder-list');
    const emptyState = document.getElementById('worldbook-empty-state');

    // 新增世界书页面元素
    const addWorldbookBtn = document.getElementById('add-worldbook-btn');
    const addWorldbookPage = document.getElementById('add-worldbook-page');
    const closeAddWorldbookBtn = document.getElementById('close-add-worldbook-btn');
    const saveWorldbookItemBtn = document.getElementById('save-worldbook-item-btn');
    const worldbookTitleInput = document.getElementById('worldbook-title-input');
    const worldbookContentInput = document.getElementById('worldbook-content-input');
    const folderSelectOptions = document.getElementById('folder-options');
    const selectedFolderValue = document.getElementById('selected-folder-value');
    const selectedFolderText = document.querySelector('#folder-select .custom-select-trigger span');
    
    let currentEditingItemId = null;

    // 加载文件夹
    loadFolders();

    if (worldbookBtn && worldbookPage) {
        worldbookBtn.addEventListener('click', () => {
            worldbookPage.classList.add('active');
        });
    }

    // 打开新增世界书页面
    if (addWorldbookBtn && addWorldbookPage) {
        addWorldbookBtn.addEventListener('click', () => {
            currentEditingItemId = null;
            // 修改标题
            const pageTitle = addWorldbookPage.querySelector('.settings-header h2');
            if (pageTitle) pageTitle.textContent = '新增世界书';

            // 加载文件夹选项
            loadFolderOptions();
            // 重置表单
            if (worldbookTitleInput) worldbookTitleInput.value = '';
            if (worldbookContentInput) worldbookContentInput.value = '';
            if (selectedFolderValue) selectedFolderValue.value = '';
            if (selectedFolderText) selectedFolderText.textContent = '无';
            // 移除所有选项的 selected 类
            if (folderSelectOptions) {
                folderSelectOptions.querySelectorAll('.custom-option').forEach(opt => {
                    opt.classList.remove('selected');
                    if (opt.dataset.value === '') opt.classList.add('selected');
                });
            }
            
            addWorldbookPage.classList.add('active');
        });
    }

    // 关闭新增世界书页面
    if (closeAddWorldbookBtn && addWorldbookPage) {
        closeAddWorldbookBtn.addEventListener('click', () => {
            addWorldbookPage.classList.remove('active');
        });
    }

    // 保存世界书条目
    if (saveWorldbookItemBtn) {
        saveWorldbookItemBtn.addEventListener('click', () => {
            const title = worldbookTitleInput.value.trim();
            const content = worldbookContentInput.value.trim();
            let folderId = selectedFolderValue.value;

            if (title) {
                // 如果未选择文件夹，自动归入“未分类”
                if (!folderId) {
                    folderId = getOrCreateUncategorizedFolder();
                }

                if (currentEditingItemId) {
                    updateWorldbookItem(currentEditingItemId, title, content, folderId);
                    showToast('世界书条目已更新');
                } else {
                    saveWorldbookItem(title, content, folderId);
                    showToast('世界书条目已保存');
                }
                addWorldbookPage.classList.remove('active');
                
                // 刷新所有展开的文件夹
                document.querySelectorAll('.folder-dropdown').forEach(dropdown => {
                    if (dropdown.style.display !== 'none') {
                        const fId = dropdown.parentElement.dataset.id;
                        const itemsList = dropdown.querySelector('.folder-items-list');
                        renderFolderItems(fId, itemsList);
                    }
                });
            } else {
                showToast('请输入类目名称');
            }
        });
    }

    function getOrCreateUncategorizedFolder() {
        let folders = JSON.parse(localStorage.getItem('starWorldbookFolders') || '[]');
        let uncategorized = folders.find(f => f.name === '未分类');
        
        if (!uncategorized) {
            uncategorized = {
                id: Date.now().toString(),
                name: '未分类',
                createdAt: new Date().toISOString()
            };
            folders.push(uncategorized);
            localStorage.setItem('starWorldbookFolders', JSON.stringify(folders));
            
            // 刷新文件夹列表
            loadFolders(); 
        }
        
        return uncategorized.id;
    }

    function updateWorldbookItem(id, title, content, folderId) {
        let items = JSON.parse(localStorage.getItem('starWorldbookItems') || '[]');
        const index = items.findIndex(i => i.id === id);
        if (index !== -1) {
            items[index].title = title;
            items[index].content = content;
            items[index].folderId = folderId || null;
            items[index].updatedAt = new Date().toISOString();
            localStorage.setItem('starWorldbookItems', JSON.stringify(items));
        }
    }

    function editWorldbookItem(item) {
        currentEditingItemId = item.id;
        
        // 修改标题
        const pageTitle = addWorldbookPage.querySelector('.settings-header h2');
        if (pageTitle) pageTitle.textContent = '编辑世界书';

        // 填充表单
        if (worldbookTitleInput) worldbookTitleInput.value = item.title;
        if (worldbookContentInput) worldbookContentInput.value = item.content || '';
        
        // 加载文件夹选项并选中
        loadFolderOptions();
        
        const folderId = item.folderId || '';
        if (selectedFolderValue) selectedFolderValue.value = folderId;
        
        // 更新显示文本和选中状态
        if (folderSelectOptions) {
            const options = folderSelectOptions.querySelectorAll('.custom-option');
            let found = false;
            options.forEach(opt => {
                opt.classList.remove('selected');
                if (opt.dataset.value === folderId) {
                    opt.classList.add('selected');
                    if (selectedFolderText) selectedFolderText.textContent = opt.textContent;
                    found = true;
                }
            });
            if (!found && selectedFolderText) selectedFolderText.textContent = '无';
        }
        
        addWorldbookPage.classList.add('active');
    }

    function loadFolderOptions() {
        if (!folderSelectOptions) return;
        
        // 保留“无”选项
        folderSelectOptions.innerHTML = '<div class="custom-option selected" data-value="">无</div>';
        
        const folders = JSON.parse(localStorage.getItem('starWorldbookFolders') || '[]');
        
        folders.forEach(folder => {
            const option = document.createElement('div');
            option.classList.add('custom-option');
            option.dataset.value = folder.id;
            option.textContent = folder.name;
            folderSelectOptions.appendChild(option);
        });

        // 重新绑定下拉菜单事件
        initCustomSelect();
    }

    function saveWorldbookItem(title, content, folderId) {
        const item = {
            id: Date.now().toString(),
            title: title,
            content: content,
            folderId: folderId || null,
            createdAt: new Date().toISOString()
        };

        const items = JSON.parse(localStorage.getItem('starWorldbookItems') || '[]');
        items.push(item);
        localStorage.setItem('starWorldbookItems', JSON.stringify(items));
    }

    if (closeWorldbookBtn && worldbookPage) {
        closeWorldbookBtn.addEventListener('click', () => {
            worldbookPage.classList.remove('active');
        });
    }

    // 新建文件夹逻辑
    if (addFolderBtn && newFolderModal) {
        addFolderBtn.addEventListener('click', () => {
            newFolderModal.classList.add('active');
            if (folderNameInput) folderNameInput.focus();
        });
    }

    if (closeFolderModal && newFolderModal) {
        closeFolderModal.addEventListener('click', () => {
            newFolderModal.classList.remove('active');
        });
    }

    if (newFolderModal) {
        newFolderModal.addEventListener('click', (e) => {
            if (e.target === newFolderModal) {
                newFolderModal.classList.remove('active');
            }
        });
    }

    if (confirmFolderBtn && folderNameInput) {
        confirmFolderBtn.addEventListener('click', () => {
            const folderName = folderNameInput.value.trim();
            if (folderName) {
                addFolder(folderName);
                newFolderModal.classList.remove('active');
                folderNameInput.value = '';
                showToast('文件夹创建成功');
            } else {
                showToast('请输入文件夹名称');
            }
        });
    }

    function addFolder(name) {
        const folder = {
            id: Date.now().toString(),
            name: name,
            createdAt: new Date().toISOString()
        };

        // 保存到本地存储
        const folders = JSON.parse(localStorage.getItem('starWorldbookFolders') || '[]');
        folders.push(folder);
        localStorage.setItem('starWorldbookFolders', JSON.stringify(folders));

        // 渲染到界面
        renderFolder(folder);
        updateEmptyState();
    }

    function renderFolder(folder) {
        if (!folderList) return;

        // 容器
        const folderContainer = document.createElement('div');
        folderContainer.classList.add('folder-container');
        folderContainer.dataset.id = folder.id;

        // 头部（原来的 folder-item）
        const folderHeader = document.createElement('div');
        folderHeader.classList.add('folder-item');
        
        folderHeader.innerHTML = `
            <div class="folder-icon">
                <i class="fas fa-folder"></i>
            </div>
            <div class="folder-name">${folder.name}</div>
            <div class="folder-arrow">
                <i class="fas fa-chevron-right"></i>
            </div>
        `;

        // 下拉内容容器
        const dropdown = document.createElement('div');
        dropdown.classList.add('folder-dropdown');
        dropdown.style.display = 'none'; // 默认隐藏

        // 子项列表容器
        const itemsList = document.createElement('div');
        itemsList.classList.add('folder-items-list');
        
        // 操作栏
        const actionsBar = document.createElement('div');
        actionsBar.classList.add('folder-actions-bar');
        actionsBar.innerHTML = `
            <div class="folder-action-btn edit-btn">编辑文件夹</div>
            <div class="folder-action-btn delete-btn">删除文件夹</div>
        `;

        // 绑定操作栏事件
        const editBtn = actionsBar.querySelector('.edit-btn');
        const deleteBtn = actionsBar.querySelector('.delete-btn');

        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPromptModal('重命名文件夹', folder.name, (newName) => {
                if (newName && newName.trim() !== '') {
                    updateFolderName(folder.id, newName.trim());
                }
            });
        });

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showConfirmModal(`确定要删除文件夹 "${folder.name}" 及其所有内容吗？`, () => {
                deleteFolder(folder.id, folderContainer);
            });
        });

        dropdown.appendChild(actionsBar);
        dropdown.appendChild(itemsList);

        // 点击展开/折叠
        folderHeader.addEventListener('click', () => {
            const isExpanded = dropdown.style.display !== 'none';
            const arrow = folderHeader.querySelector('.folder-arrow i');
            
            if (isExpanded) {
                dropdown.style.display = 'none';
                arrow.classList.remove('fa-chevron-down');
                arrow.classList.add('fa-chevron-right');
            } else {
                // 加载并渲染子项
                renderFolderItems(folder.id, itemsList);
                dropdown.style.display = 'flex';
                arrow.classList.remove('fa-chevron-right');
                arrow.classList.add('fa-chevron-down');
            }
        });

        // 移除长按和右键删除，因为有了专门的删除按钮

        folderContainer.appendChild(folderHeader);
        folderContainer.appendChild(dropdown);
        folderList.appendChild(folderContainer);
    }

    function updateFolderName(id, newName) {
        let folders = JSON.parse(localStorage.getItem('starWorldbookFolders') || '[]');
        const folderIndex = folders.findIndex(f => f.id === id);
        
        if (folderIndex !== -1) {
            folders[folderIndex].name = newName;
            localStorage.setItem('starWorldbookFolders', JSON.stringify(folders));
            loadFolders(); // 重新加载列表
            showToast('文件夹名称已更新');
        }
    }

    function renderFolderItems(folderId, container) {
        container.innerHTML = ''; // 清空
        const allItems = JSON.parse(localStorage.getItem('starWorldbookItems') || '[]');
        const folderItems = allItems.filter(item => item.folderId === folderId);

        if (folderItems.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.classList.add('folder-empty-msg');
            emptyMsg.textContent = '暂无内容';
            container.appendChild(emptyMsg);
            return;
        }

        folderItems.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('worldbook-item');
            itemEl.innerHTML = `
                <div class="item-title">${item.title}</div>
                <div class="item-delete-btn" title="删除">
                    <i class="fas fa-trash"></i>
                </div>
            `;
            
            // 绑定点击编辑事件
            itemEl.addEventListener('click', () => {
                editWorldbookItem(item);
            });
            
            // 绑定删除事件
            const deleteBtn = itemEl.querySelector('.item-delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // 防止触发条目点击
                showConfirmModal(`确定要删除 "${item.title}" 吗？`, () => {
                    deleteWorldbookItem(item.id, itemEl, folderId, container);
                });
            });

            container.appendChild(itemEl);
        });
    }

    function deleteWorldbookItem(itemId, element, folderId, container) {
        let items = JSON.parse(localStorage.getItem('starWorldbookItems') || '[]');
        items = items.filter(i => i.id !== itemId);
        localStorage.setItem('starWorldbookItems', JSON.stringify(items));
        
        element.remove();
        
        // 检查是否还有剩余项，如果没有，显示空消息
        if (container.children.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.classList.add('folder-empty-msg');
            emptyMsg.textContent = '暂无内容';
            container.appendChild(emptyMsg);
        }
        
        showToast('已删除');
    }

    function deleteFolder(id, element) {
        // 从本地存储删除
        let folders = JSON.parse(localStorage.getItem('starWorldbookFolders') || '[]');
        folders = folders.filter(f => f.id !== id);
        localStorage.setItem('starWorldbookFolders', JSON.stringify(folders));

        // 从界面移除
        element.remove();
        updateEmptyState();
        showToast('文件夹已删除');
    }

    function loadFolders() {
        if (!folderList) return;
        
        folderList.innerHTML = ''; // 清空列表
        const folders = JSON.parse(localStorage.getItem('starWorldbookFolders') || '[]');
        
        folders.forEach(folder => {
            renderFolder(folder);
        });

        updateEmptyState();
    }

    function updateEmptyState() {
        if (!emptyState || !folderList) return;
        
        const hasFolders = folderList.children.length > 0;
        if (hasFolders) {
            emptyState.style.display = 'none';
        } else {
            emptyState.style.display = 'flex';
        }
    }
}

function initArchivePage() {
    const archiveBtn = document.getElementById('icon-file');
    const archivePage = document.getElementById('archive-page');
    const closeArchiveBtn = document.getElementById('close-archive-btn');
    const saveArchiveBtn = document.getElementById('save-archive-btn');
    const manageEmojiBtn = document.getElementById('manage-emoji-btn');
    const cancelManageBtn = document.getElementById('cancel-manage-btn');

    // AI Persona Elements
    const aiAvatarTrigger = document.getElementById('ai-avatar-trigger');
    const aiAvatarUpload = document.getElementById('ai-avatar-upload');
    const aiAvatarImg = document.getElementById('ai-avatar-img');
    const aiNameInput = document.getElementById('ai-name-input');
    const aiBgInput = document.getElementById('ai-bg-input');

    // User Persona Elements
    const userAvatarTrigger = document.getElementById('user-persona-avatar-trigger');
    const userAvatarUpload = document.getElementById('user-persona-avatar-upload');
    const userAvatarImg = document.getElementById('user-persona-avatar-img');
    const userNameInput = document.getElementById('user-name-input');
    const userBgInput = document.getElementById('user-bg-input');

    // 加载保存的档案数据
    loadArchiveData();

    // 打开档案页面
    if (archiveBtn && archivePage) {
        archiveBtn.addEventListener('click', () => {
            archivePage.classList.add('active');
        });
    }

    // 关闭档案页面
    if (closeArchiveBtn && archivePage) {
        closeArchiveBtn.addEventListener('click', () => {
            archivePage.classList.remove('active');
        });
    }

    // 保存档案数据
    if (saveArchiveBtn) {
        saveArchiveBtn.addEventListener('click', () => {
            const archiveData = {
                ai: {
                    name: aiNameInput.value,
                    background: aiBgInput.value,
                    avatar: aiAvatarImg.src
                },
                user: {
                    name: userNameInput.value,
                    background: userBgInput.value,
                    avatar: userAvatarImg.src
                }
            };

            try {
                localStorage.setItem('starArchiveData', JSON.stringify(archiveData));
                showToast('档案已保存');
            } catch (e) {
                console.error('保存失败', e);
                showToast('保存失败，图片可能过大');
            }
        });
    }

    // AI 头像上传
    if (aiAvatarTrigger && aiAvatarUpload) {
        aiAvatarTrigger.addEventListener('click', () => {
            aiAvatarUpload.click();
        });

        aiAvatarUpload.addEventListener('change', (e) => {
            handleAvatarUpload(e, aiAvatarImg);
        });
    }

    // 用户头像上传
    if (userAvatarTrigger && userAvatarUpload) {
        userAvatarTrigger.addEventListener('click', () => {
            userAvatarUpload.click();
        });

        userAvatarUpload.addEventListener('change', (e) => {
            handleAvatarUpload(e, userAvatarImg);
        });
    }

    // 底部切换逻辑
    const tabPersona = document.getElementById('tab-persona');
    const tabEmoji = document.getElementById('tab-emoji');
    const contentPersona = document.getElementById('archive-persona-content');
    const contentEmoji = document.getElementById('archive-emoji-content');
    const archiveTitle = archivePage.querySelector('.settings-header h2');

    // 初始化标题
    if (archiveTitle) {
        if (tabPersona && tabPersona.classList.contains('active')) {
            archiveTitle.textContent = '人设';
        } else if (tabEmoji && tabEmoji.classList.contains('active')) {
            archiveTitle.textContent = '表情包';
        }
    }

    if (tabPersona && tabEmoji && contentPersona && contentEmoji) {
        tabPersona.addEventListener('click', () => {
            // 切换 Tab 样式
            tabPersona.classList.add('active');
            tabEmoji.classList.remove('active');
            
            // 切换内容显示
            contentPersona.style.display = 'block';
            contentEmoji.style.display = 'none';
            
            // 更新标题
            if (archiveTitle) archiveTitle.textContent = '人设';

            // 按钮切换
            if (saveArchiveBtn) saveArchiveBtn.style.display = 'flex';
            if (manageEmojiBtn) manageEmojiBtn.style.display = 'none';
            
            // 退出管理模式
            exitManageMode();
        });

        tabEmoji.addEventListener('click', () => {
            // 切换 Tab 样式
            tabEmoji.classList.add('active');
            tabPersona.classList.remove('active');
            
            // 切换内容显示
            contentEmoji.style.display = 'block';
            contentPersona.style.display = 'none';
            
            // 更新标题
            if (archiveTitle) archiveTitle.textContent = '表情包';

            // 按钮切换
            if (saveArchiveBtn) saveArchiveBtn.style.display = 'none';
            if (manageEmojiBtn) manageEmojiBtn.style.display = 'flex';
        });
    }

    // 管理按钮点击事件
    if (manageEmojiBtn) {
        manageEmojiBtn.addEventListener('click', () => {
            const isManaging = document.querySelector('.emoji-grid.managing');
            if (isManaging) {
                // 如果已经在管理模式，且按钮可点击（说明有选中项），则执行删除
                const selectedCount = document.querySelectorAll('.emoji-item.selected').length;
                if (selectedCount > 0) {
                    deleteSelectedEmojis();
                }
            } else {
                // 进入管理模式
                enterManageMode();
            }
        });
    }

    // 取消按钮点击事件
    if (cancelManageBtn) {
        cancelManageBtn.addEventListener('click', () => {
            exitManageMode();
        });
    }

    // 初始化表情包功能
    initEmojiFeature();
}

function initEmojiFeature() {
    const addAiEmojiBtn = document.getElementById('add-ai-emoji-btn');
    const addUserEmojiBtn = document.getElementById('add-user-emoji-btn');
    const emojiModal = document.getElementById('emoji-upload-modal');
    const closeEmojiModal = document.getElementById('close-emoji-modal');
    const uploadLocalBtn = document.getElementById('upload-local-btn');
    const uploadUrlBtn = document.getElementById('upload-url-btn');
    const emojiFileInput = document.getElementById('emoji-file-input');
    const urlInputContainer = document.getElementById('url-input-container');
    const emojiUrlInput = document.getElementById('emoji-url-input');
    const confirmUrlBtn = document.getElementById('confirm-url-btn');
    
    let currentEmojiTarget = null; // 'ai' or 'user'

    // 加载保存的表情包
    loadEmojis();

    // 打开模态框
    if (addAiEmojiBtn) {
        addAiEmojiBtn.addEventListener('click', () => {
            currentEmojiTarget = 'ai';
            openModal();
        });
    }

    if (addUserEmojiBtn) {
        addUserEmojiBtn.addEventListener('click', () => {
            currentEmojiTarget = 'user';
            openModal();
        });
    }

    // 关闭模态框
    if (closeEmojiModal) {
        closeEmojiModal.addEventListener('click', closeModal);
    }

    // 点击遮罩层关闭
    if (emojiModal) {
        emojiModal.addEventListener('click', (e) => {
            if (e.target === emojiModal) closeModal();
        });
    }

    function openModal() {
        emojiModal.classList.add('active');
        urlInputContainer.style.display = 'none';
        emojiUrlInput.value = '';
    }

    function closeModal() {
        emojiModal.classList.remove('active');
    }

    // 本地上传
    if (uploadLocalBtn && emojiFileInput) {
        uploadLocalBtn.addEventListener('click', () => {
            emojiFileInput.click();
        });

        emojiFileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
                let processedCount = 0;
                files.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        addEmoji(currentEmojiTarget, e.target.result);
                        processedCount++;
                        if (processedCount === files.length) {
                            closeModal();
                            // 重置 input
                            emojiFileInput.value = '';
                        }
                    };
                    reader.readAsDataURL(file);
                });
            }
        });
    }

    // URL 上传
    if (uploadUrlBtn && urlInputContainer) {
        uploadUrlBtn.addEventListener('click', () => {
            urlInputContainer.style.display = 'flex';
            emojiUrlInput.focus();
        });
    }

    if (confirmUrlBtn && emojiUrlInput) {
        confirmUrlBtn.addEventListener('click', () => {
            const input = emojiUrlInput.value.trim();
            if (input) {
                const lines = input.split('\n');
                let addedCount = 0;
                
                lines.forEach(line => {
                    line = line.trim();
                    if (line) {
                        // 尝试解析 "名字:URL" 格式
                        // 找到第一个冒号的位置
                        const firstColonIndex = line.indexOf(':');
                        
                        let name = '表情包';
                        let url = line;
                        
                        // 如果存在冒号，且不是在开头（即有名字），且后面还有内容（即有URL部分）
                        // 注意：URL本身包含冒号（如https://），所以我们需要判断这个冒号是否是分隔符
                        // 简单的判断：如果冒号后面紧跟 //，那可能整行就是个URL
                        // 更稳妥的方式：如果第一个冒号后面是 //，那整行视为URL。否则视为 名字:URL
                        
                        if (firstColonIndex > 0) {
                            // 检查冒号后面是否紧跟 //
                            const isUrlProtocol = line.substring(firstColonIndex, firstColonIndex + 3) === '://';
                            
                            if (!isUrlProtocol) {
                                name = line.substring(0, firstColonIndex).trim();
                                url = line.substring(firstColonIndex + 1).trim();
                            }
                        }
                        
                        if (url) {
                            addEmoji(currentEmojiTarget, url, name);
                            addedCount++;
                        }
                    }
                });

                if (addedCount > 0) {
                    closeModal();
                    emojiUrlInput.value = ''; // 清空输入框
                    showToast(`成功添加 ${addedCount} 个表情包`);
                } else {
                    showToast('未检测到有效的输入');
                }
            } else {
                showToast('请输入内容');
            }
        });
    }
}

function addEmoji(type, src, name = '表情包') {
    const gridId = type === 'ai' ? 'ai-emoji-grid' : 'user-emoji-grid';
    const grid = document.getElementById(gridId);
    const addBtn = type === 'ai' ? document.getElementById('add-ai-emoji-btn') : document.getElementById('add-user-emoji-btn');
    
    if (!grid || !addBtn) return;

    const wrapper = document.createElement('div');
    wrapper.classList.add('emoji-wrapper');

    const emojiItem = document.createElement('div');
    emojiItem.classList.add('emoji-item');
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = name;
    
    // 添加选择指示器
    const selectIndicator = document.createElement('div');
    selectIndicator.classList.add('select-indicator');
    selectIndicator.innerHTML = '<i class="fas fa-check"></i>';

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('delete-emoji-btn');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.remove();
        saveEmojis();
    });

    emojiItem.appendChild(img);
    emojiItem.appendChild(selectIndicator);
    emojiItem.appendChild(deleteBtn);
    
    const nameSpan = document.createElement('span');
    nameSpan.classList.add('emoji-name');
    nameSpan.textContent = name;

    // 点击事件处理
    emojiItem.addEventListener('click', () => {
        const grid = emojiItem.closest('.emoji-grid');
        if (grid.classList.contains('managing')) {
            // 管理模式：切换选中状态
            emojiItem.classList.toggle('selected');
            updateManageButtonState();
        } else {
            // 普通模式：修改名字
            const nameModal = document.getElementById('name-edit-modal');
            const nameInput = document.getElementById('emoji-name-input');
            const confirmBtn = document.getElementById('confirm-name-btn');
            const closeBtn = document.getElementById('close-name-modal');

            if (nameModal && nameInput && confirmBtn) {
                nameInput.value = nameSpan.textContent;
                nameModal.classList.add('active');
                nameInput.focus();

                const handleConfirm = () => {
                    const newName = nameInput.value.trim();
                    if (newName !== '') {
                        nameSpan.textContent = newName;
                        img.alt = newName;
                        saveEmojis();
                        nameModal.classList.remove('active');
                    }
                    cleanup();
                };

                const handleClose = () => {
                    nameModal.classList.remove('active');
                    cleanup();
                };

                const handleOutsideClick = (e) => {
                    if (e.target === nameModal) {
                        handleClose();
                    }
                };

                const cleanup = () => {
                    confirmBtn.removeEventListener('click', handleConfirm);
                    closeBtn.removeEventListener('click', handleClose);
                    nameModal.removeEventListener('click', handleOutsideClick);
                };

                confirmBtn.addEventListener('click', handleConfirm);
                closeBtn.addEventListener('click', handleClose);
                nameModal.addEventListener('click', handleOutsideClick);
            }
        }
    });

    wrapper.appendChild(emojiItem);
    wrapper.appendChild(nameSpan);
    
    // 插入到添加按钮之前
    // 注意：添加按钮现在也应该被包裹在 wrapper 中或者直接作为 grid 的子元素
    // 这里假设添加按钮是 grid 的直接子元素，且始终在最后
    // 为了保持添加按钮在第一个，我们需要调整插入逻辑
    
    // 实际上，用户要求“+”号始终位于第一个
    // 所以新元素应该插入到添加按钮之后
    
    // 检查是否已经有添加按钮，如果有，确保它在第一个位置
    if (grid.firstElementChild !== addBtn) {
        grid.insertBefore(addBtn, grid.firstElementChild);
    }
    
    // 将新表情包添加到 grid 中（在添加按钮之后）
    // 如果 grid 只有添加按钮，直接 append
    // 如果有其他表情包，append 到最后
    grid.appendChild(wrapper);
    
    saveEmojis();
}

function saveEmojis() {
    const aiEmojis = [];
    const userEmojis = [];

    document.querySelectorAll('#ai-emoji-grid .emoji-wrapper').forEach(wrapper => {
        const img = wrapper.querySelector('img');
        const name = wrapper.querySelector('.emoji-name').textContent;
        if (img) {
            aiEmojis.push({ src: img.src, name: name });
        }
    });

    document.querySelectorAll('#user-emoji-grid .emoji-wrapper').forEach(wrapper => {
        const img = wrapper.querySelector('img');
        const name = wrapper.querySelector('.emoji-name').textContent;
        if (img) {
            userEmojis.push({ src: img.src, name: name });
        }
    });

    const emojiData = {
        ai: aiEmojis,
        user: userEmojis
    };

    try {
        localStorage.setItem('starEmojis', JSON.stringify(emojiData));
    } catch (e) {
        console.error('保存表情包失败', e);
        showToast('表情包保存失败，可能是图片太大');
    }
}

function loadEmojis() {
    const savedData = localStorage.getItem('starEmojis');
    if (!savedData) return;

    try {
        const data = JSON.parse(savedData);
        
        if (data.ai && Array.isArray(data.ai)) {
            data.ai.forEach(item => {
                if (typeof item === 'object' && item !== null) {
                    addEmoji('ai', item.src, item.name);
                } else {
                    addEmoji('ai', item);
                }
            });
        }

        if (data.user && Array.isArray(data.user)) {
            data.user.forEach(item => {
                if (typeof item === 'object' && item !== null) {
                    addEmoji('user', item.src, item.name);
                } else {
                    addEmoji('user', item);
                }
            });
        }
    } catch (e) {
        console.error('加载表情包失败', e);
    }
}

function handleAvatarUpload(event, imgElement) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imgElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function loadArchiveData() {
    const savedData = localStorage.getItem('starArchiveData');
    if (!savedData) return;

    try {
        const data = JSON.parse(savedData);
        
        // AI Data
        if (data.ai) {
            if (data.ai.name) document.getElementById('ai-name-input').value = data.ai.name;
            if (data.ai.background) document.getElementById('ai-bg-input').value = data.ai.background;
            if (data.ai.avatar) document.getElementById('ai-avatar-img').src = data.ai.avatar;
        }

        // User Data
        if (data.user) {
            if (data.user.name) document.getElementById('user-name-input').value = data.user.name;
            if (data.user.background) document.getElementById('user-bg-input').value = data.user.background;
            if (data.user.avatar) document.getElementById('user-persona-avatar-img').src = data.user.avatar;
        }
    } catch (e) {
        console.error('加载档案数据失败', e);
    }
}

// 表情包管理模式相关函数
function enterManageMode() {
    const grids = document.querySelectorAll('.emoji-grid');
    grids.forEach(grid => grid.classList.add('managing'));
    
    const manageBtn = document.getElementById('manage-emoji-btn');
    const closeBtn = document.getElementById('close-archive-btn');
    const cancelBtn = document.getElementById('cancel-manage-btn');
    
    if (closeBtn) closeBtn.style.display = 'none';
    if (cancelBtn) cancelBtn.style.display = 'flex';
    
    if (manageBtn) {
        manageBtn.textContent = '删除';
        manageBtn.style.opacity = '0.5';
        manageBtn.style.pointerEvents = 'none';
    }
}

function exitManageMode() {
    const grids = document.querySelectorAll('.emoji-grid');
    grids.forEach(grid => {
        grid.classList.remove('managing');
        // 清除选中状态
        grid.querySelectorAll('.emoji-item.selected').forEach(item => item.classList.remove('selected'));
    });
    
    const manageBtn = document.getElementById('manage-emoji-btn');
    const closeBtn = document.getElementById('close-archive-btn');
    const cancelBtn = document.getElementById('cancel-manage-btn');
    
    if (closeBtn) closeBtn.style.display = 'flex';
    if (cancelBtn) cancelBtn.style.display = 'none';
    
    if (manageBtn) {
        manageBtn.textContent = '管理';
        manageBtn.style.color = '';
        manageBtn.style.opacity = '1';
        manageBtn.style.pointerEvents = 'auto';
    }
}

function updateManageButtonState() {
    const manageBtn = document.getElementById('manage-emoji-btn');
    if (!manageBtn) return;
    
    const selectedCount = document.querySelectorAll('.emoji-item.selected').length;
    if (selectedCount > 0) {
        manageBtn.textContent = `删除(${selectedCount})`;
        manageBtn.style.color = '#ff3b30'; // 红色警告色
        manageBtn.style.opacity = '1';
        manageBtn.style.pointerEvents = 'auto';
    } else {
        manageBtn.textContent = '删除';
        manageBtn.style.color = ''; // 恢复默认色
        manageBtn.style.opacity = '0.5';
        manageBtn.style.pointerEvents = 'none';
    }
}

function deleteSelectedEmojis() {
    const selectedItems = document.querySelectorAll('.emoji-item.selected');
    if (selectedItems.length === 0) return;
    
    showConfirmModal(`确定要删除选中的 ${selectedItems.length} 个表情包吗？`, () => {
        selectedItems.forEach(item => {
            // item 是 .emoji-item，它的父级是 .emoji-wrapper
            const wrapper = item.closest('.emoji-wrapper');
            if (wrapper) wrapper.remove();
        });
        
        saveEmojis();
        showToast(`已删除 ${selectedItems.length} 个表情包`);
        exitManageMode();
    });
}

// 通用模态框功能
let confirmCallback = null;
let promptCallback = null;

function initUniversalModals() {
    // 确认模态框
    const confirmModal = document.getElementById('universal-confirm-modal');
    const closeConfirmBtn = document.getElementById('close-confirm-modal');
    const cancelConfirmBtn = document.getElementById('confirm-modal-cancel-btn');
    const okConfirmBtn = document.getElementById('confirm-modal-ok-btn');

    function closeConfirm() {
        confirmModal.classList.remove('active');
        confirmCallback = null;
    }

    if (closeConfirmBtn) closeConfirmBtn.addEventListener('click', closeConfirm);
    if (cancelConfirmBtn) cancelConfirmBtn.addEventListener('click', closeConfirm);
    
    if (okConfirmBtn) {
        okConfirmBtn.addEventListener('click', () => {
            if (confirmCallback) confirmCallback();
            closeConfirm();
        });
    }

    if (confirmModal) {
        confirmModal.addEventListener('click', (e) => {
            if (e.target === confirmModal) closeConfirm();
        });
    }

    // 输入模态框
    const promptModal = document.getElementById('universal-prompt-modal');
    const closePromptBtn = document.getElementById('close-prompt-modal');
    const cancelPromptBtn = document.getElementById('prompt-modal-cancel-btn');
    const okPromptBtn = document.getElementById('prompt-modal-ok-btn');
    const promptInput = document.getElementById('prompt-modal-input');

    function closePrompt() {
        promptModal.classList.remove('active');
        promptCallback = null;
    }

    if (closePromptBtn) closePromptBtn.addEventListener('click', closePrompt);
    if (cancelPromptBtn) cancelPromptBtn.addEventListener('click', closePrompt);

    if (okPromptBtn && promptInput) {
        okPromptBtn.addEventListener('click', () => {
            if (promptCallback) promptCallback(promptInput.value);
            closePrompt();
        });
    }

    if (promptModal) {
        promptModal.addEventListener('click', (e) => {
            if (e.target === promptModal) closePrompt();
        });
    }
}

function showConfirmModal(message, onConfirm, title = '确认', confirmText = '删除', confirmColor = '#ff3b30') {
    const modal = document.getElementById('universal-confirm-modal');
    const titleEl = document.getElementById('confirm-modal-title');
    const messageEl = document.getElementById('confirm-modal-message');
    const okBtn = document.getElementById('confirm-modal-ok-btn');

    if (modal && titleEl && messageEl && okBtn) {
        titleEl.textContent = title;
        messageEl.textContent = message;
        okBtn.textContent = confirmText;
        okBtn.style.background = confirmColor;
        
        confirmCallback = onConfirm;
        modal.classList.add('active');
    }
}

function showPromptModal(title, defaultValue, onConfirm, placeholder = '请输入...') {
    const modal = document.getElementById('universal-prompt-modal');
    const titleEl = document.getElementById('prompt-modal-title');
    const inputEl = document.getElementById('prompt-modal-input');

    if (modal && titleEl && inputEl) {
        titleEl.textContent = title;
        inputEl.value = defaultValue || '';
        inputEl.placeholder = placeholder;
        
        promptCallback = onConfirm;
        modal.classList.add('active');
        inputEl.focus();
    }
}

function initChatPage() {
    const chatBtn = document.getElementById('icon-heart');
    const chatPage = document.getElementById('chat-page');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    const chatPlusBtn = document.getElementById('chat-plus-btn');
    const chatActionMenu = document.getElementById('chat-action-menu');
    const chatStarBtn = document.getElementById('chat-star-btn');

    // 打开聊天页面
    if (chatBtn && chatPage) {
        chatBtn.addEventListener('click', () => {
            chatPage.classList.add('active');
            // 滚动到底部
            if (chatMessages) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });
    }

    // 关闭聊天页面
    if (closeChatBtn && chatPage) {
        closeChatBtn.addEventListener('click', () => {
            chatPage.classList.remove('active');
        });
    }

    // 扩展菜单逻辑
    if (chatPlusBtn && chatActionMenu) {
        chatPlusBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            chatActionMenu.classList.toggle('active');
            // 切换图标
            const icon = chatPlusBtn.querySelector('i');
            if (chatActionMenu.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-plus');
            }
        });

        // 菜单项点击事件
        const actionItems = chatActionMenu.querySelectorAll('.action-item');
        actionItems.forEach(item => {
            item.addEventListener('click', () => {
                const actionName = item.getAttribute('title');
                showToast(`已选择：${actionName}`);
                chatActionMenu.classList.remove('active');
                const icon = chatPlusBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-plus');
            });
        });
    }

    // 五角星按钮点击事件
    if (chatStarBtn) {
        chatStarBtn.addEventListener('click', () => {
            showToast('已收藏');
        });
    }

    // 发送消息
    function sendMessage() {
        const text = chatInput.value.trim();
        if (text) {
            // 添加用户消息
            addMessage(text, 'user');
            chatInput.value = '';
            
            // 模拟 AI 回复
            setTimeout(() => {
                const responses = [
                    "我听到了你的心声。",
                    "这真是一个有趣的想法！",
                    "星星在眨眼，仿佛在同意你的说法。",
                    "记录下来，这会成为美好的回忆。",
                    "无论发生什么，星空永远陪伴着你。"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'ai');
            }, 1000);
        }
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function addMessage(text, type) {
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type === 'user' ? 'user-message' : 'ai-message');
        
        let avatarSrc = '';
        if (type === 'ai') {
            // 获取 AI 头像
            const aiAvatarImg = document.getElementById('ai-avatar-img');
            avatarSrc = aiAvatarImg ? aiAvatarImg.src : 'https://api.dicebear.com/7.x/bottts/svg?seed=AI';
        } else {
            // 获取用户头像
            const userAvatarImg = document.getElementById('user-persona-avatar-img');
            avatarSrc = userAvatarImg ? userAvatarImg.src : 'https://api.dicebear.com/7.x/avataaars/svg?seed=User';
        }

        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="${avatarSrc}" alt="${type}">
            </div>
            <div class="message-content">
                ${text}
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
