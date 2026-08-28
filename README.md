# ⚡ Mini App — CI/CD Learning Project

A simple **Frontend + Backend** project to practice **GitHub Actions CI/CD pipelines**.

---

## 📁 Project Structure

```
mini/
├── backend/
│   ├── index.js          # Express server
│   ├── index.test.js     # Jest + Supertest tests
│   └── package.json
├── frontend/
│   ├── index.html        # UI
│   ├── style.css         # Styling
│   └── app.js            # API calls
└── README.md
```

---

## 🚀 Run Locally

### Backend
```bash
cd backend
npm install
npm start          # runs on http://localhost:5000
```

### Run Tests
```bash
cd backend
npm test
```

### Frontend
Just open `frontend/index.html` in a browser (while backend is running).

---

## 🔗 API Endpoints

| Method | Route         | Description        |
|--------|---------------|--------------------|
| GET    | `/health`     | Health check       |
| GET    | `/`           | Welcome message    |
| GET    | `/api/users`  | Get all users      |
| POST   | `/api/users`  | Add a new user     |

---

## 🔄 CI/CD

> You will write the GitHub Actions workflow yourself!

**Hints for your pipeline:**
- Trigger on `push` and `pull_request` to `main`
- Install deps: `npm install`
- Run tests: `npm test`
- (Optional) Deploy frontend to GitHub Pages
- (Optional) Deploy backend to Render / Railway

Good luck! 🎯
