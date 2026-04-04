'use client';

import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { GlowCard } from '@/components/ui/spotlight-card';
import { useState } from 'react';

const sections = [
  {
    id: 'pcnsl',
    icon: '🧬',
    title: 'Primary CNS Lymphoma',
    color: 'blue' as const,
    summary: 'A rare but aggressive form of non-Hodgkin lymphoma arising within the brain, spinal cord, or eyes.',
    cards: [
      {
        heading: 'What is PCNSL?',
        content: 'Primary CNS Lymphoma accounts for approximately 2-3% of all primary brain tumors and about 1% of all non-Hodgkin lymphomas. Over 90% of cases are diffuse large B-cell lymphomas (DLBCL). It originates within the central nervous system itself, unlike secondary CNS involvement by systemic lymphoma.',
      },
      {
        heading: 'Biology & Risk Factors',
        content: 'Mutations in genes such as MYD88 and CD79B affect NF-kB and B-cell receptor signaling pathways. The unique CNS microenvironment with immune privilege and blood-brain barrier influences tumor biology. Major risk factors include HIV/AIDS, organ transplants, and immunosuppressive therapy, though it also occurs in immunocompetent older adults.',
      },
      {
        heading: 'Clinical Presentation',
        content: 'Cognitive and behavioral changes including memory loss, confusion, personality changes, or psychosis. Focal neurological deficits such as weakness, sensory loss, aphasia, or visual disturbances. Ocular involvement (vitreoretinal lymphoma) presents with blurred vision, floaters, or vision loss.',
      },
      {
        heading: 'Diagnosis',
        content: 'MRI reveals homogeneously enhancing lesions in deep brain structures (periventricular regions, basal ganglia, corpus callosum). Restricted diffusion on DWI distinguishes it from gliomas. CSF analysis detects malignant lymphocytes or elevated IL-10. Definitive diagnosis requires stereotactic brain biopsy with immunohistochemistry (CD20, CD79a, PAX5).',
      },
      {
        heading: 'Treatment',
        content: 'High-dose methotrexate (HD-MTX) is the cornerstone, as it crosses the blood-brain barrier. Often combined with cytarabine, temozolomide, or rituximab. Whole-brain radiotherapy reserved for refractory/relapsed disease due to neurotoxicity. Autologous stem cell transplantation explored for consolidation. Novel therapies include ibrutinib (BTK inhibitor) and immunotherapies.',
      },
      {
        heading: 'Prognosis',
        content: 'Median survival with HD-MTX-based regimens: 3-5 years (vs <1 year with radiotherapy alone). Prognostic factors: age, performance status, tumor burden, and treatment response. Relapse is common within the CNS. Long-term survivors face neurocognitive deficits, requiring supportive care and rehabilitation.',
      },
    ],
  },
  {
    id: 'rare',
    icon: '🔬',
    title: 'Other Rare Brain Tumors',
    color: 'blue' as const,
    summary: 'Hemangioblastomas, choroid plexus tumors, germ cell tumors, and other unusual neoplasms.',
    cards: [
      {
        heading: 'Hemangioblastomas',
        content: 'Benign, highly vascular tumors in cerebellum, brainstem, or spinal cord (~2% of intracranial tumors). Strongly associated with Von Hippel-Lindau (VHL) disease. Composed of stromal cells and rich capillary network. MRI shows well-circumscribed, enhancing lesion with cyst formation. Surgical resection is usually curative.',
      },
      {
        heading: 'Choroid Plexus Tumors',
        content: 'Arise from choroid plexus epithelium that produces CSF. More common in children under age two. Papillomas (benign) vs carcinomas (malignant, aggressive). Present with hydrocephalus from CSF overproduction or obstruction. Complete surgical removal of papillomas is curative. Carcinomas require surgery + chemotherapy + radiation.',
      },
      {
        heading: 'Germ Cell Tumors',
        content: 'Most commonly in pineal and suprasellar regions. Include germinomas (most common, highly radiosensitive), teratomas, embryonal carcinomas, yolk sac tumors, and choriocarcinomas. Diagnosed via imaging + tumor markers (AFP, beta-hCG). Germinomas have excellent outcomes with radiation/chemo. Non-germinomatous types require aggressive multimodal therapy.',
      },
      {
        heading: 'Other Rare Types',
        content: 'Osteomas and chondromas: benign bone/cartilage tumors of skull base, often asymptomatic. Metastatic tumors to pituitary or pineal gland. Angiosarcomas (rare vascular tumors). Subependymomas (rare neuroepithelial tumors). Treatment varies widely: benign tumors curable with surgery, malignant types need multimodal approach.',
      },
    ],
  },
  {
    id: 'metastatic',
    icon: '🎯',
    title: 'Secondary (Metastatic) Brain Tumors',
    color: 'blue' as const,
    summary: 'The most common type of intracranial neoplasm, accounting for nearly 50% of all brain tumors.',
    cards: [
      {
        heading: 'How Metastasis Works',
        content: 'Cancer cells detach from primary tumor, invade blood vessels, and travel to the brain. The brain is a common destination due to rich vascular supply. Most common sources: lung cancer (~50%), breast cancer (especially HER2+ or triple-negative), melanoma (high propensity, multiple lesions), renal cell carcinoma, and colorectal cancer.',
      },
      {
        heading: 'Clinical Presentation',
        content: 'Headaches (increased intracranial pressure), seizures (up to 30% of patients), focal deficits (weakness, sensory loss, aphasia). Cognitive and personality changes with frontal lobe involvement. Often multiple lesions with rapid growth and significant edema. Located at gray-white matter junction reflecting blood vessel distribution.',
      },
      {
        heading: 'Diagnosis',
        content: 'MRI (gold standard): enhancing lesions surrounded by vasogenic edema. CT for emergency settings. PET helps identify unknown primary tumors. Molecular testing of primary tumor guides therapy (EGFR in lung, HER2 in breast, BRAF in melanoma). Biopsy may be needed for uncertain cases.',
      },
      {
        heading: 'Treatment Approaches',
        content: 'Surgery for solitary/accessible metastases when primary cancer controlled. Stereotactic radiosurgery (SRS) via Gamma Knife/CyberKnife for limited metastases. Targeted therapies: EGFR inhibitors, ALK inhibitors, HER2 agents, BRAF inhibitors. Immune checkpoint inhibitors (anti-PD-1, anti-CTLA-4) effective in melanoma and lung cancer brain metastases.',
      },
      {
        heading: 'Prognosis',
        content: 'Varies widely by primary cancer type, number of metastases, age, and molecular markers. Modern therapies have extended survival significantly: HER2+ breast cancer and EGFR-mutant lung cancer patients can live years. Graded Prognostic Assessment (GPA) scoring system guides decisions. Supportive care: corticosteroids, anticonvulsants, rehabilitation.',
      },
    ],
  },
  {
    id: 'grading',
    icon: '📊',
    title: 'Tumor Grading & Classification',
    color: 'blue' as const,
    summary: 'WHO classification system with Grades I-IV, integrating histopathology with molecular genetics.',
    cards: [
      {
        heading: 'WHO Grading System',
        content: 'Based on cellularity, mitotic activity, nuclear atypia, microvascular proliferation, and necrosis. Grade I: benign, slow-growing, often curable (pilocytic astrocytoma). Grade II: low-grade but infiltrative, may progress (diffuse astrocytoma). Grade III: malignant, increased mitotic activity (anaplastic astrocytoma). Grade IV: most aggressive, rapid growth (glioblastoma).',
      },
      {
        heading: 'Key Molecular Markers',
        content: 'IDH mutations: better prognosis in gliomas. 1p/19q co-deletion: defines oligodendrogliomas, predicts chemo/radiation response. MGMT promoter methylation: improved temozolomide response in glioblastoma. ATRX, TP53, TERT promoter mutations further refine classification. Medulloblastoma subgroups: WNT, SHH, Group 3, Group 4.',
      },
      {
        heading: 'Impact on Patient Care',
        content: 'Grade II astrocytoma: surgery + observation. Grade IV glioblastoma: aggressive multimodal therapy. Molecular markers guide drug choices (temozolomide for MGMT-methylated). WNT medulloblastomas have excellent survival vs poor outcomes for Group 3. Accurate classification ensures appropriate therapy and realistic expectations.',
      },
      {
        heading: 'Future Directions',
        content: 'Epigenetic profiling, transcriptomics, and proteomics revealing new complexity. Liquid biopsies analyzing circulating tumor DNA for non-invasive classification. AI and machine learning applied to imaging and pathology for automated classification. Integration of histology, molecular genetics, imaging, and clinical features into unified systems.',
      },
    ],
  },
  {
    id: 'symptoms',
    icon: '🩺',
    title: 'Symptoms & Clinical Presentations',
    color: 'blue' as const,
    summary: 'Brain tumor symptoms range from headaches and seizures to cognitive changes and endocrine disturbances.',
    cards: [
      {
        heading: 'Headaches',
        content: 'Worse in morning due to increased intracranial pressure during sleep. Exacerbated by coughing, sneezing, or bending. Persistent, progressive, resistant to usual analgesics. Particularly associated with tumors obstructing CSF flow (posterior fossa, ventricular system). While nonspecific, their characteristics raise clinical suspicion.',
      },
      {
        heading: 'Seizures',
        content: 'Especially common in low-grade gliomas and cortical tumors. Focal seizures affect one body part; generalized involve loss of consciousness. Can be first manifestation, particularly in younger patients. Temporal lobe: complex partial seizures with automatisms. Frontal lobe: motor seizures. Type provides clues to tumor location.',
      },
      {
        heading: 'Focal Neurological Deficits',
        content: 'Weakness/paralysis: motor cortex or corticospinal tracts. Sensory deficits: parietal lobe involvement. Aphasia: dominant hemisphere language areas (Broca/Wernicke). Visual disturbances: occipital lobe or optic nerve/chiasm compression. Cerebellar tumors: ataxia, dysmetria. Brainstem: cranial nerve palsies, swallowing difficulties.',
      },
      {
        heading: 'Cognitive & Personality Changes',
        content: 'Frontal lobe: apathy, disinhibition, impaired executive function. Memory loss, confusion, difficulty concentrating. Can be mistaken for psychiatric disorders, delaying diagnosis. In children: irritability, behavioral regression. In adults: subtle decline attributed to aging. Often overlooked but can be profound and life-altering.',
      },
      {
        heading: 'Endocrine Disturbances',
        content: 'Prolactinomas: galactorrhea, menstrual irregularities, sexual dysfunction. GH-secreting adenomas: acromegaly/gigantism. ACTH-secreting: Cushing disease (weight gain, hypertension, diabetes). Non-functioning adenomas: hypopituitarism. Craniopharyngiomas: growth failure, obesity, diabetes insipidus.',
      },
      {
        heading: 'Increased Intracranial Pressure',
        content: 'Headaches, nausea, vomiting, papilledema (optic disc swelling), altered consciousness. Hydrocephalus from CSF pathway obstruction (posterior fossa, pineal, intraventricular tumors). Severe cases can lead to herniation - a life-threatening emergency requiring immediate intervention.',
      },
    ],
  },
  {
    id: 'diagnosis',
    icon: '🖥️',
    title: 'Diagnosis & Imaging',
    color: 'blue' as const,
    summary: 'MRI, CT, PET, CSF analysis, and molecular testing form the diagnostic toolkit for brain tumors.',
    cards: [
      {
        heading: 'MRI - Gold Standard',
        content: 'T1, T2, and FLAIR sequences for different tissue information. Gadolinium contrast highlights abnormal vascularity. Glioblastomas: ring enhancement with central necrosis. Meningiomas: well-circumscribed with "dural tail." Advanced techniques: DWI (cellular density), perfusion MRI (blood flow), MRS (chemical composition), fMRI (functional mapping).',
      },
      {
        heading: 'CT & PET Scanning',
        content: 'CT: faster, widely available, good for hemorrhage/calcifications/bone involvement. Oligodendrogliomas show calcifications on CT. PET with FDG highlights metabolic activity - high-grade tumors show intense uptake. Novel PET tracers targeting amino acid transport expand diagnostic capability. Combined PET/MRI offers structural + metabolic information.',
      },
      {
        heading: 'CSF Analysis & Biopsy',
        content: 'Lumbar puncture detects malignant cells, elevated protein, tumor markers (AFP, beta-hCG for germ cell tumors, IL-10 for PCNSL). Must be performed cautiously with increased intracranial pressure. Stereotactic brain biopsy provides definitive histological confirmation. Immunohistochemistry identifies GFAP (gliomas), EMA (meningiomas), etc.',
      },
      {
        heading: 'Molecular Testing',
        content: 'IDH mutations, 1p/19q co-deletion, MGMT methylation, TERT mutations. Refines classification, guides therapy, predicts prognosis. Next-generation sequencing expands available markers. Liquid biopsies (circulating tumor DNA) emerging as non-invasive alternative. AI/machine learning being applied to automated detection and classification.',
      },
      {
        heading: 'Surgical Planning',
        content: 'Functional MRI and diffusion tensor imaging (DTI) map critical brain pathways. Intraoperative MRI and neuronavigation enhance surgical precision. Awake craniotomy allows real-time monitoring of language and motor function. These advances maximize tumor resection while preserving neurological function.',
      },
    ],
  },
  {
    id: 'treatment',
    icon: '💊',
    title: 'Treatment Approaches',
    color: 'blue' as const,
    summary: 'Surgery, radiation, chemotherapy, targeted therapy, immunotherapy, and supportive care.',
    cards: [
      {
        heading: 'Surgery',
        content: 'Goal: maximal safe resection - remove as much tumor as possible without neurological deficits. Benign tumors (meningiomas, pituitary adenomas): complete resection can be curative. Intraoperative MRI and neuronavigation for precise localization. Awake craniotomy maps language and motor areas in real-time. Endoscopic approaches for minimally invasive access to deep tumors.',
      },
      {
        heading: 'Radiation Therapy',
        content: 'Stereotactic radiosurgery (SRS) via Gamma Knife/CyberKnife: highly focused radiation for small tumors. IMRT and proton therapy allow conformal dose distribution. Whole-brain radiation (WBRT) for multiple metastases but carries neurocognitive risks. Often combined with surgery and chemo in multimodal protocols.',
      },
      {
        heading: 'Chemotherapy',
        content: 'Temozolomide: oral alkylating agent, standard for glioblastoma (Stupp protocol with radiation). PCV (procarbazine, lomustine, vincristine) for oligodendrogliomas. Carmustine wafers implanted directly into surgical cavity. Blood-brain barrier limits drug penetration. MGMT methylation predicts temozolomide response.',
      },
      {
        heading: 'Targeted Therapy',
        content: 'IDH inhibitors for IDH-mutant gliomas. EGFR inhibitors for EGFR-amplified glioblastomas. Bevacizumab (VEGF inhibitor) reduces angiogenesis. SHH pathway therapies for medulloblastomas. Promise of precision medicine tailoring treatment to genetic profile. Challenges: drug resistance and BBB penetration.',
      },
      {
        heading: 'Immunotherapy',
        content: 'Checkpoint inhibitors (nivolumab, pembrolizumab) block PD-1/PD-L1. CAR-T cell therapy engineers patient T cells to target tumor antigens. Tumor vaccines stimulate immune responses against specific markers. Challenges: immunosuppressive tumor microenvironment and neuroinflammation risk. Promising results in melanoma and lung cancer brain metastases.',
      },
      {
        heading: 'Supportive Care',
        content: 'Dexamethasone reduces edema and intracranial pressure. Anticonvulsants control seizures. Hormone replacement for endocrine deficiencies. Physical, occupational, and speech therapy rehabilitation. Psychological support for cognitive and emotional challenges. Palliative care ensures comfort and dignity in advanced disease.',
      },
    ],
  },
];

export default function KnowledgePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">

        <div className="container mx-auto px-6 pt-20 pb-16 relative z-10">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-4 bg-gradient-to-r from-[#528DCB]/15 to-[#A4BFDB]/15 rounded-full border border-[#528DCB]/25 text-[#528DCB] text-sm font-semibold tracking-widest">
              MEDICAL KNOWLEDGE BASE
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-[#1a1a2e] mb-4">
              Brain Tumor <span className="bg-gradient-to-r from-[#528DCB] to-[#4B78A0] text-transparent bg-clip-text">Encyclopedia</span>
            </h1>
            <p className="text-[#6A7F92] text-lg max-w-2xl mx-auto">
              Comprehensive information about brain tumor types, diagnosis, classification, symptoms, and treatment approaches.
            </p>
          </motion.div>

          {/* Section Cards */}
          <div className="space-y-8">
            {sections.map((section, sIdx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sIdx * 0.05 }}
              >
                {/* Section Header - Clickable */}
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="w-full text-left"
                >
                  <GlowCard
                    glowColor={section.color}
                    customSize
                    className="!aspect-auto w-full cursor-pointer hover:scale-[1.005] transition-transform"
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{section.icon}</span>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">{section.title}</h2>
                          <p className="text-[#6A7F92] text-sm mt-1">{section.summary}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#528DCB] text-2xl flex-shrink-0 ml-4"
                      >
                        ▼
                      </motion.div>
                    </div>
                  </GlowCard>
                </button>

                {/* Expanded Cards */}
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pl-2"
                  >
                    {section.cards.map((card, cIdx) => (
                      <motion.div
                        key={cIdx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: cIdx * 0.08 }}
                      >
                        <GlowCard
                          glowColor={section.color}
                          customSize
                          className="!aspect-auto w-full h-full"
                        >
                          <div className="p-4 flex flex-col h-full">
                            <h3 className="text-lg font-bold text-[#1a1a2e] mb-3 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#528DCB] flex-shrink-0" />
                              {card.heading}
                            </h3>
                            <p className="text-[#6A7F92] text-sm leading-relaxed flex-1">
                              {card.content}
                            </p>
                          </div>
                        </GlowCard>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 bg-[#528DCB]/10 border border-[#528DCB]/20 rounded-xl p-6"
          >
            <p className="text-[#6A7F92] text-sm text-center">
              <strong className="text-[#4B78A0]">⚕️ Medical Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice. Always consult qualified healthcare professionals for diagnosis and treatment decisions.
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
