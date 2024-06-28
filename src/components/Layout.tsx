import Navbar from './Navbar'
import LeftSidebar from './LeftSidebar'
import { Box } from '@mui/material'
import RightSidebar from './RightSidebar'
import Content from './Content'

const Layout = () => {
    return (
        <Box>
            <Navbar />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <LeftSidebar />
                <Content />
                <RightSidebar />
            </Box>
        </Box>
    )
}

export default Layout