import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ReactNode, VFC } from 'react';
import { createTheme } from '../theme';

interface SettingsProviderProps  {
    children: ReactNode;
};

export const ThemeProvider: VFC<SettingsProviderProps> = (props) => {
    const { children } = props;

    return (
        <MuiThemeProvider
            theme={createTheme()}>
            
            {children}

        </MuiThemeProvider>
    )
}