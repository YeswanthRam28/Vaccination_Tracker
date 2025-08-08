document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reminderForm');
  const status = document.getElementById('reminderStatus');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('reminderName').value;
    const dueDate = document.getElementById('reminderDate').value;
    const phone = document.getElementById('reminderPhone').value;

    try {
      const response = await fetch('http://localhost:3000/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dueDate, phone })
      });

      const data = await response.json();

      if (data.success) {
        status.innerText = '✅ Reminder saved and SMS sent!';
        status.style.color = 'green';
        form.reset();
      } else {
        status.innerText = '❌ Failed to send SMS: ' + (data.error || 'Unknown error');
        status.style.color = 'red';
      }
    } catch (err) {
      console.error(err);
      status.innerText = '⚠️ Error sending request.';
      status.style.color = 'red';
    }
  });
});
