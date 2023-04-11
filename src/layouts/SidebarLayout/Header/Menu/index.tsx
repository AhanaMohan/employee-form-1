import {
  Box,
  List,
  ListItem,
} from '@mui/material';
import { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { SidebarContext } from 'src/contexts/SidebarContext';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const { openSidebar, handleOpenSidebar } =
    useContext(SidebarContext);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'block',
          }
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            onClick={() => handleOpenSidebar()}
          >
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.0404968"
                y="0.302734"
                width="15.8384"
                height="2.18182"
                rx="1.09091"
                fill="black"
              />
              <rect
                x="0.0404968"
                y="4.90918"
                width="15.8384"
                height="2.18182"
                rx="1.09091"
                fill="black"
              />
              <rect
                x="0.0404968"
                y="9.51465"
                width="15.8384"
                height="2.18182"
                rx="1.09091"
                fill="black"
              />
            </svg>
          </ListItem>
        </List>
      </ListWrapper>
      <ListWrapper
        sx={{
          display: {
            md: 'block',
            lg: 'none'
          }
        }}
      >
        Logo
      </ListWrapper>
    </>
  );
}

export default HeaderMenu;
