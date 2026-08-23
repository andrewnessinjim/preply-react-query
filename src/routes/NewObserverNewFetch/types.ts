export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  bio: string;
}

export interface ProfileViewerProps {
  label: string;
  now: number;
}
