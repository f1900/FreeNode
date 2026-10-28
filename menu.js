/**
 * 公共组件：菜单 + 昼夜切换 + 页脚
 * 依赖 jQuery
 * 页面通过 <body data-page="xxx"> 标识自己
 */
 $(function () {
  // ---------- 菜单配置 ----------
  const MENU_CONFIG = [
    { page: 'index',    href: 'index.html',    icon: 'fa-house',         label: '首页' },
    { page: 'download', href: 'download.html', icon: 'fa-download',      label: '下载' },
    { page: 'download', href: 'download.html', icon: 'fa-download',      label: '下载' },
    { page: 'notes',    href: 'notes.html',    icon: 'fa-pen-to-square', label: '便签' }
  ];

  // ---------- 页脚配置（外部网站链接） ----------
  const FOOTER_LINKS = [
    { href: 'https://www.wikipedia.org',     label: '维基百科',      icon: 'fas fa-globe' },
    { href: 'https://github.com',            label: 'GitHub',        icon: 'fab fa-github' },
    { href: 'https://developer.mozilla.org', label: 'MDN Web Docs',  icon: 'fas fa-book-open' },
    { href: 'https://stackoverflow.com',     label: 'Stack Overflow', icon: 'fab fa-stack-overflow' }
  ];

  const $body = $('body');
  const currentPage = $body.data('page') || 'index';

  // ---------- 构建并注入菜单 ----------
  const $menu = $('<div>', { class: 'menu', id: 'menu' });
  $.each(MENU_CONFIG, function (_, item) {
    const activeClass = item.page === currentPage ? ' active' : '';
    $('<a>', {
      href: item.href,
      class: 'menu-item' + activeClass,
      'aria-label': item.label + '页面'
    })
      .append($('<i>', { class: 'fas ' + item.icon }))
      .append($('<span>').text(item.label))
      .appendTo($menu);
  });
  $('.app-container').prepend($menu);

  // ---------- 构建并注入昼夜切换按钮 ----------
  const $toggle = $('<div>', {
    class: 'theme-toggle',
    id: 'themeToggle',
    title: '切换昼夜模式',
    role: 'button',
    'aria-label': '切换昼夜模式',
    tabindex: 0
  }).append($('<i>', { class: 'fas fa-moon', id: 'themeIcon' }));

  $body.prepend($toggle);

  // ---------- 构建并注入页脚 ----------
  const $footer = $('<footer>', { class: 'site-footer' });

  const $footerLinks = $('<div>', { class: 'footer-links' });
  $.each(FOOTER_LINKS, function (_, link) {
    $('<a>', {
      class: 'footer-link',
      href: link.href,
      target: '_blank',
      rel: 'noopener noreferrer'
    })
      .append($('<i>', { class: link.icon }))
      .append($('<span>').text(link.label))
      .appendTo($footerLinks);
  });
  $footer.append($footerLinks);

  const $footerCopy = $('<p>', { class: 'footer-copy' })
    .append($('<i>', { class: 'fas fa-heart' }))
    .append(document.createTextNode(' 用心打磨 · 保留所有权利 © ' + new Date().getFullYear()));
  $footer.append($footerCopy);

  $('.app-container').append($footer);

  // ---------- 昼夜模式 ----------
  const $themeIcon = $('#themeIcon');

  if (localStorage.getItem('theme') === 'dark') {
    $body.addClass('dark-mode');
    $themeIcon.removeClass('fa-moon').addClass('fa-sun');
  }

  function toggleTheme() {
    if ($body.hasClass('dark-mode')) {
      $body.removeClass('dark-mode');
      $themeIcon.removeClass('fa-sun').addClass('fa-moon');
      localStorage.setItem('theme', 'light');
    } else {
      $body.addClass('dark-mode');
      $themeIcon.removeClass('fa-moon').addClass('fa-sun');
      localStorage.setItem('theme', 'dark');
    }
  }

  $('#themeToggle')
    .on('click', toggleTheme)
    .on('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
});