(function () {
  // ---------- 页面切换逻辑 ----------
  const menuItems = document.querySelectorAll('.menu-item');
  const pages = document.querySelectorAll('.page');

  function switchPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');
    menuItems.forEach(item => {
      item.classList.toggle('active', item.dataset.page === pageId);
    });
  }

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const pageId = item.dataset.page;
      if (pageId) switchPage(pageId);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const pageId = item.dataset.page;
        if (pageId) switchPage(pageId);
      }
    });
  });

  // 确保初始状态
  if (!document.getElementById('page1').classList.contains('active')) {
    switchPage('page1');
  }

  // ---------- 昼夜模式切换 ----------
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;

  // 读取本地存储
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    body.classList.remove('dark-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
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
