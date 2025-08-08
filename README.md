
# 🛡️ HealthSafe+ – Community Vaccination Tracking System

**HealthSafe+** is a lightweight platform for tracking and visualizing vaccination coverage in communities. It collects anonymous data, provides insights by location and dose, and sends SMS reminders for upcoming vaccines using Twilio.

---

## 📌 Features

- ✅ Submit and store vaccination data (vaccine type, dose, area)
- 📊 Visualize vaccination coverage by:
  - Vaccine type
  - Dose number
  - Geographic area
- 🧭 Track official vaccination stats (via CoWIN API)
- 🔔 Send SMS reminders for upcoming vaccinations using Twilio
- 💬 Fully interactive frontend (HTML/CSS/JS)

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Storage:** JSON files (`data.json`, `reminders.json`)
- **API Integration:** [CoWIN Public API](https://apisetu.gov.in/public/marketplace/api/cowin)
- **SMS Service:** [Twilio](https://www.twilio.com/)

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YeswanthRam28/healthsafe-plus.git
cd healthsafe-plus
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Twilio

Create a `.env` file in the project root:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```

> ⚠️ Use your actual credentials from [https://console.twilio.com/](https://console.twilio.com/)

### 4. Start the server

```bash
node server.js
```

Open your browser and go to:

```
http://localhost:3000
```

---

## 📤 Submit Vaccination Data

Fill out the vaccination form to submit data anonymously. It will be stored in `data.json`.

---

## 📈 View Statistics

The dashboard shows:

- Doughnut chart of doses (1st, 2nd, booster)
- Bar chart of vaccine types
- Area-wise coverage breakdown
- Live total doses from CoWIN API

---

## 📱 Send SMS Reminders

In the **Reminders** section:

1. Enter **Name**, **Due Date**, and **Phone Number**
2. Click **Send Reminder**
3. The data is saved to `reminders.json` and an SMS is sent via Twilio

> Works on both local and hosted environments. Only verified numbers on Twilio trial.

---

## 📁 Project Structure

```
├── server.js               # Node.js backend
├── index.html              # Main frontend
├── reminder.js             # JS for reminder form
├── style.css               # CSS styles
├── data.json               # Stores vaccination submissions
├── reminders.json          # Stores reminder entries
├── .env                    # Twilio credentials (not committed)
```

---

## 💡 Future Ideas

- Risk simulation based on coverage gaps
- Admin dashboard with secure login
- Email reminders
- Interactive maps

---

## 👩‍⚕️ Made For

Health workers, schools, NGOs, and small communities needing a simple way to monitor and encourage vaccine coverage.

---

## 📬 Contact

For support or suggestions:

📧 yeswanthram.2007@gmail.com  
