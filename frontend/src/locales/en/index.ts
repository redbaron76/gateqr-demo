// prettier-ignore
export const lang = {
  en: "English",
  root: {
    generator: "Generator",
    scanner: "Scanner",
    signup: "Sign Up",
  },
  head: {
    title: "QR Code Generator and Guest List Management",
    description: "GATE:QR lets you generate guest lists from CSV files, offering printable QR codes and a web-based scanner for seamless check-in at your event gates.",
  },
  index: {
    h1: "The all-in-one solution for managing entrance access.",
    h2: "You provide the guest list with fields you want. We provide <2>print-ready</2> <3>QR codes</3> to deliver plus a <5>web-based</5> <6>QR Code scanner</6> to scan them.",
    h3: "Generate your guest list now!",
    scannerButton: "QR Code Scanner",
  },
  signup: {
    title: "Create your account",
    email: "E-mail",
    password: "Password",
    submit: "Sign Up",
    submitting: "Signing Up...",
    alreadyHaveAccount: "Already have an account?",
  },
  Counter: {
    title: "Guest list",
    description: "Checked-in guests by code scanning",
    downloadList: "Download list",
  },
  Dropzone: {
    selectFile: "Select file",
    onDrop: "Drop your <1>*.csv</1> file here...",
    drop: "Drop a <1>*.csv</1> file here<3/>or <5>click</5> to select it from disk.",
    howToFormat: "How to format your *.csv file?",
    getSample: "Get a sample here",
  },
  Guest: {
    alreadyChecked: "Code already checked!",
  },
  Invalid: {
    notAllowed: "Code not valid!",
  },
  Pausing: {
    resume: "Tap to resume",
  },
  Reset: {
    title: "Are you absolutely sure?",
    description: "Would you like to definitely reset all the guest list?",
    proceed: "Yes, proceed!",
  },
  ScannerQR: {
    startingScanner: "Starting scanner...",
  },
  TapLayer: {
    tapToScan: "Tap to start scanning",
  },
  useJob: {
    generatingCodes: "Generating codes ({{progress}}%)...",
    packingFile: "Packing *.zip file...",
    uploadFile: "Upload file",
    noFileSelected: "No file selected!",
    errorUploadingFile: "Error uploading file!",
  },
  label: {
    cancel: "Cancel",
    showIn: "Show in",
    validating: "Validating...",
  },
  server: {
    signupSchema: {
      email: "Enter a valid e-mail address",
      password: "Password must be at least {{min}} characters long",
      emailAlreadyExists: "This e-mail address is already registered",
    },
    uploadSchema: {
      size: "File size must be less than 1MB",
      type: "File type must be of type *.csv",
      shape: "Use a *.csv file with max 4 columns",
    },
  },
};
