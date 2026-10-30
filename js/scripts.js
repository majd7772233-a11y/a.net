function doLogi() {
        var speedSelect = document.getElementById("speed");
        var selectedValue = speedSelect.value;
        
        var selectedSpeed = speedSelect.options[speedSelect.selectedIndex].text;
        localStorage.setItem("selectedSpeed", selectedSpeed);
        checkSpeed(selectedValue);
    }
    
    function checkSpeed(speed) {
        if (speed === "1024K/4096k") {
            swal({
                title: "ملاحظة !",
                text: "اختيار سرعة عالية قد يستهلك البيانات بشكل أسرع!",
                iicon: "warning",
                button: "فهمت",
            });
        } else if (speed === "256K/1024k") {
            swal({
                title: "ملاحظة !",
                text: "هذه السرعة مفيده لك فقط في حال كنت تهتم لإستهلاك القليل من البيانات أثناء  الاستخدام وتُأخِر من نفاذ الرصيد بسرعة ولكنها ضعيفة نوعا ما",
                iicon: "info",
                button: "حسنًا",
            });
        }else if (speed === "64M/64M") {
            swal({
                title: "ملاحظة !",
                text: "هذه السرعة سريعة جداً وقد تستهلك رصيدك بشكل سريع جداً ولكنها مفيدة لك اذا اردت تنزيل الملفات بسرعة في وقت قليل ツ",
                iicon: "info",
                button: "حسنًا",
            });
        }
    }
   document.getElementById('remember').addEventListener('change', function() {
      localStorage.setItem('autoUpdateSetting', this.checked);
    let message = this.checked 
        ? 'تفعيل هذه الخدمة قد يوقف الإنترنت بشكل عام على تطبيق سوق بلاي وكذلك قد يوقف تحديثات الويندوز إذا كنت تستخدم كمبيوتر، كما ستتوقف جميع برامج المزامنة مثل الصور وغيرها وذلك لضمان عدم انتهاء رصيدك بسرعة ツ'
        : 'لقد قمت الان بتفعيل تحديثات الجهاز وتطبيقات المزامنة، وهذا سيؤدي إلى نفاذ رصيدك بسرعة، ولكن لك حرية الاختيار ツ';
    swal({
        title: 'عزيزنا المستخدم الجميل',
        text: message,
        iicon: 'warning',
        button: 'فهمت'
    });
});
window.onload = function() {
    var savedSetting = localStorage.getItem('autoUpdateSetting');
    if (savedSetting !== null) {
        document.getElementById('remember').checked = (savedSetting === 'true');
    }
}; 
function checkSaturday() {
    let today = new Date();
    let day = today.getDay();

    if (day === 5) { 
        swal({
            title: "جمعتك مباركة ツ", 
            text: "لاتنسى الصلاة على رسول الله 🤍", 
            icon: "warning",
            buttons: false, 
            closeOnClickOutside: true, 
            className: "transparent-popup"
        });
    }
}
checkSaturday();
var speedSelect = document.getElementById('speed');
var speedStatus = document.getElementById('speedStatus');
window.onload = function() {
    var savedSpeed = localStorage.getItem('selectedSpeed');
    if (savedSpeed) {
        speedSelect.value = savedSpeed;
        updateSpeedStatus(savedSpeed);
    }
};
function updateSpeedStatus(speed) {
    var selectedOption = speedSelect.querySelector(`option[value="${speed}"]`);
    if (selectedOption) {
        speedStatus.innerText = " " + selectedOption.text;}
}
speedSelect.addEventListener('change', function() {
    var selectedSpeed = speedSelect.value;
    localStorage.setItem('selectedSpeed', selectedSpeed);
    updateSpeedStatus(selectedSpeed);
});
        speedSelect.addEventListener('change', function() {
            var selectedSpeed = speedSelect.options[speedSelect.selectedIndex].text;
            speedStatus.innerText = " " + selectedSpeed;
            localStorage.setItem('selectedSpeed', speedSelect.value);
        });
var rememberToggle = document.getElementById('remember');
var label = document.querySelector('label[for="remember"]');
var updateStatus = document.getElementById('updateStatus');
window.onload = function () {
    var savedState = localStorage.getItem('autoUpdateState');
    if (savedState !== null) {
        rememberToggle.checked = (savedState === 'true'); 
    }
    updateStatusText();
};
function updateStatusText() {
    updateStatus.innerText = rememberToggle.checked ? label.dataset.on : label.dataset.off;
}
rememberToggle.addEventListener('change', function () {
  
    localStorage.setItem('autoUpdateState', rememberToggle.checked);   
    updateStatusText();
}); 
function swal(options) {
    let overlay = document.createElement("div");
    overlay.className = "swal-overlay";
    
    let box = document.createElement("div");
    box.className = "swal-box";
    
    let title = document.createElement("div");
    title.className = "swal-title";
    title.innerText = options.title || "تنبيه";
    
    let text = document.createElement("div");
    text.className = "swal-text";
    text.innerText = options.text || "";

    let buttonsContainer = document.createElement("div");
    buttonsContainer.style.marginTop = "15px";

    let confirmButton = document.createElement("button");
    confirmButton.className = "swal-button";
    confirmButton.innerText = options.confirmText || "فهمت";
    confirmButton.onclick = function() {
        document.body.removeChild(overlay);
        if (options.onConfirm) options.onConfirm();
   hideLoadingIndicator(); };

    buttonsContainer.appendChild(confirmButton);

    if (options.reportText) {
    //    let reportButton = document.createElement("button");
    //   reportButton.className = "swal-button";
    //    reportButton.innerText = options.reportText;
    //   reportButton.style.marginLeft = "10px";
    //    reportButton.onclick = function() {
    //        document.body.removeChild(overlay);
    //        if (options.onReport) options.onReport();
    //    };
    //    buttonsContainer.appendChild(reportButton);
    }

    box.appendChild(title);
    box.appendChild(text);
    box.appendChild(buttonsContainer);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // إغلاق النافذة عند الضغط خارجها
    overlay.onclick = function(event) {
        if (event.target === overlay) {
            document.body.removeChild(overlay);
        }
    };
}
let loadingTexts = [
  
  "جارٍ معالجة المعلومات...",
  "جارِ التحقق من الكرت..."
];
let loadingInterval;

function showLoadingIndicator() {
  const loader = document.getElementById("loadingIndicator");
  loader.classList.add("show");
  loader.style.display = "block";

  let textIndex = 0;
  const loadingText = document.getElementById("loadingText");
  loadingText.innerText = loadingTexts[textIndex];

  loadingInterval = setInterval(() => {
    textIndex = (textIndex + 1) % loadingTexts.length;
    loadingText.innerText = loadingTexts[textIndex];
  }, 2500);
}

function hideLoadingIndicator() {
  clearInterval(loadingInterval);
  const loader = document.getElementById("loadingIndicator");
  loader.classList.remove("show");
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
}
const box = document.querySelector('.box');

box.addEventListener('click', () => {
  box.style.animationPlayState = 'paused';

  setTimeout(() => {
    box.style.animationPlayState = 'running';
  }, 1500);
});
const checkbox = document.getElementById("remember");
  const select = document.getElementById("remember-select");
  const statusText = document.getElementById("updateStatus");

function updateStatusText() {
  if (checkbox.checked) {
    statusText.textContent = "معطله";
  } else {
    statusText.textContent = "مفعله";
  }
}

  function saveToLocalStorage() {
    localStorage.setItem("updatesDisabled", checkbox.checked ? "1" : "0");
  }


  select.addEventListener("change", () => {
    checkbox.checked = select.value === "choose-auto-update-off";
    updateStatusText();
    saveToLocalStorage();
  });

  
  checkbox.addEventListener("change", () => {
    updateStatusText();
    saveToLocalStorage();
  });
  
  window.addEventListener("DOMContentLoaded", () => {
    const savedStatus = localStorage.getItem("updatesDisabled");
    if (savedStatus === "1") {
      checkbox.checked = true;
    } else if (savedStatus === "0") {
      checkbox.checked = false;
    }
    updateStatusText();
  });
