import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import FullLayout from "../../../src/layouts/full/FullLayout";
import NestedAccordion from "../../../src/components/accordion";
import DynamicForm from "../../../src/components/form";

const patientIdentificationData = [
  {
    title: "",
    children: [
      {
        field: "Name",
        type: "string",
      },
      {
        field: "Block",
        type: "string",
      },
      {
        field: "SO/DO/H",
        type: "string",
      },
      {
        field: "ACS Registry Number",
        type: "string",
      },
      {
        field: "Disctrict",
        type: "menu",
        menuItem: [
          "Bilaspur",
          "Chamba",
          "Hamirpur",
          "Kangra",
          "Kinnaur",
          "Kullu",
          "Lahaul and Spiti",
          "Mandi",
          "Shimla",
          "Sirmaur",
          "Solan",
          "Una",
        ],
      },
    ],
  },
];

const sociaDemographicData = [
  {
    title: "",
    children: [
      {
        field: "Age",
        type: "number",
      },
      {
        field: "Education",
        type: "string",
      },
      {
        field: "Contact Number",
        type: "number",
      },
      {
        field: "Residential Area",
        type: "menu",
        menuItem: ["rural", "urban", "semi-urban"],
      },
      {
        field: "Gender",
        type: "menu",
        menuItem: ["Male", "Female", "Others"],
      },
      {
        field: "Other Contact Number",
        type: "number",
      },
    ],
  },
];

const firstMedicalContactData = [
  {
    title: "",
    children: [
      {
        field: "Name of Hub Center",
        type: "menu",
        menuItem: ["Center A", "Center B", "Center C"],
      },
      {
        field: "Name of Spoke Center",
        type: "menu",
        menuItem: ["Center X", "Center Y", "Center Z"],
      },
    ],
  },
];

const cvRiskFactorDta = [
  {
    title: "",
    children: [
      {
        field: "Hypertension",
        type: "boolean",
      },
      {
        field: "Diabetes",
        type: "boolean",
      },
      {
        field: "Current Tabacoo Consumption",
        type: "boolean",
      },
      {
        field: "History of MI in past",
        type: "boolean",
      },
      {
        field: "History of PCI",
        type: "boolean",
      },
      {
        field: "H/o CABG",
        type: "boolean",
      },
      {
        field: "H/o Stroke",
        type: "boolean",
      },
    ],
  },
];

const acsSymptomsData = [
  {
    title: "",
    children: [
      {
        field: "Chest Pain",
        type: "boolean",
        isTrue: [
          {
            field: "Site of Chest Pain",
            type: "menu",
            menuItem: ["Left Side", "Right Side"],
          },
          {
            field: "Radiation of chest pain",
            type: "multiple",
            options: ["Arms", "Shoulder", "Back", "Neck", "Jaw"],
          },
          {
            field: "Aggravating factors",
            type: "multiple",
            options: ["Deep Breath", "Change of Posture", "Exertion"],
          },
        ],
      },
      {
        field: "Epigastric Pain",
        type: "boolean",
      },
      {
        field: "Vomiting Pain",
        type: "boolean",
      },
      {
        field: "Feeling of profound weakness",
        type: "boolean",
      },
      {
        field: "Postural blackout( on standing)",
        type: "boolean",
      },
      {
        field: "Breathlessness",
        type: "boolean",
      },
      {
        field: "Cold Perspiration",
        type: "boolean",
      },
      {
        field: "Loss of consciousness",
        type: "boolean",
      },
    ],
  },
];

const acsExaminationData = [
  {
    title: "",
    children: [
      {
        field: "SBP",
        type: "number",
      },
      {
        field: "DBP",
        type: "number",
      },
      {
        field: "HR",
        type: "number",
      },
      {
        field: "Weight",
        type: "number",
      },
      {
        field: "Height",
        type: "number",
      },
      {
        field: "SPO2",
        type: "number",
      },
      {
        field: "BMI",
        type: "number",
      },
    ],
  },
];

const acsIndexECGData = [
  {
    title: "",
    children: [
      {
        field: "Rythm",
        type: "menu",
        menuItem: ["NSR", "A Fib", "AV Block"],
      },
      {
        field: "His bundle conduction defect",
        type: "menu",
        menuItem: ["No", "LBBB", "RBBB", "IVCD"],
      },
      {
        field: "ST Segment elevation",
        type: "multiple",
        options: ["Inferior", "Lateral", "Anterior"],
      },
      {
        field: "ST segment depression",
        type: "multiple",
        options: ["Inferior", "Lateral", "Anterior"],
      },
      {
        field: "T Wave Inversion",
        type: "multiple",
        options: ["Inferior", "Lateral", "Anterior"],
      },
    ],
  },
];

const acsTropTiData = [
  {
    title: "",
    children: [
      {
        field: "Trop T/I",
        type: "menu",
        menuItem: ["Positive", "Negative", "Not Done"],
      },
    ],
  },
];

const acsBioChemistryData = [
  {
    title: "",
    children: [
      {
        field: "Blood Sugar Test",
        type: "boolean",
        isTrue: [
          {
            field: "Random Blood Sugar",
            type: "number",
          },
          {
            field: "Fasting Blood Sugar",
            type: "number",
          },
          {
            field: "HBA1C",
            type: "string",
          },
        ],
      },
      {
        field: "Renal Function Test",
        type: "boolean",
        isTrue: [
          {
            field: "Blood Urea Nitrogen",
            type: "number",
          },
          {
            field: "Creatinine",
            type: "number",
          },
          {
            field: "Sodium",
            type: "string",
          },
          {
            field: "Potassium",
            type: "string",
          },
        ],
      },
      {
        field: "Chest Pain",
        type: "boolean",
        isTrue: [
          {
            field: "Done on Statins",
            type: "boolean",
          },
          {
            field: "Total Cholestrol",
            type: "string",
          },
          {
            field: "LDL",
            type: "string",
          },
          {
            field: "HDL",
            type: "string",
          },
        ],
      },
    ],
  },
];

const acsTreatmentGivenAtFMCData = [
  {
    title: "",
    children: [
      {
        field: "Anti thrombotic Therapy",
        type: "boolean",
        isTrue: [
          {
            field: "Loading Dose of Aspirin",
            type: "boolean",
          },
          {
            field: "Loading dose of Clopidogrel",
            type: "boolean",
          },
          {
            field: "Enoxaparin 30 mg given",
            type: "boolean",
          },
          {
            field: "Subcutaneous Enoxaparin Heparin given",
            type: "boolean",
          },
        ],
      },
      {
        field: "Thrombolytic Therapy",
        type: "boolean",
        isTrue: [
          {
            field: "Date of thrombolysis",
            type: "date",
          },
          {
            field: "Time of thrombolysis",
            type: "time",
          },
          {
            field: "Thrombolytic agent used",
            type: "menu",
            menuItem: ["TNK", "Retiplase", "Streptokinase"],
          },
          {
            field: "Response to treatment (Chest pain)",
            type: "menu",
            menuItem: [
              "Relieved completely",
              "Relieved partially",
              "No Relief",
            ],
          },
          {
            field:
              "Response to treatment (ST segment Resolution after one hour)",
            type: "menu",
            menuItem: [
              "Complete resolution",
              "More than 50% Resolution",
              "Less than 50% Resolution",
            ],
          },
          {
            field: "Site of Thrombolysis",
            type: "menu",
            menuItem: ["Spoke Center", "Hub Center", "Other"],
          },
        ],
      },
      {
        field: "History of Coronary Angiography Therapy",
        type: "boolean",
        isTrue: [
          {
            field: "Extent of CAD",
            type: "multiple",
            options: ["SVD", "DVD", "TVD", "LMCA disease"],
          },
        ],
      },
      {
        field: "PCI",
        type: "boolean",
        isTrue: [
          {
            field: "Indication of PCI",
            type: "multiple",
            options: [
              "Primary PCI",
              "Pharmacoinvasive",
              "Rescue",
              "Post MI Angina",
            ],
          },
        ],
      },
    ],
  },
];

const acsTreatmentDuringHospitalData = [
  {
    title: "",
    children: [
      {
        field: "Antiplatelets",
        type: "multiple",
        options: ["Aspirin", "Clopidogrel", "Prasugrel", "Prasugrel"],
      },
      {
        field: "Statin",
        type: "boolean",
        isTrue: [
          {
            field: "If Statin",
            type: "menu",
            menuItem: ["Atorvastatin", "Rosuastatin"],
          },
          {
            field: "Beta Blockers",
            type: "boolean",
          },
          {
            field: "MRA",
            type: "boolean",
          },
          {
            field: "RAAS Inhibitor",
            type: "boolean",
          },
          {
            field: "ARNI",
            type: "boolean",
          },
          {
            field: "SGLT2 Inhibitor",
            type: "boolean",
          },
          {
            field: "Inj. LMWH",
            type: "boolean",
          },
          {
            field: "Anti Diabetic Drugs used",
            type: "boolean",
            isTrue: [
              {
                field: "Metformin",
                type: "boolean",
              },
              {
                field: "DPP4Inhibitors",
                type: "boolean",
              },
              {
                field: "Sulphonylurea",
                type: "boolean",
              },
              {
                field: "Pioglitazone",
                type: "boolean",
              },
              {
                field: "GLP1 agonists",
                type: "boolean",
              },
              {
                field: "Insulin",
                type: "boolean",
              },
            ],
          },
        ],
      },
      {
        field: "History of Coronary Angiography Therapy",
        type: "boolean",
        isTrue: [
          {
            field: "Extent of CAD",
            type: "multiple",
            options: ["SVD", "DVD", "TVD", "LMCA disease"],
          },
        ],
      },
      {
        field: "PCI",
        type: "boolean",
        isTrue: [
          {
            field: "Indication of PCI",
            type: "multiple",
            options: [
              "Primary PCI",
              "Pharmacoinvasive",
              "Rescue",
              "Post MI Angina",
            ],
          },
        ],
      },
    ],
  },
];

const acsDiagnosisData = [
  {
    title: "",
    children: [
      {
        field: "Diagnosis",
        type: "multiple",
        options: ["NSTEMI", "U Angina", "Suspected ACS", "STEMI"],
      },
    ],
  },
];

const acsAtDischargeData = [
  {
    title: "",
    children: [
      {
        field: "Antiplatelets",
        type: "multiple",
        options: ["Aspirin", "Clopidogrel", "Prasugrel", "Ticagrelor"],
      },
      {
        field: "Statin",
        type: "boolean",
        isTrue: [
            {
                field:"Statin Type",
                type:"menu",
                menuItem:["Atorvastatin","Rosuastatin","Pivastatin"]
            },
            {
                field:"Statin Dose",
                type:"number",
            }
        ],
      },
      {
        field: "Blockers",
        type: "boolean",
        isTrue: [
            {
                field:"Blockers Type",
                type:"menu",
                menuItem:["Carvidelol","Metoprolol","Bisoprolol"]
            },
            {
                field:"Blockers Dose",
                type:"number",
            },
            {
                field:"Dose Frequency",
                type:"menu",
                menuItem:["Once a day","Twice a day"]
            },
        ],
      },
      {
        field: "MRA",
        type: "boolean",
      },
      {
        field: "RAAS Inhibitor",
        type: "boolean",
        isTrue: [
            {
                field:"Blockers Type",
                type:"menu",
                menuItem:["Ace inhibitor","ARB"]
            },
            {
                field:"RAAS Inhibitor Dose",
                type:"number",
            },
            {
                field:"Dose Frequency",
                type:"menu",
                menuItem:["Once a day","Twice a day"]
            },
        ],
      },
      {
        field: "ARNI",
        type: "boolean",
      },
      {
        field: "SGLT2 Inhibitor",
        type: "boolean",
      },
      {
        field: "Anti anginals",
        type: "boolean",
      },
    ],
  },
];

const acsHospitalOutcomeData = [
  {
    title: "",
    children: [
      {
        field: "Death",
        type: "boolean",
      },
      {
        field: "Cardiac",
        type: "boolean",
        isTrue: [
            {
                field:"Cardiac Type",
                type:"menu",
                menuItem:["Heart Failure","Sudden Death"]
            }
        ],
      },
      {
        field: "Heart Failure:(Orthopnea/Basal Rales/Tachypnea)",
        type: "boolean",
      },
      {
        field: "Stroke",
        type: "boolean",
        isTrue: [
            {
                field:"Type of Stroke",
                type:"menu",
                menuItem:["Hemorrhagic","Ischemic stroke","Heart Failure","Sudden Death"]
            },
        ],
      },
      {
        field: "Major Bleeding ( GI bleed/Hematuria/Intracranial)",
        type: "boolean",
      }
    ],
  },
];

const timeDelayPresentataionData = [
  {
    title: "",
    children: [
      {
        field: "Date of Symptoms on set",
        type: "date",
      },
      {
        field: "Time of Symptoms on set",
        type: "date",
      },
      {
        field: "Date of reporting to hospital",
        type: "date",
      },
      {
        field: "Time of reporting to hospital",
        type: "date",
      },
    ],
  },
];

const acsFormData = [
  {
    title: "Patient Identification",
    content: <DynamicForm formData={patientIdentificationData} />,
  },
  {
    title: "Socio Demographics",
    content: <DynamicForm formData={sociaDemographicData} />,
  },
  {
    title: "First Medical Contact",
    content: <DynamicForm formData={firstMedicalContactData} />,
  },
  {
    title: "CV Risk Factors",
    content: <DynamicForm formData={cvRiskFactorDta} />,
  },
  {
    title: "Presentation",
    children: [
      {
        title: "Time Delays",
        content: <DynamicForm formData={timeDelayPresentataionData} />,
      },
      {
        title: "Symptoms",
        content: <DynamicForm formData={acsSymptomsData} />,
      },
      {
        title: "Examination",
        content: <DynamicForm formData={acsExaminationData} />,
      },
      {
        title: "Index ECG",
        content: <DynamicForm formData={acsIndexECGData} />,
      },
      {
        title: "Trop T/I",
        content: <DynamicForm formData={acsTropTiData} />,
      },
      {
        title: "Biochemistry",
        content: <DynamicForm formData={acsBioChemistryData} />,
      },
      {
        title: "Diagnosis",
        content: <DynamicForm formData={acsDiagnosisData} />,
      },
      {
        title: "Treatment given at FMC at admission",
        content: <DynamicForm formData={acsTreatmentGivenAtFMCData} />,
      },
      {
        title: "Treatment during hospital",
        content: <DynamicForm formData={acsTreatmentDuringHospitalData} />,
      },
      {
        title: "At Discharge",
        content: <DynamicForm formData={acsAtDischargeData} />,
      },
    ],
  },
  {
    title: "Hospital Outcome",
    content: <DynamicForm formData={acsHospitalOutcomeData} />,
  },
];


const SamplePage = () => {
  return (
    <PageContainer
      title="ACS Case Form"
      description="this is ACS Case Form page"
    >
      <DashboardCard title="ACS Case Form">
        <>
          {/* <DynamicForm formData={formData} /> */}
          <NestedAccordion data={acsFormData} />
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
SamplePage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
