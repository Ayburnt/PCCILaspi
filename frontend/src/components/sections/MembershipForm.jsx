import { useState } from 'react';
import { Send } from 'lucide-react';

// --- Field Definitions for Selects/Radios (for cleaner code) ---
const GENDERS = ['Female', 'Male', 'Prefer Not To Say'];
const INDIVIDUAL_JOB_TITLES = ['Chairman', 'President', 'Vice-President', 'Director', 'Manager', 'Proprietor'];
const COMPANY_CATEGORIES = [
    { value: 'Micro', label: 'Micro (Less than P3M) - P1,500' },
    { value: 'Small', label: 'Small (P3M - P15M) - P2,500' },
    { value: 'Medium', label: 'Medium (P15M - P100M) - P5,000' },
    { value: 'Large', label: 'Large (P100M+) - P10,000' }
];
const BUSINESS_ENTITIES = ['Corporation', 'Partnership', 'Cooperative', 'Sole Proprietorship', 'Others'];
const INDUSTRIES = ['Agriculture', 'Food and Beverage', 'Furniture', 'Hospitality', 'Manufacturing', 'Education', 'Retail Store', 'Marketing Agency', 'Web/Software', 'Construction', 'Logistics', 'Utility', 'Grocery', 'Professional Services', 'Travel', 'Financial', 'Automotive', 'Fabrication', 'Beauty', 'Medical'];
const COMMITTEES = ['Membership', 'Revenue Generation', 'Marketing', 'Events', 'Newsletter', 'HRD', 'Constitution', 'Research', 'Business Conference', 'Sports', 'Walk of Fame', 'CSR'];
const ADVOCACIES = ['Education', 'Intl Biz Networking', 'MSME', 'Tourism', 'Environment', 'Legislation/Tax', 'Innovation/Tech', 'Youth', 'SDG', 'Safety', 'Fire Protection'];
const SOURCES = ['Friends/Family', 'PCCI Member', 'Facebook', 'Advertisement', 'Online Search'];

export default function MembershipForm() {
  const [formData, setFormData] = useState({
    // Shared Field
    applicantType: 'Individual Membership', // Changed default to one of the options
    paymentRef: '',
    source: '',
    privacyConsent: false,

    // Individual Membership Fields
    lastName: '',
    firstName: '',
    gender: '',
    email: '',
    mobile: '',
    companyName: '',
    companyAddress: '',
    jobTitle: '',
    companyCategory: '', // Asset-based fee determinant
    employeeCount: '',
    industry: '',
    committees: [],
    advocacies: [],
    
    // Corporate Membership Fields (New)
    businessEntity: '',
    ownerPresidentName: '',
    natureOfBusiness: '',
    landlineNumber: '',
    websiteUrl: '',
    completeAddress: '',
    socialMediaLinks: '',
    
    // Corporate Representatives
    officialRepName: '',
    officialRepPosition: '',
    officialRepContact: '',
    alternateRepName: '',
    alternateRepPosition: '',
    alternateRepContact: '',

    // Document Uploads (Simulated - in a real app, these would be File objects)
    businessDocuments: null,
    governmentId: null,
    companyLogo: null,
    profilePicture: null
  });

  const isIndividual = formData.applicantType === 'Individual Membership';

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox' && (name === 'committees' || name === 'advocacies')) {
      // Handle multi-select checkboxes
      const currentList = formData[name];
      const newList = checked 
        ? [...currentList, value] 
        : currentList.filter(item => item !== value);
        
      setFormData({ ...formData, [name]: newList });
    } else if (type === 'checkbox' && name === 'privacyConsent') {
       setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      // Handle file inputs (storing the File object or just its name for simulation)
      setFormData({ ...formData, [name]: files[0] }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.privacyConsent) {
        alert("Please agree to the Data Privacy Notice.");
        return;
    }
    
    // Basic validation based on membership type
    if (isIndividual) {
        if (!formData.lastName || !formData.companyName || !formData.email) {
            alert("Please fill in all required Individual Membership fields.");
            return;
        }
    } else { // Corporate
        if (!formData.companyName || !formData.businessEntity || !formData.officialRepName) {
            alert("Please fill in all required Corporate Membership fields.");
            return;
        }
    }

    // Here you would normally send this data to your backend
    console.log("Form Submitted:", formData);
    alert("Application Submitted! Please check your email for confirmation.");
  };

  // --- Reusable Field Components for cleaner rendering ---

  const Field = ({ label, name, type = 'text', required = false, children, ...props }) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
            {required && <span className="text-red-500 mr-1">*</span>}
            {label}
        </label>
        {children || <input 
            type={type} 
            name={name} 
            value={formData[name] || (type === 'file' ? '' : '')}
            onChange={handleChange} 
            required={required} 
            className="w-full border p-2 rounded bg-white" 
            {...props} 
        />}
    </div>
  );

  const CheckboxGroup = ({ label, name, options }) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {options.map(opt => (
                <label key={opt} className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        name={name} 
                        value={opt} 
                        checked={formData[name].includes(opt)}
                        onChange={handleChange} 
                    /> 
                    {opt}
                </label>
            ))}
        </div>
    </div>
  );

  const RadioGroup = ({ label, name, options, required=false }) => (
      <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
              {required && <span className="text-red-500 mr-1">*</span>}
              {label}
          </label>
          <div className="flex flex-wrap gap-4">
              {options.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input 
                          type="radio" 
                          name={name} 
                          value={opt}
                          checked={formData[name] === opt}
                          onChange={handleChange}
                          required={required}
                          className="text-blue-900 focus:ring-blue-900"
                      />
                      <span className="text-gray-600">{opt}</span>
                  </label>
              ))}
          </div>
      </div>
  );


  // --- Conditional Rendering Blocks ---
  
  const IndividualMembershipFields = () => (
    <>
      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">Applicant Information</h3>

      {/* 2 & 3 Name */}
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="2. Last Name" name="lastName" required />
        <Field label="3. First Name" name="firstName" required />
      </div>

      {/* 4. Gender */}
      <RadioGroup label="4. Gender" name="gender" options={GENDERS} />

      {/* 5 & 6 Contact */}
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="5. Email Address" name="email" type="email" required />
        <Field label="6. Mobile Number" name="mobile" type="tel" required />
      </div>

      <hr className="border-gray-200" />

      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">Business/Company Information</h3>

      {/* 7 & 8 Company Info */}
      <Field label="7. Company Name" name="companyName" required />
      <Field label="8. Company Address" name="companyAddress" required />

      {/* 9. Job Title */}
      <Field label="9. Job Title" name="jobTitle">
        <select name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full border p-2 rounded bg-white">
            <option value="">Select Job Title...</option>
            {INDIVIDUAL_JOB_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>

      {/* 10. Company Category */}
      <Field label="10. Company Category - Asset (Determines Fee)" name="companyCategory" required>
        <select required name="companyCategory" value={formData.companyCategory} onChange={handleChange} className="w-full border p-2 rounded bg-white">
            <option value="">Select Category...</option>
            {COMPANY_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </Field>

      {/* 11 & 12 Employees & Industry */}
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="11. No. of Employees" name="employeeCount" type="number" />
        <Field label="12. Industry" name="industry">
            <select name="industry" value={formData.industry} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                <option value="">Select Industry...</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
        </Field>
      </div>

      {/* 13. Committees */}
      <CheckboxGroup label="13. Committee Interested to Join" name="committees" options={COMMITTEES} />

      {/* 14. Advocacy */}
      <CheckboxGroup label="14. Advocacy Interested to Join" name="advocacies" options={ADVOCACIES} />
    </>
  );

  const CorporateMembershipFields = () => (
    <>
      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">Business Information</h3>
      
      {/* Name and Entity */}
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Business/Company Name" name="companyName" required />
        <Field label="Type of Business Entity" name="businessEntity">
            <select required name="businessEntity" value={formData.businessEntity} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                <option value="">Select Entity...</option>
                {BUSINESS_ENTITIES.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
        </Field>
      </div>

      <Field label="Owner/President Name" name="ownerPresidentName" required />
      
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Number of Employees" name="employeeCount" type="number" />
        <Field label="Nature of Business (Industry)" name="industry">
            <select name="industry" value={formData.industry} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                <option value="">Select Industry...</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
        </Field>
      </div>
      
      <Field label="Nature of Business Operations (Brief Description)" name="natureOfBusiness">
         <textarea name="natureOfBusiness" value={formData.natureOfBusiness} onChange={handleChange} rows="3" className="w-full border p-2 rounded"></textarea>
      </Field>

      <hr className="border-gray-200" />
      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">Contact Information</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Email Address" name="email" type="email" required />
        <Field label="Mobile Number" name="mobile" type="tel" required />
        <Field label="Landline (Optional)" name="landlineNumber" type="tel" placeholder="Enter landline number" />
        <Field label="Website URL (Optional)" name="websiteUrl" type="url" placeholder="https://example.com" />
      </div>

      <Field label="Complete Address" name="completeAddress" required placeholder="Enter complete address including city and postal code" />
      <Field label="Social Media Links (Optional)" name="socialMediaLinks" placeholder="Facebook, LinkedIn, Instagram links" />


      <hr className="border-gray-200" />
      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">Authorized Representatives</h3>

      {/* Official Representative */}
      <div className="bg-blue-50 p-4 rounded-lg space-y-3">
        <h4 className="font-semibold text-blue-900">Official Representative</h4>
        <div className="grid md:grid-cols-3 gap-4">
            <Field label="Full Name" name="officialRepName" required />
            <Field label="Position" name="officialRepPosition" />
            <Field label="Contact Number" name="officialRepContact" type="tel" />
        </div>
      </div>
      
      {/* Alternate Representative */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <h4 className="font-semibold text-gray-700">Alternate Representative (Optional)</h4>
        <div className="grid md:grid-cols-3 gap-4">
            <Field label="Full Name" name="alternateRepName" />
            <Field label="Position" name="alternateRepPosition" />
            <Field label="Contact Number" name="alternateRepContact" type="tel" />
        </div>
      </div>

      <hr className="border-gray-200" />
      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">Upload Your Documents (For Submission)</h3>
      <p className="text-sm text-gray-600">Note: File upload is simulated. In a real app, this would handle file storage.</p>

      <div className="grid md:grid-cols-2 gap-4">
          <Field label="Business Documents" name="businessDocuments" type="file" helpText="Upload DTI/SEC registration, business permit, etc." />
          <Field label="Government ID" name="governmentId" type="file" helpText="Upload a valid government-issued ID of the Official Representative" />
          <Field label="Company Logo" name="companyLogo" type="file" />
          <Field label="Profile Picture (2x2 ID)" name="profilePicture" type="file" helpText="Upload a professional 2x2 ID photo of the Official Representative" />
      </div>

    </>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-900 space-y-6">
      
      {/* 1. Applicant Type (Shared) */}
      <RadioGroup 
          label="1. Applicant Type" 
          name="applicantType" 
          options={['Individual Membership', 'Corporate Membership']} 
          required 
      />
      
      <hr className="border-gray-300" />

      {/* Conditional Fields */}
      {isIndividual ? <IndividualMembershipFields /> : <CorporateMembershipFields />}

      <hr className="border-gray-300" />

      {/* 15. Payment (Shared) */}
      <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
        <label className="block text-sm font-bold text-blue-900 mb-2">
            <span className="text-red-500 mr-1">*</span> 
            {isIndividual ? '15. Payment Reference' : 'Payment Reference'}
        </label>
        <p className="text-xs text-gray-600 mb-2">Please enter your GCash/Bank Reference Number and Amount Paid. **Payment is required for processing.**</p>
        <textarea 
            name="paymentRef" 
            value={formData.paymentRef}
            onChange={handleChange} 
            required
            placeholder={`Ref No: XXXXXX, Amount: PHP ${isIndividual ? '1,500 - 10,000' : 'Your Corporate Fee'}`} 
            className="w-full border p-2 rounded h-20"
        ></textarea>
      </div>

      {/* 16. Source (Shared) */}
      <Field label={isIndividual ? '16. How did you learn about us?' : 'How did you learn about us?'} name="source">
        <select name="source" value={formData.source} onChange={handleChange} className="w-full border p-2 rounded bg-white">
            <option value="">Select Option...</option>
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>

      {/* 17. Consent (Shared) */}
      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded border">
        <input 
            type="checkbox" 
            name="privacyConsent" 
            checked={formData.privacyConsent}
            onChange={handleChange} 
            required
            className="mt-1 w-4 h-4" 
        />
        <p className="text-xs text-gray-600 leading-relaxed">
            <span className="text-red-500 mr-1">*</span> 
            <strong>Data Privacy Notice:</strong> The data generated will be handled with strict confidentiality in accordance with RA 10173 (Data Privacy Act). By checking this box, you agree that PCCI Las Piñas can collect and process your responses.
        </p>
      </div>

      <button type="submit" className="w-full bg-blue-900 text-white py-3 font-bold uppercase rounded hover:bg-blue-800 transition flex items-center justify-center gap-2">
        <Send size={18} /> Submit Application
      </button>

    </form>
  );
}