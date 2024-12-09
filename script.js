const messages = [
  "Nhớ nhớ nhớ em!",
  "Anh không thể quên được em!",
  "Chỉ muốn nói rằng anh yêu em!",
  "Cuộc sống này thật đẹp khi có em!",
];

const MAX_NOTIFICATIONS = 100; // Tăng số lượng thông báo tối đa hiển thị đồng thời trên màn hình
let notificationCount = 0; // Số lượng thông báo hiện có

// Hàm phát nhạc
function playMusic() {
  const music = document.getElementById("backgroundMusic");
  if (music.paused) {
    music.loop = true; // Đảm bảo nhạc phát liên tục
    music.play(); // Phát nhạc nếu chưa phát
  }
}

// Hàm dừng nhạc
function stopMusic() {
  const music = document.getElementById("backgroundMusic");
  if (music.played.length > 0 && notificationCount === 0) {
    music.pause(); // Dừng nhạc khi không còn thông báo
  }
}

// Hàm tạo thông báo ngẫu nhiên
function generateRandomNotifications() {
  playMusic(); // Phát nhạc khi nhấn nút

  const notificationLimit = 2000; // Tăng số lượng thông báo tạo ra mỗi lần nhấn nút

  for (let i = 0; i < notificationLimit; i++) {
    setTimeout(() => {
      const existingNotifications = document.querySelectorAll(".notification");

      // Kiểm tra và xóa thông báo nếu đã vượt quá giới hạn
      if (existingNotifications.length >= MAX_NOTIFICATIONS) {
        existingNotifications[0].remove();
      }

      const notification = document.createElement("div");
      notification.className = "notification";

      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      notification.innerHTML = `  
        <div class="notification-header">
          <button class="minimize-btn" onclick="minimizeNotification(this)">–</button>
          <span>Tràn ngập bộ nhớ</span>
        </div>
        <p>${randomMessage}</p>
      `;

      // Cập nhật vị trí ngẫu nhiên cho thông báo
      const x = Math.random() * (window.innerWidth - 240);
      const y = Math.random() * (window.innerHeight - 160);
      notification.style.left = `${x}px`;
      notification.style.top = `${y}px`;

      // Thêm hiệu ứng cho thông báo
      notification.classList.add("fade-in");
      document.body.appendChild(notification);

      // Tăng số lượng thông báo lên
      notificationCount++;

      // Tự động xóa thông báo sau 5 giây và giảm số lượng thông báo
      setTimeout(() => {
        notification.classList.add("fade-out");
        notification.addEventListener("animationend", () => {
          notification.remove();
          notificationCount--;
          stopMusic(); // Dừng nhạc khi không còn thông báo
        });
      }, 5000);
    }, i * 200);
  }
}

// Hàm thu nhỏ thông báo
function minimizeNotification(button) {
  const notification = button.closest(".notification");
  notification.classList.add("fade-out");
  notification.addEventListener("animationend", () => {
    notification.remove();
    notificationCount--;
    stopMusic(); // Dừng nhạc khi không còn thông báo
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const encodedText =
    "&#68;&#101;&#115;&#105;&#103;&#110;&#32;&#98;&#121;&#32;&#80;&#97;&#110;&#98;&#97;&#112;";
  const footer = document.createElement("a");
  footer.innerHTML = encodedText;
  footer.href = "#";
  document.body.appendChild(footer);
});
