import { Button, Dialog, Box, DialogContent,DialogTitle,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;   
    excel: any;
    pdf: any;
}
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function CustomDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 ,px:10 }} {...other}>
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

export default function ConfirmDialog({ open, setOpen ,excel ,pdf}:Props) {

  const handleClose = () => {
    setOpen(false);
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
        Select Format to Download
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
            <Button variant="contained" sx={{mt:3,width:'6rem'}}  onClick={pdf}>PDF</Button>
            <Button variant="outlined" sx={{mt:1 ,width:'6rem'}} onClick={excel}>Excel</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
