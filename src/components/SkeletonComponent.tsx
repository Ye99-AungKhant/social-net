import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export const storyLoading = <Skeleton width={100} height={190} />
export const storyUploadLoading = <Skeleton width={100} height={190} />
export const profileLoading = <Skeleton animation='wave' variant='circular' width={40} height={40} />
export const postLoading = <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

export const ChatSearchLoading = () => {
    return (
        <Box mt={1}>
            <Skeleton variant="rectangular" width={'90%'} height={60} sx={{ margin: 2 }} />
            <Skeleton variant="rectangular" width={'90%'} height={60} sx={{ margin: 2 }} />
            <Skeleton variant="rectangular" width={'90%'} height={60} sx={{ margin: 2 }} />
            <Skeleton variant="rectangular" width={'90%'} height={60} sx={{ margin: 2 }} />
            <Skeleton variant="rectangular" width={'90%'} height={60} sx={{ margin: 2 }} />
        </Box>

    )
}

