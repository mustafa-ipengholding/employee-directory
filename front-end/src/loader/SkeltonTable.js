import { Container, Skeleton, Typography } from '@mui/material';
import React from 'react';

const SkeletonTable = () => {
    return (
        <Container>
            <Typography variant="h1">
                <Skeleton /> {/* Adjust width based on your preference */}
                <Skeleton  />
                <Skeleton  />
                <Skeleton />
                <Skeleton />
                <Skeleton />   
            </Typography>
        </Container>
    );
}

export default SkeletonTable;
