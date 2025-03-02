import React from 'react';
import Pagination from '@mui/material/Pagination';

const CustomPagination = ({ count, page, onChange }) => {
    return (
        <div className="flex justify-center mt-8">
            <Pagination
                count={count}
                page={page}
                onChange={onChange}
                color="primary"
                variant="outlined"
                shape="rounded"
            />
        </div>
    );
};

export default CustomPagination;