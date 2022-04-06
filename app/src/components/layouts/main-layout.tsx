import { styled } from '@mui/material';
import  PropTypes  from 'prop-types';
import {ReactNode, useState, VFC} from 'react';
import { MainNavbar } from './main-navbar';
import { MainSidebar } from './main-sidebar'
import {Box} from "@mui/material";

interface MainLayoutProps {
    children?: ReactNode;
}

const MainLayoutRoot = styled('div')(
    ({theme}) => ({
        display: 'flex',
        flex: '1 1 auto',
        maxWidth: '100%',
        paddingTop: 64,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 280
        }
    })
);

export const MainLayout: VFC<MainLayoutProps> = (props) => {
    const { children } = props;
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    return (
        <>
            <MainLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%'
                        
                    }}
                >
                    {children}
                </Box>
            </MainLayoutRoot>
            <MainNavbar onOpenSidebar={(): void => setIsSidebarOpen(true)}/>
            <MainSidebar
                onClose={(): void => setIsSidebarOpen(false)}
                open={isSidebarOpen} />
        </>
    )

};

MainLayout.propTypes = {
    children: PropTypes.node
}