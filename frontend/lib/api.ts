const rawBase = (process.env.NEXT_PUBLIC_API_URL || '').trim();
let API_BASE_URL: string = (/^https?:\/\//i.test(rawBase) ? rawBase : '') || 'https://tumor-vision-api.onrender.com';

if (typeof window !== 'undefined') {
  const onLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  if (!onLocalhost && /localhost|127\.0\.0\.1/.test(API_BASE_URL)) {
    API_BASE_URL = 'https://tumor-vision-api.onrender.com';
  }
}

const corsMode: RequestMode = 'cors';

export interface Prediction {
  tagName: string;
  probability: number;
}

export interface PredictionResponse {
  status: string;
  image?: string;
  image_url?: string;
  predictions?: Prediction[];
  message?: string;
}

export interface ReviewData {
  patient_name: string;
  patient_age: number;
  patient_number: string;
  patient_gender?: string;
  patient_email?: string;
  comments: string;
  diagnosis: string;
  tumor_type?: string;
  confidence?: number;
}

export interface TreatmentOption {
  name: string;
  type: string;
  success_rate: number;
  duration: string;
  description: string;
  side_effects: string[];
  cost_estimate: string;
  recovery_time: string;
  survival_rates: { '1_year': number; '3_year': number; '5_year': number };
  recommended_for: string[];
  procedure_steps: string[];
  suitability_score?: number;
  personalized_notes?: string[];
}

export interface TreatmentResponse {
  success: boolean;
  tumor_type: string;
  severity: string;
  urgency: string;
  patient_age: number;
  ai_confidence: number;
  recommendations: TreatmentOption[];
  disclaimer: string;
}

export async function pingBackend(): Promise<{ status: string; message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/ping`, { mode: corsMode });
  if (!response.ok) throw new Error('Backend responded with error');
  return response.json();
}

export async function uploadAndPredict(file: File): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append('image', file);
  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: 'POST',
    mode: corsMode,
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Upload failed' }));
    throw new Error(error.message || 'Failed to upload image');
  }
  return response.json();
}

export async function submitReview(data: ReviewData): Promise<{ success: boolean; message: string; errors?: { [key: string]: string } }> {
  const response = await fetch(`${API_BASE_URL}/api/review`, {
    method: 'POST',
    mode: corsMode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.errors ? 'Validation errors' : result.message || 'Failed to submit review');
  return result;
}

export async function downloadReport(reviewData?: ReviewData, predictions?: Prediction[], image?: string, image_url?: string): Promise<void> {
  const requestBody: any = {};
  const storedResult = typeof window !== 'undefined' ? localStorage.getItem('latestResult') : null;
  if (storedResult) {
    const resultData = JSON.parse(storedResult);
    requestBody.image = image || resultData.image;
    requestBody.predictions = predictions || resultData.predictions;
    requestBody.image_url = image_url || resultData.image_url;
  } else if (image && predictions) {
    requestBody.image = image;
    requestBody.predictions = predictions;
    requestBody.image_url = image_url;
  }
  if (reviewData) requestBody.feedback = reviewData;

  const postViaForm = () => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${API_BASE_URL}/api/download_report`;
    form.target = '_blank';
    form.style.display = 'none';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'payload';
    input.value = JSON.stringify(requestBody);
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/download_report`, {
      method: 'POST',
      mode: corsMode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) { postViaForm(); return; }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TumorVision_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch {
    postViaForm();
  }
}

export async function getTreatmentRecommendation(params: { tumor_type: string; patient_age: number; confidence: number }): Promise<TreatmentResponse> {
  const response = await fetch(`${API_BASE_URL}/api/treatment_recommendation`, {
    method: 'POST',
    mode: corsMode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: 'Failed' }));
    throw new Error(err.message || 'Failed to get recommendations');
  }
  return response.json();
}

export async function downloadTreatmentSummary(params: { tumor_type: string; patient_age: number; confidence: number; recommendations: TreatmentOption[] }): Promise<void> {
  const postViaForm = () => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${API_BASE_URL}/api/download_treatment_summary`;
    form.target = '_blank';
    form.style.display = 'none';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'payload';
    input.value = JSON.stringify(params);
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/download_treatment_summary`, {
      method: 'POST',
      mode: corsMode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!response.ok) { postViaForm(); return; }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Treatment_Summary_${new Date().toISOString().slice(0, 10)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch {
    postViaForm();
  }
}

export function getStaticUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
