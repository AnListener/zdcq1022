// 主应用页面的JavaScript代码

// 当前激活的菜单项
let activeMenuItem = null;
// 侧边栏折叠状态
let sidebarCollapsed = false;

// 在DOMContentLoaded之前定义这些函数，确保在index.html中可以立即使用
// 加载页面
function loadPage(pageUrl) {
    console.log('Loading page:', pageUrl);
    const iframe = document.getElementById('main-frame');
    
    // 确保URL格式正确
    let url = pageUrl;
    if (!pageUrl.startsWith('/') && !pageUrl.startsWith('http')) {
        // 确保URL以.html结尾
        if (!pageUrl.endsWith('.html')) {
            url = url + '.html';
        }
    }
    
    // 如果iframe不存在，创建一个新的
    if (!iframe) {
        console.warn('Iframe not found, creating a new one');
        const iframeContainer = document.querySelector('.iframe-container');
        if (iframeContainer) {
            const newIframe = document.createElement('iframe');
            newIframe.id = 'main-frame';
            newIframe.frameBorder = '0';
            newIframe.className = 'w-full h-full';
            iframeContainer.innerHTML = '';
            iframeContainer.appendChild(newIframe);
            // 重新获取iframe引用
            iframe = document.getElementById('main-frame');
        }
    }
    
    if (iframe) {
        iframe.src = url;
        
        // 更新浏览器URL但不刷新页面
        history.pushState({page: url}, '', '?page=' + encodeURIComponent(url));
        
        // 更新激活状态
        if (activeMenuItem) {
            activeMenuItem.classList.remove('active');
        }
        
        // 设置新的激活菜单项
        setActiveMenuItem(url);
    } else {
        console.error('Could not find or create iframe for page loading');
    }
}

// 设置激活的菜单项
function setActiveMenuItem(pageUrl) {
    // 移除所有现有的激活状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 根据页面URL查找对应的菜单项并激活
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const links = item.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && pageUrl.includes(href)) {
                item.classList.add('active');
                activeMenuItem = item;
            }
        });
    });
}

// 切换子菜单 (兼容index.html中的toggleSubmenu调用)
function toggleSubmenu(menuId) {
    console.log('toggleSubmenu called with menuId:', menuId);
    toggleSubMenu(menuId);
}

// 切换子菜单
function toggleSubMenu(menuId) {
    console.log('toggleSubMenu called with menuId:', menuId);
    
    // 首先尝试在当前文档中查找元素
    let submenu = document.getElementById(menuId + '-submenu');
    let arrow = document.getElementById(menuId + '-arrow');
    
    console.log('Direct search - submenu element:', submenu);
    console.log('Direct search - arrow element:', arrow);
    
    // 如果在当前文档中找不到，尝试在父文档中查找（处理iframe调用的情况）
    if ((!submenu || !arrow) && window.parent && window.parent !== window) {
        try {
            submenu = window.parent.document.getElementById(menuId + '-submenu');
            arrow = window.parent.document.getElementById(menuId + '-arrow');
            console.log('Parent document search - submenu element:', submenu);
            console.log('Parent document search - arrow element:', arrow);
        } catch (e) {
            console.error('Error accessing parent document:', e);
        }
    }
    
    // 如果仍然找不到，尝试在顶层文档中查找
    if ((!submenu || !arrow) && window.top && window.top !== window) {
        try {
            submenu = window.top.document.getElementById(menuId + '-submenu');
            arrow = window.top.document.getElementById(menuId + '-arrow');
            console.log('Top document search - submenu element:', submenu);
            console.log('Top document search - arrow element:', arrow);
        } catch (e) {
            console.error('Error accessing top document:', e);
        }
    }
    
    // 如果仍然找不到元素，尝试直接在document中查找
    if (!submenu) {
        submenu = document.querySelector('#' + menuId + '-submenu');
        console.log('Query selector search - submenu element:', submenu);
    }
    
    if (!arrow) {
        arrow = document.querySelector('#' + menuId + '-arrow');
        console.log('Query selector search - arrow element:', arrow);
    }
    
    // 如果仍然找不到，尝试通过data-module属性查找
    if (!submenu || !arrow) {
        const moduleId = menuId.replace('-submenu', '');
        const navItem = document.querySelector(`[data-module="${moduleId}"]`);
        if (navItem) {
            if (!submenu) {
                submenu = navItem.querySelector('.submenu');
                console.log('Data-module search - submenu element:', submenu);
            }
            if (!arrow) {
                arrow = navItem.querySelector('i.fa-chevron-down');
                console.log('Data-module search - arrow element:', arrow);
            }
        }
    }
    
    if (submenu && arrow) {
        submenu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
        console.log('Toggled submenu and arrow');
    } else {
        console.error('Could not find submenu or arrow element for menuId:', menuId);
        // 添加更多调试信息
        console.log('Current document context:', document);
        if (window.parent && window.parent !== window) {
            console.log('Parent document context:', window.parent.document);
        }
        if (window.top && window.top !== window) {
            console.log('Top document context:', window.top.document);
        }
    }
}

// 切换侧边栏
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('content-area');
    const expandBtn = document.getElementById('sidebar-expand-btn');
    const arrow = document.getElementById('sidebar-toggle-btn').querySelector('i');
    
    if (!sidebar || !contentArea || !expandBtn || !arrow) {
        console.error('Could not find required elements for sidebar toggle');
        return;
    }
    
    sidebar.classList.toggle('collapsed');
    sidebarCollapsed = sidebar.classList.contains('collapsed');
    
    // 控制展开按钮的显示
    if (sidebarCollapsed) {
        expandBtn.classList.add('visible');
    } else {
        expandBtn.classList.remove('visible');
    }
    
    // 切换内容区域的边距
    if (sidebarCollapsed) {
        contentArea.classList.add('content-area-expanded');
    } else {
        contentArea.classList.remove('content-area-expanded');
    }
    
    // 切换箭头方向
    if (sidebarCollapsed) {
        if (arrow.classList.contains('fa-chevron-left')) {
            arrow.classList.remove('fa-chevron-left');
            arrow.classList.add('fa-chevron-right');
        }
    } else {
        if (arrow.classList.contains('fa-chevron-right')) {
            arrow.classList.remove('fa-chevron-right');
            arrow.classList.add('fa-chevron-left');
        }
    }
    
    // 保存侧边栏状态到localStorage
    try {
        localStorage.setItem('sidebarCollapsed', sidebarCollapsed.toString());
    } catch (e) {
        console.warn('Could not save sidebar state to localStorage:', e);
    }
}

// 展开侧边栏
function expandSidebar() {
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('content-area');
    const expandBtn = document.getElementById('sidebar-expand-btn');
    
    if (!sidebar || !contentArea || !expandBtn) {
        console.error('Could not find required elements for sidebar expand');
        return;
    }
    
    sidebar.classList.remove('collapsed');
    sidebarCollapsed = false;
    expandBtn.classList.remove('visible');
    contentArea.classList.remove('content-area-expanded');
    
    // 更新箭头图标
    const arrow = document.getElementById('sidebar-toggle-btn').querySelector('i');
    if (arrow) {
        if (arrow.classList.contains('fa-chevron-right')) {
            arrow.classList.remove('fa-chevron-right');
            arrow.classList.add('fa-chevron-left');
        }
        
        // 确保箭头图标正确
        if (!arrow.classList.contains('fa-chevron-left')) {
            arrow.classList.add('fa-chevron-left');
        }
    }
    
    // 保存侧边栏状态到localStorage
    try {
        localStorage.setItem('sidebarCollapsed', 'false');
    } catch (e) {
        console.warn('Could not save sidebar state to localStorage:', e);
    }
}

// 恢复侧边栏状态
function restoreSidebarState() {
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('content-area');
    const expandBtn = document.getElementById('sidebar-expand-btn');
    
    if (!sidebar || !contentArea || !expandBtn) {
        console.error('Could not find required elements for sidebar state restoration');
        return;
    }
    
    // 从localStorage恢复侧边栏状态
    try {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState !== null) {
            sidebarCollapsed = savedState === 'true';
            
            if (sidebarCollapsed) {
                sidebar.classList.add('collapsed');
                expandBtn.classList.add('visible');
                contentArea.classList.add('content-area-expanded');
            } else {
                sidebar.classList.remove('collapsed');
                expandBtn.classList.remove('visible');
                contentArea.classList.remove('content-area-expanded');
            }
            
            // 更新箭头图标
            const arrow = document.getElementById('sidebar-toggle-btn').querySelector('i');
            if (arrow) {
                if (sidebarCollapsed) {
                    if (arrow.classList.contains('fa-chevron-left')) {
                        arrow.classList.remove('fa-chevron-left');
                        arrow.classList.add('fa-chevron-right');
                    }
                } else {
                    if (arrow.classList.contains('fa-chevron-right')) {
                        arrow.classList.remove('fa-chevron-right');
                        arrow.classList.add('fa-chevron-left');
                    }
                }
            }
        }
    } catch (e) {
        console.warn('Could not restore sidebar state from localStorage:', e);
    }
}

// 处理浏览器前进后退按钮
window.onpopstate = function(event) {
    // 重新加载当前iframe内容以确保正确显示
    const iframe = document.getElementById('main-frame');
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page && iframe) {
        iframe.src = decodeURIComponent(page);
        // 更新激活菜单项
        setActiveMenuItem(decodeURIComponent(page));
    }
};

// 监听来自iframe的消息
window.addEventListener('message', function(event) {
    // 检查消息来源是否为我们的iframe
    const iframe = document.getElementById('main-frame');
    if (iframe && event.source === iframe.contentWindow) {
        if (event.data.type === 'toggleSubmenu') {
            toggleSubmenu(event.data.menuId);
        } else if (event.data.type === 'loadPage') {
            loadPage(event.data.pageUrl);
        } else if (event.data.type === 'setActiveMenuItem') {
            setActiveMenuItem(event.data.pageUrl);
        }
    }
});

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app');
    
    // 恢复侧边栏状态
    restoreSidebarState();
    
    // 绑定侧边栏切换按钮事件
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', toggleSidebar);
    }
    
    // 绑定侧边栏展开按钮事件
    const sidebarExpandBtn = document.getElementById('sidebar-expand-btn');
    if (sidebarExpandBtn) {
        sidebarExpandBtn.addEventListener('click', expandSidebar);
    }
    
    // 绑定移动端菜单切换按钮事件
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.toggle('open');
            }
        });
    }
    
    // 检查URL参数，如果有的话加载指定页面
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page) {
        loadPage(decodeURIComponent(page));
    } else {
        // 默认加载首页
        loadPage('dashboard-home.html');
    }
    
    // 监听iframe加载完成事件
    const iframe = document.getElementById('main-frame');
    if (iframe) {
        iframe.onload = function() {
            try {
                // 尝试访问iframe内容以检查是否加载成功
                console.log('Iframe loaded successfully');
            } catch (e) {
                console.log('Iframe loaded but cannot access content (cross-origin)');
            }
        };
    }
    
    // 加载优化脚本
    loadOptimizedScripts();
    
    // 将函数暴露到全局window对象，以便iframe中的页面可以调用
    window.loadPage = loadPage;
    window.toggleSubmenu = toggleSubmenu;
    window.toggleSubMenu = toggleSubMenu;
    window.toggleSidebar = toggleSidebar;
    window.expandSidebar = expandSidebar;
    window.setActiveMenuItem = setActiveMenuItem;
    
    // 确保rotate-180类定义存在
    if (!document.querySelector('#rotate-180-style')) {
        const style = document.createElement('style');
        style.id = 'rotate-180-style';
        style.textContent = `
            .rotate-180 {
                transform: rotate(180deg);
                transition: transform 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
});

// 加载优化脚本
function loadOptimizedScripts() {
    // 创建script元素加载优化脚本
    const script = document.createElement('script');
    script.src = './optimized-loader.js';
    script.onload = function() {
        console.log('优化脚本加载完成');
    };
    document.head.appendChild(script);
}