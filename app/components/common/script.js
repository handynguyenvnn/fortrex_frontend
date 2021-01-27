import $ from 'jquery'
/* eslint-disable no-unused-vars */
/* eslint-disable no-cond-assign */
function toggleFullscreen(elem) {
  elem = elem || document.documentElement;
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function getNextSiblings(elem, filter) {
  let sibs = [];
  while (elem = elem.nextSibling) {
    if (elem.nodeType === 3) continue;
    if (!filter || filter(elem)) sibs.push(elem);
  }
  return sibs;
}

function getPreviousSiblings(elem, filter) {
  let sibs = [];
  while (elem = elem.previousSibling) {
    if (elem.nodeType === 3) continue;
    if (!filter || filter(elem)) sibs.push(elem);
  }
  return sibs;
}

function cleanPhoneNumber(e) {
  e.preventDefault();
  let pastedText = '';
  if (window.clipboardData && window.clipboardData.getData) {
    pastedText = window.clipboardData.getData('Text');
  } else if (e.clipboardData && e.clipboardData.getData) {
    pastedText = e.clipboardData.getData('text/plain');
  }
  this.value = pastedText.replace(/\D/g, '');
};


export const loadScript = () => {
  $(document).ready(function() {
    $(".tab-wrap").each(function() {
      let $tabWrapper, $tabID;
      $tabWrapper = $(this);
      $tabID = $tabWrapper.find(".tab-link-2.current").attr("data-tab");
      $tabWrapper
        .find($tabID)
        .fadeIn()
        .siblings()
        .hide();
      $($tabWrapper).on("click", ".tab-link-2", function(e) {
        e.preventDefault();
        $tabID = $(this).attr("data-tab");
        $(this)
          .addClass("current")
          .siblings()
          .removeClass("current");
        $tabWrapper
          .find($tabID)
          .fadeIn()
          .siblings()
          .hide();
      });
    });
  });


  if (document.getElementById('footer-link-fullscreen')) {
    document.getElementById('footer-link-fullscreen').addEventListener('click', e => {
      e.preventDefault();
      toggleFullscreen();
    })
  }
  // document.querySelectorAll('.tab-link.active').forEach((el, index) => {
  //   document.querySelector(el.getAttribute('data-tab')).classList.add('active');
  // })
  // document.addEventListener('click', e => {
  //   if (e.target.closest('.tab-link')) {
  //     const tabLink = e.target.closest('.tab-link');
  //     const tabLinkSilblings = tabLink.parentElement.children;
  //     const tabContent = document.querySelector(tabLink.getAttribute('data-tab'));
  //     const tabContentSilblings = tabContent.parentElement.querySelector('.tab-content.active');
  //     for (let i = 0; i < tabLinkSilblings.length; i++) {
  //       if (tabLinkSilblings[i].classList.contains('active')) tabLinkSilblings[i].classList.remove('active');
  //     }
  //     tabLink.classList.add('active');
  //     tabContentSilblings.classList.remove('active');
  //     tabContent.classList.add('active');
  //   }
  // })
  if (document.getElementById('settings_dark_button') && document.getElementById('settings_light_button')) {
    const darkBtn = document.getElementById('settings_dark_button');
    const lightBtn = document.getElementById('settings_light_button');
    const body = document.body;
    darkBtn.addEventListener('click', e => {
      e.preventDefault();
      darkBtn.classList.add('active');
      lightBtn.classList.remove('active');
      document.body.classList.replace('theme--light', 'theme--dark');
      document.querySelectorAll('.smartcharts-light').forEach(el => {
        el.classList.replace('smartcharts-light', 'smartcharts-dark');
      })
    })
    lightBtn.addEventListener('click', e => {
      e.preventDefault();
      darkBtn.classList.remove('active');
      lightBtn.classList.add('active');
      document.body.classList.replace('theme--dark', 'theme--light');
      document.querySelectorAll('.smartcharts-dark').forEach(el => {
        el.classList.replace('smartcharts-dark', 'smartcharts-light');
      })
    })
  }

  if (document.querySelector('#theme-switch-btn input')) {
    const btn = document.querySelector('#theme-switch-btn input');
    btn.addEventListener('change', e => {
      if (document.body.classList.contains('theme--dark')) {
        document.body.classList.replace('theme--dark', 'theme--light');
        document.querySelectorAll('.smartcharts-dark').forEach(el => {
          el.classList.replace('smartcharts-dark', 'smartcharts-light');
        })
      }
      else {
        document.body.classList.replace('theme--light', 'theme--dark');
        document.querySelectorAll('.smartcharts-light').forEach(el => {
          el.classList.replace('smartcharts-light', 'smartcharts-dark');
        })
      }
    })
  }

  Array.from(document.getElementsByClassName('open-modal-btn')).forEach(el => {
    el.addEventListener('click', e => {
      const modal = document.querySelector(el.getAttribute('data-modal'));
      const modalContent = modal.getElementsByClassName('sc-dialog')[0] || modal.getElementsByClassName('modal-container')[0];
      if (modal) {
        e.preventDefault();
        modal.classList.add('active');
        setTimeout(() => {
          if (modalContent) modalContent.classList.add('sc-dialog-enter-done');
        }, 10);
      }
    })
  });
  document.addEventListener('click', e => {
    if (e.target.classList.contains('cq-modal__overlay') || e.target.closest('.sc-dialog__head--action')) {
      const modal = e.target.closest('.modal-root');
      const modalContent = modal.getElementsByClassName('sc-dialog')[0];
      if (modalContent) {
        modalContent.classList.remove('sc-dialog-enter-done');
        modalContent.addEventListener('transitionend', function handle() {
          modal.classList.remove('active');
          modalContent.removeEventListener('transitionend', handle);
        })
      }
      else {
        modal.classList.remove('active');
      }
    }
  });

  Array.from(document.getElementsByClassName('sc-filter')).forEach(el => {
    const target = document.querySelector(el.getAttribute('data-scrollto'));
    const targetParent = target.closest('.sc-scrollbar');
    el.addEventListener('click', e => {
      e.preventDefault();
      if (target) {
        el.parentElement.querySelector('.sc-active-filter').classList.remove('sc-active-filter');
        el.classList.add('sc-active-filter');
        targetParent.scrollTop = target.offsetTop;
      }
    })
    targetParent.addEventListener('scroll', e => {
      if (targetParent.scrollTop > target.offsetTop && target.offsetTop + target.scrollHeight > targetParent.scrollTop) {
        el.parentElement.querySelector('.sc-active-filter').classList.remove('sc-active-filter');
        el.classList.add('sc-active-filter');
      }
    })
  });

  Array.from(document.getElementsByClassName('dc-vertical-tab__header')).forEach(el => {
    const target = document.querySelector(el.getAttribute('data-scrollto'));
    const targetParent = target.closest('.m-scrollbar');
    el.addEventListener('click', e => {
      e.preventDefault();
      if (target) {
        el.parentElement.querySelector('.dc-vertical-tab__header--active').classList.remove('dc-vertical-tab__header--active');
        el.classList.add('dc-vertical-tab__header--active');
        targetParent.scrollTop = target.offsetTop;
      }
    })
    targetParent.addEventListener('scroll', e => {
      if (targetParent.scrollTop > target.offsetTop && target.offsetTop + target.scrollHeight > targetParent.scrollTop) {
        el.parentElement.querySelector('.dc-vertical-tab__header--active').classList.remove('dc-vertical-tab__header--active');
        el.classList.add('dc-vertical-tab__header--active');
      }
    })
  });

  Array.from(document.getElementsByClassName('number-selector-selection')).forEach(el => {
    el.addEventListener('click', e => {
      Array.from(document.getElementsByClassName('number-selector-selection')).forEach(ele => {
        if (ele.classList.contains('number-selector-selection-selected')) {
          ele.classList.remove('number-selector-selection-selected')
        }
      })
      el.classList.add('number-selector-selection-selected');
    })
  });

  if (document.getElementById('input-amount')) {

    const inputWrap = document.getElementById('input-amount');
    const plusBtn = inputWrap.getElementsByClassName('input-wrapper-btn-increment')[0];
    const minusBtn = inputWrap.getElementsByClassName('input-wrapper-btn-decrement')[0];
    const input = inputWrap.getElementsByClassName('input')[0];
    plusBtn.addEventListener('click', e => {
      e.preventDefault();
      if ((Number(input.value) + 1).length > Number(input.getAttribute('maxlength'))) return;
      input.value = Number(input.value) + 1;
    });
    minusBtn.addEventListener('click', e => {

      e.preventDefault();
      if ((Number(input.value) - 1) < 0) return;
      input.value = Number(input.value) - 1;
    });
    input.addEventListener('keypress', e => {
      if (e.which < 48 || e.which > 57) e.preventDefault();
    });
    input.addEventListener('paste', cleanPhoneNumber);
  }

  if (document.getElementById('range-slider-input')) {
    document.getElementById('range-slider-input').addEventListener('click', e => {
      return false;
    })
  }
  if (document.getElementById('range-slider-line')) {
    const line = document.getElementById('range-slider-line');
    const lineFill = document.getElementById('range-slider-line-fill');
    const input = document.getElementById('range-slider-input');
    const step = Array.from(document.getElementsByClassName('range-slider-ticks-step'));
    const title = document.getElementById('range-slider-caption-title');


  }

  if (document.getElementById('dropdown-display-btn') && document.getElementById('dropdown-display-icon') && document.getElementById('dropdown-display')) {
    const dropdown = document.getElementById('dropdown-display');
    const dropdownBtn = document.getElementById('dropdown-display-btn');
    const dropdownIcon = document.getElementById('dropdown-display-icon');
    const dropdownOverlay = document.getElementById('dropdown-display-overlay');
    dropdownBtn.addEventListener('click', e => {
      dropdownBtn.classList.toggle('active');
      dropdown.classList.toggle('active');
      dropdownIcon.classList.toggle('active');
    });
    if (dropdownOverlay) {
      dropdownOverlay.addEventListener('click', e => {
        dropdownBtn.classList.remove('active');
        dropdown.classList.remove('active');
        dropdownIcon.classList.remove('active');
      })
    }
    document.addEventListener('click', e => {
      if (e.target.closest('#dropdown-display')) return;
      if (e.target.closest('#dropdown-display-btn')) return;
      if (e.target.closest('#dropdown-display-icon')) return;
      dropdownBtn.classList.remove('active');
      dropdown.classList.remove('active');
      dropdownIcon.classList.remove('active')
    });
  }

  if (document.getElementById('ciq-menu')) {
    const wrap = document.getElementById('ciq-menu');
    const btn = wrap.getElementsByClassName('cq-menu-btn')[0];
    const dropdown = wrap.getElementsByClassName('sc-dialog')[0];
    const dropdownClose = wrap.getElementsByClassName('m-sc-dialog__close')[0];
    if (!btn || !dropdown) return;
    btn.addEventListener('click', e => {
      wrap.classList.toggle('stxMenuActive');
      dropdown.classList.toggle('cq-menu-dropdown-enter-done');
    });
    if (dropdownClose) {
      dropdownClose.addEventListener('click', e => {
        wrap.classList.remove('stxMenuActive');
        dropdown.classList.remove('cq-menu-dropdown-enter-done');
      })
    }
    document.addEventListener('click', e => {
      if (e.target.closest('.cq-menu-btn') || e.target.closest('.sc-dialog')) return;
      wrap.classList.remove('stxMenuActive');
      dropdown.classList.remove('cq-menu-dropdown-enter-done');
    });
  }

  if (document.getElementById('type-widget-display') && document.getElementById('contract-type-dialog')) {
    const btn = document.getElementById('type-widget-display');
    const dropdown = document.getElementById('contract-type-dialog');
    const dropdownClose = document.getElementById('contract-type-dialog-close');
    btn.addEventListener('click', e => {
      if (dropdown.classList.contains('contract-type-dialog--enterDone')) {
        btn.classList.remove('contract-type-widget__display--clicked');
        dropdown.classList.replace('contract-type-dialog--enterDone', 'contract-type-dialog--exit');
        dropdown.addEventListener('transitionend', function handle() {
          dropdown.classList.remove('contract-type-dialog--exit');
          dropdown.removeEventListener('transitionend', handle);
        })
      }
      else {
        btn.classList.add('contract-type-widget__display--clicked');
        dropdown.classList.add('contract-type-dialog--enter');
        dropdown.addEventListener('transitionend', function handle() {
          dropdown.classList.replace('contract-type-dialog--enter', 'contract-type-dialog--enterDone');
          dropdown.removeEventListener('transitionend', handle);
        })
      }
    });
    if (dropdownClose) {
      dropdownClose.addEventListener('click', e => {
        btn.classList.remove('contract-type-widget__display--clicked');
        dropdown.classList.replace('contract-type-dialog--enterDone', 'contract-type-dialog--exit');
        dropdown.addEventListener('transitionend', function handle() {
          dropdown.classList.remove('contract-type-dialog--exit');
          dropdown.removeEventListener('transitionend', handle);
        })
      })
    }
    document.addEventListener('click', e => {
      if (e.target.closest('#type-widget-display')) return;
      if (e.target.closest('#contract-type-dialog.contract-type-dialog--enterDone')) return;
      btn.classList.remove('contract-type-widget__display--clicked');
      dropdown.classList.replace('contract-type-dialog--enterDone', 'contract-type-dialog--exit');
      dropdown.addEventListener('transitionend', function handle() {
        dropdown.classList.remove('contract-type-dialog--exit');
        dropdown.removeEventListener('transitionend', handle);
      })
    })
  }

  if (document.getElementById('header-menu-body-top-logo') && document.getElementById('header-menu-body-top-dropdown')) {
    const btn = document.getElementById('header-menu-body-top-logo');
    const dropdown = document.getElementById('header-menu-body-top-dropdown');
    btn.addEventListener('click', e => {
      btn.classList.toggle('active');
      dropdown.classList.toggle('active');
    })
  }

  if (document.getElementById('header-menu-btn') && document.getElementById('header-menu')) {
    const btn = document.getElementById('header-menu-btn');
    const menu = document.getElementById('header-menu');
    btn.addEventListener('click', e => {
      menu.classList.toggle('active');
    })
    const close = document.getElementById('header-menu-close');
    const overlay = document.getElementById('header-menu-overlay');
    if (close) {
      close.addEventListener('click', e => {
        menu.classList.remove('active');
      })
    }
    if (overlay) {
      overlay.addEventListener('click', e => {
        menu.classList.remove('active');
      })
    }
  }

  if (document.getElementById('header-logo') && document.getElementById('m-platform-dropdown')) {
    const btn = document.getElementById('header-logo');
    const dropdown = document.getElementById('m-platform-dropdown');
    const dropdownContent = dropdown.getElementsByClassName('m-platform-nav')[0];
    btn.addEventListener('click', e => {
      if (dropdown.classList.contains('active')) {
        btn.classList.remove('active');
        if (dropdownContent) {
          dropdownContent.classList.remove('active');
          dropdownContent.addEventListener('transitionend', function handle() {
            dropdown.classList.remove('active');
            dropdownContent.removeEventListener('transitionend', handle);
          });
        }
        else {
          dropdown.classList.remove('active');
        }
      }
      else {
        btn.classList.add('active');
        dropdown.classList.add('active');
        setTimeout(() => {
          if (dropdownContent) dropdownContent.classList.toggle('active');
        }, 10);
      }
    });
  }
  if (document.getElementById('trade-aside') && document.getElementById('trade-aside-mobile-btn')) {
    const btn = document.getElementById('trade-aside-mobile-btn');
    const aside = document.getElementById('trade-aside');
    btn.addEventListener('click', e => {
      btn.classList.toggle('active');
      aside.classList.toggle('active');
    })
  }
  if (document.getElementById('acc-info') && document.getElementById('acc-info-btn')) {
    const dropdown = document.getElementById('acc-info');
    const btn = document.getElementById('acc-info-btn');
    btn.addEventListener('click', e => {
      btn.classList.toggle('acc-info--show');
      dropdown.classList.toggle('acc-switcher__wrapper--enter-done');
    });
    document.addEventListener('click', e => {
      if (e.target.closest('#acc-info')) return;
      if (e.target.closest('#acc-info-btn')) return;
      btn.classList.remove('acc-info--show');
      dropdown.classList.remove('acc-switcher__wrapper--enter-done');
    })
  }

  document.querySelectorAll('.acc-switcher-wrap > .acc-switcher').forEach(el => {
    const arrow = el.getElementsByClassName('acc-info__select-arrow')[0];
    el.addEventListener('click', e => {
      if (arrow.classList.contains('acc-info__select-arrow--invert')) {
        arrow.classList.remove('acc-info__select-arrow--invert');
        console.log(getNextSiblings(el))
        getNextSiblings(el).forEach(ele => {
          ele.style.display = "none";
        })
      }
      else {
        arrow.classList.add('acc-info__select-arrow--invert');
        getNextSiblings(el).forEach(ele => {
          ele.style.display = "flex";
        })
      }
    })
  })

}
export const loadActiveCssInternal = () => {
  // document.getElementById('bootstrap').disabled = false;
  // document.getElementById("v-style").disabled = false;
}