// ─────────────────────────────────────────────────────────────
//  src/data/mockdata.ts
//  Vendor-side mock data — used by all vendor panel components
//  Current vendor: Sunil Sharma (Sharma Transport) — vendorId: '2'
// ─────────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────

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
    rateType: string;
    joiningDays: number;
    vehicleAge: number;
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
    siteLocation: string;
    vehicleCategory: string;
    quantity: number;
    rate: number;
    rateType: string;
    validity: string;
    startDate: string;
    endDate: string;
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
}

export interface BillingRecord {
    id: string;
    vendorId: string;
    vendorName: string;
    projectName: string;
    clientName: string;
    requirementId: string;
    workOrderId: string;
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

export interface VendorDashboardStats {
    activeOrders: number;
    vehiclesDeployed: number;
    pendingPayments: number;
    totalEarnings: number;
    openBids: number;
    activeBids: number;
}

// ── Current Vendor ───────────────────────────────────────────
export const CURRENT_VENDOR_ID = '2';
export const currentVendor = {
    id: CURRENT_VENDOR_ID,
    name: 'Sunil Sharma',
    company: 'Sharma Transport',
    email: 'vendor@transport.com',
    avatar: 'SS',
};

// ── Requirements visible to vendor (LIVE + AWARDED only) ─────
// Vendor can browse these to place bids
export const mockRequirements: Requirement[] = [
    {
        id: 'REQ-001',
        projectName: 'Pakri Barwadih Mine',
        clientName: 'NTPC Ltd',
        siteLocation: 'Jharkhand',
        materialType: 'Overburden',
        items: [
            { id: 'RI-001', vehicleCategory: 'Hyva', capacity: '20 Ton', quantityRequired: 25, quantityAllocated: 25, rateType: 'Per Trip' },
            { id: 'RI-002', vehicleCategory: 'Excavator', capacity: '210 LC', quantityRequired: 5, quantityAllocated: 5, rateType: 'Per Hour' },
            { id: 'RI-003', vehicleCategory: 'Water Tanker', capacity: '10000 Ltr', quantityRequired: 5, quantityAllocated: 5, rateType: 'Per Day' },
        ],
        reportingTime: '06:00 AM', dutyHours: '12hr', dieselBy: 'Company',
        paymentCycle: '30 days', penaltyRule: '₹500/day absence',
        startDate: '2026-03-01', endDate: '2026-06-30',
        replacementRequired: true, status: 'AWARDED', createdAt: '2026-02-15', bidsCount: 8,
    },
    {
        id: 'REQ-002',
        projectName: 'Godda Thermal Plant',
        clientName: 'Adani Power',
        siteLocation: 'Godda, Jharkhand',
        materialType: 'Coal',
        items: [
            { id: 'RI-004', vehicleCategory: 'Dumper', capacity: '32 Ton', quantityRequired: 15, quantityAllocated: 0, rateType: 'Per Day' },
            { id: 'RI-005', vehicleCategory: 'Wheel Loader', capacity: '3 Cu.m', quantityRequired: 3, quantityAllocated: 0, rateType: 'Per Hour' },
            { id: 'RI-006', vehicleCategory: 'Mobile Crane', capacity: '25 Ton', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Day' },
        ],
        reportingTime: '07:00 AM', dutyHours: '24hr', dieselBy: 'Vendor',
        paymentCycle: '15 days', penaltyRule: '₹1000/day absence',
        startDate: '2026-04-01', endDate: '2026-09-30',
        replacementRequired: true, status: 'LIVE', createdAt: '2026-02-18', bidsCount: 5,
    },
    {
        id: 'REQ-004',
        projectName: 'Rajmahal OCP',
        clientName: 'ECL',
        siteLocation: 'Dumka, Jharkhand',
        materialType: 'Mixed',
        items: [
            { id: 'RI-009', vehicleCategory: 'Trailer', capacity: '40 Ton', quantityRequired: 8, quantityAllocated: 5, rateType: 'Per Ton' },
            { id: 'RI-010', vehicleCategory: 'Poclain', capacity: '220', quantityRequired: 3, quantityAllocated: 2, rateType: 'Per Hour' },
            { id: 'RI-011', vehicleCategory: 'Bulldozer', capacity: 'D6', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Hour' },
            { id: 'RI-012', vehicleCategory: 'Motor Grader', capacity: '180 HP', quantityRequired: 1, quantityAllocated: 1, rateType: 'Per Day' },
        ],
        reportingTime: '05:00 AM', dutyHours: '12hr', dieselBy: 'Company',
        paymentCycle: '15 days', penaltyRule: '₹700/day absence',
        startDate: '2026-03-10', endDate: '2026-08-10',
        replacementRequired: true, status: 'LIVE', createdAt: '2026-02-17', bidsCount: 11,
    },
    {
        id: 'REQ-005',
        projectName: 'Mumbai Coastal Road',
        clientName: 'L&T Construction',
        siteLocation: 'Mumbai, Maharashtra',
        materialType: 'Construction Material',
        items: [
            { id: 'RI-013', vehicleCategory: 'Transit Mixer', capacity: '6 Cu.m', quantityRequired: 12, quantityAllocated: 0, rateType: 'Per Trip' },
            { id: 'RI-014', vehicleCategory: 'Boom Placer', capacity: '36m', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Day' },
            { id: 'RI-015', vehicleCategory: 'Tower Crane', capacity: '10 Ton', quantityRequired: 3, quantityAllocated: 0, rateType: 'Per Month' },
            { id: 'RI-016', vehicleCategory: 'Piling Rig', capacity: '1200mm', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Day' },
        ],
        reportingTime: '06:00 AM', dutyHours: '24hr', dieselBy: 'Vendor',
        paymentCycle: '30 days', penaltyRule: '₹2000/day absence',
        startDate: '2026-04-15', endDate: '2027-04-14',
        replacementRequired: true, status: 'LIVE', createdAt: '2026-02-19', bidsCount: 3,
    },
];

// ── Vendor Bids (only for vendorId '2') ──────────────────────
export const mockVendorBids: Bid[] = [
    {
        id: 'BID-001', requirementId: 'REQ-001', requirementItemId: 'RI-001',
        vendorId: '2', vendorName: 'Sharma Transport',
        vehicleCategory: 'Hyva', vehiclesOffering: 10, rate: 1850, rateType: 'Per Trip',
        joiningDays: 2, vehicleAge: 2022, remarks: 'New vehicles',
        status: 'ACCEPTED', createdAt: '2026-02-16',
    },
    {
        id: 'BID-004', requirementId: 'REQ-002', requirementItemId: 'RI-004',
        vendorId: '2', vendorName: 'Sharma Transport',
        vehicleCategory: 'Dumper', vehiclesOffering: 8, rate: 3200, rateType: 'Per Day',
        joiningDays: 3, vehicleAge: 2021, remarks: '32 ton capacity',
        status: 'ACTIVE', createdAt: '2026-02-19',
    },
    {
        id: 'BID-006', requirementId: 'REQ-004', requirementItemId: 'RI-009',
        vendorId: '2', vendorName: 'Sharma Transport',
        vehicleCategory: 'Trailer', vehiclesOffering: 5, rate: 45, rateType: 'Per Ton',
        joiningDays: 2, vehicleAge: 2023, remarks: 'Per ton rate',
        status: 'ACCEPTED', createdAt: '2026-02-18',
    },
    {
        id: 'BID-009', requirementId: 'REQ-001', requirementItemId: 'RI-003',
        vendorId: '2', vendorName: 'Sharma Transport',
        vehicleCategory: 'Water Tanker', vehiclesOffering: 5, rate: 2800, rateType: 'Per Day',
        joiningDays: 1, vehicleAge: 2021, remarks: '10KL tankers',
        status: 'ACCEPTED', createdAt: '2026-02-16',
    },
];

// ── Vendor Work Orders (only for vendorId '2') ───────────────
export const mockVendorWorkOrders: WorkOrder[] = [
    {
        id: 'WO-001', requirementId: 'REQ-001', vendorId: '2',
        vendorName: 'Sharma Transport', clientName: 'NTPC Ltd',
        projectName: 'Pakri Barwadih Mine', siteLocation: 'Jharkhand',
        vehicleCategory: 'Hyva', quantity: 10, rate: 1850, rateType: 'Per Trip',
        validity: '01 Mar – 30 Jun 2026', startDate: '2026-03-01', endDate: '2026-06-30',
        penaltyClause: '₹500/day absence', paymentCycle: '30 days',
        status: 'ACTIVE', createdAt: '2026-02-17',
    },
    {
        id: 'WO-005', requirementId: 'REQ-001', vendorId: '2',
        vendorName: 'Sharma Transport', clientName: 'NTPC Ltd',
        projectName: 'Pakri Barwadih Mine', siteLocation: 'Jharkhand',
        vehicleCategory: 'Water Tanker', quantity: 5, rate: 2800, rateType: 'Per Day',
        validity: '01 Mar – 30 Jun 2026', startDate: '2026-03-01', endDate: '2026-06-30',
        penaltyClause: '₹500/day absence', paymentCycle: '30 days',
        status: 'ACTIVE', createdAt: '2026-02-17',
    },
    {
        id: 'WO-006', requirementId: 'REQ-004', vendorId: '2',
        vendorName: 'Sharma Transport', clientName: 'ECL',
        projectName: 'Rajmahal OCP', siteLocation: 'Dumka, Jharkhand',
        vehicleCategory: 'Trailer', quantity: 5, rate: 45, rateType: 'Per Ton',
        validity: '10 Mar – 10 Aug 2026', startDate: '2026-03-10', endDate: '2026-08-10',
        penaltyClause: '₹700/day absence', paymentCycle: '15 days',
        status: 'PENDING', createdAt: '2026-02-18',
    },
];

// ── Vendor Vehicles (only for vendorId '2') ──────────────────
export const mockVendorVehicles: Vehicle[] = [
    {
        id: 'V-001', vehicleNumber: 'JH-01-AB-1234', vendorId: '2',
        vendorName: 'Sharma Transport', driverName: 'Raju Yadav',
        driverLicense: 'DL-1234567', fitnessExpiry: '2026-12-31',
        insuranceExpiry: '2026-11-15', category: 'Hyva', capacity: '20 Ton',
        assignedProject: 'Pakri Barwadih Mine', assignedRequirementId: 'REQ-001',
        status: 'ACTIVE',
    },
    {
        id: 'V-002', vehicleNumber: 'JH-01-CD-5678', vendorId: '2',
        vendorName: 'Sharma Transport', driverName: 'Mohan Lal',
        driverLicense: 'DL-7654321', fitnessExpiry: '2026-08-20',
        insuranceExpiry: '2026-06-10', category: 'Hyva', capacity: '20 Ton',
        assignedProject: 'Pakri Barwadih Mine', assignedRequirementId: 'REQ-001',
        status: 'ACTIVE',
    },
    {
        id: 'V-007', vehicleNumber: 'JH-05-MN-6789', vendorId: '2',
        vendorName: 'Sharma Transport', driverName: 'Ravi Tiwari',
        driverLicense: 'DL-4455667', fitnessExpiry: '2026-09-30',
        insuranceExpiry: '2026-10-15', category: 'Water Tanker', capacity: '10000 Ltr',
        assignedProject: 'Pakri Barwadih Mine', assignedRequirementId: 'REQ-001',
        status: 'ACTIVE',
    },
    {
        id: 'V-008', vehicleNumber: 'JH-06-OP-1122', vendorId: '2',
        vendorName: 'Sharma Transport', driverName: 'Deepak Yadav',
        driverLicense: 'DL-7788990', fitnessExpiry: '2026-11-01',
        insuranceExpiry: '2026-12-20', category: 'Trailer', capacity: '40 Ton',
        assignedProject: 'Rajmahal OCP', assignedRequirementId: 'REQ-004',
        status: 'ACTIVE',
    },
    {
        id: 'V-NEW-1', vehicleNumber: 'JH-07-QR-3344', vendorId: '2',
        vendorName: 'Sharma Transport', driverName: 'Sunny Kumar',
        driverLicense: 'DL-3344556', fitnessExpiry: '2027-06-01',
        insuranceExpiry: '2027-05-20', category: 'Hyva', capacity: '20 Ton',
        status: 'STANDBY',
    },
    {
        id: 'V-NEW-2', vehicleNumber: 'JH-08-ST-5566', vendorId: '2',
        vendorName: 'Sharma Transport', driverName: '',
        driverLicense: '', fitnessExpiry: '2027-03-15',
        insuranceExpiry: '2027-02-28', category: 'Tipper', capacity: '16 Ton',
        status: 'PENDING',
    },
];

// ── Vendor Billing Records (only for vendorId '2') ───────────
export const mockVendorBilling: BillingRecord[] = [
    {
        id: 'BILL-001', vendorId: '2', vendorName: 'Sharma Transport',
        projectName: 'Pakri Barwadih Mine', clientName: 'NTPC Ltd',
        requirementId: 'REQ-001', workOrderId: 'WO-001',
        month: 'January 2026', totalTrips: 480, rate: 1850,
        grossAmount: 888000, penaltyDeduction: 5000, dieselDeduction: 0,
        extraShiftBonus: 18500, netAmount: 901500, status: 'PAID',
    },
    {
        id: 'BILL-004', vendorId: '2', vendorName: 'Sharma Transport',
        projectName: 'Pakri Barwadih Mine', clientName: 'NTPC Ltd',
        requirementId: 'REQ-001', workOrderId: 'WO-001',
        month: 'February 2026', totalTrips: 320, rate: 1850,
        grossAmount: 592000, penaltyDeduction: 2500, dieselDeduction: 0,
        extraShiftBonus: 11100, netAmount: 600600, status: 'GENERATED',
    },
    {
        id: 'BILL-006', vendorId: '2', vendorName: 'Sharma Transport',
        projectName: 'Rajmahal OCP', clientName: 'ECL',
        requirementId: 'REQ-004', workOrderId: 'WO-006',
        month: 'January 2026', totalTrips: 180, rate: 45,
        grossAmount: 324000, penaltyDeduction: 3500, dieselDeduction: 0,
        extraShiftBonus: 4500, netAmount: 325000, status: 'APPROVED',
    },
    {
        id: 'BILL-007', vendorId: '2', vendorName: 'Sharma Transport',
        projectName: 'Pakri Barwadih Mine', clientName: 'NTPC Ltd',
        requirementId: 'REQ-001', workOrderId: 'WO-005',
        month: 'January 2026', totalTrips: 0, rate: 2800,
        grossAmount: 420000, penaltyDeduction: 0, dieselDeduction: 0,
        extraShiftBonus: 0, netAmount: 420000, status: 'VERIFIED',
    },
];

// ── Vendor Dashboard Stats ────────────────────────────────────
export const vendorDashboardStats: VendorDashboardStats = {
    activeOrders: 3,
    vehiclesDeployed: 4,
    pendingPayments: 925600,
    totalEarnings: 2247100,
    openBids: 2,
    activeBids: 4,
};

// ── Derived helpers ───────────────────────────────────────────

/** Get requirement name given an id */
export function getRequirementById(id: string): Requirement | undefined {
    return mockRequirements.find(r => r.id === id);
}

/** Format number as Indian currency string */
export function formatINR(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
}

/** Compute billing summary for vendor */
export function computeBillingSummary(records: BillingRecord[]) {
    const total = records.reduce((s, r) => s + r.netAmount, 0);
    const received = records.filter(r => r.status === 'PAID').reduce((s, r) => s + r.netAmount, 0);
    return { total, received, outstanding: total - received };
}

// ── Form select options (used in Bid dialog) ──────────────────
export const RATE_TYPE_OPTIONS = [
    { label: 'Per Trip', value: 'Per Trip' },
    { label: 'Per Hour', value: 'Per Hour' },
    { label: 'Per Day', value: 'Per Day' },
    { label: 'Per Ton', value: 'Per Ton' },
    { label: 'Per Month', value: 'Per Month' },
];
