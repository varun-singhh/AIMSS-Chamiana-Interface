import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import FullLayout from "../../../src/layouts/full/FullLayout";
import NestedAccordion from "../../../src/components/accordion";
import DynamicForm from "../../../src/components/form";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { createForm } from "../../../actions/forms";
import SearchDialog from "../../../src/components/dialog";
import { randomNumber } from "../../../utils/factorty";
import Popup from "../../../src/components/popup";
import { useRouter } from "next/router";

const FloatingButtonContainer = styled("div")({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 1000,
});

const socioDemographicData = [
  {
    title: "Socio Demographics",
    children: [
      {
        field: "Education",
        type: "string",
      },

      {
        field: "Residential Area",
        type: "menu",
        menuItem: ["rural", "urban", "semi-urban"],
      },
      {
        field: "Other Contact Number",
        type: "number",
      },
    ],
  },
];

const dignosisData = [
  {
    title: "Diagnosis",
    children: [
      {
        field: "Stable CAD/Post ACS",
        type: "menu",
        menuItem: ["Stable CAD", "Post ACS"],
      },
      {
        field: "RWM abnormality",
        type: "boolean",
      },
      {
        field: "Degenerative Aortic valve disease",
        type: "boolean",
      },
      {
        field: "LV global systolic dysfunction",
        type: "menu",
        menuItem: [
          "Mild dysfunction",
          "Moderate dysfunction",
          "Sevre dysfunction",
          "Not Known",
        ],
      },
      {
        field: "MR",
        type: "menu",
        menuItem: ["Mild", "Moderate", "Sevre", "Not Known"],
      },
      {
        field: "AR",
        type: "menu",
        menuItem: ["Mild", "Moderate", "Sevre", "Not Known"],
      },
      {
        field: "AS",
        type: "menu",
        menuItem: ["Mild", "Moderate", "Sevre", "Not Known"],
      },
    ],
  },
];

const durationofFollowupData = [
  {
    title: "Duration of follow up in Cardiology OPD before registry",
    children: [
      {
        field: "Duration in Months",
        type: "number",
      },
    ],
  },
];

const cvRiskFactorData = [
  {
    title: "CV Risk Factors",
    children: [
      {
        field: "H/O Hypertension",
        type: "boolean",
      },
      {
        field: "H/O PCI",
        type: "boolean",
      },
      {
        field: "H/O MI",
        type: "boolean",
      },
      {
        field: "H/O Diabetes",
        type: "boolean",
      },
      {
        field: "H/O Current Tabaco Consumption",
        type: "boolean",
        isTrue: [
          {
            field: "Nature of Tabaco Consumption",
            type: "menu",
            menuItem: ["Smoke", "Smokeless", "Both"],
          },
        ],
      },
    ],
  },
];

const medicalhistoryCadData = [
  {
    title: "Medical History of CAD",
    children: [
      {
        field: "Past H/O MI",
        type: "boolean",
      },
      {
        field: "Past H/O PCI",
        type: "boolean",
      },
      {
        field: "Past H/O CABG",
        type: "boolean",
      },
      {
        field: "Pst H/O Coronary angiography",
        type: "boolean",
        isTrue: [
          {
            field: "Date of Coronary angiography",
            type: "date",
          },
          {
            field: "CAD status",
            type: "menu",
            menuItem: ["Obstructive CAD", "Non-Obstructive CAD"],
          },
          {
            field: "Extent of CAD",
            type: "menu",
            menuItem: ["SVD Disease", "DVD Disease", "TVD Disease"],
          },
          {
            field: "LCMA Disease",
            type: "boolean",
          },
        ],
      },
      {
        field: "LV systolic Function",
        type: "menu",
        menuItem: [
          "Not Known",
          "Normal(>50%)",
          "Mild dysfunction(40-49%)",
          "Moderate dysfunction(30-39%)",
          "Sevre dysfunction(<29%)",
        ],
      },
    ],
  },
];

const cadSymptomsData = [
  {
    title: "Symptoms",
    children: [
      {
        field: "Angina Class",
        type: "menu",
        menuItem: [
          "No angina on routine physical activity",
          "Mild angina on routine physical activity",
          "Severe angina on routine physical activity",
          "Angina at rest",
        ],
      },
      {
        field: "Breathlessness Class",
        type: "menu",
        menuItem: [
          "No Breathlessness on routine physical activity",
          "Mild Breathlessness on routine physical activity",
          "Severe Breathlessness on routine physical activity",
          "Breathlessness at rest",
        ],
      },
    ],
  },
];

const AVDinOtherVascularTerritoryData = [
  {
    title: "Atherosclerotic Vascular disease in other vascular territory",
    children: [
      {
        field: "CVA/TIA",
        type: "boolean",
      },
      {
        field: "PVD",
        type: "boolean",
        isTrue: [
          {
            field: "PVD Type",
            type: "menu",
            menuItem: [
              "Angio Proven PVD/",
              "H/O PTA/",
              "H/O Bypass grafting",
              "doppler evidence of PVD",
            ],
          },
        ],
      },
    ],
  },
];

const cadExaminationData = [
  {
    title: "Physical Examination",
    children: [
      {
        field: "SBP (mmHg)",
        type: "number",
      },
      {
        field: "DBP (mmHg)",
        type: "number",
      },
      {
        field: "HR",
        type: "number",
      },
      {
        field: "Weight (Kg)",
        type: "number",
      },
      {
        field: "Height (meter)",
        type: "number",
      },
      {
        field: "SPO2",
        type: "number",
      },
      {
        field: "BMI",
        type: "number",
        value: "",
      },
      {
        field: "BMI Status",
        type: "menu",
        menuItem: [
          "Underweight (<18.5)",
          "Normal weight (18.5-22.9)",
          "Overweight (23-24.9)",
          "Pre-obese (25-29.9)",
          "Obese (>30)",
        ],
      },
    ],
  },
];

const cadIndexECGData = [
  {
    title: "Index Ecg",
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

const cadTropTiData = [
  {
    title: "Trop Ti",
    children: [
      {
        field: "Trop T/I",
        type: "menu",
        menuItem: ["Positive", "Negative", "Not Done"],
      },
    ],
  },
];

const cadBioChemistryData = [
  {
    title: "Biochemistry",
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

const cadTreatmentGivenAtFMCData = [
  {
    title: "Treatment Given At Fmc",
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

const cadTreatmentDuringHospitalData = [
  {
    title: "Treatment During Hospital",
    children: [
      {
        field: "Antiplatelets",
        type: "multiple",
        options: ["Aspirin", "Clopidogrel", "Prasugrel"],
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

const cadDiagnosisData = [
  {
    title: "Diagnosis",
    children: [
      {
        field: "Diagnosis",
        type: "multiple",
        options: ["NSTEMI", "U Angina", "Suspected CAD", "STEMI"],
      },
    ],
  },
];

const cadAtDischargeData = [
  {
    title: "At Discharge",
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
            field: "Statin Type",
            type: "menu",
            menuItem: ["Atorvastatin", "Rosuastatin", "Pivastatin"],
          },
          {
            field: "Statin Dose",
            type: "number",
          },
        ],
      },
      {
        field: "Blockers",
        type: "boolean",
        isTrue: [
          {
            field: "Blockers Type",
            type: "menu",
            menuItem: ["Carvidelol", "Metoprolol", "Bisoprolol"],
          },
          {
            field: "Blockers Dose",
            type: "number",
          },
          {
            field: "Blocker Dose Frequency",
            type: "menu",
            menuItem: ["Once a day", "Twice a day"],
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
            field: "RAAS Inhibitor Type",
            type: "menu",
            menuItem: ["Ace inhibitor", "ARB"],
          },
          {
            field: "RAAS Inhibitor Dose",
            type: "number",
          },
          {
            field: "RAAS Inhibitor Dose Frequency",
            type: "menu",
            menuItem: ["Once a day", "Twice a day"],
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

const cadHospitalOutcomeData = [
  {
    title: "Hospital Outcome",
    children: [
      {
        field: "Death",
        type: "boolean",
        isFalse: [
          {
            field: "Date of Discharge",
            type: "date",
          },
        ],
      },
      {
        field: "Cardiac",
        type: "boolean",
        isTrue: [
          {
            field: "Cardiac Type",
            type: "menu",
            menuItem: ["Heart Failure", "Sudden Death"],
          },
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
            field: "Type of Stroke",
            type: "menu",
            menuItem: [
              "Hemorrhagic",
              "Ischemic stroke",
              "Heart Failure",
              "Sudden Death",
            ],
          },
        ],
      },
      {
        field: "Major Bleeding( GI bleed/Hematuria/Intracranial)",
        type: "boolean",
      },
    ],
  },
];

const timeDelayPresentataionData = [
  {
    title: "Time Delays",
    children: [
      {
        field: "Date of Symptoms on set",
        type: "date",
      },
      {
        field: "Time of Symptoms on set",
        type: "time",
      },
      {
        field: "Date of reporting to hospital",
        type: "date",
      },
      {
        field: "Time of reporting to hospital",
        type: "time",
      },
    ],
  },
];

const CADCaseFormPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const authState = useSelector((state: RootState) => state?.auth);
  const formState = useSelector((state: RootState) => state?.form);
  const [prefillData, setPrefillData] = useState({ patient: {}, doctor: {} });
  const [cadData, setCADData] = useState({
    physical_examination: { height: 0, weight: 0, bmi: 0 },
  });
  const [loading, setLoading] = useState(false);
  const [formFilled, setFormFilled] = useState(false);

  const handleCloseDialog = (data: { patient: any; doctor: any }) => {
    setPrefillData(data);
  };

  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  const handleFormDataUpdate = (data: any) => {
    setCADData((prevData) => {
      return {
        ...prevData,
        ...data,
      };
    });
  };

  const cadFormData = [
    {
      title: "Socio Demographics",
      content: (
        <DynamicForm
          formData={socioDemographicData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Diagnosis",
      content: (
        <DynamicForm
          formData={dignosisData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Duration of Followup in Cardiology OPD",
      content: (
        <DynamicForm
          formData={durationofFollowupData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "CV Risk Factors",
      content: (
        <DynamicForm
          formData={cvRiskFactorData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Medical History of CAD",
      content: (
        <DynamicForm
          formData={medicalhistoryCadData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Symptoms",
      content: (
        <DynamicForm
          formData={cadSymptomsData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Atherosclerotic Vascular disease in other vascular territory",
      content: (
        <DynamicForm
          formData={AVDinOtherVascularTerritoryData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Physical Examination",
      content: (
        <DynamicForm
          formData={cadExaminationData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Lab Investigation",
      content: (
        <DynamicForm
          formData={durationofFollowupData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "ECG",
      content: (
        <DynamicForm
          formData={durationofFollowupData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Echocardiography",
      content: (
        <DynamicForm
          formData={durationofFollowupData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Holter Monitoring",
      content: (
        <DynamicForm
          formData={durationofFollowupData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Stress Test",
      content: (
        <DynamicForm
          formData={durationofFollowupData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Management Practices",
      children: [
        {
          title: "Practice of Health Behaviour",
          content: (
            <DynamicForm
              formData={timeDelayPresentataionData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
        {
          title: "Drug Prescribed",
          content: (
            <DynamicForm
              formData={cvRiskFactorData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
        {
          title: "Diabetes",
          content: (
            <DynamicForm
              formData={cadExaminationData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
      ],
    },
  ];

  const cad_registry_number = `CAD/${String(
    prefillData?.patient?.address?.block
  ).toUpperCase()}/${randomNumber}`;

  const handleSubmitWithLoader = () => {
    setLoading(true);

    dispatch(
      createForm(
        "CAD",
        "case",
        authState?.data?.user?.id,
        "admin",
        prefillData.doctor?.doctor_details?.name ?? "NA",
        prefillData.doctor?.id ?? "NA",
        {
          patient_identification: {
            name: prefillData?.patient?.patient_details?.name || null,
            block: prefillData?.patient?.address?.block || null,
            "so/do/h":
              prefillData?.patient?.patient_details?.relation_name || null,
            registry_number: cad_registry_number,
            district: prefillData?.patient?.address?.district || null,
          },
          ...cadData,
        }
      )
    );

    setTimeout(() => {
      setLoading(false);
      setFormFilled(true);
    }, 4000);
  };

  const router = useRouter();

  const handlePopupClose = () => {
    setFormFilled(false);
  };
  const handlePopupOkay = () => {
    router.push("/case");
  };

  return (
    <>
      {/* Tile for creating a new doctor */}
      {formFilled && formState?.message === "form uploaded successfully" && (
        <Popup
          open={true}
          title="Yipee !!"
          desc={formState?.message}
          onClose={handlePopupClose}
          onOkay={handlePopupOkay}
          okayButtonTitle="New Form"
        />
      )}

      {formFilled && formState?.message !== "form uploaded successfully" && (
        <Popup
          open={true}
          title="Uhhh Ohh !!"
          desc={formState?.message}
          onClose={handlePopupClose}
          onOkay={handlePopupOkay}
          okayButtonTitle="New Form"
          closeButtonTitle="Try Again"
        />
      )}

      <FloatingButtonContainer>
        <Button
          variant="contained"
          onClick={handleSubmitWithLoader}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit Form"}
        </Button>
      </FloatingButtonContainer>
      <IconButton onClick={handleGoBack}>
        <ArrowBackIcon />
      </IconButton>
      <PageContainer
        title="CAD Case Form"
        description="this is CAD Case Form page"
      >
        <DashboardCard title="CAD Case Form">
          <>
            <SearchDialog open={true} onClose={handleCloseDialog} />
            {/* <DynamicForm formData={formData} /> */}
            <NestedAccordion data={cadFormData} />
          </>
        </DashboardCard>
      </PageContainer>
    </>
  );
};

export default CADCaseFormPage;
CADCaseFormPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
