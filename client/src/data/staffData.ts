export interface StaffMember {
  id: string;
  name: string;
  position: string;
  speech: string;
  additionalInfo?: string;
  image: string;
}

export const staffData: StaffMember[] = [
  {
    id: 'managing-director',
    name: 'Father Alexandre NTABANGANYIMANA',
    position: 'Managing Director',
    speech: 'Leading DERN SEED Company Ltd with a deep commitment to agricultural development and community service.',
    image: '/gallery/managing director.jpeg',
  },
  {
    id: 'chief-operations-officer',
    name: 'Cassien TWAGIRIMANA',
    position: 'Chief Operations Officer',
    speech: 'Oversees operational excellence to ensure seed production and delivery meet the highest standards.',
    additionalInfo:
      'Mr. Cassien Twagirimana is the Officer in Charge of Seed Production and Inspection at Dern Seed Company Ltd, where he oversees seed multiplication, quality assurance, field inspection, and certification processes to ensure farmers receive high-quality planting materials.',
    image: '/gallery/Chief Operations Officer (COO).jpeg',
  },
  {
    id: 'chief-finance-officer',
    name: 'Mediatrice MUJAWIYERA',
    position: 'Chief Finance Officer',
    speech: "Manages the company's financial strategy and supports sustainable growth for the business.",
    image: '/gallery/Chief Finance Officer.jpeg',
  },
];
