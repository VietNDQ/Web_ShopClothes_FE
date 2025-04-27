const element = document.getElementById('your-element-id');
if (element) {
  element.style.display = 'block'; // Đảm bảo element không null trước khi truy cập style
} else {
  console.error("Element with ID 'your-element-id' not found.");
}
