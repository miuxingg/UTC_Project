import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function Iconify({ icon, sx, ...other }: any) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
