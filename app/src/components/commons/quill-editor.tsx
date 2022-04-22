import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';
import 'react-quill/dist/quill.snow.css';
import { VFC } from 'react';
import { useMediaQuery, Theme } from '@mui/material';

const Quill = dynamic(() => import('react-quill'), { ssr: false });

const QuillEditorRoot = styled(Quill)(({ theme }) => ({
  border: 1,
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  borderStyle: 'solid',
  display: 'flex',
  flexDirection: 'column',
  '& .ql-snow.ql-toolbar': {
    borderColor: theme.palette.divider,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    '& .ql-picker-label:hover': {
      color: theme.palette.primary.main,
    },
    '& .ql-picker-label.ql-active': {
      color: theme.palette.primary.main,
    },
    '& .ql-picker-item:hover': {
      color: theme.palette.primary.main,
    },
    '& .ql-picker-item.ql-selected': {
      color: theme.palette.primary.main,
    },
    '& button:hover': {
      color: theme.palette.primary.main,
      '& .ql-stroke': {
        stroke: theme.palette.primary.main,
      },
    },
    '& button:focus': {
      color: theme.palette.primary.main,
      '& .ql-stroke': {
        stroke: theme.palette.primary.main,
      },
    },
    '& button.ql-active': {
      '& .ql-stroke': {
        stroke: theme.palette.primary.main,
      },
    },
    '& .ql-stroke': {
      stroke: theme.palette.text.primary,
    },
    '& .ql-picker': {
      color: theme.palette.text.primary,
    },
    '& .ql-picker-options': {
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[10],
      padding: theme.spacing(2),
    },
  },
  '& .ql-snow.ql-container': {
    borderBottom: 'none',
    borderColor: theme.palette.divider,
    borderLeft: 'none',
    borderRight: 'none',
    flexGrow: 1,
    overflow: 'hidden',
    '& .ql-editor': {
      color: theme.palette.text.primary,
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: theme.typography.body1.fontSize,
      padding: theme.spacing(2),
      '&.ql-blank::before': {
        color: theme.palette.text.secondary,
        fontStyle: 'normal',
        left: theme.spacing(2),
      },
    },
  },
}));

const formats = [
  'header',
  'indent',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'color',
  'background',
  'list',
  'bullet',
  'link',
  'image',
];

interface QuillEditorProps {
  defaultValue: string;
  onChange: (content: any, delta: any, source: any, editor: any) => void;
  onFocus: () => void;
}

export const QuillEditor: VFC<QuillEditorProps> = (props) => {
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {
    noSsr: true,
  });

  let modules;
  if (smUp) {
    modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
      ],
    };
  } else {
    modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
      ],
    };
  }

  return <QuillEditorRoot modules={modules} formats={formats} {...props} />;
};
