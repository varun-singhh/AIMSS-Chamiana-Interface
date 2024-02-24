import type { ReactElement } from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';

const jsonData = {
  "title": "patient_identification",
  "children": [
    {
      "field": "name",
      "type": "string"
    },
    {
      "field": "district",
      "type": "string"
    },
    {
      "field": "anti_diabetic",
      "type": "boolean",
      "isTrue": [
        {
          "field": "sugar_value",
          "type": "number"
        },
        {
          "field": "ecg_done",
          "type": "boolean"
        }
      ],
      "isFalse": [
        {
          "field": "glp1_agonists",
          "type": "boolean"
        },
        {
          "field": "glp1_agonists_type",
          "type": "string"
        },
        {
          "field": "glp1_agonists_dose",
          "type": "number"
        }
      ]
    },
    {
      "field": "favourite_dishes",
      "type": "multiple"
    }
  ]
};
const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Sample Page">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
SamplePage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};