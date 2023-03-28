export const CONSTANT = {
  AWS_BUCKET_URL: localStorage.getItem("aws_bucket_url"),
  LOGIN_REDIRECT_PATH: "/login",
  DASHBOARD_REDIRECT_PATH: "/dashboardcontroller",
  WITHOUT_LOGIN_PAGE: ["/", "/login"],
  DEFAULT_LATITUDE: 23.009529,
  DEFAULT_LONGITUDE: 72.510963,
  SEND_ERROR_REPORT_TO: "anand.esprit@gmail.com",
  MAX_EMAIL_ATTEMPT: 5,
  DEFAULT_USER_AVATAR_ID: 3,
  API_KEY: "g9d54312a5c53ce30738dcd8838c5128",
  MASTER_DOMAIN: "https://everythingcivic.com/",
  SUPER_ADMIN_ID: 1,
  SUPER_ADMIN_ROLE_ID: 1,
  EMAIL_TEMPLATE: {
    ADMIN: {
      FORGOT_PASSWORD: 1,
      RESET_PASSWORD: 2,
    },
  },
  PER_PAGE_RECORD: [
    { id: "50", value: "50 per page" },
    { id: "100", value: "100 per page" },
    { id: "500", value: "500 per page" },
    { id: "1000", value: "1000 per page" },
  ],
  NOTIFICATION_REDIRECTION_TYPE: {
    FIELD_REPORT: 100,
    TASK: 11,
    TOILET_INSPECTION: 12,
    DUSTBIN_INSPETION: 13,
    PARKING_INSPECTION: 14,
    CHALLAN: 16,
  },
  ROLE: {
    ADMIN: "1",
    COMMISSIONER: "2",
    DIRECTOR: "3",
    DIVISIONAL_HEAD: "4",
    WARD_OFFICER: "5",
    CIVILIANS: "6",
    OPERATOR: "7",
  },
  PLATFORM: {
    ANDROID: 300,
    IPHONE: 301,
  },
  CATEGORY_MODULE: [
    { id: 1, name: "General" },
    { id: 2, name: "Night INspection" },
  ],
  PLATFORM_ARRAY: [
    { id: 300, name: "ANDROID" },
    { id: 301, name: "IPHONE" },
  ],
  DESIGNATION: {
    ZONAL_OFFICER: "Zonal Officer",
    NAGER_SWASTH_ADHIKARI: "Nager Swasth Adhikari",
  },
  JOB: {
    TYPE: [],
  },
  FROM_APP: {
    CITIZEN: 1,
    OFFICER: 2,
    WEB: 3,
  },
  APP_MASTER: {
    IS_ACTIVE: {
      YES: 1,
      NO: 0,
    },
    MAINTAINANCE_MODE: {
      YES: 1,
      NO: 0,
    },
    ID: {
      AGARTALA: 1,
      MERA_AGRA: 2,
      AMC: 3,
      AUDA: 4,
      DDA: 5,
      DEHRADUN: 6,
      FARIDABAD: 7,
      GHAZIABAD: 8,
      GURUGRAM: 9,
      HFAS: 10,
      INDORE: 11,
      JABALPUR: 12,
      JODHPUR: 13,
      JUNAGADH: 14,
      LUCKNOW: 15,
      MCD: 16,
      PORBANDAR: 17,
      SMARTCITY: 18,
      UJJAIN: 19,
      KASHI: 20,
      // NDMC: 20,
      // SURAT: 21,
    },
  },
  USERS: {
    IS_PHONE_VERIFIED: {
      YES: 1,
      NO: 0,
    },
    OFFICER_TYPE: {
      GRID: "grid",
      NODAL: "nodal",
    },
    STATUS: {
      INACTIVE: 0,
      ACTIVE: 1,
    },
  },
  MSG: {
    TYPE: {
      SOS: "SOS",
      CERTIFICATE: "Certificate",
      COMPLAINTREG: "ComplaintReg",
      RESETPASSWORDURL: "ResetPasswordURL",
      TRADELICENSE: "TradeLicense",
      WATERCONNECTION: "WaterConnection",
      OTPVERIFICATION: "OTPVerification",
      CHALLANPAYMENTRECEIVECACKZO: "ChallanPaymentReceivedACKZO",
      CHALLANPAYMENTRECEIVEDACKMOH: "ChallanPaymentReceivedACKMOH",
      CHALLANSUBMIT: "ChallanSubmit",
      ACCOUNT_APPROVED: "account_approved",
    },
  },
  DUTIES: {
    DUTY_FOR: {
      WARDS: "wards",
      SUBWARDS: "subwards",
    },
    MODULE_NAME: {
      ISSUES: 1,
      ATTENDANCE: 2,
    },
  },
  NEWSFEEDS: {
    PARENT_TYPE: {
      GENERAL: "general",
      PROJECT_TRACKING: "project_tracking",
      FIELDREPORT: "fieldreport",
      TOILET_INSPECTION: "toilet_inspection",
      DUSTBIN_INSPECTION: "dustbin_inspection",
      PARKING_INSPECTION: "parking_inspection",
      TASK: "task",
      CHALLAN: "Challan",
    },
    ACTIVITY_TYPE: {
      GENERAL: "general",
      COMMENT: "comment",
      FIELDREPORT_VIEW: "fieldreport_view",
      ASSIGNTO: "assignto",
      TASK_VIEW: "task_view",
      TASK_EDIT: "editTask",
      CHALLAN_VIEW: "challan_view",
    },
  },
  PRIORITIES: {
    URGENT: 2001,
    HIGH: 2002,
    NORMAL: 2003,
  },
  INSPECTION_AREA: {
    TOILET: "Toilet",
    FEEDBACKNUTRAL: "FeedbackNutral",
    FEEDBACKDISATISFIED: "FeedbackDisatisfied",
    ROAD: "Road",
    GVP: "GVP",
    DUSTBIN: "Dustbin",
    PARKING: "Parking",
  },
  WEEKS: ["Week1", "Week2", "Week3", "Week4"],
  CHECKLIST_CATEGORIES: {
    AMC: {
      WEEKLY: 101,
      MONTHLY: 102,
    },
  },
  CHECKLISTS: {
    AMC: {
      TOTAL_NO_OF_TOILET_SEATS: 65,
      TOTAL_NUMBER_OF_URINALS: 66,
      NO_OF_INTACT_TOILET_SEATS: 67,
      NO_OF_TAPS_AND_CUBICLES_WITHOUT_LEAK: 68,
      NO_OF_FLUSHES_WITHOUT_LEAK: 69,
    },
  },
  AGENCY: {
    NDMC: {
      SDMC: "111",
    },
  },

  FILTER_TYPE: {
    DEPARTMENT_FILTER: "department_filter",
    AGENCY_FILTER: "agency_filter",
    STATUTARY_FILTER: "statutary_filter",
  },
  CATEGORIES: {
    ID: {
      BEAT_ATTENDANCE_POINT: 161,
    },
  },

  TASK_STATUS_CODE: {
    CODE: {
      PENDING: "1001",
      WORK_IN_PROGRESS: "1002",
      COMPLETED: "1003",
      ON_HOLD: "1004",
      UNASSIGNED: "1005",
    },
  },
  DATA_CAPTURE_ENTITIES: {
    ID: {
      DOG_STERILIZATION_ID: "75",
    },
    CODE: {
      NGO: "16",
    },
  },
  MAGISTRATE_OFFICE_USERS: {
    USER_TYPE: {
      PAYMENT_RECEIVER: "Payment Receiver",
      MAGISTRATE: "Magistrate",
    },
  },
  CHALLAN_STATUS_CODES: {
    CODE: {
      OPEN: "1601",
      SUMMONS: "1602",
      TRANSFER: "1603",
      PAYMENT_PENDING: "1604",
      PAYMENT_RECEIVED: "1605",
      CLOSED: "1606",
      WARRENT: "1607",
    },
  },
  SUB_CATEGORIES: {
    IS_DEPT_FROM_SUBZONE: {
      TRUE: 1,
      FALSE: 0,
    },
  },
  ZONE: {
    VISIBLE_TO_OFFICER: {
      TRUE: 0,
      FALSE: 1,
    },
  },

  AREA: {
    SHOW_DEFINED_AREA: {
      TRUE: 0,
      FALSE: 1,
    },
  },
  BORING_REGISTRATION_HISTORY: {
    SOURCE_TYPE: {
      BORING_REGISTRATION: "boring_registration",
      BORING_MACHINE_REGISTRATION: "boring_machine_registration",
    },
  },

  CERTIFICATE: {
    CERTIFICATE_TYPE: {
      BIRTH_CERTIFICATE: 1,
      DEATH_CERTIFICATE: 2,
      MARRIAGE_CERTIFICATE: 3,
    },
  },
  COMPOST_PIT_REPORT: {
    REPORT_TYPE: {
      WASTE_COLLECTION: 1,
      COMPOST_PRODUCTION: 2,
    },
  },
  BETTERMENT: {
    FORM_TYPE: {
      FLAT: 1,
      PLOT: 2,
      LAND: 3,
    },
    PAYMENT_MODE: {
      CASH: "Cash",
      BANK: "Bank",
      CHEQUE: "Cheque",
      CHEQUE_BOUNCE: "Cheque Bounce",
      UPI: "UPI",
      CARD: "Debit Card / Credit Card",
    },
  },
  DOG_STERILIZATION: {
    STATUS_NAME: {
      CAPTURED: "Captured",
      RELEASED: "Released",
      RECEIVED: "Received",
      FIT_FOR_RELEASE: "Fit For Release",
      ACTION_NOT_TAKEN: "Action Not Taken",
      ACTION_TAKEN: "Action Taken",
    },
  },
};
