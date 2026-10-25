// ========== 美食分享网页 · 脚本说明 ==========
// 这个页面有三个交互，全部从最下面的 DOMContentLoaded 开始按顺序执行：
//   1. 选项卡切换（清单页 foods.html）
//   2. 表单校验（投稿页 share.html）
//   3. 返回顶部（三个页面都有）
// 每个功能一个函数，互不干扰。

// ---------- 入口：页面加载完再开始 ----------
// 必须等 HTML 都画出来了，JS 才能找到那些元素，所以要等 DOMContentLoaded。
document.addEventListener('DOMContentLoaded', function () {
  initTabs();
  initShareForm();
  initBackTop();
});

// ---------- 交互 1：选项卡 ----------
// 思路：三个面板都写在 HTML 里，点哪个按钮就把哪个面板显示出来，
// 其余的隐藏。按钮的 data-tab 属性里存着对应面板的 id。
// "active" 这个类名决定显示还是隐藏（CSS 里写好了）。

function initTabs() {
  const tabsBox = document.getElementById('foodTabs');
  if (!tabsBox) {
    return; // 只有清单页有选项卡，其他页面直接跳过
  }

  const buttons = tabsBox.querySelectorAll('button');
  const panels = document.querySelectorAll('.tab-panel');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      // 第一步：拿到我点的按钮对应的面板 id
      const tabId = this.getAttribute('data-tab');

      // 第二步：把所有按钮和面板全部熄灭
      for (let j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
      }
      for (let j = 0; j < panels.length; j++) {
        panels[j].classList.remove('active');
        panels[j].hidden = true;
      }

      // 第三步：点亮我点的这个按钮和对应的面板
      this.classList.add('active');
      const target = document.getElementById(tabId);
      target.classList.add('active');
      target.hidden = false;
    });
  }
}

// ---------- 交互 2：表单校验 ----------
// 思路：正常情况下点提交浏览器会直接刷新页面。
// 我们用 preventDefault 把它拦下来，自己一项一项检查：
// 有错的就在那行下面显示红字，全部通过才显示成功框。

function initShareForm() {
  const form = document.getElementById('shareForm');
  if (!form) {
    return; // 只有投稿页有表单
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // 拦下来自己检查

    const nickname = document.getElementById('fNickname');
    const food = document.getElementById('fFood');
    const reason = document.getElementById('fReason');
    const agree = document.getElementById('fAgree');
    let allPass = true; // 假设全部通过，查出问题就改成 false

    // 检查 1：昵称去掉前后空格后要 2~8 个字
    const nick = nickname.value.trim();
    if (nick.length < 2 || nick.length > 8) {
      showError('fNickname', '昵称需要 2~8 个字');
      allPass = false;
    } else {
      clearError('fNickname');
    }

    // 检查 2：美食名称不能为空
    if (food.value.trim() === '') {
      showError('fFood', '美食名称不能为空');
      allPass = false;
    } else {
      clearError('fFood');
    }

    // 检查 3：推荐理由至少 10 个字
    if (reason.value.trim().length < 10) {
      showError('fReason', '推荐理由至少写 10 个字，让大家馋一下');
      allPass = false;
    } else {
      clearError('fReason');
    }

    // 检查 4：必须勾选"亲自吃过"
    const agreeError = document.getElementById('agreeError');
    if (agree.checked === false) {
      agreeError.style.display = 'block';
      allPass = false;
    } else {
      agreeError.style.display = 'none';
    }

    // 四项全过，才显示成功框，并把表单清空
    if (allPass === true) {
      const successBox = document.getElementById('successBox');
      successBox.className = 'success-box show';
      successBox.textContent = '🎉 投稿成功！感谢 ' + nick +
        ' 的分享，「' + food.value.trim() + '」已经记录下来啦。';
      form.reset();
    }
  });
}

// 在某个输入框所在的那一行显示红字提示。
// 输入框的父元素就是 .form-row，红字提示 p 标签就在它里面。
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const row = input.parentElement;
  row.className = 'form-row invalid'; // CSS 让这一行变红
  const msg = row.querySelector('.error-msg');
  msg.textContent = message;
}

// 把某一行的红字提示去掉
function clearError(inputId) {
  const input = document.getElementById(inputId);
  const row = input.parentElement;
  row.className = 'form-row'; // 恢复正常样式
}

// ---------- 交互 3：返回顶部 ----------
// 思路：一直监听页面滚动，往下滑超过一整屏就给按钮加 show 类
// （CSS 让它显示出来），点按钮就用 scrollTo 回到最上面。

function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) {
    return; // 有的页面没有这个按钮
  }

  window.addEventListener('scroll', function () {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > window.innerHeight) {
      btn.classList.add('show'); // 滑过一整屏，出现
    } else {
      btn.classList.remove('show'); // 还在最上面附近，隐藏
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo(0, 0);
  });
}
