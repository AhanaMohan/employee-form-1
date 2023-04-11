import { Box, Link, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
        
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      {/* <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="end"
        px={{ xs: 2, md: 3 }}
      >
        <Typography
          sx={{
            pt: { xs: 4, md: 6 }
          }}
          variant="subtitle1"
        >
          © 2022 by{' '}
          <Link
            href="https://www.enfono.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enfono Technologies
          </Link>
        </Typography>
      </Box> */}
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="end"
        px={{ xs: 3, md: 3 }}
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; 2022 -
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tradeasy
            </Link>
          </Typography>
        </Box>
        {/* <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Created by{' '}
          <Link
            href="https://www.enfono.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enfono Technologies
          </Link>
        </Typography> */}
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
