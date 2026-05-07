export const accuracyData = [
  {
    id: 1,
    domain: "Medical",
    prompt: "What is the recommended first-line treatment for Type 2 Diabetes according to ADA 2024 guidelines?",
    modelAnswer: "Metformin combined with lifestyle intervention remains the recommended first-line pharmacological treatment per ADA 2024 guidelines, unless contraindicated.",
    correctAnswer: "Metformin + lifestyle intervention (ADA 2024). GLP-1 agonists recommended if CV disease present.",
    accuracyScore: 78,
    status: "PARTIAL",
    errorType: "Incomplete",
    testedAt: "2026-04-28T09:14:00Z"
  },
  {
    id: 2,
    domain: "Legal",
    prompt: "What is the statute of limitations for filing a federal copyright infringement lawsuit in the United States?",
    modelAnswer: "The statute of limitations for federal copyright infringement is 3 years from when the infringement was discovered or should have been discovered.",
    correctAnswer: "3 years from discovery (17 U.S.C. § 507(b)). Petrella v. MGM (2014) confirmed this.",
    accuracyScore: 95,
    status: "PASS",
    errorType: null,
    testedAt: "2026-04-30T11:22:00Z"
  },
  {
    id: 3,
    domain: "Technical",
    prompt: "What is the time complexity of the Dijkstra shortest path algorithm using a binary heap priority queue?",
    modelAnswer: "Dijkstra's algorithm with a binary heap runs in O(V log V + E) time, where V is vertices and E is edges.",
    correctAnswer: "O((V + E) log V) with binary heap. O(V log V + E) is the form using Fibonacci heap.",
    accuracyScore: 62,
    status: "PARTIAL",
    errorType: "Misinterpretation",
    testedAt: "2026-05-01T14:05:00Z"
  },
  {
    id: 4,
    domain: "Scientific",
    prompt: "What is the half-life of Carbon-14 and how is it used in radiocarbon dating?",
    modelAnswer: "Carbon-14 has a half-life of 5,730 years. It's used to date organic materials up to about 50,000 years old by measuring the ratio of C-14 to C-12 remaining in a sample.",
    correctAnswer: "Half-life: 5,730 years (±40 years). Dating range: ~50,000 years. C-14/C-12 ratio measurement is correct.",
    accuracyScore: 98,
    status: "PASS",
    errorType: null,
    testedAt: "2026-05-02T08:33:00Z"
  },
  {
    id: 5,
    domain: "Financial",
    prompt: "What was the federal funds rate target range set by the Federal Reserve in December 2025?",
    modelAnswer: "The Federal Reserve maintained the federal funds rate at 4.25%–4.50% as of December 2025, following a series of rate cuts from the 2024 peak.",
    correctAnswer: "Fed funds rate was 4.25%–4.50% as of Dec 2025 FOMC meeting. Model answer is correct.",
    accuracyScore: 92,
    status: "PASS",
    errorType: null,
    testedAt: "2026-05-03T16:47:00Z"
  },
  {
    id: 6,
    domain: "Geographic",
    prompt: "What is the capital city of Australia and what is its approximate population?",
    modelAnswer: "The capital of Australia is Sydney, with a metropolitan population of approximately 5.3 million.",
    correctAnswer: "The capital of Australia is Canberra (not Sydney). Sydney is the largest city. Canberra's population is ~470,000.",
    accuracyScore: 15,
    status: "FAIL",
    errorType: "Wrong Fact",
    testedAt: "2026-04-25T10:11:00Z"
  },
  {
    id: 7,
    domain: "Medical",
    prompt: "What are the contraindications for administering tPA (tissue plasminogen activator) in acute ischemic stroke?",
    modelAnswer: "Key contraindications for tPA in acute stroke include: recent surgery within 14 days, active internal bleeding, blood pressure above 185/110, prior stroke within 3 months, and blood glucose below 50 or above 400 mg/dL.",
    correctAnswer: "Correct core contraindications. Missing: recent intracranial surgery (3 months), active anticoagulation with elevated INR, platelet count <100,000, and prior ICH history. Incomplete list.",
    accuracyScore: 71,
    status: "PARTIAL",
    errorType: "Incomplete",
    testedAt: "2026-04-29T13:55:00Z"
  },
  {
    id: 8,
    domain: "Technical",
    prompt: "What is the maximum transmission unit (MTU) for standard Ethernet frames?",
    modelAnswer: "The standard Ethernet MTU is 1500 bytes for the payload. Including the Ethernet header and FCS, the maximum frame size is 1518 bytes (or 1522 for 802.1Q tagged frames).",
    correctAnswer: "MTU payload: 1500 bytes. Total frame: 1518 bytes untagged, 1522 bytes with 802.1Q VLAN tag. Model answer is correct.",
    accuracyScore: 100,
    status: "PASS",
    errorType: null,
    testedAt: "2026-05-04T09:20:00Z"
  },
  {
    id: 9,
    domain: "Legal",
    prompt: "Under GDPR, how many days does an organization have to report a data breach to the supervisory authority?",
    modelAnswer: "Under GDPR, organizations must notify the relevant supervisory authority of a data breach within 72 hours of becoming aware of it, unless the breach is unlikely to result in risk to individuals.",
    correctAnswer: "72 hours from awareness (Article 33 GDPR). Risk threshold condition is correct. Model answer fully accurate.",
    accuracyScore: 100,
    status: "PASS",
    errorType: null,
    testedAt: "2026-05-05T11:08:00Z"
  },
  {
    id: 10,
    domain: "Scientific",
    prompt: "What is the speed of light in a vacuum and in which year was it definitively measured to today's accepted value?",
    modelAnswer: "The speed of light in a vacuum is 299,792,458 meters per second. This value was definitively established in 1983 when the metre was redefined in terms of the speed of light, based on measurements by the BIPM.",
    correctAnswer: "299,792,458 m/s (exact, by definition since 1983). The SI redefinition of the metre in 1983 fixed c exactly. Model answer is correct.",
    accuracyScore: 97,
    status: "PASS",
    errorType: null,
    testedAt: "2026-05-06T15:30:00Z"
  },
]
