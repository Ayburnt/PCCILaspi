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

  // Fetch members from Sanity
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);

        // ✅ include slug
        const query = `*[_type == "member" && status == "active"] | order(company asc) {
          _id,
          company,
          slug,
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

  // Fallback data for development/demo
  const fallbackMembers = useMemo(
    () => [
      {
        id: 1,
        company: "A. V. ALVAIRA Brokerage Corporation",
        slug: {
          current: slugifyCompany("A. V. ALVAIRA Brokerage Corporation"),
        },
        membershipType: "Corporate Membership",
        category: "Custom House Brokers",
        description: "Customs Brokerage",
        location:
          "Mercantile Insurance Bldg., Gen. Luna Street. Intramuros, Manila",
        keyServices: ["Custom House Brokers"],
        email: "contact@avalvaira.com",
        website: null,
      },
      {
        id: 2,
        company: "A.R. Chan Customs Brokerage",
        slug: { current: slugifyCompany("A.R. Chan Customs Brokerage") },
        membershipType: "Corporate Membership",
        category: "Other",
        description: "Customs Brokerage",
        location:
          "Rm.335 Padilla de Los Reyes Bldg., Juan Luna, Binondo, Manila",
        keyServices: ["Brokerage"],
        email: "contact@archan.com",
        website: null,
      },
      {
        id: 3,
        company: "Arex Health Corporation",
        slug: { current: slugifyCompany("Arex Health Corporation") },
        membershipType: "Corporate Membership",
        category: "Other",
        description: "Importer and Distributor",
        location:
          "2/F Arex Bldg., B1 L2 Villa Carmen, Sta. Lucia, Novaliches, Quezon City",
        keyServices: ["Importer", "Distributor"],
        email: "info@arexhealth.com",
        website: null,
      },
      {
        id: 4,
        company: "Barquez Accounting and Law Office",
        slug: { current: slugifyCompany("Barquez Accounting and Law Office") },
        membershipType: "Corporate Membership",
        category: "Consulting",
        description: "Accounting and Law Office",
        location:
          "Ground Floor YMCA Manila Complex No. 350 Antonio J. Villegas Street, Ermita, Manila",
        keyServices: ["Accounting", "Auditing", "Consulting Cases"],
        email: "admin@barquezoffice.com",
        website: null,
      },
      {
        id: 5,
        company: "Beauty and Health Republic",
        slug: { current: slugifyCompany("Beauty and Health Republic") },
        membershipType: "Corporate Membership",
        category: "Retail",
        description: "Beauty and Health Products",
        location: "222 Shaw Blvd. corner Bonifacio, Mandaluyong City",
        keyServices: ["Vitamins", "Supplements", "Medical"],
        email: "sales@beautyhealthrepublic.com",
        website: null,
      },
      {
        id: 6,
        company: "Benchstone Ent., Inc (BEI)",
        slug: { current: slugifyCompany("Benchstone Ent., Inc (BEI)") },
        membershipType: "Corporate Membership",
        category: "Other",
        description:
          "Benchstone Enterprises, Inc. (BEI) is a POEA-licensed overseas manpower recruitment and staffing agency established in the year 1993...",
        location: "2687 BEI Bldg., Arellano Avenue, Sta. Ana, Manila",
        keyServices: [
          "Manpower Recruitment",
          "Staffing Services",
          "Overseas Employment",
        ],
        email: "info@benchstone.com",
        website: "https://www.benchstone.com",
      },
      {
        id: 9,
        company: "CLEMZKIE, OPC",
        slug: { current: slugifyCompany("CLEMZKIE, OPC") },
        membershipType: "Individual Membership",
        category: "Technology",
        description:
          "Turning complexity into clarity through innovative technology and data-driven solutions...",
        location: "Sto Cristo, Quezon City",
        keyServices: [
          "Tech Consulting",
          "Data Solutions",
          "Blockchain Strategies",
        ],
        email: "contact@clemzkie.com",
        website: null,
      },
    ],
    []
  );

  // Use Sanity data if available, otherwise use fallback
  const displayMembers = members.length > 0 ? members : fallbackMembers;

  // Extract unique categories for the filter
  const categories = [
    "All",
    ...new Set(displayMembers.map((m) => m.category).filter(Boolean)),
  ];

  const filteredMembers = displayMembers.filter((member) => {
    const company = (member.company ?? "").toLowerCase();
    const description = (member.description ?? "").toLowerCase();
    const services = Array.isArray(member.keyServices)
      ? member.keyServices
      : [];

    const term = searchTerm.toLowerCase();

    const matchesSearch =
      company.includes(term) ||
      description.includes(term) ||
      services.some((service) => (service ?? "").toLowerCase().includes(term));

    const matchesCategory =
      selectedCategory === "All" || member.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-green-900 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Members Directory
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">
            Connect with our diverse network of industry leaders and
            professionals.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 mb-12 relative z-20">
        <div className="bg-white rounded-lg shadow-xl p-6 border border-slate-100">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by company, service, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all outline-none text-slate-700 placeholder-slate-400"
              />
            </div>

            <div className="relative group">
              <Briefcase
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors"
                size={20}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white cursor-pointer outline-none text-slate-700"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center text-sm text-slate-500 border-t border-slate-100 pt-4">
            <span>Directory Listing</span>
            <span>
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredMembers.length}
              </span>{" "}
              result{filteredMembers.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 pb-20 flex justify-center items-center py-20">
          <div className="text-center">
            <Loader2
              className="animate-spin text-green-700 mx-auto mb-4"
              size={48}
            />
            <p className="text-slate-600">Loading members...</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Members Grid */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => {
              const isIndividual = (member.membershipType ?? "").includes(
                "Individual"
              );

              // ✅ use slug for routing
              const memberSlug =
                typeof member?.slug === "string"
                  ? member.slug
                  : member?.slug?.current;

              const memberKey =
                memberSlug ||
                member?._id ||
                (member?.id != null ? String(member.id) : "");

              const key = member._id || memberKey;

              const websiteUrl = normalizeWebsiteUrl(member.website);

              return (
                <div
                  key={key}
                  className="group bg-white rounded-lg border border-slate-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden relative"
                >
                  <div
                    className={`h-1 w-full ${
                      isIndividual ? "bg-emerald-500" : "bg-green-800"
                    }`}
                  />

                  <div className="p-6 pb-2">
                    <div className="flex justify-between items-start mb-4">
                      {member.logo ? (
                      <div className="h-14 w-14 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0 bg-white flex items-center justify-center">
  <img
    src={urlFor(member.logo).url()}
    alt={`${member.company} logo`}
    className="max-w-full max-h-full object-contain"
  />
</div>

                      ) : (
                        <div
                          className={`h-12 w-12 rounded-lg flex items-center justify-center border transition-colors duration-300 ${
                            isIndividual
                              ? "bg-emerald-50 border-emerald-100 text-emerald-700 group-hover:bg-emerald-100"
                              : "bg-slate-50 border-slate-100 text-slate-700 group-hover:bg-green-50 group-hover:text-green-700"
                          }`}
                        >
                          {isIndividual ? (
                            <User size={24} strokeWidth={1.5} />
                          ) : (
                            <Building2 size={24} strokeWidth={1.5} />
                          )}
                        </div>
                      )}

                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">
                        {member.category}
                      </span>
                    </div>

                    <div className="min-h-[3.5rem]">
                      <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-green-800 transition-colors">
                        {member.company}
                      </h3>
                      <p
                        className={`text-xs font-medium mt-1 ${
                          isIndividual ? "text-emerald-600" : "text-green-600"
                        }`}
                      >
                        {member.membershipType}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 flex-grow flex flex-col">
                    <div className="flex items-start py-3 border-t border-dashed border-slate-100">
                      <MapPin
                        size={16}
                        className="mt-0.5 mr-2.5 flex-shrink-0 text-slate-400"
                      />
                      <span className="text-sm text-slate-500 leading-snug">
                        {member.location}
                      </span>
                    </div>

                    <div className="py-3">
                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {member.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-3 pb-6">
                      <div className="flex flex-wrap gap-2">
                        {(member.keyServices ?? [])
                          .slice(0, 3)
                          .map((service, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded bg-slate-50 text-slate-600 text-xs border border-slate-200 font-medium"
                            >
                              {service}
                            </span>
                          ))}
                        {Array.isArray(member.keyServices) &&
                          member.keyServices.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded bg-slate-50 text-slate-400 text-xs border border-slate-200">
                              +{member.keyServices.length - 3}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center mt-auto">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center text-sm font-semibold text-slate-500 hover:text-green-700 transition-colors"
                    >
                      <Mail size={16} className="mr-2" />
                      Contact
                    </a>

                    <div className="flex items-center gap-3">
                      {websiteUrl && (
                        <a
                          href={websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-green-700 transition-colors"
                          title="Visit Website"
                        >
                          <Globe size={18} strokeWidth={1.5} />
                        </a>
                      )}
                      <div className="h-4 w-px bg-slate-300 mx-1"></div>

                      {/* ✅ slug route */}
                      <Link
                        to={`/member/${memberKey}`}
                        className="text-sm font-semibold text-green-700 hover:text-green-900 flex items-center group/btn"
                      >
                        View Profile
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-slate-300 mt-6">
              <div className="bg-slate-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-400" size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">
                No members found
              </h3>
              <p className="text-slate-500">
                We couldn't find any results for your search.
              </p>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
