-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'secretary', 'manager', 'director', 'auditor');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create daily_records table for daily entries
CREATE TABLE public.daily_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  record_date DATE NOT NULL UNIQUE,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create driver_entries table for KIA, BONGO, MOTOR KING
CREATE TABLE public.driver_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_record_id UUID REFERENCES public.daily_records(id) ON DELETE CASCADE NOT NULL,
  driver_name TEXT NOT NULL CHECK (driver_name IN ('KIA', 'BONGO', 'MOTOR KING')),
  bags_delivered INTEGER NOT NULL DEFAULT 0 CHECK (bags_delivered >= 0),
  sales_amount DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (sales_amount >= 0),
  fuel_cost DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (fuel_cost >= 0),
  net_sales DECIMAL(10,2) GENERATED ALWAYS AS (sales_amount - fuel_cost) STORED,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (daily_record_id, driver_name)
);

-- Create expenses table
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_record_id UUID REFERENCES public.daily_records(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notification_log table to track sent notifications
CREATE TABLE public.notification_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_record_id UUID REFERENCES public.daily_records(id) ON DELETE CASCADE NOT NULL,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('new_submission', 'update')),
  sent_by UUID REFERENCES auth.users(id) NOT NULL,
  sent_to TEXT[] NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_log ENABLE ROW LEVEL SECURITY;

-- Security definer function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Security definer function to check if user has any admin role
CREATE OR REPLACE FUNCTION public.has_any_role(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
  )
$$;

-- Function to get user's highest role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY 
    CASE role 
      WHEN 'super_admin' THEN 1 
      WHEN 'manager' THEN 2 
      WHEN 'secretary' THEN 3 
      WHEN 'director' THEN 4 
      WHEN 'auditor' THEN 5 
    END
  LIMIT 1
$$;

-- Function to get all super admin emails for notifications
CREATE OR REPLACE FUNCTION public.get_super_admin_emails()
RETURNS TEXT[]
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ARRAY_AGG(p.email)
  FROM public.profiles p
  INNER JOIN public.user_roles ur ON ur.user_id = p.user_id
  WHERE ur.role = 'super_admin'
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles if they have a role"
ON public.profiles FOR SELECT
TO authenticated
USING (public.has_any_role(auth.uid()));

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- RLS Policies for user_roles
CREATE POLICY "Super admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Super admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'))
WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for daily_records (all authorized users can view, create, update)
CREATE POLICY "Authorized users can view daily records"
ON public.daily_records FOR SELECT
TO authenticated
USING (public.has_any_role(auth.uid()));

CREATE POLICY "Secretary/Manager/SuperAdmin can create daily records"
ON public.daily_records FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'secretary') OR 
  public.has_role(auth.uid(), 'manager')
);

CREATE POLICY "Secretary/Manager/SuperAdmin can update daily records"
ON public.daily_records FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'secretary') OR 
  public.has_role(auth.uid(), 'manager')
);

CREATE POLICY "Super admins can delete daily records"
ON public.daily_records FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for driver_entries
CREATE POLICY "Authorized users can view driver entries"
ON public.driver_entries FOR SELECT
TO authenticated
USING (public.has_any_role(auth.uid()));

CREATE POLICY "Secretary/Manager/SuperAdmin can manage driver entries"
ON public.driver_entries FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'secretary') OR 
  public.has_role(auth.uid(), 'manager')
)
WITH CHECK (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'secretary') OR 
  public.has_role(auth.uid(), 'manager')
);

-- RLS Policies for expenses
CREATE POLICY "Authorized users can view expenses"
ON public.expenses FOR SELECT
TO authenticated
USING (public.has_any_role(auth.uid()));

CREATE POLICY "Secretary/Manager/SuperAdmin can manage expenses"
ON public.expenses FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'secretary') OR 
  public.has_role(auth.uid(), 'manager')
)
WITH CHECK (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'secretary') OR 
  public.has_role(auth.uid(), 'manager')
);

-- RLS Policies for notification_log
CREATE POLICY "Super admins can view notification logs"
ON public.notification_log FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can insert notification logs"
ON public.notification_log FOR INSERT
TO authenticated
WITH CHECK (public.has_any_role(auth.uid()));

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_daily_records_updated_at
BEFORE UPDATE ON public.daily_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_driver_entries_updated_at
BEFORE UPDATE ON public.driver_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at
BEFORE UPDATE ON public.expenses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();