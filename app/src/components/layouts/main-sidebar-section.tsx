import type { ListProps } from "@mui/material";
import { List, ListSubheader } from "@mui/material";
import PropTypes, { number, string } from 'prop-types';
import { VFC, ReactNode } from "react";
import {MainSidebarItem} from './main-sidebar-item'

interface Item {
    path?: string;
    icon?: ReactNode;
    chip?: ReactNode;
    info?: ReactNode;
    children?: Item[];
    title: string;
}

interface MainSidebarSectionProps extends ListProps {
    items: Item[];
    path: string;
    title: string;
}

const renderNavItems = ({
    depth = 0,
    items,
    path
}: {
    depth?: number;
    items: Item[];
    path: string;
}): JSX.Element => (
    <List disablePadding>
        {items.reduce( 
            (acc, item) => reduceChildRoutes({
                acc,
                item,
                depth,
                path
            }),
            []
        )}
    </List>
)

const reduceChildRoutes = ({
    acc,
    item,
    depth,
    path
}: {
    acc: JSX.Element[];
    depth: number;
    item: Item;
    path: string;
}): Array<JSX.Element> => {
    const key = `${item.title}-${depth}`;
    const partialMatch = path.includes(item.path);
    const exactMatch = path ===item.path;

    if (item.children) {
        acc.push(
            <MainSidebarItem
                active={partialMatch}
                chip={item.chip}
                depth={depth}
                icon={item.icon}
                info={item.info}
                key={key}
                open={partialMatch}
                path={item.path}
                title={item.title}
            >
                {renderNavItems({
                    depth: depth + 1,
                    items: item.children,
                    path
                })}
            </MainSidebarItem>
        );
    } else {
        acc.push(
            <MainSidebarItem
                active={exactMatch}
                chip={item.chip}
                depth={depth}
                icon={item.icon}
                info={item.info}
                key={key}
                open={partialMatch}
                path={item.path}
                title={item.title}
            />
        );
    }

    return acc;
};

export const MainSidebarSection: VFC<MainSidebarSectionProps> = (props) => {
    const { items, path, title, ...other } = props;

    return (
        <List
            subheader={(
                <ListSubheader
                    disableGutters
                    disableSticky
                    sx={{
                        color: 'neutral.500',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        lineHeight: 2.5,
                        ml: 4,
                        textTransform: 'uppercase'
                    }}
                >
                    {title}
                </ListSubheader>
            )}
            {...other}
        >
            {renderNavItems({
                items,
                path
            })}
        </List>
    );
};

MainSidebarSection.propTypes = {
    items: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}