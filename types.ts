export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  companyLogo?: string;
  highlight?: boolean;
}

export interface Metric {
  label: string;
  value: string;
  trend?: string;
}
