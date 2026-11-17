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
    { page: 'notes', href: 'notes.html', icon: 'fa-paper-plane', label: '免费节点' }
    // ,{ page: 'reward', href: 'reward.html', icon: 'fa-mug-hot', label: '打赏站长' }
  ];

  // ---------- 页脚配置（外部网站链接） ----------
  const FOOTER_LINKS = [
    { href: 'https://www.wikipedia.org', label: '维基百科', icon: 'fa-wikipedia-w' },
    { href: 'https://www.google.org', label: 'Google', icon: 'fa-google' },
    { href: 'https://www.youtube.com', label: 'Youtube', icon: 'fa-youtube' },
    { href: 'https://x.com', label: 'Twitter', icon: 'fa-x-twitter' },
    { href: 'https://www.instagram.com', label: 'Instagram', icon: 'fa-instagram' },
    { href: 'https://github.com', label: 'GitHub', icon: 'fa-github' }
    // { href: 'https://developer.mozilla.org', label: 'MDN Web Docs', icon: 'fas fa-book-open' },
    // { href: 'https://stackoverflow.com', label: 'Stack Overflow', icon: 'fab fa-stack-overflow' }
  ];

  // 想关掉所有横幅：将 AD_LIST 设置为 [] 空数组
  // 想加横幅：复制一行对象即可，自上而下排列
  const AD_LIST = [
    // {
    //   imageSrc: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop',
    //   linkUrl: 'https://example.com/ad1',
    //   alt: '横幅1'
    // },
    {
      imageSrc: 'image/banner.jpg',
      linkUrl: '#',
      alt: 'banner'
    }
    // 想加第三个就在这里继续加 { ... }
  ];

  const $body = $('body');
  const currentPage = $body.data('page') || 'index';

  // ---------- 构建并注入多个顶部横幅位 ----------
  if (AD_LIST.length > 0) {
    // 创建一个大容器包裹所有横幅，方便统一处理
    const $adContainer = $('<div>', { class: 'cnm-container' });

    $.each(AD_LIST, function (index, ad) {
      const $adBanner = $('<div>', { class: 'cnm-banner-wrap' });
      const $adInner = $('<div>', { class: 'cnm-inner' }).appendTo($adBanner);

      // 关闭按钮（为每个横幅单独绑定）
      const $closeBtn = $('<button>', { class: 'cnm-close', type: 'button', 'aria-label': '关闭' })
        .append($('<i>', { class: 'fas fa-times' }))
        .appendTo($adInner);

      // 横幅链接与图片
      $('<a>', { href: ad.linkUrl, target: '_blank', rel: 'noopener noreferrer', class: 'cnm-link' })
        .append($('<img>', { src: ad.imageSrc, alt: ad.alt }))
        .appendTo($adInner);

      // 绑定关闭事件
      $closeBtn.on('click', function (e) {
        e.preventDefault();
        $adBanner.slideUp(300);
      });

      // 如果用户之前关过某一个（针对单个横幅的记忆）
      // if (sessionStorage.getItem('ad_closed_' + index) === 'true') {
      //   $adBanner.hide();
      // } else {
      //   $closeBtn.data('index', index); // 记录索引方便记忆
      //   // 重新绑定带记忆的关闭
      //   $closeBtn.off('click').on('click', function(e){
      //     e.preventDefault();
      //     $(this).closest('.cnm-banner-wrap').slideUp(300);
      //     sessionStorage.setItem('ad_closed_' + index, 'true');
      //   });
      // }

      $adContainer.append($adBanner);
    });

    // 将这一组横幅全部插到 .app-container 的前面
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
      .append($('<i>', { class: 'fab ' + link.icon }))
      .append($('<span>').text(link.label))
      .appendTo($footerLinks);
  });
  $footer.append($footerLinks);

  const $footerCopy = $('<p>', { class: 'footer-copy' })
    // .append($('<i>', { class: 'fas fa-heart' }))
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


  // ---------- 构建并注入图片view ----------
  const $viewer = $(`
    <div id="imgViewer" class="img-viewer">
      <img id="imgViewerImg" src="" alt="">
    </div>
  `);
  $('body').append($viewer);

  const $viewerImg = $viewer.find('#imgViewerImg');

  $(document).on('click', 'img.manual-img', function () {
    const src = $(this).attr('src');
    if (!src) return;
    $viewerImg.attr('src', src);
    $viewer.addClass('show');
  });

  function closeViewer() {
    $viewer.removeClass('show');
    $viewerImg.attr('src', '');
  }

  // 点遮罩或图片都关闭
  $viewer.on('click', closeViewer);

  // 只有点遮罩空白处才关
  // $viewer.on('click', function (e) {
  //   if (e.target === this) closeViewer();  
  // });

  // ESC 关闭
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $viewer.hasClass('show')) closeViewer();
  });


  // ===== 配置工具按钮 =====
  const HOME_URL = 'index.html';                   // 首页地址
  const QR_IMAGE = 'image/qr.png'; // 二维码图片地址
  const SHOW_AFTER = 300;                 // 滚动多少 px 后显示"回到顶部"

  // 设备判断
  const isMobile = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent);

  // 首页判断
  const path = location.pathname;
  const isHome = path === '/' || /\/index\.(html?|php|asp|aspx)$/i.test(path);

  // ===== 构建 DOM =====
  const $wrap = $('<div id="floatTools" class="float-tools"></div>');

  const $btnHome = $(
    '<button type="button" class="float-btn float-home" title="返回首页">' +
    '<i class="fa-solid fa-house"></i>' +
    '</button>'
  );

  const $btnMobile = $(
    '<button type="button" class="float-btn float-mobile" title="手机访问">' +
    '<i class="fa-solid fa-mobile-screen-button"></i>' +
    '</button>'
  );

  const $btnTop = $(
    '<button type="button" class="float-btn float-top" title="回到顶部">' +
    '<i class="fa-solid fa-arrow-up"></i>' +
    '</button>'
  );

  $wrap.append($btnHome, $btnMobile, $btnTop);
  $('body').append($wrap);

  // 二维码弹层
  const $qrBox = $(
    '<div id="qrPopup" class="qr-popup">' +
    '<img src="' + QR_IMAGE + '" alt="网站二维码">' +
    '<span>扫码在手机上访问</span>' +
    '</div>'
  );
  $('body').append($qrBox);

  // ===== 初始显示状态 =====
  if (isHome) $btnHome.hide();       // 首页不显示"首页"
  if (isMobile) $btnMobile.hide();   // 手机不显示"手机访问"
  $btnTop.removeClass('show');       // 顶部不显示"回到顶部"

  // 三个都隐藏则整体隐藏
  function updateWrapVisibility() {
    const anyVisible = [$btnHome, $btnMobile, $btnTop].some($b => $b.css('display') !== 'none');
    $wrap.toggle(anyVisible);
  }
  updateWrapVisibility();

  // ===== 事件 =====
  $btnHome.on('click', function () {
    location.href = HOME_URL;
  });

  $btnMobile.on('click', function (e) {
    e.stopPropagation();
    $qrBox.toggleClass('show');
  });

  $btnTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 300);
  });

  // 点击二维码弹层外关闭
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#qrPopup').length && !$(e.target).closest('.float-mobile').length) {
      $qrBox.removeClass('show');
    }
  });

  // 滚动控制"回到顶部"
  function onScroll() {
    if ($btnTop.css('display') === 'none') return;
    $btnTop.toggleClass('show', $(window).scrollTop() > SHOW_AFTER);
  }
  $(window).on('scroll', onScroll);
  onScroll();

});