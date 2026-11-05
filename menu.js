/**
 * 公共组件：菜单 + 昼夜切换 + 页脚
 * 依赖 jQuery
 * 页面通过 <body data-page="xxx"> 标识自己
 */
$(function () {
  // ---------- 菜单配置 ----------
  const MENU_CONFIG = [
    { page: 'index', href: 'index.html', icon: 'fa-house', label: '首页' },
    { page: 'download', href: 'download.html', icon: 'fa-download', label: '下载' },
    { page: 'notes', href: 'notes.html', icon: 'fa-pen-to-square', label: '便签' },
    { page: 'reward', href: 'reward.html', icon: 'fa-mug-hot', label: '打赏' }
  ];

  // ---------- 页脚配置（外部网站链接） ----------
  const FOOTER_LINKS = [
    { href: 'https://www.wikipedia.org', label: '维基百科', icon: 'fas fa-globe' },
    { href: 'https://github.com', label: 'GitHub', icon: 'fab fa-github' },
    { href: 'https://developer.mozilla.org', label: 'MDN Web Docs', icon: 'fas fa-book-open' },
    { href: 'https://stackoverflow.com', label: 'Stack Overflow', icon: 'fab fa-stack-overflow' }
  ];

  // 想关掉所有广告：将 AD_LIST 设置为 [] 空数组
  // 想加广告：复制一行对象即可，自上而下排列
  const AD_LIST = [
    {
      imageSrc: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop',
      linkUrl: 'https://example.com/ad1',
      alt: '广告横幅 1'
    },
    {
      imageSrc: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
      linkUrl: 'https://example.com/ad2',
      alt: '广告横幅 2'
    }
    // 想加第三个就在这里继续加 { ... }
  ];

  const $body = $('body');
  const currentPage = $body.data('page') || 'index';

   // ---------- 构建并注入多个顶部广告位 ----------
  if (AD_LIST.length > 0) {
    // 创建一个大容器包裹所有广告，方便统一处理
    const $adContainer = $('<div>', { class: 'cnm-container' });

    $.each(AD_LIST, function (index, ad) {
      const $adBanner = $('<div>', { class: 'cnm-banner-wrap' });
      const $adInner = $('<div>', { class: 'cnm-inner' }).appendTo($adBanner);
      
      // 关闭按钮（为每个广告单独绑定）
      const $closeBtn = $('<button>', { class: 'cnm-close', type: 'button', 'aria-label': '关闭广告' })
        .append($('<i>', { class: 'fas fa-times' }))
        .appendTo($adInner);

      // 广告链接与图片
      $('<a>', { href: ad.linkUrl, target: '_blank', rel: 'noopener noreferrer', class: 'cnm-link' })
        .append($('<img>', { src: ad.imageSrc, alt: ad.alt }))
        .appendTo($adInner);

      // 绑定关闭事件
      $closeBtn.on('click', function (e) {
        e.preventDefault();
        $adBanner.slideUp(300);
      });

      // 如果用户之前关过某一个（针对单个广告的记忆）
      if (sessionStorage.getItem('ad_closed_' + index) === 'true') {
        $adBanner.hide();
      } else {
        $closeBtn.data('index', index); // 记录索引方便记忆
        // 重新绑定带记忆的关闭
        $closeBtn.off('click').on('click', function(e){
          e.preventDefault();
          $(this).closest('.cnm-banner-wrap').slideUp(300);
          sessionStorage.setItem('ad_closed_' + index, 'true');
        });
      }

      $adContainer.append($adBanner);
    });

    // 将这一组广告全部插到 .app-container 的前面
    $('.app-container').before($adContainer);
  }
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