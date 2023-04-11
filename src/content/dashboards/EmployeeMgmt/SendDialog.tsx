import * as React from 'react';
import {
  Dialog,
  Box,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Swal from 'sweetalert2';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function CustomDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function SendDialog({ open, setOpen }: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  //Coming Soon
    const handleWhatsApp = () => {
        setOpen(false);
    Swal.fire({
      title: 'Coming Soon!',
      text: 'This feature will be available soon.',
      icon: 'info',
      confirmButtonText: 'Ok'
    });
   
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Share
        </CustomDialogTitle>
        <DialogContent id="alert-dialog-content">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  p: 1,
                  m: 2,
                  background: '#25D366',
                  borderRadius: '90%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleWhatsApp}
              >
                <WhatsAppIcon style={{ color: 'white' }} />
              </Box>
              <Box
                sx={{
                  p: 1,
                  m: 2,
                  background: '#3b5998 ',
                  borderRadius: '90%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleWhatsApp}
              >
                <EmailIcon style={{ color: 'white' }} />
              </Box>
              <Box
                sx={{
                  p: 1,
                  m: 2,
                  background: '#0088cc ',
                  borderRadius: '90%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleWhatsApp}
              >
                <TelegramIcon style={{ color: 'white' }} />
              </Box>
              <Box
                sx={{
                  p: 1,
                  m: 2,
                  background: 'gray',
                  borderRadius: '90%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleWhatsApp}
              >
                <FacebookIcon style={{ color: 'white' }} />
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
