import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionData {
  title: string;
  content?: string | JSX.Element;
  children?: AccordionData[];
}

const NestedAccordion: React.FC<{ data: AccordionData[] }> = ({ data }) => {
  const [expandedIndexes, setExpandedIndexes] = useState<{ [key: string]: string | null }>({});

  const handleAccordionChange = (parentIndex: string, accordionIndex: string) => {
    setExpandedIndexes((prevIndexes) => ({
      ...prevIndexes,
      [parentIndex]: prevIndexes[parentIndex] === accordionIndex ? null : accordionIndex,
    }));
  };

const isAccordionExpanded = (parentIndex: string, accordionIndex: string) => {
    return expandedIndexes[parentIndex] === accordionIndex;
  };

  const renderAccordion = (items: AccordionData[] | undefined, parentIndex: string) => {
    if (!items) return null;

    return items.map((item, index) => {
      const accordionIndex = `${parentIndex}-${index}`;
      const isExpanded = isAccordionExpanded(parentIndex, accordionIndex);

      return (
        <Accordion
          key={accordionIndex}
          expanded={expandedIndexes[parentIndex] === accordionIndex}
          onChange={() => handleAccordionChange(parentIndex, accordionIndex)}
          sx={{ marginTop: '15px' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{
              fontWeight: isExpanded ? 'bold' : 'normal',
              color: isExpanded ? 'primary.main' : 'inherit',
              fontSize: isExpanded ?'16px':'12px'
            }}>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {typeof item.content === 'string' ? <Typography>{item.content}</Typography> : item.content}
            {renderAccordion(item.children, accordionIndex)}
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return <div>{renderAccordion(data, 'root')}</div>;
};

export default NestedAccordion;
