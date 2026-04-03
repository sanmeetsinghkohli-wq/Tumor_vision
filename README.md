<p align="center">
  <img src="https://img.shields.io/badge/AI-Powered-blueviolet?style=for-the-badge&logo=azure-devops&logoColor=white" alt="AI Powered"/>
  <img src="https://img.shields.io/badge/Healthcare-Rural%20India-success?style=for-the-badge&logo=plus&logoColor=white" alt="Healthcare"/>
  <img src="https://img.shields.io/badge/Hosted%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render"/>
  <img src="https://img.shields.io/badge/Multilingual-Hindi%20%7C%20English%20%7C%20Marathi-orange?style=for-the-badge&logo=google-translate&logoColor=white" alt="Multilingual"/>
  <img src="https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge" alt="Status"/>
</p>

<h1 align="center">🧠 Tumor Vision</h1>

<p align="center">
  <b>AI-Powered Brain Tumor Detection — Assisting Radiologists Across Rural India</b><br/>
  <i>A multilingual diagnostic assistance tool for early tumor detection where expert access is limited.</i>
</p>

<p align="center">
  <a href="#-about">About</a> •
  <a href="#-features">Features</a> •
  <a href="#-problem-statement">Problem</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#️-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#️-deployment-render">Deployment</a> •
  <a href="#-future-roadmap">Roadmap</a>
</p>

---

## 📖 About

**Tumor Vision** is an **AI-assisted diagnostic tool** designed to support radiologists and healthcare professionals in the **early detection of brain tumors** — especially in rural and underserved regions of India where specialist access is limited.

> ⚠️ **Important:** Tumor Vision is **NOT** a replacement for professional medical diagnosis. It is a **suggestive assistance tool** that provides AI-generated insights to help radiologists make faster, more informed decisions. Final diagnosis must always be made by a qualified medical professional.

### Current Scope

🧠 **Brain Tumors** — The current version focuses exclusively on detecting and classifying brain tumors from MRI scans into four categories:

| Classification | Description |
|---|---|
| **Glioma** | Tumors originating from glial cells |
| **Meningioma** | Tumors arising from the meninges |
| **Pituitary Tumor** | Tumors of the pituitary gland |
| **No Tumor** | No tumor detected in the scan |

### Future Vision

🔬 In upcoming versions, Tumor Vision aims to expand beyond brain tumors to **detect tumors across the entire body** — making it a comprehensive, scalable tumor screening platform deployable across India.

---

## 📌 Problem Statement

Brain tumors account for **85–90%** of all primary Central Nervous System (CNS) tumors. Early and accurate detection is critical for patient survival. However:

- 🏥 **Rural India lacks specialist radiologists** — Many district hospitals have no neuro-radiologist on staff.
- ⏳ **Delayed diagnosis** — Patients in remote areas often wait weeks or months for expert interpretation.
- 💰 **Cost of consultation** — Specialist opinions are expensive and often inaccessible for rural populations.
- 🌐 **Language barriers** — Medical tools are predominantly in English, limiting usability for regional healthcare workers.

> *"In rural India, a patient with a brain tumor may never see a specialist — Tumor Vision aims to bridge that gap."*

---

## ✨ Features

### 🔐 Authentication & Access
| Feature | Description |
|---|---|
| **Google SSO Sign-In** | Radiologists sign in securely using their Google account (Single Sign-On) |
| **Role-Based Access** | Secure, authenticated access for verified healthcare professionals |

### 🌐 Multilingual Support
| Language | Status |
|---|---|
| 🇬🇧 **English** | ✅ Supported |
| 🇮🇳 **Hindi** (हिन्दी) | ✅ Supported |
| 🇮🇳 **Marathi** (मराठी) | ✅ Supported |

The entire interface — including labels, instructions, results, and generated reports — is available in all three languages, ensuring accessibility for healthcare workers across different regions of India.

### 🔬 AI-Powered Analysis
| Feature | Description |
|---|---|
| **MRI Scan Upload** | Upload brain MRI scans directly through the web interface |
| **AI Classification** | Multi-class tumor detection powered by Azure Custom Vision AI |
| **Confidence Scores** | Probability-based predictions with confidence percentages for each category |
| **Suggestive Diagnosis** | AI-generated diagnostic suggestions to assist — not replace — clinical judgement |

### 📄 Report Generation
| Feature | Description |
|---|---|
| **Automated PDF Reports** | Professional-grade diagnostic reports generated instantly |
| **Patient Information** | Name, age, gender, scan date, and referring physician |
| **Scan Preview** | Embedded MRI scan thumbnail within the report |
| **Classification Results** | Tumor type, confidence breakdown, and risk indicators |
| **Suggestive Recommendations** | AI-suggested next steps (further imaging, specialist referral, follow-up) |
| **Multilingual Reports** | Reports generated in the radiologist's selected language |
| **Disclaimer** | Clear AI-assistance disclaimer on every report |

### 📊 Metrics Dashboard
| Feature | Description |
|---|---|
| **Scan Analytics** | Overview of total scans processed, breakdown by tumor type |
| **Detection Trends** | Visual charts showing tumor detection patterns over time |
| **Confidence Distribution** | Analysis of AI confidence levels across predictions |
| **Regional Insights** | Aggregated, anonymized data to identify high-incidence areas |

---

## 🔄 How It Works

```
 ┌───────────────────────────────────────────────────────────────────────┐
 │                         TUMOR VISION WORKFLOW                        │
 └───────────────────────────────────────────────────────────────────────┘

  1. SIGN IN                2. UPLOAD                3. AI ANALYSIS
 ┌──────────────┐       ┌──────────────────┐      ┌──────────────────┐
 │ 🔐 Google    │ ────▶ │ 📤 Upload MRI    │ ───▶ │ 🤖 Azure Custom  │
 │    SSO       │       │    Scan +        │      │    Vision AI     │
 │    Login     │       │    Patient Info   │      │    Classifies    │
 └──────────────┘       └──────────────────┘      └────────┬─────────┘
                                                           │
                                                           ▼
  6. METRICS              5. DOWNLOAD              4. RESULTS
 ┌──────────────┐       ┌──────────────────┐      ┌──────────────────┐
 │ 📊 Dashboard │ ◀──── │ 📥 PDF Report    │ ◀─── │ 📋 Suggestive    │
 │    Updates   │       │    Download      │      │    Diagnosis +   │
 │    Analytics │       │    (Multilingual)│      │    Confidence    │
 └──────────────┘       └──────────────────┘      └──────────────────┘
```

### Step-by-Step

1. **Sign In** — Radiologist authenticates via Google SSO.
2. **Select Language** — Choose English, Hindi, or Marathi for the interface.
3. **Upload MRI Scan** — Upload the patient's brain MRI scan along with basic patient details.
4. **AI Analysis** — Azure Custom Vision AI analyzes the scan and returns a classification with confidence scores.
5. **Suggestive Diagnosis** — The system presents a suggestive diagnosis with recommended next steps (not a definitive diagnosis).
6. **Generate Report** — A detailed PDF report is generated in the selected language, ready for download or print.
7. **Metrics Update** — The scan results feed into the analytics dashboard for trend monitoring.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          TUMOR VISION                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────┐   ┌───────────────┐   ┌───────────────────────┐    │
│  │  Frontend   │──▶│  Backend API  │──▶│  Azure Custom Vision  │    │
│  │ HTML/CSS/JS │   │  Python Flask │   │  AI (Prediction API)  │    │
│  │ Multilingual│◀──│  / FastAPI    │◀──│                       │    │
│  └────────────┘   └───────┬───────┘   └───────────────────────┘    │
│        │                  │                                         │
│        │          ┌───────┴───────┐                                 │
│        │          │               │                                 │
│        │    ┌─────▼─────┐  ┌─────▼──────┐   ┌──────────────┐      │
│        │    │  Report    │  │  Metrics   │   │  Google      │      │
│        │    │  Engine    │  │  Engine    │   │  OAuth 2.0   │      │
│        │    │ (PDF Gen)  │  │ (Analytics)│   │  (SSO)       │      │
│        │    └───────────┘  └────────────┘   └──────────────┘      │
│        │                                                            │
│        └──────────────  Hosted on Render  ─────────────────────    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **AI / ML** | [Azure Custom Vision](https://azure.microsoft.com/en-us/services/cognitive-services/custom-vision-service/) | Image classification model training & prediction |
| **Backend** | Python (Flask / FastAPI) | REST API, image processing, report orchestration |
| **Authentication** | Google OAuth 2.0 (SSO) | Secure radiologist sign-in |
| **Report Generation** | ReportLab / FPDF + Jinja2 | Multilingual PDF diagnostic report creation |
| **Frontend** | HTML5, CSS3, JavaScript | Responsive, multilingual web interface |
| **Internationalization** | Flask-Babel / i18n | Hindi, English, and Marathi language support |
| **Cloud (AI)** | Microsoft Azure | Custom Vision model hosting & prediction endpoint |
| **Hosting** | [Render](https://render.com/) | Web service deployment, auto-deploy from GitHub |
| **Version Control** | Git & GitHub | Source code management |

### Why Azure Custom Vision?

- **No-code model training** — Train powerful image classifiers without writing ML code.
- **Easy retraining** — Upload new MRI datasets to continuously improve accuracy.
- **REST API prediction** — Simple HTTP calls to get classification results.
- **Scalable** — Handles requests from a single rural clinic to a state-wide screening program.
- **Cost-effective** — Free tier available for development and smaller deployments.

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.8+**
- **Azure Account** with Custom Vision resource created
- **Google Cloud Console** project with OAuth 2.0 credentials
- **pip** (Python package manager)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Tumor_vision.git
cd Tumor_vision
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Azure Custom Vision - Prediction
CUSTOM_VISION_PREDICTION_KEY=your_prediction_key_here
CUSTOM_VISION_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
CUSTOM_VISION_PROJECT_ID=your_project_id_here
CUSTOM_VISION_PUBLISH_NAME=your_iteration_name

# Google OAuth 2.0 (SSO)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Application Settings
FLASK_ENV=development
FLASK_DEBUG=1
SECRET_KEY=your_secret_key_here
DEFAULT_LANGUAGE=en
```

### 4. Run the Application

```bash
python app.py
```

The application will be available at `http://localhost:5000`

---

## ☁️ Deployment (Render)

Tumor Vision is deployed on **[Render](https://render.com/)** — a free, developer-friendly cloud platform with automatic deploys from GitHub.

### Why Render?

- 🆓 **Free tier** — Perfect for student projects and MVPs
- 🔄 **Auto-deploy** — Pushes to `main` branch automatically trigger a new deployment
- 🌍 **HTTPS included** — Free SSL certificates out of the box
- ⚡ **Zero DevOps** — No server configuration required
- 📊 **Built-in logging** — Monitor application logs directly from the dashboard

### Deploy via Render Dashboard

1. **Push your code** to a GitHub repository.
2. Go to [render.com](https://render.com/) and sign up / log in.
3. Click **"New +"** → **"Web Service"**.
4. **Connect your GitHub repo** (`Tumor_vision`).
5. Configure the service:

   | Setting | Value |
   |---|---|
   | **Name** | `tumor-vision` |
   | **Region** | Singapore (closest to India) |
   | **Branch** | `main` |
   | **Runtime** | `Python 3` |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `gunicorn app:app --bind 0.0.0.0:$PORT` |
   | **Plan** | `Free` |

6. Add **Environment Variables** (under the "Environment" tab):

   ```
   CUSTOM_VISION_PREDICTION_KEY=your_prediction_key_here
   CUSTOM_VISION_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
   CUSTOM_VISION_PROJECT_ID=your_project_id_here
   CUSTOM_VISION_PUBLISH_NAME=your_iteration_name
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   SECRET_KEY=your_secret_key_here
   DEFAULT_LANGUAGE=en
   ```

7. Click **"Create Web Service"** — Render will build and deploy automatically.

### Deploy via `render.yaml`

Add a `render.yaml` file to your project root for one-click deployment:

```yaml
# render.yaml
services:
  - type: web
    name: tumor-vision
    runtime: python
    region: singapore
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:app --bind 0.0.0.0:$PORT
    envVars:
      - key: CUSTOM_VISION_PREDICTION_KEY
        sync: false
      - key: CUSTOM_VISION_ENDPOINT
        sync: false
      - key: CUSTOM_VISION_PROJECT_ID
        sync: false
      - key: CUSTOM_VISION_PUBLISH_NAME
        sync: false
      - key: GOOGLE_CLIENT_ID
        sync: false
      - key: GOOGLE_CLIENT_SECRET
        sync: false
      - key: SECRET_KEY
        generateValue: true
      - key: PYTHON_VERSION
        value: 3.11.0
```

### 🔗 Live URL

Once deployed, your app will be available at:

```
https://tumor-vision.onrender.com
```

> **Note:** On the free tier, the service spins down after 15 minutes of inactivity. The first request after inactivity may take ~30 seconds to respond.

---

## 🧪 Model Training (Azure Custom Vision)

### Dataset Structure

Organize your MRI dataset into the following categories:

```
dataset/
├── glioma/          # Glioma tumor MRI scans
│   ├── img001.jpg
│   └── ...
├── meningioma/      # Meningioma tumor MRI scans
│   ├── img001.jpg
│   └── ...
├── pituitary/       # Pituitary tumor MRI scans
│   ├── img001.jpg
│   └── ...
└── no_tumor/        # Healthy brain MRI scans
    ├── img001.jpg
    └── ...
```

### Training Steps

1. **Create a Custom Vision project** at [customvision.ai](https://www.customvision.ai/).
2. **Select Classification** → **Multiclass (Single tag per image)**.
3. **Upload images** for each category (minimum 15 images per tag; 50+ recommended for better accuracy).
4. **Train the model** — use "Quick Training" for initial results or "Advanced Training" for higher accuracy.
5. **Publish the iteration** to get a prediction endpoint.
6. **Copy your Prediction Key, Endpoint, Project ID, and Published Name** into the `.env` file.

---

## 📄 Report Generation

The system generates comprehensive **multilingual PDF diagnostic reports** containing:

| Section | Details |
|---|---|
| **Header** | Clinic/hospital name, Tumor Vision branding, report ID, date & time |
| **Patient Information** | Name, age, gender, referring physician, scan date |
| **MRI Scan Preview** | Embedded thumbnail of the uploaded scan |
| **AI Analysis Results** | Predicted tumor type with confidence percentage |
| **Classification Breakdown** | Probability scores across all four categories |
| **Suggestive Diagnosis** | AI-suggested preliminary assessment (clearly marked as suggestive) |
| **Recommended Next Steps** | Further imaging, specialist referral, or follow-up suggestions |
| **Language** | Full report in English, Hindi, or Marathi as selected |
| **Disclaimer** | AI-assisted tool notice — final diagnosis by qualified professional only |

### Sample Report Preview

```
╔══════════════════════════════════════════════╗
║           🧠 TUMOR VISION REPORT             ║
║        AI-Assisted Diagnostic Analysis       ║
╠══════════════════════════════════════════════╣
║  Report ID: TV-2026-04-0342                  ║
║  Date: April 03, 2026  |  Language: English  ║
║──────────────────────────────────────────────║
║  PATIENT INFORMATION                         ║
║  Name: ___________  Age: __  Sex: __         ║
║  Referring Doctor: ___________               ║
║──────────────────────────────────────────────║
║  SCAN ANALYSIS                               ║
║  ┌─────────┐                                 ║
║  │  [MRI]  │  Classification: Glioma         ║
║  │  Scan   │  Confidence: 94.7%              ║
║  └─────────┘                                 ║
║──────────────────────────────────────────────║
║  CONFIDENCE BREAKDOWN                        ║
║  ██████████████████░░ Glioma       94.7%     ║
║  ██░░░░░░░░░░░░░░░░░ Meningioma    3.1%     ║
║  █░░░░░░░░░░░░░░░░░░ Pituitary     1.8%     ║
║  ░░░░░░░░░░░░░░░░░░░ No Tumor      0.4%     ║
║──────────────────────────────────────────────║
║  SUGGESTIVE DIAGNOSIS                        ║
║  Based on AI analysis, findings suggest      ║
║  possible Glioma. This is a SUGGESTIVE       ║
║  assessment only.                            ║
║──────────────────────────────────────────────║
║  RECOMMENDED NEXT STEPS                      ║
║  • Specialist neuro-radiology consultation   ║
║  • Consider contrast-enhanced MRI            ║
║  • Biopsy may be recommended                 ║
║──────────────────────────────────────────────║
║  ⚠ DISCLAIMER: This is an AI-assisted       ║
║  suggestive analysis. It does NOT constitute ║
║  a medical diagnosis. Consult a qualified    ║
║  medical professional for final assessment.  ║
╚══════════════════════════════════════════════╝
```

---

## 📡 API Reference

### Authentication

#### `GET /auth/google`
Initiates Google SSO login flow.

#### `GET /auth/google/callback`
Handles the Google OAuth 2.0 callback after authentication.

#### `POST /auth/logout`
Logs out the current radiologist session.

---

### Prediction

#### `POST /predict`

Upload an MRI scan image for tumor classification.

**Headers:**
```
Authorization: Bearer <session_token>
Accept-Language: en | hi | mr
```

**Request:**
```bash
curl -X POST https://tumor-vision.onrender.com/predict \
  -H "Authorization: Bearer <token>" \
  -F "image=@brain_mri.jpg" \
  -F "patient_name=Patient Name" \
  -F "patient_age=45" \
  -F "patient_gender=Male" \
  -F "language=en"
```

**Response:**
```json
{
  "success": true,
  "prediction": {
    "tumor_type": "Glioma",
    "confidence": 0.947,
    "suggestive_diagnosis": "Findings suggest possible Glioma. Specialist consultation recommended.",
    "all_predictions": [
      { "tag": "Glioma", "probability": 0.947 },
      { "tag": "Meningioma", "probability": 0.031 },
      { "tag": "Pituitary", "probability": 0.018 },
      { "tag": "No Tumor", "probability": 0.004 }
    ]
  },
  "report_url": "/reports/TV-2026-04-0342.pdf"
}
```

---

### Reports

#### `GET /reports/<report_id>.pdf`
Download a previously generated diagnostic report.

---

### Metrics

#### `GET /metrics`
Returns aggregated scan analytics for the metrics dashboard.

**Response:**
```json
{
  "total_scans": 1247,
  "breakdown": {
    "glioma": 312,
    "meningioma": 198,
    "pituitary": 156,
    "no_tumor": 581
  },
  "avg_confidence": 0.891,
  "scans_this_month": 87
}
```

---

## 📁 Project Structure

```
Tumor_vision/
├── app.py                     # Main application entry point
├── requirements.txt           # Python dependencies
├── render.yaml                # Render deployment config
├── .env                       # Environment variables (not committed)
├── .gitignore                 # Git ignore rules
├── README.md                  # Project documentation
│
├── static/                    # Frontend assets
│   ├── css/
│   │   └── style.css          # Application styles
│   ├── js/
│   │   └── main.js            # Frontend logic & language switching
│   └── images/
│       └── logo.png           # Application logo
│
├── templates/                 # HTML templates
│   ├── index.html             # Landing / sign-in page
│   ├── upload.html            # MRI scan upload page
│   ├── result.html            # Results & suggestive diagnosis page
│   └── metrics.html           # Analytics dashboard page
│
├── translations/              # Multilingual support
│   ├── en/                    # English translations
│   ├── hi/                    # Hindi translations
│   └── mr/                    # Marathi translations
│
├── services/                  # Backend services
│   ├── auth.py                # Google OAuth 2.0 SSO logic
│   ├── custom_vision.py       # Azure Custom Vision API integration
│   ├── report_generator.py    # Multilingual PDF report generation
│   └── metrics.py             # Scan analytics & metrics engine
│
├── reports/                   # Generated PDF reports (gitignored)
│   └── ...
│
├── dataset/                   # Training dataset (gitignored)
│   ├── glioma/
│   ├── meningioma/
│   ├── pituitary/
│   └── no_tumor/
│
└── tests/                     # Unit tests
    ├── test_auth.py
    ├── test_prediction.py
    ├── test_report.py
    └── test_metrics.py
```

---

## 🌍 Impact & Vision

### Who Does This Help?

- 🏥 **Rural hospitals & clinics** across India without dedicated neuro-radiologists
- 👨‍⚕️ **Radiologists** who need AI-powered second opinions for faster, more confident reporting
- 🌏 **Underserved regions** where specialist-to-patient ratios are critically low
- 🚑 **Emergency departments** where rapid preliminary assessment can save lives
- 🗣️ **Regional healthcare workers** who are more comfortable in Hindi or Marathi

### Why Tumor Vision Matters

| Metric | India's Reality |
|---|---|
| **Radiologists per million** | ~1 radiologist per 100,000 people in rural areas |
| **Brain tumor cases/year** | ~28,000+ new cases annually |
| **Average diagnosis delay** | Weeks to months in rural settings |
| **Language barrier** | 57% of India's population does not speak English |

Tumor Vision directly addresses each of these challenges.

---

## 🛣️ Future Roadmap

### Short-Term
- [ ] Improve model accuracy with larger, diverse Indian MRI datasets
- [ ] Add more regional languages (Tamil, Telugu, Bengali, Kannada)
- [ ] Offline mode with lightweight on-device ML model for zero-connectivity areas

### Medium-Term
- [ ] 🫁 **Lung tumor detection** — Expand to chest CT scans
- [ ] 🩻 **Bone tumor detection** — Support for X-ray and CT analysis
- [ ] 🔬 **Liver & abdominal tumors** — Expand to abdominal imaging
- [ ] Telemedicine integration for remote specialist consultation

### Long-Term Vision
- [ ] 🏥 **Full-body tumor screening platform** — Detect tumors across the entire body
- [ ] 📡 **Pan-India deployment** — Scalable infrastructure for state-wide screening programs
- [ ] 🏛️ **Government integration** — Partner with Ayushman Bharat and NHM for rural health missions
- [ ] DICOM file format support for direct hospital PACS integration
- [ ] SMS/WhatsApp report delivery for ultra-low-connectivity areas
- [ ] Batch processing for mass screening camps

---

## ⚠️ Disclaimer

> **Tumor Vision is an AI-assisted suggestive diagnostic tool and is NOT a substitute for professional medical diagnosis.**
>
> All results generated by this tool are **suggestive in nature** and must be reviewed and confirmed by a qualified medical professional. This tool is designed to **assist radiologists** in regions with limited specialist access — it does not provide definitive diagnoses.
>
> The developers and contributors are not liable for clinical decisions made based on the output of this system.

---

## 🤝 Contributing

Contributions are welcome! Whether it's improving the AI model accuracy, adding new languages, enhancing the UI, or adding new tumor types — every contribution helps improve healthcare access.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📬 Contact

For questions, collaboration, or feedback:

- **GitHub Issues**: [Open an issue](https://github.com/yourusername/Tumor_vision/issues)

---

<p align="center">
  <b>Built with ❤️ to make healthcare accessible for every Indian, everywhere.</b><br/>
  <i>Because no one should be denied early detection due to geography or language.</i>
</p>