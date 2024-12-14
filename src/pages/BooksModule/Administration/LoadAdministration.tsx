'use client'
import { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import * as React from 'react';
import BookAdministration from './BookAdministration';
import CategoryAdministration from './CategoryAdministration';
import SubategoryAdministration from './SubcategoryAdministration';
import { ArrowBack } from '@mui/icons-material';

const MemoizedBookAdministration = React.memo(BookAdministration);
const MemoizedCategoryAdministration = React.memo(CategoryAdministration);
const MemoizedSubcategoryAdministration = React.memo(SubategoryAdministration);

interface Props {
    value: string;
    toggleMain: () => void;
}

export default function LoadAdministration(props: Props) {
    const {value, toggleMain} = props;
  
    const handlePage = useMemo(() => {
        switch(value){
            case "books":
                return <MemoizedBookAdministration />;
            case "categories":
                return <MemoizedCategoryAdministration />;
            case "subcategories":
                return <MemoizedSubcategoryAdministration />;
        }
    }, [value]);

  return (
    <div style={{ padding: '2rem' }}>
    <Button
        startIcon={<ArrowBack />}
        onClick={toggleMain}
        >
        Volver
    </Button> 
    {handlePage}
    </div>
  );
}