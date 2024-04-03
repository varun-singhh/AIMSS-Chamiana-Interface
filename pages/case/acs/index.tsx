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
import { getAllDoctorsDetails } from "../../../actions/doctors";
import SearchDialog from "../../../src/components/dialog";
import { random } from "lodash";
import { randomBytes, randomInt } from "crypto";
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
    title: "First Medical Contact",
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
    title: "Cv Risk Factors",
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
    title: "Symptoms",
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
    title: "Examination",
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

const acsTropTiData = [
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

const acsBioChemistryData = [
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

const acsTreatmentGivenAtFMCData = [
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

const acsTreatmentDuringHospitalData = [
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

const acsDiagnosisData = [
  {
    title: "Diagnosis",
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

const acsHospitalOutcomeData = [
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

const ACSCaseFormPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const authState = useSelector((state: RootState) => state?.auth);
  const formState = useSelector((state: RootState) => state?.form);
  const [prefillData, setPrefillData] = useState({ patient: {}, doctor: {} });
  const [acsData, setACSData] = useState({});
  const [loading, setLoading] = useState(false);
  const [formFilled, setFormFilled] = useState(false);

  const handleCloseDialog = (data: { patient: any; doctor: any }) => {
    setPrefillData(data);
  };

  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  const handleFormDataUpdate = (data: any) => {
    setACSData((prevData) => {
      return {
        ...prevData,
        ...data,
      };
    });
  };

  const acsFormData = [
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
      title: "First Medical Contact",
      content: (
        <DynamicForm
          formData={firstMedicalContactData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "CV Risk Factors",
      content: (
        <DynamicForm
          formData={cvRiskFactorDta}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
    {
      title: "Presentation",
      children: [
        {
          title: "Time Delays",
          content: (
            <DynamicForm
              formData={timeDelayPresentataionData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
        {
          title: "Symptoms",
          content: (
            <DynamicForm
              formData={acsSymptomsData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
        {
          title: "Examination",
          content: (
            <DynamicForm
              formData={acsExaminationData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
        {
          title: "Index ECG",
          content: (
            <DynamicForm
              formData={acsIndexECGData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
        {
          title: "Trop T/I",
          content: (
            <DynamicForm
              formData={acsTropTiData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
        {
          title: "Biochemistry",
          content: (
            <DynamicForm
              formData={acsBioChemistryData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
        {
          title: "Diagnosis",
          content: (
            <DynamicForm
              formData={acsDiagnosisData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
        {
          title: "Treatment given at FMC at admission",
          content: (
            <DynamicForm
              formData={acsTreatmentGivenAtFMCData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
        {
          title: "Treatment during hospital",
          content: (
            <DynamicForm
              formData={acsTreatmentDuringHospitalData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
        {
          title: "At Discharge",
          content: (
            <DynamicForm
              formData={acsAtDischargeData}
              onFormDataUpdate={handleFormDataUpdate}
            />
          ),
        },
      ],
    },
    {
      title: "Hospital Outcome",
      content: (
        <DynamicForm
          formData={acsHospitalOutcomeData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      ),
    },
  ];

  const acs_registry_number = `ACS/${String(
    prefillData?.patient?.address?.block
  ).toUpperCase()}/${randomNumber}`;

  const handleSubmitWithLoader = () => {
    setLoading(true);

    dispatch(
      createForm(
        "ACS",
        "case",
        authState?.data?.user?.id,
        "admin",
        prefillData.doctor?.doctor_details?.name ?? "NA",
        prefillData.doctor?.id ?? "NA",
        {
          ...acsData,
          patient_identification: {
            name: prefillData?.patient?.patient_details?.name || null,
            block: prefillData?.patient?.address?.block || null,
            "so/do/h":
              prefillData?.patient?.patient_details?.relation_name || null,
            acs_registry_number,
            district: prefillData?.patient?.address?.district || null,
          },
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
        title="ACS Case Form"
        description="this is ACS Case Form page"
      >
        <DashboardCard title="ACS Case Form">
          <>
            <SearchDialog open={true} onClose={handleCloseDialog} />
            {/* <DynamicForm formData={formData} /> */}
            <NestedAccordion data={acsFormData} />
          </>
        </DashboardCard>
      </PageContainer>
    </>
  );
};

export default ACSCaseFormPage;
ACSCaseFormPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
