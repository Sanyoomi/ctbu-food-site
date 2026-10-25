document.addEventListener('DOMContentLoaded', function () {
  initTabs();
  initShareForm();
  initBackTop();
});

function initTabs() {
  const tabsBox = document.getElementById('foodTabs');
  if (!tabsBox) {
    return; 
  }

  const buttons = tabsBox.querySelectorAll('button');
  const panels = document.querySelectorAll('.tab-panel');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');
      for (let j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
      }
      for (let j = 0; j < panels.length; j++) {
        panels[j].classList.remove('active');
        panels[j].hidden = true;
      }
      this.classList.add('active');
      const target = document.getElementById(tabId);
      target.classList.add('active');
      target.hidden = false;
    });
  }
}

function initShareForm() {
  const form = document.getElementById('shareForm');
  if (!form) {
    return; //
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nickname = document.getElementById('fNickname');
    const food = document.getElementById('fFood');
    const reason = document.getElementById('fReason');
    const agree = document.getElementById('fAgree');
    let allPass = true; 

    const nick = nickname.value.trim();
    if (nick.length < 2 || nick.length > 8) {
      showError('fNickname', '昵称需要 2~8 个字');
      allPass = false;
    } else {
      clearError('fNickname');
    }

    if (food.value.trim() === '') {
      showError('fFood', '美食名称不能为空');
      allPass = false;
    } else {
      clearError('fFood');
    }

    if (reason.value.trim().length < 10) {
      showError('fReason', '推荐理由至少写 10 个字，让大家馋一下');
      allPass = false;
    } else {
      clearError('fReason');
    }

    const agreeError = document.getElementById('agreeError');
    if (agree.checked === false) {
      agreeError.style.display = 'block';
      allPass = false;
    } else {
      agreeError.style.display = 'none';
    }

    if (allPass === true) {
      const successBox = document.getElementById('successBox');
      successBox.className = 'success-box show';
      successBox.textContent = '🎉 投稿成功！感谢 ' + nick +
        ' 的分享，「' + food.value.trim() + '」已经记录下来啦。';
      form.reset();
    }
  });
}

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const row = input.parentElement;
  row.className = 'form-row invalid'; // CSS 让这一行变红
  const msg = row.querySelector('.error-msg');
  msg.textContent = message;
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  const row = input.parentElement;
  row.className = 'form-row';
}
function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) {
    return; 
  }

  window.addEventListener('scroll', function () {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > window.innerHeight) {
      btn.classList.add('show'); 
    } else {
      btn.classList.remove('show'); 
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo(0, 0);
  });
}
