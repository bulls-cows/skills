import type { ResumeData } from '@/types/resume';
import { sampleData } from '@/data/resume-data';
import { cacheRef } from '@/utils/storageUtils';

export const resumeData = cacheRef<ResumeData>('resumeData', sampleData);
