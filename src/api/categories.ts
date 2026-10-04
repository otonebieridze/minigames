import { apiGet } from './client';

export interface Category {
  slug: string;
  label: string;
  isDefault: boolean;
}

interface CategoriesResponse {
  data: Category[];
}

export async function getCategories(): Promise<Category[]> {
  const response = await apiGet<CategoriesResponse>('/api/categories');
  return response.data;
}
