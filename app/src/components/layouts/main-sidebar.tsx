import { Divider, Drawer, styled, useMediaQuery, Typography } from '@mui/material';
import type { Theme } from '@mui/material';
import { useRouter } from 'next/router';
import  PropTypes  from 'prop-types';
import {ReactNode, useEffect, useMemo, useState, VFC} from 'react';
import { Box } from '@mui/system';
import NextLink from 'next/link';
import { Scrollbar } from '../commons/scrollbar';
import {TFunction, useTranslation} from 'react-i18next';
import { Logo } from '../logo';
import HomeIcon from '@mui/icons-material/Home';
import NotesIcon from '@mui/icons-material/Notes';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import InsightsIcon from '@mui/icons-material/Insights';
import { MainSidebarSection } from './main-sidebar-section';

interface MainSidebarProps {
    onClose: () => void;
    open: boolean;
}

interface Item {
    title: string;
    children?: Item[];
    chip?: ReactNode;
    icon?: ReactNode;
    path?: string;
  }
  
interface Section {
    title: string;
    items: Item[];
  }

const getSections = (t: TFunction): Section[] => [
    {
        title: t('Home'),
        items: [
            {
                title: t('Home'),
                path: '/',
                icon: <HomeIcon fontSize='small' />
            }
        ]
    },
    {
        title: t('Input'),
        items: [
            {
                title: 'メモ',
                path: '/memo',
                icon: <NotesIcon fontSize='small' />
            },
            // {
            //     title: '復習',
            //     path: '/review',
            //     icon: <PublishedWithChangesIcon fontSize='small' />
            // }
        ]
    },
    // {
    //     title: t('Output'),
    //     items: [
    //         {
    //             title: 'アウトプット',
    //             path: '/output',
    //             icon: <ModelTrainingIcon fontSize='small' />
    //         }
    //     ]
    // },
    // {
    //     title: t('Analytics'),
    //     items: [
    //         {
    //             title: '分析',
    //             icon: <InsightsIcon fontSize='small' />,
    //             children: [
    //                 {
    //                     title: t('分析１'),
    //                     path: '/analytics',
    //                 }
    //             ]
    //         }
    //     ]
    // }
]


export const MainSidebar: VFC<MainSidebarProps> = (props) => {
    const { onClose, open } = props;
    const router = useRouter();
    const { t } = useTranslation();
    const lgUp = useMediaQuery(
        (theme: Theme) => theme.breakpoints.up('lg'),
            {
                noSsr: true
            }
    );
    const sections = useMemo(() => getSections(t), [t]);

    const handlePathChange = () => {
        if (!router.isReady) {
            return;
        }

        if (open) {
            onClose?.();
        }
    };

    useEffect(
        handlePathChange,
        [router.isReady, router.asPath]
    )

    const content = (
        <>
            <Scrollbar
                sx={{
                    height: '100%',
                    '& .simplebar-content': {
                        height: '100%'
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <div>
                        <Box 
                            sx={{ 
                                px: 2,
                                py: 1,
                                height: 64,                                
                            }}
                        >
                            <NextLink
                                href='/'
                                passHref
                            >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            cursor: "pointer",
                                            height: "100%"
                                        }}
                                    >
                                        <Logo 
                                            sx={{
                                                height: 36,
                                                width: 36
                                            }}
                                        />
                                        <Typography
                                            variant='h5'
                                            sx={{
                                                ml:0.5,
                                                color: "neutral.300",
                                            }}
                                        >
                                            ak-notebook
                                        </Typography>

                                    </Box>
                            </NextLink>
                        </Box>
                    </div>
                    <Divider
                        sx={{
                            borderColor: '#2D3748',
                        }}
                    />
                    <Box sx={{ flexGrow:1 }}>
                        {sections.map((section) => (
                            <MainSidebarSection
                                key={section.title}
                                path={router.asPath}
                                sx={{
                                    mt: 2,
                                    '& + &': {
                                        mt: 2
                                    }
                                }}
                                {...section}
                            />
                        ))}
                    </Box>
                </Box>
            </Scrollbar>
        </>

    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        borderRightColor: 'divider',
                        borderRightStyle: 'solid',
                        borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
                        color: '#FFFFFF',
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }
    return (
        <Drawer
            anchor='left'
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.900',
                    color: '#FFFFFF',
                    width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant='temporary'
        >
            {content}
        </Drawer>
    )

};

MainSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
}