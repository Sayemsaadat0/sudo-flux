import React from 'react';
import CareerDetailsContainer from '../_components/CareerDetailsContainer';
import { CareerResponseType } from '@/hooks/careers.hooks';
import { notFound } from 'next/navigation';

// Server-side data fetching for individual career
async function getCareer(id: string): Promise<CareerResponseType | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000';
    const response = await fetch(`${baseUrl}/api/careers/${id}`, {
      cache: 'no-store', 
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      console.error('Failed to fetch career:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.success ? data.career : null;
  } catch (error) {
    console.error('Error fetching career:', error);
    return null;
  }
}

interface CareerDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CareerDetailsPage = async ({ params }: CareerDetailsPageProps) => {
  const { id } = await params;
  const career = await getCareer(id);

  if (!career) {
    notFound();
  }

  return <CareerDetailsContainer career={career} />;
};

export default CareerDetailsPage;
