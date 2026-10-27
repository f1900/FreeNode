/**
 * 公共菜单组件
 * 页面通过 <body data-page="index"> 标识自己
 * 自动注入：昼夜切换按钮 + 三个菜单项
 */
(function () {
  const MENU_CONFIG = [
    { page: 'index',    href: 'index.html',    icon: 'fa-house',      label: '首页' },
    { page: 'download', href: 'download.html', icon: 'fa-download',   label: '下载' },
    { page: 'notes',    href: 'notes.html',    icon: 'fa-pen-to-square', label: '便签' }
  ];

  const currentPage = document.body.dataset.page || 'index';

  // 菜单 HTML
  const menuHTML = MENU_CONFIG.map(item => {
    const activeClass = item.page === currentPage ? ' active' : '';
    return `
      <a href="${item.href}" class="menu-item${activeClass}" aria-label="${item.label}页面">
        <i class="fas ${item.icon}"></i>
        <span>${item.label}</span>
      </a>
    `;
  }).join('');

  // 昼夜切换按钮 HTML
  const toggleHTML = `
    <div class="theme-toggle" id="themeToggle" title="切换昼夜模式" role="button" aria-label="切换昼夜模式" tabindex="0">
      <i class="fas fa-moon" id="themeIcon"></i>
    </div>
  `;

  // 注入：切换按钮放到 body 最前，菜单放到 .app-container 最前
  const body = document.body;
  const toggleEl = document.createElement('div');
  toggleEl.innerHTML = toggleHTML;
  body.insertBefore(toggleEl.firstElementChild, body.firstChild);

  const appContainer = document.querySelector('.app-container');
  if (appContainer) {
    const menuEl = document.createElement('div');
    menuEl.innerHTML = `<div class="menu" id="menu">${menuHTML}</div>`;
    appContainer.insertBefore(menuEl.firstElementChild, appContainer.firstChild);
  }

  // ---------- 昼夜模式初始化 ----------
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark-mode');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
    }
  }

  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });
})();