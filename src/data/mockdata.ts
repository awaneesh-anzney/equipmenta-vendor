export type UserRole = 'admin' | 'vendor' | 'supervisor' | 'accounts';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

// Equipment/Vehicle categories for construction, mining, shipping
export const vehicleCategories = [
    // Mining & Earth Moving
    'Hyva', 'Dumper', 'Tipper', 'Excavator', 'Backhoe Loader', 'Bulldozer',
    'Wheel Loader', 'Motor Grader', 'Compactor / Roller',
    // Transport
    'Trailer', 'Flatbed Truck', 'Tanker', 'Water Tanker', 'Fuel Tanker',
    // Crane & Lifting
    'Mobile Crane', 'Tower Crane', 'Crawler Crane', 'Forklift',
    // Construction
    'Concrete Mixer', 'Transit Mixer', 'Boom Placer', 'Batching Plant',
    'Piling Rig', 'Rock Breaker', 'Drill Machine',
    // Others
    'Generator Set', 'Air Compressor', 'JCB', 'Poclain',
];

export const materialTypes = [
    'Overburden', 'Coal', 'Cement', 'Sand', 'Aggregate', 'Steel', 'Fly Ash',
    'Limestone', 'Iron Ore', 'Bauxite', 'Construction Material', 'Mixed',
];

export interface RequirementItem {
    id: string;
    vehicleCategory: string;
    capacity: string;
    quantityRequired: number;
    quantityAllocated: number;
    rateType: string;
}

export interface Requirement {
    id: string;
    projectName: string;
    clientName: string;
    siteLocation: string;
    materialType: string;
    items: RequirementItem[];
    reportingTime: string;
    dutyHours: string;
    dieselBy: string;
    paymentCycle: string;
    penaltyRule: string;
    startDate: string;
    endDate: string;
    replacementRequired: boolean;
    status: 'DRAFT' | 'LIVE' | 'AWARDED' | 'CLOSED';
    createdAt: string;
    bidsCount: number;
}

export interface Bid {
    id: string;
    requirementId: string;
    requirementItemId: string;
    vendorId: string;
    vendorName: string;
    vehicleCategory: string;
    vehiclesOffering: number;
    rate: number;
    joiningDays: number;
    vehicleAge: number;
    rating: number;
    distance: string;
    remarks: string;
    status: 'ACTIVE' | 'ACCEPTED' | 'REJECTED' | 'PARTIAL';
    createdAt: string;
}

export interface WorkOrder {
    id: string;
    requirementId: string;
    vendorId: string;
    vendorName: string;
    clientName: string;
    projectName: string;
    vehicleCategory: string;
    quantity: number;
    rate: number;
    rateType: string;
    validity: string;
    penaltyClause: string;
    paymentCycle: string;
    status: 'PENDING' | 'ACCEPTED' | 'ACTIVE' | 'EXPIRED';
    createdAt: string;
}

export interface Vehicle {
    id: string;
    vehicleNumber: string;
    vendorId: string;
    vendorName: string;
    driverName: string;
    driverLicense: string;
    fitnessExpiry: string;
    insuranceExpiry: string;
    category: string;
    capacity: string;
    assignedProject?: string;
    assignedRequirementId?: string;
    status: 'ACTIVE' | 'BREAKDOWN' | 'STANDBY' | 'REJECTED' | 'PENDING';
    photoUrl?: string;
}

export interface DailyOperation {
    id: string;
    vehicleNumber: string;
    vendorName: string;
    projectName: string;
    date: string;
    status: 'PRESENT' | 'ABSENT' | 'BREAKDOWN' | 'STANDBY';
    trips: number;
    extraTrips: number;
    remarks: string;
}

export interface BillingRecord {
    id: string;
    vendorId: string;
    vendorName: string;
    projectName: string;
    clientName: string;
    requirementId: string;
    month: string;
    totalTrips: number;
    rate: number;
    grossAmount: number;
    penaltyDeduction: number;
    dieselDeduction: number;
    extraShiftBonus: number;
    netAmount: number;
    status: 'GENERATED' | 'VERIFIED' | 'APPROVED' | 'PAID';
}

export const mockUsers: User[] = [
    { id: '1', name: 'Abdullah Al-Rashid', email: 'admin@transport.com', role: 'admin' },
    { id: '2', name: 'Fahad Al-Qahtani', email: 'vendor@transport.com', role: 'vendor' },
    { id: '3', name: 'Khalid Al-Harbi', email: 'supervisor@transport.com', role: 'supervisor' },
    { id: '4', name: 'Noura Al-Dosari', email: 'accounts@transport.com', role: 'accounts' },
];

export const mockRequirements: Requirement[] = [
    {
        id: 'REQ-001', projectName: 'NEOM Mega City', clientName: 'NEOM Company',
        siteLocation: 'Tabuk, Saudi Arabia', materialType: 'Construction Material',
        items: [
            { id: 'RI-001', vehicleCategory: 'Hyva', capacity: '20 Ton', quantityRequired: 25, quantityAllocated: 25, rateType: 'Per Trip' },
            { id: 'RI-002', vehicleCategory: 'Excavator', capacity: '210 LC', quantityRequired: 5, quantityAllocated: 5, rateType: 'Per Hour' },
            { id: 'RI-003', vehicleCategory: 'Water Tanker', capacity: '10000 Ltr', quantityRequired: 5, quantityAllocated: 5, rateType: 'Per Day' },
        ],
        reportingTime: '06:00 AM', dutyHours: '12hr', dieselBy: 'Company',
        paymentCycle: '30 days', penaltyRule: 'SAR 500/day absence',
        startDate: '2026-03-01', endDate: '2026-06-30', replacementRequired: true,
        status: 'AWARDED', createdAt: '2026-02-15', bidsCount: 8,
    },
    {
        id: 'REQ-002', projectName: 'Jeddah Tower Foundation', clientName: 'Jeddah Economic Co.',
        siteLocation: 'Jeddah, Saudi Arabia', materialType: 'Cement',
        items: [
            { id: 'RI-004', vehicleCategory: 'Dumper', capacity: '32 Ton', quantityRequired: 15, quantityAllocated: 0, rateType: 'Per Day' },
            { id: 'RI-005', vehicleCategory: 'Wheel Loader', capacity: '3 Cu.m', quantityRequired: 3, quantityAllocated: 0, rateType: 'Per Hour' },
            { id: 'RI-006', vehicleCategory: 'Mobile Crane', capacity: '25 Ton', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Day' },
        ],
        reportingTime: '07:00 AM', dutyHours: '24hr', dieselBy: 'Vendor',
        paymentCycle: '15 days', penaltyRule: 'SAR 1000/day absence',
        startDate: '2026-04-01', endDate: '2026-09-30', replacementRequired: true,
        status: 'LIVE', createdAt: '2026-02-18', bidsCount: 5,
    },
    {
        id: 'REQ-003', projectName: 'Riyadh Metro Line 3', clientName: 'Royal Commission Riyadh',
        siteLocation: 'Riyadh, Saudi Arabia', materialType: 'Aggregate',
        items: [
            { id: 'RI-007', vehicleCategory: 'Tipper', capacity: '16 Ton', quantityRequired: 10, quantityAllocated: 0, rateType: 'Per Trip' },
            { id: 'RI-008', vehicleCategory: 'JCB', capacity: '3DX', quantityRequired: 4, quantityAllocated: 0, rateType: 'Per Hour' },
        ],
        reportingTime: '06:30 AM', dutyHours: '12hr', dieselBy: 'Company',
        paymentCycle: '30 days', penaltyRule: 'SAR 300/day absence',
        startDate: '2026-03-15', endDate: '2026-07-15', replacementRequired: false,
        status: 'DRAFT', createdAt: '2026-02-20', bidsCount: 0,
    },
    {
        id: 'REQ-004', projectName: 'Jubail Industrial Port', clientName: 'Saudi Ports Authority',
        siteLocation: 'Jubail, Eastern Province', materialType: 'Mixed',
        items: [
            { id: 'RI-009', vehicleCategory: 'Trailer', capacity: '40 Ton', quantityRequired: 8, quantityAllocated: 5, rateType: 'Per Ton' },
            { id: 'RI-010', vehicleCategory: 'Poclain', capacity: '220', quantityRequired: 3, quantityAllocated: 2, rateType: 'Per Hour' },
            { id: 'RI-011', vehicleCategory: 'Bulldozer', capacity: 'D6', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Hour' },
            { id: 'RI-012', vehicleCategory: 'Motor Grader', capacity: '180 HP', quantityRequired: 1, quantityAllocated: 1, rateType: 'Per Day' },
        ],
        reportingTime: '05:00 AM', dutyHours: '12hr', dieselBy: 'Company',
        paymentCycle: '15 days', penaltyRule: 'SAR 700/day absence',
        startDate: '2026-03-10', endDate: '2026-08-10', replacementRequired: true,
        status: 'LIVE', createdAt: '2026-02-17', bidsCount: 11,
    },
    {
        id: 'REQ-005', projectName: 'The Red Sea Resort', clientName: 'Red Sea Global',
        siteLocation: 'Umluj, Saudi Arabia', materialType: 'Construction Material',
        items: [
            { id: 'RI-013', vehicleCategory: 'Transit Mixer', capacity: '6 Cu.m', quantityRequired: 12, quantityAllocated: 0, rateType: 'Per Trip' },
            { id: 'RI-014', vehicleCategory: 'Boom Placer', capacity: '36m', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Day' },
            { id: 'RI-015', vehicleCategory: 'Tower Crane', capacity: '10 Ton', quantityRequired: 3, quantityAllocated: 0, rateType: 'Per Month' },
            { id: 'RI-016', vehicleCategory: 'Piling Rig', capacity: '1200mm', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Day' },
        ],
        reportingTime: '06:00 AM', dutyHours: '24hr', dieselBy: 'Vendor',
        paymentCycle: '30 days', penaltyRule: 'SAR 2000/day absence',
        startDate: '2026-04-15', endDate: '2027-04-14', replacementRequired: true,
        status: 'LIVE', createdAt: '2026-02-19', bidsCount: 3,
    },
];

export const mockBids: Bid[] = [
    // REQ-001 bids
    { id: 'BID-001', requirementId: 'REQ-001', requirementItemId: 'RI-001', vendorId: '2', vendorName: 'Al-Qahtani Transport', vehicleCategory: 'Hyva', vehiclesOffering: 10, rate: 850, joiningDays: 2, vehicleAge: 2022, rating: 4.5, distance: '40km', remarks: 'New vehicles', status: 'ACCEPTED', createdAt: '2026-02-16' },
    { id: 'BID-002', requirementId: 'REQ-001', requirementItemId: 'RI-001', vendorId: '5', vendorName: 'Al-Mutlaq Fleet Services', vehicleCategory: 'Hyva', vehiclesOffering: 15, rate: 820, joiningDays: 3, vehicleAge: 2018, rating: 3.8, distance: '110km', remarks: 'Experienced drivers', status: 'PARTIAL', createdAt: '2026-02-16' },
    { id: 'BID-003', requirementId: 'REQ-001', requirementItemId: 'RI-001', vendorId: '6', vendorName: 'Al-Otaibi Logistics', vehicleCategory: 'Hyva', vehiclesOffering: 10, rate: 900, joiningDays: 1, vehicleAge: 2024, rating: 4.9, distance: '20km', remarks: 'Premium fleet', status: 'ACCEPTED', createdAt: '2026-02-16' },
    { id: 'BID-008', requirementId: 'REQ-001', requirementItemId: 'RI-002', vendorId: '8', vendorName: 'Saudi Heavy Equipment', vehicleCategory: 'Excavator', vehiclesOffering: 5, rate: 1500, joiningDays: 3, vehicleAge: 2023, rating: 4.6, distance: '50km', remarks: 'Komatsu PC210', status: 'ACCEPTED', createdAt: '2026-02-16' },
    { id: 'BID-009', requirementId: 'REQ-001', requirementItemId: 'RI-003', vendorId: '2', vendorName: 'Al-Qahtani Transport', vehicleCategory: 'Water Tanker', vehiclesOffering: 5, rate: 1200, joiningDays: 1, vehicleAge: 2021, rating: 4.5, distance: '40km', remarks: '10KL tankers', status: 'ACCEPTED', createdAt: '2026-02-16' },
    // REQ-002 bids
    { id: 'BID-004', requirementId: 'REQ-002', requirementItemId: 'RI-004', vendorId: '2', vendorName: 'Al-Qahtani Transport', vehicleCategory: 'Dumper', vehiclesOffering: 8, rate: 1400, joiningDays: 3, vehicleAge: 2021, rating: 4.5, distance: '60km', remarks: '32 ton capacity', status: 'ACTIVE', createdAt: '2026-02-19' },
    { id: 'BID-005', requirementId: 'REQ-002', requirementItemId: 'RI-004', vendorId: '7', vendorName: 'Al-Shammari Carriers', vehicleCategory: 'Dumper', vehiclesOffering: 12, rate: 1350, joiningDays: 2, vehicleAge: 2020, rating: 4.2, distance: '85km', remarks: 'Construction specialist', status: 'ACTIVE', createdAt: '2026-02-19' },
    { id: 'BID-010', requirementId: 'REQ-002', requirementItemId: 'RI-005', vendorId: '8', vendorName: 'Saudi Heavy Equipment', vehicleCategory: 'Wheel Loader', vehiclesOffering: 3, rate: 1800, joiningDays: 4, vehicleAge: 2022, rating: 4.6, distance: '50km', remarks: 'CAT 950', status: 'ACTIVE', createdAt: '2026-02-19' },
    // REQ-004 bids
    { id: 'BID-006', requirementId: 'REQ-004', requirementItemId: 'RI-009', vendorId: '2', vendorName: 'Al-Qahtani Transport', vehicleCategory: 'Trailer', vehiclesOffering: 5, rate: 25, joiningDays: 2, vehicleAge: 2023, rating: 4.5, distance: '30km', remarks: 'Per ton rate', status: 'ACCEPTED', createdAt: '2026-02-18' },
    { id: 'BID-007', requirementId: 'REQ-004', requirementItemId: 'RI-010', vendorId: '8', vendorName: 'Saudi Heavy Equipment', vehicleCategory: 'Poclain', vehiclesOffering: 2, rate: 1600, joiningDays: 2, vehicleAge: 2022, rating: 4.6, distance: '50km', remarks: 'Tata Hitachi EX200', status: 'ACCEPTED', createdAt: '2026-02-18' },
    { id: 'BID-011', requirementId: 'REQ-004', requirementItemId: 'RI-009', vendorId: '7', vendorName: 'Al-Shammari Carriers', vehicleCategory: 'Trailer', vehiclesOffering: 4, rate: 22, joiningDays: 3, vehicleAge: 2021, rating: 4.2, distance: '85km', remarks: 'Flatbed trailers', status: 'ACTIVE', createdAt: '2026-02-18' },
    { id: 'BID-012', requirementId: 'REQ-004', requirementItemId: 'RI-011', vendorId: '9', vendorName: 'Gulf Earthmovers', vehicleCategory: 'Bulldozer', vehiclesOffering: 2, rate: 2400, joiningDays: 5, vehicleAge: 2020, rating: 4.0, distance: '120km', remarks: 'D6 Cat', status: 'ACTIVE', createdAt: '2026-02-18' },
    // REQ-005 bids
    { id: 'BID-013', requirementId: 'REQ-005', requirementItemId: 'RI-013', vendorId: '10', vendorName: 'Al-Jazira Concrete Co.', vehicleCategory: 'Transit Mixer', vehiclesOffering: 8, rate: 950, joiningDays: 2, vehicleAge: 2023, rating: 4.3, distance: '15km', remarks: 'Schwing Stetter', status: 'ACTIVE', createdAt: '2026-02-20' },
    { id: 'BID-014', requirementId: 'REQ-005', requirementItemId: 'RI-014', vendorId: '10', vendorName: 'Al-Jazira Concrete Co.', vehicleCategory: 'Boom Placer', vehiclesOffering: 2, rate: 3600, joiningDays: 3, vehicleAge: 2024, rating: 4.3, distance: '15km', remarks: '36m reach', status: 'ACTIVE', createdAt: '2026-02-20' },
];

export const mockWorkOrders: WorkOrder[] = [
    { id: 'WO-001', requirementId: 'REQ-001', vendorId: '2', vendorName: 'Al-Qahtani Transport', clientName: 'NEOM Company', projectName: 'NEOM Mega City', vehicleCategory: 'Hyva', quantity: 10, rate: 850, rateType: 'Per Trip', validity: '01 Mar - 30 Jun 2026', penaltyClause: 'SAR 500/day absence', paymentCycle: '30 days', status: 'ACTIVE', createdAt: '2026-02-17' },
    { id: 'WO-002', requirementId: 'REQ-001', vendorId: '6', vendorName: 'Al-Otaibi Logistics', clientName: 'NEOM Company', projectName: 'NEOM Mega City', vehicleCategory: 'Hyva', quantity: 10, rate: 900, rateType: 'Per Trip', validity: '01 Mar - 30 Jun 2026', penaltyClause: 'SAR 500/day absence', paymentCycle: '30 days', status: 'ACTIVE', createdAt: '2026-02-17' },
    { id: 'WO-003', requirementId: 'REQ-001', vendorId: '5', vendorName: 'Al-Mutlaq Fleet Services', clientName: 'NEOM Company', projectName: 'NEOM Mega City', vehicleCategory: 'Hyva', quantity: 5, rate: 820, rateType: 'Per Trip', validity: '01 Mar - 30 Jun 2026', penaltyClause: 'SAR 500/day absence', paymentCycle: '30 days', status: 'PENDING', createdAt: '2026-02-17' },
    { id: 'WO-004', requirementId: 'REQ-001', vendorId: '8', vendorName: 'Saudi Heavy Equipment', clientName: 'NEOM Company', projectName: 'NEOM Mega City', vehicleCategory: 'Excavator', quantity: 5, rate: 1500, rateType: 'Per Hour', validity: '01 Mar - 30 Jun 2026', penaltyClause: 'SAR 500/day absence', paymentCycle: '30 days', status: 'ACTIVE', createdAt: '2026-02-17' },
    { id: 'WO-005', requirementId: 'REQ-001', vendorId: '2', vendorName: 'Al-Qahtani Transport', clientName: 'NEOM Company', projectName: 'NEOM Mega City', vehicleCategory: 'Water Tanker', quantity: 5, rate: 1200, rateType: 'Per Day', validity: '01 Mar - 30 Jun 2026', penaltyClause: 'SAR 500/day absence', paymentCycle: '30 days', status: 'ACTIVE', createdAt: '2026-02-17' },
    { id: 'WO-006', requirementId: 'REQ-004', vendorId: '2', vendorName: 'Al-Qahtani Transport', clientName: 'Saudi Ports Authority', projectName: 'Jubail Industrial Port', vehicleCategory: 'Trailer', quantity: 5, rate: 25, rateType: 'Per Ton', validity: '10 Mar - 10 Aug 2026', penaltyClause: 'SAR 700/day absence', paymentCycle: '15 days', status: 'ACTIVE', createdAt: '2026-02-18' },
    { id: 'WO-007', requirementId: 'REQ-004', vendorId: '8', vendorName: 'Saudi Heavy Equipment', clientName: 'Saudi Ports Authority', projectName: 'Jubail Industrial Port', vehicleCategory: 'Poclain', quantity: 2, rate: 1600, rateType: 'Per Hour', validity: '10 Mar - 10 Aug 2026', penaltyClause: 'SAR 700/day absence', paymentCycle: '15 days', status: 'PENDING', createdAt: '2026-02-18' },
];

export const mockVehicles: Vehicle[] = [
    { id: 'V-001', vehicleNumber: 'KSA-1234-ABD', vendorId: '2', vendorName: 'Al-Qahtani Transport', driverName: 'Mohammed Al-Zahrani', driverLicense: 'SA-1234567', fitnessExpiry: '2026-12-31', insuranceExpiry: '2026-11-15', category: 'Hyva', capacity: '20 Ton', assignedProject: 'NEOM Mega City', assignedRequirementId: 'REQ-001', status: 'ACTIVE' },
    { id: 'V-002', vehicleNumber: 'KSA-5678-RYD', vendorId: '2', vendorName: 'Al-Qahtani Transport', driverName: 'Saeed Al-Ghamdi', driverLicense: 'SA-7654321', fitnessExpiry: '2026-08-20', insuranceExpiry: '2026-06-10', category: 'Hyva', capacity: '20 Ton', assignedProject: 'NEOM Mega City', assignedRequirementId: 'REQ-001', status: 'ACTIVE' },
    { id: 'V-003', vehicleNumber: 'KSA-9012-JED', vendorId: '6', vendorName: 'Al-Otaibi Logistics', driverName: 'Yusuf Al-Malki', driverLicense: 'SA-9876543', fitnessExpiry: '2026-10-15', insuranceExpiry: '2027-01-20', category: 'Hyva', capacity: '20 Ton', assignedProject: 'NEOM Mega City', assignedRequirementId: 'REQ-001', status: 'BREAKDOWN' },
    { id: 'V-004', vehicleNumber: 'KSA-3456-DMM', vendorId: '6', vendorName: 'Al-Otaibi Logistics', driverName: 'Omar Al-Harbi', driverLicense: 'SA-1122334', fitnessExpiry: '2026-05-01', insuranceExpiry: '2026-04-18', category: 'Hyva', capacity: '20 Ton', assignedProject: 'NEOM Mega City', assignedRequirementId: 'REQ-001', status: 'PENDING' },
    { id: 'V-005', vehicleNumber: 'KSA-7890-TBK', vendorId: '5', vendorName: 'Al-Mutlaq Fleet Services', driverName: 'Hassan Al-Subaie', driverLicense: 'SA-5566778', fitnessExpiry: '2027-03-01', insuranceExpiry: '2027-02-15', category: 'Hyva', capacity: '20 Ton', assignedProject: 'NEOM Mega City', assignedRequirementId: 'REQ-001', status: 'STANDBY' },
    { id: 'V-006', vehicleNumber: 'KSA-2345-MED', vendorId: '8', vendorName: 'Saudi Heavy Equipment', driverName: 'Tariq Al-Dossary', driverLicense: 'SA-9988776', fitnessExpiry: '2027-01-15', insuranceExpiry: '2027-03-20', category: 'Excavator', capacity: '210 LC', assignedProject: 'NEOM Mega City', assignedRequirementId: 'REQ-001', status: 'ACTIVE' },
    { id: 'V-007', vehicleNumber: 'KSA-6789-JBL', vendorId: '2', vendorName: 'Al-Qahtani Transport', driverName: 'Ali Al-Sharif', driverLicense: 'SA-4455667', fitnessExpiry: '2026-09-30', insuranceExpiry: '2026-10-15', category: 'Water Tanker', capacity: '10000 Ltr', assignedProject: 'NEOM Mega City', assignedRequirementId: 'REQ-001', status: 'ACTIVE' },
    { id: 'V-008', vehicleNumber: 'KSA-1122-KHB', vendorId: '2', vendorName: 'Al-Qahtani Transport', driverName: 'Nasser Al-Qahtani', driverLicense: 'SA-7788990', fitnessExpiry: '2026-11-01', insuranceExpiry: '2026-12-20', category: 'Trailer', capacity: '40 Ton', assignedProject: 'Jubail Industrial Port', assignedRequirementId: 'REQ-004', status: 'ACTIVE' },
];

export const mockOperations: DailyOperation[] = [
    { id: 'OP-001', vehicleNumber: 'KSA-1234-ABD', vendorName: 'Al-Qahtani Transport', projectName: 'NEOM Mega City', date: '2026-02-20', status: 'PRESENT', trips: 8, extraTrips: 1, remarks: '' },
    { id: 'OP-002', vehicleNumber: 'KSA-5678-RYD', vendorName: 'Al-Qahtani Transport', projectName: 'NEOM Mega City', date: '2026-02-20', status: 'PRESENT', trips: 7, extraTrips: 0, remarks: '' },
    { id: 'OP-003', vehicleNumber: 'KSA-9012-JED', vendorName: 'Al-Otaibi Logistics', projectName: 'NEOM Mega City', date: '2026-02-20', status: 'BREAKDOWN', trips: 0, extraTrips: 0, remarks: 'Engine issue' },
    { id: 'OP-004', vehicleNumber: 'KSA-3456-DMM', vendorName: 'Al-Otaibi Logistics', projectName: 'NEOM Mega City', date: '2026-02-20', status: 'ABSENT', trips: 0, extraTrips: 0, remarks: 'Driver not available' },
    { id: 'OP-005', vehicleNumber: 'KSA-7890-TBK', vendorName: 'Al-Mutlaq Fleet Services', projectName: 'NEOM Mega City', date: '2026-02-20', status: 'STANDBY', trips: 0, extraTrips: 0, remarks: 'Waiting for allocation' },
    { id: 'OP-006', vehicleNumber: 'KSA-2345-MED', vendorName: 'Saudi Heavy Equipment', projectName: 'NEOM Mega City', date: '2026-02-20', status: 'PRESENT', trips: 0, extraTrips: 0, remarks: '8hrs operation' },
    { id: 'OP-007', vehicleNumber: 'KSA-1122-KHB', vendorName: 'Al-Qahtani Transport', projectName: 'Jubail Industrial Port', date: '2026-02-20', status: 'PRESENT', trips: 4, extraTrips: 0, remarks: '' },
];

export const mockBilling: BillingRecord[] = [
    { id: 'BILL-001', vendorId: '2', vendorName: 'Al-Qahtani Transport', projectName: 'NEOM Mega City', clientName: 'NEOM Company', requirementId: 'REQ-001', month: 'January 2026', totalTrips: 480, rate: 850, grossAmount: 408000, penaltyDeduction: 2500, dieselDeduction: 0, extraShiftBonus: 8500, netAmount: 414000, status: 'PAID' },
    { id: 'BILL-002', vendorId: '6', vendorName: 'Al-Otaibi Logistics', projectName: 'NEOM Mega City', clientName: 'NEOM Company', requirementId: 'REQ-001', month: 'January 2026', totalTrips: 650, rate: 900, grossAmount: 585000, penaltyDeduction: 1500, dieselDeduction: 0, extraShiftBonus: 13500, netAmount: 597000, status: 'APPROVED' },
    { id: 'BILL-003', vendorId: '5', vendorName: 'Al-Mutlaq Fleet Services', projectName: 'NEOM Mega City', clientName: 'NEOM Company', requirementId: 'REQ-001', month: 'January 2026', totalTrips: 390, rate: 820, grossAmount: 319800, penaltyDeduction: 4000, dieselDeduction: 0, extraShiftBonus: 4100, netAmount: 319900, status: 'VERIFIED' },
    { id: 'BILL-004', vendorId: '2', vendorName: 'Al-Qahtani Transport', projectName: 'NEOM Mega City', clientName: 'NEOM Company', requirementId: 'REQ-001', month: 'February 2026', totalTrips: 320, rate: 850, grossAmount: 272000, penaltyDeduction: 1200, dieselDeduction: 0, extraShiftBonus: 5100, netAmount: 275900, status: 'GENERATED' },
    { id: 'BILL-005', vendorId: '8', vendorName: 'Saudi Heavy Equipment', projectName: 'NEOM Mega City', clientName: 'NEOM Company', requirementId: 'REQ-001', month: 'January 2026', totalTrips: 0, rate: 1500, grossAmount: 225000, penaltyDeduction: 0, dieselDeduction: 0, extraShiftBonus: 0, netAmount: 225000, status: 'VERIFIED' },
    { id: 'BILL-006', vendorId: '2', vendorName: 'Al-Qahtani Transport', projectName: 'Jubail Industrial Port', clientName: 'Saudi Ports Authority', requirementId: 'REQ-004', month: 'January 2026', totalTrips: 180, rate: 25, grossAmount: 180000, penaltyDeduction: 1800, dieselDeduction: 0, extraShiftBonus: 2200, netAmount: 180400, status: 'GENERATED' },
];

export const dashboardStats = {
    admin: {
        totalRequirements: 5,
        liveRequirements: 3,
        totalVehicles: 52,
        activeVehicles: 44,
        pendingBids: 12,
        monthlyRevenue: 2012300,
    },
    vendor: {
        activeOrders: 4,
        vehiclesDeployed: 18,
        pendingPayments: 456300,
        totalEarnings: 1209900,
        openBids: 3,
    },
    supervisor: {
        vehiclesPresent: 38,
        vehiclesAbsent: 4,
        breakdowns: 3,
        standby: 3,
        pendingApprovals: 2,
    },
};

// Helper: get requirement details for a bid
export const getRequirementForBid = (bid: Bid) => {
    const req = mockRequirements.find(r => r.id === bid.requirementId);
    return req ? { projectName: req.projectName, clientName: req.clientName, siteLocation: req.siteLocation } : null;
};

export const CURRENT_VENDOR_ID = '2';
export const currentVendor = {
    id: CURRENT_VENDOR_ID,
    name: 'Fahad Al-Qahtani',
    company: 'Al-Qahtani Transport',
    email: 'vendor@transport.com',
    avatar: 'FA',
};

export const mockVendorBids = mockBids.filter(b => b.vendorId === CURRENT_VENDOR_ID);
export const mockVendorWorkOrders = mockWorkOrders.filter(w => w.vendorId === CURRENT_VENDOR_ID);
export const mockVendorVehicles = mockVehicles.filter(v => v.vendorId === CURRENT_VENDOR_ID);
export const mockVendorBilling = mockBilling.filter(b => b.vendorId === CURRENT_VENDOR_ID);
export const vendorDashboardStats = dashboardStats.vendor;

export function getRequirementById(id: string): Requirement | undefined {
    return mockRequirements.find(r => r.id === id);
}

export function formatSAR(amount: number): string {
    return 'SAR ' + amount.toLocaleString('en-SA');
}

export function computeBillingSummary(records: BillingRecord[]) {
    const total = records.reduce((s, r) => s + r.netAmount, 0);
    const received = records.filter(r => r.status === 'PAID').reduce((s, r) => s + r.netAmount, 0);
    return { total, received, outstanding: total - received };
}

export const RATE_TYPE_OPTIONS = [
    { label: 'Per Trip', value: 'Per Trip' },
    { label: 'Per Hour', value: 'Per Hour' },
    { label: 'Per Day', value: 'Per Day' },
    { label: 'Per Ton', value: 'Per Ton' },
    { label: 'Per Month', value: 'Per Month' },
];
