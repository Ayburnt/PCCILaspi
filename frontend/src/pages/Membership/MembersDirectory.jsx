import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Building2,
  MapPin,
  Mail,
  Globe,
  User,
  Briefcase,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../../sanityClient";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";

function slugifyCompany(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeWebsiteUrl(url) {
  if (!url) return null;
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
}

export default function MembersDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "member" && status == "active"] | order(company asc) {
          _id,
          "slug": slug.current,
          company,
          membershipType,
          category,
          description,
          location,
          keyServices,
          email,
          website,
          logo
        }`;

        const data = await client.fetch(query);
        setMembers(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to load members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const fallbackMembers = useMemo(
    () => [
      {
        id: "fallback-1",
        company: "CLEMZKIE, OPC",
        slug: slugifyCompany("CLEMZKIE, OPC"),
        membershipType: "Individual Membership",
        category: "Technology",
        description: "Turning complexity into clarity through innovative technology...",
        location: "Sto Cristo, Quezon City",
        keyServices: ["Tech Consulting", "Data Solutions"],
        email: "contact@clemzkie.com",
        website: null,
      },
    ],
    []
  );

  const displayMembers = members.length > 0 ? members : fallbackMembers;

  const categories = ["All", ...new Set(displayMembers.map((m) => m.category).filter(Boolean))];

  const filteredMembers = displayMembers.filter((member) => {
    const company = (member.company ?? "").toLowerCase();
    const description = (member.description ?? "").toLowerCase();
    const services = Array.isArray(member.keyServices) ? member.keyServices : [];
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      company.includes(term) ||
      description.includes(term) ||
      services.some((service) => (service ?? "").toLowerCase().includes(term));

    const matchesCategory = selectedCategory === "All" || member.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <TopBar />
      <Navbar />

      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-green-900 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Members Directory</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">
            Connect with our diverse network of industry leaders and professionals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 mb-12 relative z-20">
        <div className="bg-white rounded-lg shadow-xl p-6 border border-slate-100">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div className="relative group">
              <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-md appearance-none bg-white cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-green-700" size={48} />
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-4 text-center text-red-600">{error}</div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 pb-20">
          {filteredMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => {
                const isIndividual = member.membershipType?.includes("Individual");
                const memberSlug = member.slug || member._id || member.id;
                const websiteUrl = normalizeWebsiteUrl(member.website);

                return (
                  <div key={member._id || member.id} className="group bg-white rounded-lg border border-slate-200 hover:shadow-xl transition-all flex flex-col h-full overflow-hidden">
                    <div className={`h-1 w-full ${isIndividual ? "bg-emerald-500" : "bg-green-800"}`}></div>
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        {member.logo ? (
                          <div className="h-12 w-12 rounded-lg overflow-hidden border border-slate-200">
                            <img src={urlFor(member.logo).width(100).url()} alt="logo" className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${isIndividual ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-700"}`}>
                            {isIndividual ? <User size={24} /> : <Building2 size={24} />}
                          </div>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{member.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-800">{member.company}</h3>
                      <p className="text-xs text-green-600 mb-4">{member.membershipType}</p>
                      <div className="flex items-start mb-3">
                        <MapPin size={16} className="mr-2 text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-500 line-clamp-2">{member.location}</span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-3">{member.description}</p>
                    </div>
                    
                    <div className="px-6 py-4 bg-slate-50 border-t flex justify-between items-center">
                      <a href={`mailto:${member.email}`} className="text-sm font-semibold text-slate-500 hover:text-green-700 flex items-center">
                        <Mail size={16} className="mr-2" /> Contact
                      </a>
                      <div className="flex items-center gap-3">
                        {websiteUrl && (
                          <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-700">
                            <Globe size={18} />
                          </a>
                        )}
                        <div className="h-4 w-px bg-slate-300"></div>
                        <Link to={`/member/${memberSlug}`} className="text-sm font-semibold text-green-700 flex items-center">
                          View Profile <ArrowUpRight size={14} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border-dashed border-2 border-slate-200">
              <Search className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500">No members found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}