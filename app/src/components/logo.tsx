import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

export const Logo = styled((props) => {
  const { ...other } = props;
  const theme = useTheme();

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='48'
      zoomAndPan='magnify'
      viewBox='0 0 135 135.000003'
      height='48'
      preserveAspectRatio='xMidYMid meet'
      version='1.0'
      style={{ fill: theme.palette.primary.main }}
      {...other}
    >
      <defs>
        <clipPath id='id1'>
          <path
            d='M 0.496094 13 L 55 13 L 55 121 L 0.496094 121 Z M 0.496094 13 '
            clip-rule='nonzero'
          />
        </clipPath>
        <clipPath id='id2'>
          <path
            d='M 68 13 L 134.503906 13 L 134.503906 67 L 68 67 Z M 68 13 '
            clip-rule='nonzero'
          />
        </clipPath>
        <clipPath id='id3'>
          <path
            d='M 68 67 L 134.503906 67 L 134.503906 121 L 68 121 Z M 68 67 '
            clip-rule='nonzero'
          />
        </clipPath>
      </defs>
      <g clip-path='url(#id1)'>
        <path
          d='M 54.128906 120.769531 L 0.4375 67.078125 L 54.132812 13.382812 L 54.128906 120.769531 '
          fill-opacity='1'
          fill-rule='nonzero'
        />
      </g>
      <g clip-path='url(#id2)'>
        <path
          d='M 68.035156 66.976562 L 68.035156 13.378906 L 134.292969 13.378906 L 68.035156 66.976562 '
          fill-opacity='1'
          fill-rule='nonzero'
        />
      </g>
      <g clip-path='url(#id3)'>
        <path
          d='M 134.683594 120.695312 L 68.421875 120.695312 L 68.421875 67.097656 L 134.683594 120.695312 '
          fill-opacity='1'
          fill-rule='nonzero'
        />
      </g>
    </svg>
  );
})``;
