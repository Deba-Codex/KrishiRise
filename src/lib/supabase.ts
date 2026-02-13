import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface FarmerProfile {
  id: string;
  name: string;
  mobile: string;
  village: string;
  district: string;
  state: string;
  land_size: number;
  soil_type: string;
  main_crops: string[];
  annual_income_range: string;
  created_at: string;
  updated_at: string;
}

export interface CropHistory {
  id: string;
  farmer_id: string;
  crop_name: string;
  season: string;
  year: number;
  yield_amount: number;
  income_earned: number;
  created_at: string;
}

export interface DiseaseDetection {
  id: string;
  farmer_id: string;
  crop_type: string;
  disease_name: string;
  risk_level: string;
  image_url: string | null;
  treatment_advice: string;
  detected_at: string;
}

export interface CropRecommendation {
  id: string;
  farmer_id: string;
  soil_type: string;
  rainfall: number;
  temperature: number;
  location: string;
  recommended_crop: string;
  alternative_crops: string[];
  expected_yield: number;
  risk_level: string;
  created_at: string;
}
