/*
  # Agriculture Platform Database Schema

  ## Overview
  This migration creates the complete database structure for the AI-powered agriculture platform.

  ## New Tables
  
  ### 1. `farmers`
  Stores farmer profile information
  - `id` (uuid, primary key) - Links to auth.users
  - `name` (text) - Farmer's full name
  - `mobile` (text) - Contact number
  - `village` (text) - Village name
  - `district` (text) - District name
  - `state` (text) - State name
  - `land_size` (numeric) - Land size in acres
  - `soil_type` (text) - Type of soil (e.g., clay, sandy, loamy)
  - `main_crops` (text[]) - Array of main crops grown
  - `annual_income_range` (text) - Income range category
  - `created_at` (timestamptz) - Registration timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `crop_history`
  Tracks crops grown by farmers over time
  - `id` (uuid, primary key)
  - `farmer_id` (uuid, foreign key to farmers)
  - `crop_name` (text) - Name of the crop
  - `season` (text) - Growing season
  - `year` (integer) - Year of cultivation
  - `yield_amount` (numeric) - Yield in quintals
  - `income_earned` (numeric) - Income from the crop
  - `created_at` (timestamptz)

  ### 3. `disease_detections`
  Stores disease detection history
  - `id` (uuid, primary key)
  - `farmer_id` (uuid, foreign key to farmers)
  - `crop_type` (text) - Type of crop
  - `disease_name` (text) - Detected disease name
  - `risk_level` (text) - Risk level (low, medium, high)
  - `image_url` (text) - Uploaded image URL
  - `treatment_advice` (text) - Treatment recommendations
  - `detected_at` (timestamptz)

  ### 4. `crop_recommendations`
  Stores AI crop recommendation history
  - `id` (uuid, primary key)
  - `farmer_id` (uuid, foreign key to farmers)
  - `soil_type` (text) - Soil type input
  - `rainfall` (numeric) - Rainfall in mm
  - `temperature` (numeric) - Temperature in celsius
  - `location` (text) - Location details
  - `recommended_crop` (text) - Primary recommendation
  - `alternative_crops` (text[]) - Alternative options
  - `expected_yield` (numeric) - Expected yield
  - `risk_level` (text) - Risk assessment
  - `created_at` (timestamptz)

  ### 5. `chat_history`
  Stores AI assistant chat conversations
  - `id` (uuid, primary key)
  - `farmer_id` (uuid, foreign key to farmers)
  - `message` (text) - User message
  - `response` (text) - AI response
  - `created_at` (timestamptz)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Farmers can only access their own data
  - Authenticated users required for all operations
*/

-- Create farmers table
CREATE TABLE IF NOT EXISTS farmers (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  mobile text NOT NULL,
  village text NOT NULL,
  district text NOT NULL,
  state text NOT NULL,
  land_size numeric NOT NULL,
  soil_type text NOT NULL,
  main_crops text[] DEFAULT '{}',
  annual_income_range text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create crop_history table
CREATE TABLE IF NOT EXISTS crop_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
  crop_name text NOT NULL,
  season text NOT NULL,
  year integer NOT NULL,
  yield_amount numeric DEFAULT 0,
  income_earned numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create disease_detections table
CREATE TABLE IF NOT EXISTS disease_detections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
  crop_type text NOT NULL,
  disease_name text NOT NULL,
  risk_level text NOT NULL,
  image_url text,
  treatment_advice text NOT NULL,
  detected_at timestamptz DEFAULT now()
);

-- Create crop_recommendations table
CREATE TABLE IF NOT EXISTS crop_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
  soil_type text NOT NULL,
  rainfall numeric NOT NULL,
  temperature numeric NOT NULL,
  location text NOT NULL,
  recommended_crop text NOT NULL,
  alternative_crops text[] DEFAULT '{}',
  expected_yield numeric NOT NULL,
  risk_level text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create chat_history table
CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
  message text NOT NULL,
  response text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE disease_detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for farmers table
CREATE POLICY "Farmers can view own profile"
  ON farmers FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Farmers can insert own profile"
  ON farmers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Farmers can update own profile"
  ON farmers FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for crop_history table
CREATE POLICY "Farmers can view own crop history"
  ON crop_history FOR SELECT
  TO authenticated
  USING (farmer_id = auth.uid());

CREATE POLICY "Farmers can insert own crop history"
  ON crop_history FOR INSERT
  TO authenticated
  WITH CHECK (farmer_id = auth.uid());

CREATE POLICY "Farmers can update own crop history"
  ON crop_history FOR UPDATE
  TO authenticated
  USING (farmer_id = auth.uid())
  WITH CHECK (farmer_id = auth.uid());

-- RLS Policies for disease_detections table
CREATE POLICY "Farmers can view own disease detections"
  ON disease_detections FOR SELECT
  TO authenticated
  USING (farmer_id = auth.uid());

CREATE POLICY "Farmers can insert own disease detections"
  ON disease_detections FOR INSERT
  TO authenticated
  WITH CHECK (farmer_id = auth.uid());

-- RLS Policies for crop_recommendations table
CREATE POLICY "Farmers can view own crop recommendations"
  ON crop_recommendations FOR SELECT
  TO authenticated
  USING (farmer_id = auth.uid());

CREATE POLICY "Farmers can insert own crop recommendations"
  ON crop_recommendations FOR INSERT
  TO authenticated
  WITH CHECK (farmer_id = auth.uid());

-- RLS Policies for chat_history table
CREATE POLICY "Farmers can view own chat history"
  ON chat_history FOR SELECT
  TO authenticated
  USING (farmer_id = auth.uid());

CREATE POLICY "Farmers can insert own chat history"
  ON chat_history FOR INSERT
  TO authenticated
  WITH CHECK (farmer_id = auth.uid());